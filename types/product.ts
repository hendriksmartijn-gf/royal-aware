export interface AirtableAttachment {
  id: string;
  url: string;
  filename: string;
  size: number;
  type: string;
  width?: number;
  height?: number;
  thumbnails?: {
    small: { url: string; width: number; height: number };
    large: { url: string; width: number; height: number };
    full:  { url: string; width: number; height: number };
  };
}

export interface Product {
  id: string;
  name: string;
  productCategory: string;
  subCategory: string;
  cheeseType: string;
  ageRipening: string;
  formatsWeights: string;
  retail: boolean;
  export: boolean;
  foodservice: boolean;
  foodIndustry: boolean;
  brand: string;
  packagingType: string;
  shelfLife: string;
  certifications: string[];
  applications: string;
  descriptionEN: string;
  photo: AirtableAttachment[];
  active: boolean;
}

export type Channel = 'Retail' | 'Export' | 'Foodservice' | 'Food Industry';

export type ProductCategory =
  | 'Packaged Cheese'
  | 'Whole Packed'
  | 'Processed & Smoked'
  | 'Dried Cheese'
  | 'Cream';
