export interface MedicationTemplate {
  id: string;
  name: string;
  genericName: string;
  category: string;
  commonDosages: string[];
  commonFrequencies: string[];
  commonDurations: string[];
  commonInstructions: string[];
}

export const medicationCategories = {
  en: {
    analgesics: 'Analgesics (Pain Relief)',
    antibiotics: 'Antibiotics',
    antihistamines: 'Antihistamines',
    cardiovascular: 'Cardiovascular',
    diabetes: 'Diabetes',
    respiratory: 'Respiratory',
    gastrointestinal: 'Gastrointestinal',
    other: 'Other',
  },
  es: {
    analgesics: 'Analgésicos (Alivio del Dolor)',
    antibiotics: 'Antibióticos',
    antihistamines: 'Antihistamínicos',
    cardiovascular: 'Cardiovascular',
    diabetes: 'Diabetes',
    respiratory: 'Respiratorio',
    gastrointestinal: 'Gastrointestinal',
    other: 'Otro',
  },
};

export const medicationLibrary: MedicationTemplate[] = [
  // Analgesics
  {
    id: '1',
    name: 'Paracetamol',
    genericName: 'Acetaminophen',
    category: 'analgesics',
    commonDosages: ['500mg', '650mg', '1000mg'],
    commonFrequencies: ['Every 4-6 hours', 'Every 8 hours', 'Twice daily'],
    commonDurations: ['3 days', '5 days', '7 days', 'As needed'],
    commonInstructions: ['After meals', 'With water', 'Do not exceed 4g/day'],
  },
  {
    id: '2',
    name: 'Ibuprofen',
    genericName: 'Ibuprofen',
    category: 'analgesics',
    commonDosages: ['200mg', '400mg', '600mg'],
    commonFrequencies: ['Every 6-8 hours', 'Three times daily', 'As needed'],
    commonDurations: ['3 days', '5 days', '7 days'],
    commonInstructions: ['After meals', 'With food', 'Avoid empty stomach'],
  },
  // Antibiotics
  {
    id: '3',
    name: 'Amoxicillin',
    genericName: 'Amoxicillin',
    category: 'antibiotics',
    commonDosages: ['250mg', '500mg', '875mg'],
    commonFrequencies: ['Three times daily', 'Twice daily', 'Every 8 hours'],
    commonDurations: ['5 days', '7 days', '10 days'],
    commonInstructions: ['Complete full course', 'With or without food', 'Take at same time daily'],
  },
  {
    id: '4',
    name: 'Azithromycin',
    genericName: 'Azithromycin',
    category: 'antibiotics',
    commonDosages: ['250mg', '500mg'],
    commonFrequencies: ['Once daily', 'Day 1: 500mg, Days 2-5: 250mg'],
    commonDurations: ['3 days', '5 days'],
    commonInstructions: ['Before meals', 'Complete full course', '1 hour before or 2 hours after food'],
  },
  // Antihistamines
  {
    id: '5',
    name: 'Cetirizine',
    genericName: 'Cetirizine',
    category: 'antihistamines',
    commonDosages: ['5mg', '10mg'],
    commonFrequencies: ['Once daily', 'At bedtime'],
    commonDurations: ['5 days', '7 days', '14 days'],
    commonInstructions: ['With or without food', 'May cause drowsiness', 'Avoid alcohol'],
  },
  {
    id: '6',
    name: 'Loratadine',
    genericName: 'Loratadine',
    category: 'antihistamines',
    commonDosages: ['10mg'],
    commonFrequencies: ['Once daily'],
    commonDurations: ['7 days', '14 days', 'As needed'],
    commonInstructions: ['Non-drowsy formula', 'With or without food'],
  },
  // Cardiovascular
  {
    id: '7',
    name: 'Atorvastatin',
    genericName: 'Atorvastatin',
    category: 'cardiovascular',
    commonDosages: ['10mg', '20mg', '40mg'],
    commonFrequencies: ['Once daily', 'At bedtime'],
    commonDurations: ['30 days', 'Ongoing'],
    commonInstructions: ['At same time daily', 'Can be taken with or without food', 'Avoid grapefruit'],
  },
  {
    id: '8',
    name: 'Metoprolol',
    genericName: 'Metoprolol',
    category: 'cardiovascular',
    commonDosages: ['25mg', '50mg', '100mg'],
    commonFrequencies: ['Twice daily', 'Once daily'],
    commonDurations: ['30 days', 'Ongoing'],
    commonInstructions: ['With food', 'Do not stop suddenly', 'Monitor blood pressure'],
  },
  // Diabetes
  {
    id: '9',
    name: 'Metformin',
    genericName: 'Metformin',
    category: 'diabetes',
    commonDosages: ['500mg', '850mg', '1000mg'],
    commonFrequencies: ['Twice daily', 'Three times daily', 'With meals'],
    commonDurations: ['30 days', 'Ongoing'],
    commonInstructions: ['With meals', 'Start with low dose', 'Monitor blood sugar'],
  },
  // Respiratory
  {
    id: '10',
    name: 'Salbutamol',
    genericName: 'Albuterol',
    category: 'respiratory',
    commonDosages: ['100mcg per puff', '2 puffs'],
    commonFrequencies: ['As needed', 'Every 4-6 hours', 'Before exercise'],
    commonDurations: ['As needed', '30 days'],
    commonInstructions: ['Shake well before use', 'Rinse mouth after use', 'Wait 1 min between puffs'],
  },
  {
    id: '11',
    name: 'Montelukast',
    genericName: 'Montelukast',
    category: 'respiratory',
    commonDosages: ['4mg', '5mg', '10mg'],
    commonFrequencies: ['Once daily', 'At bedtime'],
    commonDurations: ['30 days', 'Ongoing'],
    commonInstructions: ['In the evening', 'With or without food'],
  },
  // Gastrointestinal
  {
    id: '12',
    name: 'Omeprazole',
    genericName: 'Omeprazole',
    category: 'gastrointestinal',
    commonDosages: ['20mg', '40mg'],
    commonFrequencies: ['Once daily', 'Before breakfast'],
    commonDurations: ['14 days', '30 days'],
    commonInstructions: ['Before meals', 'Swallow whole', 'Do not crush'],
  },
  {
    id: '13',
    name: 'Ranitidine',
    genericName: 'Ranitidine',
    category: 'gastrointestinal',
    commonDosages: ['150mg', '300mg'],
    commonFrequencies: ['Twice daily', 'Once daily at bedtime'],
    commonDurations: ['14 days', '30 days'],
    commonInstructions: ['With or without food', 'At bedtime for GERD'],
  },
];
