export const MEDICINE_CATEGORIES = [
  { id: 1, name: "Pain Relief", icon: "💊", count: 45 },
  { id: 2, name: "Vitamins", icon: "🧪", count: 32 },
  { id: 3, name: "Antibiotics", icon: "💉", count: 28 },
  { id: 4, name: "Cold & Flu", icon: "🤒", count: 19 },
  { id: 5, name: "Diabetes", icon: "🩺", count: 15 },
  { id: 6, name: "Heart Health", icon: "❤️", count: 22 }
];

export const SAMPLE_MEDICINES = [
  {
    id: 1,
    name: "Ibuprofen 400mg",
    category: "Pain Relief",
    price: 12.99,
    description: "Effective pain relief for headaches, muscle pain, and inflammation. Take 1-2 tablets every 4-6 hours as needed.",
    inStock: true,
    prescription: false,
    manufacturer: "PharmaCorp",
    image: "https://via.placeholder.com/150x150/E3F2FD/1976D2?text=Ibuprofen"
  },
  {
    id: 2,
    name: "Vitamin D3 1000IU",
    category: "Vitamins",
    price: 18.50,
    description: "Essential vitamin D supplement for bone health and immune support. Take one tablet daily with food.",
    inStock: true,
    prescription: false,
    manufacturer: "VitaLife",
    image: "https://via.placeholder.com/150x150/E8F5E8/4CAF50?text=Vitamin+D"
  },
  {
    id: 3,
    name: "Amoxicillin 500mg",
    category: "Antibiotics",
    price: 35.75,
    description: "Prescription antibiotic for bacterial infections. Complete the full course as directed by your doctor.",
    inStock: true,
    prescription: true,
    manufacturer: "MedPharm",
    image: "https://via.placeholder.com/150x150/FFF3E0/FF9800?text=Amoxicillin"
  },
  {
    id: 4,
    name: "DayQuil Cold Relief",
    category: "Cold & Flu",
    price: 9.99,
    description: "Multi-symptom cold and flu relief for daytime use. Non-drowsy formula for active relief.",
    inStock: true,
    prescription: false,
    manufacturer: "ColdCare",
    image: "https://via.placeholder.com/150x150/E1F5FE/00BCD4?text=DayQuil"
  },
  {
    id: 5,
    name: "Metformin 850mg",
    category: "Diabetes",
    price: 28.00,
    description: "Type 2 diabetes medication to control blood sugar levels. Take with meals as prescribed.",
    inStock: true,
    prescription: true,
    manufacturer: "DiabetesRx",
    image: "https://via.placeholder.com/150x150/F3E5F5/9C27B0?text=Metformin"
  },
  {
    id: 6,
    name: "Omega-3 Fish Oil",
    category: "Heart Health",
    price: 22.95,
    description: "Heart-healthy omega-3 fatty acids supplement. Supports cardiovascular health and brain function.",
    inStock: true,
    prescription: false,
    manufacturer: "HeartWell",
    image: "https://via.placeholder.com/150x150/E8F5E8/4CAF50?text=Omega-3"
  },
  {
    id: 7,
    name: "Acetaminophen 500mg",
    category: "Pain Relief",
    price: 8.75,
    description: "Gentle pain relief and fever reducer. Suitable for those who cannot take ibuprofen.",
    inStock: true,
    prescription: false,
    manufacturer: "PainAway",
    image: "https://via.placeholder.com/150x150/E3F2FD/1976D2?text=Acetaminophen"
  },
  {
    id: 8,
    name: "Vitamin C 1000mg",
    category: "Vitamins",
    price: 15.25,
    description: "Immune system support with high-potency vitamin C. Antioxidant protection for daily wellness.",
    inStock: false,
    prescription: false,
    manufacturer: "ImmuneBoost",
    image: "https://via.placeholder.com/150x150/E8F5E8/4CAF50?text=Vitamin+C"
  }
];

export const SAMPLE_ORDERS = [
  { id: 1001, date: "2024-08-10", status: "Delivered", total: 45.50, items: 3 },
  { id: 1002, date: "2024-08-08", status: "Shipped", total: 23.99, items: 2 },
  { id: 1003, date: "2024-08-05", status: "Processing", total: 67.25, items: 4 },
  { id: 1004, date: "2024-08-02", status: "Pending", total: 19.99, items: 1 }
];