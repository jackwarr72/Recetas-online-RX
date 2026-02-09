import { medicationLibrary, MedicationTemplate } from '../constants/medicationLibrary';

export const searchMedications = (query: string, category?: string): MedicationTemplate[] => {
  const lowercaseQuery = query.toLowerCase().trim();
  
  let results = medicationLibrary;
  
  // Filter by category if provided
  if (category && category !== 'all') {
    results = results.filter(med => med.category === category);
  }
  
  // Filter by search query
  if (lowercaseQuery) {
    results = results.filter(med => 
      med.name.toLowerCase().includes(lowercaseQuery) ||
      med.genericName.toLowerCase().includes(lowercaseQuery)
    );
  }
  
  return results;
};

export const getMedicationById = (id: string): MedicationTemplate | undefined => {
  return medicationLibrary.find(med => med.id === id);
};

export const getAllCategories = (): string[] => {
  const categories = new Set(medicationLibrary.map(med => med.category));
  return Array.from(categories);
};
