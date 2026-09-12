export type CategoryType = 'bracelets' | 'rings' | 'earrings' | 'necklaces' | 'anklets' | 'sets';

export type MetalType = 'gold' | 'rose-gold' | 'silver' | 'two-tone';

export type UniverseId = 
  | 'emily-in-paris'
  | 'summer-i-turned-pretty'
  | 'to-all-the-boys'
  | 'bridgerton'
  | 'gossip-girl';

export type ProductTier = 'everyday' | 'signature' | 'fine-edit';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: CategoryType;
  metal: MetalType;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  badges: string[];
  universe?: UniverseId;
  tier: ProductTier;
  referenceImageName?: string;
  description: string;
  materials: string;
  dimensions?: string;
  sizes?: string[];
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isUnder999?: boolean;
  stylingNote: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export interface UniverseEdition {
  id: UniverseId;
  title: string;
  tagline: string;
  aesthetic: string;
  accentColor: string;
  heroImage: string;
  quote: string;
  signaturePieces: string[];
  editorialNote: string;
}

export interface Review {
  id: string;
  author: string;
  city: string;
  rating: number;
  productName: string;
  comment: string;
  date: string;
  verified: boolean;
  skinToneNote?: string;
}
