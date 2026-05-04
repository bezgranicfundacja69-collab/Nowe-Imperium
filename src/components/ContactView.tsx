import { Mail, MessageSquare, Phone, MapPin, Send, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

export function ContactView() {
  return (
    <div className="space-y-12 pb-20">
      <div className="relative overflow-hidden rounded-[48px] bg-white border border-slate-100 p-8 shadow-sm sm:p-20 text-center">
        <div className="absolute top-0 left-0 -ml-20 -mt-20 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl" />
        <h1 className="text-4xl font-black text-slate-900 mb-4 sm:text-7xl">Potrzebujesz <span className="text-blue-600">Pomocy?</span></h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">Nasz zespół wsparcia OmniMarket AI jest dostępny 24/7, aby odpowiedzieć na Twoje pytania.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-slate-900 p-8 rounded-[32px] border border-slate-800 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 h-32 w-32 rounded-full bg-blue-500/10 blur-2xl group-hover:scale-150 transition-transform" />
            <h3 className="text-[10px] font-black text-blue-400 mb-6 uppercase tracking-widest flex items-center gap-2">
              <HelpCircle size={14} /> Założyciel & Pomysłodawca
            </h3>
            <div className="text-2xl font-black text-white mb-1">Arkadiusz Smyka</div>
            <p className="text-xs font-bold text-slate-400 mb-6 uppercase tracking-widest">Właściciel i Organizator</p>
            <div className="flex items-center gap-3 text-blue-400 font-black text-lg">
              <Phone size={20} /> 697 475 190
            </div>
          </div>

          <ContactCard icon={<Mail className="text-blue-600" />} title="E-mail" detail="kontakt@omnimarket.ai" sub="Odpowiadamy w 15 minut" />
          <ContactCard icon={<MessageSquare className="text-indigo-600" />} title="Live Czat AI" detail="Dostępny Online" sub="Natychmiastowe rozwiązanie problemu" />
          <ContactCard icon={<Phone className="text-teal-600" />} title="Infolinia" detail="+48 800 OMNI AI" sub="Dla Partnerów Premium" />
        </div>

        <form className="lg:col-span-8 bg-white rounded-[40px] border border-slate-100 p-8 sm:p-12 shadow-sm space-y-6">
          <h2 className="text-2xl font-black text-slate-900 mb-8">Wyślij wiadomość</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Twoje Imię" placeholder="Jan Kowalski" />
            <InputField label="Adres E-mail" placeholder="jan@example.com" type="email" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Temat</label>
            <select className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-blue-500/20">
              <option>Wsparcie Techniczne</option>
              <option>Rozliczenia i Portfel</option>
              <option>Automatyzacja Biznesu</option>
              <option>Inny temat</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Wiadomość</label>
            <textarea rows={6} className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-blue-500/20" placeholder="W czym możemy Ci pomóc?" />
          </div>
          <button className="w-full sm:w-auto px-12 py-4 bg-slate-900 text-white rounded-2xl text-sm font-black flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95 shadow-xl shadow-slate-900/10">
            Wyślij Wiadomość <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}

function ContactCard({ icon, title, detail, sub }: any) {
  return (
    <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm group hover:border-blue-200 transition-colors">
      <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-blue-50 transition-colors">
        {icon}
      </div>
      <h3 className="text-sm font-black text-slate-400 mb-2 uppercase tracking-widest">{title}</h3>
      <div className="text-xl font-black text-slate-900 mb-1">{detail}</div>
      <p className="text-xs font-bold text-slate-500">{sub}</p>
    </div>
  );
}

function InputField({ label, ...props }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</label>
      <input {...props} className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-blue-500/20" />
    </div>
  );
}
