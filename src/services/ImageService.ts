// src/services/ImageService.ts - Direct Unsplash URLs (More Reliable)

export const getMedicineImages = {
  pills: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop&auto=format',
  tablets: 'https://images.unsplash.com/photo-1563213126-a4273aed2016?w=400&h=300&fit=crop&auto=format',
  capsules: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=300&fit=crop&auto=format',
  bottles: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=300&fit=crop&auto=format',
  vitamins: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&h=300&fit=crop&auto=format',
  antibiotics: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop&auto=format',
  digestive: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=300&fit=crop&auto=format',
  syrup: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&auto=format',
  injection: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop&auto=format',
  generic: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop&auto=format',
  
  // Additional medicine images
  medicine1: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=300&fit=crop&auto=format',
  medicine2: 'https://images.unsplash.com/photo-1563213126-a4273aed2016?w=400&h=300&fit=crop&auto=format',
  medicine3: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=300&fit=crop&auto=format',
  medicine4: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&h=300&fit=crop&auto=format'
};

// Get specific image based on medicine type
export const getMedicineImageUrl = (medicineName: string, category: string) => {
  const name = medicineName.toLowerCase();
  const cat = category.toLowerCase();
  
  try {
    if (name.includes('aspirin') || name.includes('ibuprofen')) {
      return getMedicineImages.pills;
    } else if (name.includes('vitamin')) {
      return getMedicineImages.vitamins;
    } else if (name.includes('antibiotic') || name.includes('amoxicillin')) {
      return getMedicineImages.antibiotics;
    } else if (name.includes('paracetamol') || name.includes('tylenol')) {
      return getMedicineImages.tablets;
    } else if (name.includes('omeprazole') || cat.includes('digestive')) {
      return getMedicineImages.digestive;
    } else if (cat.includes('pain')) {
      return getMedicineImages.pills;
    } else if (cat.includes('vitamin')) {
      return getMedicineImages.vitamins;
    } else if (cat.includes('anti')) {
      return getMedicineImages.tablets;
    } else if (cat.includes('digestive')) {
      return getMedicineImages.digestive;
    } else {
      return getMedicineImages.generic;
    }
  } catch (error) {
    console.log('Error getting medicine image URL:', error);
    return getMedicineImages.generic;
  }
};

// Alternative image sets for detail view (3 different images per medicine)
export const getAlternativeImages = (medicineName: string) => {
  const name = medicineName.toLowerCase();
  
  try {
    if (name.includes('aspirin')) {
      return [
        getMedicineImages.pills,
        getMedicineImages.tablets,
        getMedicineImages.medicine1
      ];
    } else if (name.includes('ibuprofen')) {
      return [
        getMedicineImages.tablets,
        getMedicineImages.pills,
        getMedicineImages.medicine2
      ];
    } else if (name.includes('paracetamol')) {
      return [
        getMedicineImages.tablets,
        getMedicineImages.capsules,
        getMedicineImages.medicine3
      ];
    } else if (name.includes('amoxicillin')) {
      return [
        getMedicineImages.antibiotics,
        getMedicineImages.capsules,
        getMedicineImages.bottles
      ];
    } else if (name.includes('vitamin')) {
      return [
        getMedicineImages.vitamins,
        getMedicineImages.capsules,
        getMedicineImages.medicine4
      ];
    } else if (name.includes('omeprazole')) {
      return [
        getMedicineImages.digestive,
        getMedicineImages.bottles,
        getMedicineImages.capsules
      ];
    } else {
      return [
        getMedicineImages.generic,
        getMedicineImages.pills,
        getMedicineImages.tablets
      ];
    }
  } catch (error) {
    console.log('Error getting alternative images:', error);
    return [
      getMedicineImages.generic,
      getMedicineImages.pills,
      getMedicineImages.tablets
    ];
  }
};

// Fallback function for failed image loads
export const getFallbackImageUrl = (medicineName: string) => {
  const encodedName = encodeURIComponent(medicineName);
  return `https://via.placeholder.com/400x300/E3F2FD/2196F3?text=${encodedName}`;
};
