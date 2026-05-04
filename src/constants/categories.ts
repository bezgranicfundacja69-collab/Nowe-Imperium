import { 
  Smartphone, 
  Hammer, 
  Car, 
  Home, 
  Utensils, 
  Shirt, 
  Cpu, 
  Briefcase, 
  Heart, 
  Music,
  ShoppingBag,
  Wrench,
  Monitor,
  Watch,
  Gamepad,
  Dog,
  Brush,
  Zap,
  Handshake,
  Scale,
  Brain,
  GraduationCap,
  Palmtree,
  Lightbulb,
  Workflow
} from 'lucide-react';

export interface SubCategory {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  icon: any;
  subcategories?: SubCategory[];
}

export const CATEGORIES: Category[] = [
  {
    id: 'electronics',
    name: 'Elektronika',
    icon: Smartphone,
    subcategories: [
      { id: 'phones', name: 'Telefony' },
      { id: 'computers', name: 'Komputery' },
      { id: 'consoles', name: 'Konsole i Gry' },
      { id: 'audio', name: 'Sprzęt Audio' },
      { id: 'smartwatches', name: 'Smartwatche' }
    ]
  },
  {
    id: 'clothing',
    name: 'Odzież',
    icon: Shirt,
    subcategories: [
      { id: 'men', name: 'Męska' },
      { id: 'women', name: 'Damska' },
      { id: 'kids', name: 'Dziecięca' },
      { id: 'accessories', name: 'Dodatki' }
    ]
  },
  {
    id: 'home',
    name: 'Dom i Ogród',
    icon: Home,
    subcategories: [
      { id: 'furniture', name: 'Meble' },
      { id: 'decorations', name: 'Dekoracje' },
      { id: 'garden', name: 'Ogród' },
      { id: 'tools', name: 'Narzędzia' }
    ]
  },
  {
    id: 'automotive',
    name: 'Motoryzacja',
    icon: Car,
    subcategories: [
      { id: 'cars', name: 'Samochody Osobowe' },
      { id: 'motorcycles', name: 'Motocykle' },
      { id: 'parts', name: 'Części Samochodowe' }
    ]
  },
  {
    id: 'services',
    name: 'Usługi Profesjonalne',
    icon: Hammer,
    subcategories: [
      { id: 'it', name: 'Usługi IT' },
      { id: 'construction', name: 'Budowa i Remont' },
      { id: 'cleaning', name: 'Sprzątanie' },
      { id: 'education', name: 'Edukacja i Lekcje' },
      { id: 'beauty', name: 'Uroda i Zdrowie' }
    ]
  },
  {
    id: 'professional-services',
    name: 'Usługi Prawne i Specjalistyczne',
    icon: Scale,
    subcategories: [
      { id: 'lawyer', name: 'Prawnik i Radca' },
      { id: 'notary', name: 'Notariusz' },
      { id: 'accountant', name: 'Księgowość' },
      { id: 'translation', name: 'Tłumaczenia' }
    ]
  },
  {
    id: 'health-mind',
    name: 'Zdrowie i Umysł',
    icon: Brain,
    subcategories: [
      { id: 'psychologist', name: 'Psycholog' },
      { id: 'therapist', name: 'Terapeuta' },
      { id: 'physiotherapy', name: 'Fizjoterapia' },
      { id: 'coaching', name: 'Coaching' }
    ]
  },
  {
    id: 'education-lang',
    name: 'Edukacja i Nauka',
    icon: GraduationCap,
    subcategories: [
      { id: 'languages', name: 'Nauczyciel Języków' },
      { id: 'tutoring', name: 'Korepetycje' },
      { id: 'coding-school', name: 'Nauka Programowania' },
      { id: 'music-lessons', name: 'Lekcje Muzyki' }
    ]
  },
  {
    id: 'hobbies',
    name: 'Hobby i Rozrywka',
    icon: Music,
    subcategories: [
      { id: 'instruments', name: 'Instrumenty' },
      { id: 'sports', name: 'Sport' },
      { id: 'collectibles', name: 'Kolekcje' }
    ]
  },
  {
    id: 'community',
    name: 'Społeczność',
    icon: Heart,
    subcategories: [
      { id: 'exchange', name: 'Zamienię' },
      { id: 'free', name: 'Oddam za darmo' },
      { id: 'cooperation', name: 'Współpraca' }
    ]
  },
  {
    id: 'tourism',
    name: 'Turystyka i Podróże',
    icon: Palmtree,
    subcategories: [
      { id: 'hotels', name: 'Hotele i Noclegi' },
      { id: 'tours', name: 'Wycieczki i Przewodnicy' },
      { id: 'flights', name: 'Loty i Transport' },
      { id: 'rent-a-car', name: 'Wynajem Aut' }
    ]
  },
  {
    id: 'ready-made-stores',
    name: 'Gotowe Sklepy i Biznesy',
    icon: ShoppingBag,
    subcategories: [
      { id: 'shoper', name: 'Sklepy Shoper' },
      { id: 'shopify', name: 'Sklepy Shopify' },
      { id: 'dropshipping', name: 'Gotowe Dropshippingi' },
      { id: 'saas', name: 'Biznesy SaaS' },
      { id: 'automated', name: 'W pełni Automatyczne' }
    ]
  },
  {
    id: 'idea-bank',
    name: 'Bank Pomysłów',
    icon: Lightbulb,
    subcategories: [
      { id: 'startups', name: 'Pomysły na Start' },
      { id: 'franchise', name: 'Franczyza' },
      { id: 'innovations', name: 'Innowacje' },
      { id: 'side-hustle', name: 'Dodatkowy Dochód' }
    ]
  },
  {
    id: 'ai-automation',
    name: 'AI Automatyzacja',
    icon: Workflow,
    subcategories: [
      { id: 'scraping', name: 'Pobieranie Produktów' },
      { id: 'auto-listing', name: 'Automatyczne Wystawianie' },
      { id: 'stock-sync', name: 'Synchronizacja Magazynu' },
      { id: 'analysis', name: 'Analiza Konkurencji AI' }
    ]
  },
  {
    id: 'business',
    name: 'Biznes i Rozwój',
    icon: Briefcase,
    subcategories: [
      { id: 'investors', name: 'Dział Inwestorów' },
      { id: 'grants', name: 'Dział Dotacje' },
      { id: 'loans', name: 'Kredyty i Finanse' },
      { id: 'insurance', name: 'Ubezpieczenia' },
      { id: 'incubator', name: 'Inkubator Przedsiębiorczości' },
      { id: 'prototypes', name: 'Dział Prototypy' },
      { id: 'marketing', name: 'Banery Reklamowe' }
    ]
  }
];

export function getCategoryName(id: string) {
  return CATEGORIES.find(c => c.id === id)?.name || id;
}

export function getSubcategoryName(catId: string, subId: string) {
  const cat = CATEGORIES.find(c => c.id === catId);
  return cat?.subcategories?.find(s => s.id === subId)?.name || subId;
}
