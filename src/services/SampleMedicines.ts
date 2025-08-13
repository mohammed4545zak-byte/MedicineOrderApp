// src/services/SampleMedicines.ts
import { getMedicineImageUrl, getAlternativeImages } from './ImageService';

export type Medicine = {
  id: number;
  name: string;
  category: string;
  price: number;
  manufacturer: string;
  description: string;
  prescription: boolean;
  inStock: boolean;
  image: string;
  images: string[];
};

export const SAMPLE_MEDICINES: Medicine[] = [
  {
    id: 1,
    name: 'Aspirin',
    category: 'Pain Relief',
    price: 5.99,
    manufacturer: 'Bayer',
    description: 'Relieves minor aches, pains, and reduces fever. Effective for headaches and mild pain relief.',
    prescription: false,
    inStock: true,
    image: getMedicineImageUrl('Aspirin', 'Pain Relief'),
    images: getAlternativeImages('Aspirin'),
  },
  {
    id: 2,
    name: 'Ibuprofen',
    category: 'Anti-inflammatory',
    price: 7.49,
    manufacturer: 'Advil',
    description: 'Reduces inflammation and relieves pain. Effective for muscle aches and joint pain.',
    prescription: false,
    inStock: true,
    image: getMedicineImageUrl('Ibuprofen', 'Anti-inflammatory'),
    images: getAlternativeImages('Ibuprofen'),
  },
  {
    id: 3,
    name: 'Paracetamol',
    category: 'Pain Relief',
    price: 4.99,
    manufacturer: 'Tylenol',
    description: 'Effective for headaches and fever reduction. Safe for most age groups.',
    prescription: false,
    inStock: false,
    image: getMedicineImageUrl('Paracetamol', 'Pain Relief'),
    images: getAlternativeImages('Paracetamol'),
  },
  {
    id: 4,
    name: 'Amoxicillin',
    category: 'Antibiotics',
    price: 12.99,
    manufacturer: 'Generic',
    description: 'Antibiotic used to treat bacterial infections. Requires prescription.',
    prescription: true,
    inStock: true,
    image: getMedicineImageUrl('Amoxicillin', 'Antibiotics'),
    images: getAlternativeImages('Amoxicillin'),
  },
  {
    id: 5,
    name: 'Vitamin C',
    category: 'Vitamins',
    price: 8.99,
    manufacturer: 'Nature Made',
    description: 'Essential vitamin for immune system support and overall health.',
    prescription: false,
    inStock: true,
    image: getMedicineImageUrl('Vitamin C', 'Vitamins'),
    images: getAlternativeImages('Vitamin C'),
  },
  {
    id: 6,
    name: 'Omeprazole',
    category: 'Digestive',
    price: 15.99,
    manufacturer: 'Prilosec',
    description: 'Reduces stomach acid production. Used for acid reflux and ulcers.',
    prescription: true,
    inStock: true,
    image: getMedicineImageUrl('Omeprazole', 'Digestive'),
    images: getAlternativeImages('Omeprazole'),
  },
  // Add more medicines to match categories
  {
    id: 7,
    name: 'Naproxen',
    category: 'Anti-inflammatory',
    price: 9.49,
    manufacturer: 'Aleve',
    description: 'Long-lasting relief from minor aches and pains. Reduces inflammation.',
    prescription: false,
    inStock: true,
    image: getMedicineImageUrl('Naproxen', 'Anti-inflammatory'),
    images: getAlternativeImages('Naproxen'),
  },
  {
    id: 8,
    name: 'Penicillin',
    category: 'Antibiotics',
    price: 14.99,
    manufacturer: 'Generic',
    description: 'Broad-spectrum antibiotic for various bacterial infections.',
    prescription: true,
    inStock: true,
    image: getMedicineImageUrl('Penicillin', 'Antibiotics'),
    images: getAlternativeImages('Penicillin'),
  },
  {
    id: 9,
    name: 'Vitamin D',
    category: 'Vitamins',
    price: 12.99,
    manufacturer: 'Nature Made',
    description: 'Supports bone health and immune system function.',
    prescription: false,
    inStock: true,
    image: getMedicineImageUrl('Vitamin D', 'Vitamins'),
    images: getAlternativeImages('Vitamin D'),
  },
  {
    id: 10,
    name: 'Multivitamin',
    category: 'Vitamins',
    price: 16.99,
    manufacturer: 'Centrum',
    description: 'Complete daily vitamin and mineral supplement.',
    prescription: false,
    inStock: true,
    image: getMedicineImageUrl('Multivitamin', 'Vitamins'),
    images: getAlternativeImages('Multivitamin'),
  },
];

// Function to calculate dynamic counts
const getCategoryCount = (categoryName: string): number => {
  return SAMPLE_MEDICINES.filter(medicine => medicine.category === categoryName).length;
};

// Dynamic categories with actual counts
export const MEDICINE_CATEGORIES = [
  {
    id: 1,
    name: 'Pain Relief',
    icon: 'medkit-outline',
    count: getCategoryCount('Pain Relief'), // Now shows actual count
  },
  {
    id: 2,
    name: 'Anti-inflammatory',
    icon: 'heart-outline',
    count: getCategoryCount('Anti-inflammatory'), // Now shows actual count
  },
  {
    id: 3,
    name: 'Antibiotics',
    icon: 'shield-outline',
    count: getCategoryCount('Antibiotics'), // Now shows actual count
  },
  {
    id: 4,
    name: 'Vitamins',
    icon: 'leaf-outline',
    count: getCategoryCount('Vitamins'), // Now shows actual count
  },
  {
    id: 5,
    name: 'Digestive',
    icon: 'nutrition-outline',
    count: getCategoryCount('Digestive'), // Now shows actual count
  },
  
];
