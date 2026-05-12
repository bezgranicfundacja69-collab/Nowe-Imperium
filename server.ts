import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Stripe Setup
  let stripe: Stripe | null = null;
  const getStripe = () => {
    if (!stripe) {
      const key = process.env.STRIPE_SECRET_KEY;
      if (!key) {
        throw new Error('STRIPE_SECRET_KEY environment variable is required for payments');
      }
      stripe = new Stripe(key);
    }
    return stripe;
  };

  // Connect Onboarding
  app.post("/api/stripe/connect/onboard", async (req, res) => {
    try {
      const { userId, email } = req.body;
      const stripeClient = getStripe();

      // Create a Connect account
      const account = await stripeClient.accounts.create({
        type: 'express',
        email: email,
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
        metadata: {
          userId: userId
        }
      });

      // Create an account link for onboarding
      const accountLink = await stripeClient.accountLinks.create({
        account: account.id,
        refresh_url: `${req.headers.origin}/settings?stripe=refresh`,
        return_url: `${req.headers.origin}/settings?stripe=success&account_id=${account.id}`,
        type: 'account_onboarding',
      });

      res.json({ 
        accountId: account.id,
        url: accountLink.url 
      });
    } catch (error: any) {
      console.error('Stripe Connect Error:', error.message);
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/stripe/connect/status/:accountId", async (req, res) => {
    try {
      const { accountId } = req.params;
      const stripeClient = getStripe();
      const account = await stripeClient.accounts.retrieve(accountId);
      
      res.json({
        chargesEnabled: account.charges_enabled,
        payoutsEnabled: account.payouts_enabled,
        detailsSubmitted: account.details_submitted
      });
    } catch (error: any) {
      console.error('Stripe Status Error:', error.message);
      res.status(500).json({ error: error.message });
    }
  });

  // API Routes
  app.post("/api/create-checkout-session", async (req, res) => {
    try {
      const { items, successUrl, cancelUrl } = req.body;
      const stripeClient = getStripe();

      const session = await stripeClient.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: items.map((item: any) => ({
          price_data: {
            currency: 'pln',
            product_data: {
              name: item.name,
              description: item.description,
            },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: 1,
        })),
        mode: 'payment',
        success_url: successUrl || `${req.headers.origin}/?success=true`,
        cancel_url: cancelUrl || `${req.headers.origin}/?canceled=true`,
      });

      res.json({ id: session.id, url: session.url });
    } catch (error: any) {
      console.error('Stripe Checkout Error:', error.message);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { amount, currency = 'pln', metadata } = req.body;
      
      const stripeClient = getStripe();
      const paymentIntent = await stripeClient.paymentIntents.create({
        amount: Math.round(amount * 100), // convert to cents/grosze
        currency,
        metadata: {
          ...metadata,
          source: 'noweimperium_2026'
        },
        automatic_payment_methods: {
          enabled: true,
        },
      });

      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      console.error('Stripe Error:', error.message);
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", environment: process.env.NODE_ENV });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 noweimperium Server v2026 running on http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
