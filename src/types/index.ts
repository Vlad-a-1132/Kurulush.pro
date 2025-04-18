// Common types used throughout the application

export type Service = {
  id: number;
  name: string;
  price: number;
  unit: string;
};

export type PortfolioItem = {
  id: string;
  image: string;
  title: string;
  description: string;
};

export type Master = {
  id: number;
  name: string;
  avatar: string;
  title: string;
  status: 'online' | 'offline';
  isVerified: boolean;
  hasGuarantee: boolean;
  rating: number;
  reviewCount: number;
  qualifications?: string[];
  services?: Service[];
  areas?: string[];
  portfolio?: PortfolioItem[];
  description?: string;
  education?: string;
  experience?: string;
  contactInfo?: {
    phone?: string;
    email?: string;
    telegram?: string;
    whatsapp?: string;
  };
};

export type Category = {
  id: string;
  name: string;
  icon: string;
  description: string;
  subcategories: string[];
}; 