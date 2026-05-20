export type Faction = "conquistador" | "defensor";
export type AppPage = 
  | "home" 
  | "chronicles" 
  | "store" 
  | "detail" 
  | "search" 
  | "cart" 
  | "login" 
  | "shipping" 
  | "payment" 
  | "confirmation" 
  | "gallery" 
  | "features" 
  | "register";

export interface GameFeature {
  id: string;
  icon: string; // name of lucide-react icon
  title: string;
  description: string;
}

export interface GameProduct {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  priceLabel: string;
  buttonText: string;
  badge?: string;
  image: string;
  alt: string;
  includes: string[];
  editionType: "standard" | "deluxe" | "collector" | "merch";
  platforms?: string[];
  rating?: number;
  featuresList?: string[];
  trailerUrl?: string;
}

export interface GalleryItem {
  id: string;
  image: string;
  alt: string;
  title: string;
  tagline: string;
  description: string;
  lore: string;
}

export interface CartItem {
  product: GameProduct;
  quantity: number;
  selectedSize?: string; // For clothing merch
  selectedPlatform?: string; // For console games
}

export interface CheckoutData {
  name: string;
  email: string;
  address: string;
  city: string;
  country: string;
  zip: string;
  isBillingSame: boolean;
  couponCode: string;
  appliedDiscount: number; // 0 to 1
  paymentMethod: "card" | "paypal";
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCvv: string;
}

export interface RecruitProfile {
  name: string;
  faction: Faction;
  specialty: string;
  stats: {
    fuerza: number;
    fe: number;
    agilidad: number;
    honor: number;
  };
  weapon: string;
  armor: string;
  bio: string;
}
