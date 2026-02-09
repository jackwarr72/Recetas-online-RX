export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

export interface PrescriptionData {
  // Doctor Details
  doctorName: string;
  licenseNumber: string;
  specialization: string;
  clinicName: string;
  clinicAddress: string;
  clinicPhone: string;
  
  // Patient Details
  patientName: string;
  patientAge: string;
  patientGender: string;
  patientPhone: string;
  patientAddress: string;
  
  // Clinical Details
  diagnosis: string;
  symptoms: string;
  bloodPressure?: string;
  weight?: string;
  temperature?: string;
  
  // Medications
  medications: Medication[];
  
  // Additional
  notes?: string;
  followUpDate?: string;
  
  // Template Image
  templateImageUri?: string;
  
  // Metadata
  date: string;
}
