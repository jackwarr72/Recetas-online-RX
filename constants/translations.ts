export type Language = 'en' | 'es';

export interface Translations {
  // Header
  headerTitle: string;
  headerSubtitle: string;
  
  // Sections
  doctorDetails: string;
  patientInformation: string;
  clinicalAssessment: string;
  medications: string;
  additionalNotes: string;
  
  // Doctor Fields
  doctorName: string;
  licenseNumber: string;
  specialization: string;
  clinicName: string;
  address: string;
  phone: string;
  
  // Patient Fields
  patientName: string;
  age: string;
  gender: string;
  
  // Clinical Fields
  diagnosis: string;
  symptoms: string;
  bloodPressure: string;
  weight: string;
  temperature: string;
  
  // Medication Fields
  medicineName: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  
  // Actions
  addMedication: string;
  generatePDF: string;
  save: string;
  cancel: string;
  edit: string;
  delete: string;
  
  // Additional
  notes: string;
  followUpDate: string;
  uploadTemplate: string;
  removeImage: string;
  
  // Placeholders
  doctorNamePlaceholder: string;
  licenseNumberPlaceholder: string;
  specializationPlaceholder: string;
  clinicNamePlaceholder: string;
  addressPlaceholder: string;
  phonePlaceholder: string;
  patientNamePlaceholder: string;
  agePlaceholder: string;
  genderPlaceholder: string;
  diagnosisPlaceholder: string;
  symptomsPlaceholder: string;
  bloodPressurePlaceholder: string;
  weightPlaceholder: string;
  temperaturePlaceholder: string;
  medicineNamePlaceholder: string;
  dosagePlaceholder: string;
  frequencyPlaceholder: string;
  durationPlaceholder: string;
  instructionsPlaceholder: string;
  notesPlaceholder: string;
  followUpDatePlaceholder: string;
  
  // Messages
  noMedications: string;
  missingInformation: string;
  fillRequiredFields: string;
  provideDiagnosisSymptoms: string;
  noMedicationsError: string;
  addAtLeastOneMedication: string;
  deleteMedicationTitle: string;
  deleteMedicationMessage: string;
  clearFormTitle: string;
  clearFormMessage: string;
  errorTitle: string;
  pdfErrorMessage: string;
  required: string;
  
  // PDF specific
  prescriptionTitle: string;
  date: string;
  nextVisit: string;
  rxSymbol: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Header
    headerTitle: 'Medical Prescription',
    headerSubtitle: 'Complete prescription form',
    
    // Sections
    doctorDetails: 'Doctor Details',
    patientInformation: 'Patient Information',
    clinicalAssessment: 'Clinical Assessment',
    medications: 'Medications',
    additionalNotes: 'Additional Notes',
    
    // Doctor Fields
    doctorName: 'Doctor Name',
    licenseNumber: 'License Number',
    specialization: 'Specialization',
    clinicName: 'Clinic/Hospital Name',
    address: 'Address',
    phone: 'Phone',
    
    // Patient Fields
    patientName: 'Patient Name',
    age: 'Age',
    gender: 'Gender',
    
    // Clinical Fields
    diagnosis: 'Diagnosis',
    symptoms: 'Symptoms',
    bloodPressure: 'Blood Pressure',
    weight: 'Weight',
    temperature: 'Temperature',
    
    // Medication Fields
    medicineName: 'Medicine Name',
    dosage: 'Dosage',
    frequency: 'Frequency',
    duration: 'Duration',
    instructions: 'Instructions',
    
    // Actions
    addMedication: 'Add Medication',
    generatePDF: 'Generate PDF',
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    
    // Additional
    notes: 'Notes',
    followUpDate: 'Follow-up Date',
    uploadTemplate: 'Upload Template Image',
    removeImage: 'Remove Image',
    
    // Placeholders
    doctorNamePlaceholder: 'Dr. John Smith',
    licenseNumberPlaceholder: 'MED123456',
    specializationPlaceholder: 'General Physician',
    clinicNamePlaceholder: 'City Medical Center',
    addressPlaceholder: '123 Main Street',
    phonePlaceholder: '+1 234 567 8900',
    patientNamePlaceholder: 'Jane Doe',
    agePlaceholder: '35',
    genderPlaceholder: 'Female',
    diagnosisPlaceholder: 'Upper respiratory tract infection',
    symptomsPlaceholder: 'Fever, cough, sore throat',
    bloodPressurePlaceholder: '120/80',
    weightPlaceholder: '70 kg',
    temperaturePlaceholder: '98.6°F',
    medicineNamePlaceholder: 'Paracetamol',
    dosagePlaceholder: '500mg',
    frequencyPlaceholder: 'Twice daily',
    durationPlaceholder: '5 days',
    instructionsPlaceholder: 'After meals',
    notesPlaceholder: 'Additional instructions or advice',
    followUpDatePlaceholder: 'e.g., After 7 days',
    
    // Messages
    noMedications: 'No medications added yet',
    missingInformation: 'Missing Information',
    fillRequiredFields: 'Please fill in all required fields',
    provideDiagnosisSymptoms: 'Please provide diagnosis and symptoms',
    noMedicationsError: 'No Medications',
    addAtLeastOneMedication: 'Please add at least one medication',
    deleteMedicationTitle: 'Delete Medication',
    deleteMedicationMessage: 'Are you sure you want to remove this medication?',
    clearFormTitle: 'Clear Form',
    clearFormMessage: 'This will clear all entered data. Continue?',
    errorTitle: 'Error',
    pdfErrorMessage: 'Failed to generate PDF. Please try again.',
    required: 'Required',
    
    // PDF specific
    prescriptionTitle: 'Medical Prescription',
    date: 'Date',
    nextVisit: 'Next Visit',
    rxSymbol: '℞',
  },
  
  es: {
    // Header
    headerTitle: 'Receta Médica',
    headerSubtitle: 'Completar formulario de receta',
    
    // Sections
    doctorDetails: 'Datos del Médico',
    patientInformation: 'Información del Paciente',
    clinicalAssessment: 'Evaluación Clínica',
    medications: 'Medicamentos',
    additionalNotes: 'Notas Adicionales',
    
    // Doctor Fields
    doctorName: 'Nombre del Médico',
    licenseNumber: 'Número de Licencia',
    specialization: 'Especialización',
    clinicName: 'Nombre de Clínica/Hospital',
    address: 'Dirección',
    phone: 'Teléfono',
    
    // Patient Fields
    patientName: 'Nombre del Paciente',
    age: 'Edad',
    gender: 'Género',
    
    // Clinical Fields
    diagnosis: 'Diagnóstico',
    symptoms: 'Síntomas',
    bloodPressure: 'Presión Arterial',
    weight: 'Peso',
    temperature: 'Temperatura',
    
    // Medication Fields
    medicineName: 'Nombre del Medicamento',
    dosage: 'Dosis',
    frequency: 'Frecuencia',
    duration: 'Duración',
    instructions: 'Instrucciones',
    
    // Actions
    addMedication: 'Agregar Medicamento',
    generatePDF: 'Generar PDF',
    save: 'Guardar',
    cancel: 'Cancelar',
    edit: 'Editar',
    delete: 'Eliminar',
    
    // Additional
    notes: 'Notas',
    followUpDate: 'Fecha de Seguimiento',
    uploadTemplate: 'Subir Imagen de Plantilla',
    removeImage: 'Eliminar Imagen',
    
    // Placeholders
    doctorNamePlaceholder: 'Dr. Juan Pérez',
    licenseNumberPlaceholder: 'MED123456',
    specializationPlaceholder: 'Médico General',
    clinicNamePlaceholder: 'Centro Médico Central',
    addressPlaceholder: 'Calle Principal 123',
    phonePlaceholder: '+34 123 456 789',
    patientNamePlaceholder: 'María García',
    agePlaceholder: '35',
    genderPlaceholder: 'Femenino',
    diagnosisPlaceholder: 'Infección del tracto respiratorio superior',
    symptomsPlaceholder: 'Fiebre, tos, dolor de garganta',
    bloodPressurePlaceholder: '120/80',
    weightPlaceholder: '70 kg',
    temperaturePlaceholder: '37°C',
    medicineNamePlaceholder: 'Paracetamol',
    dosagePlaceholder: '500mg',
    frequencyPlaceholder: 'Dos veces al día',
    durationPlaceholder: '5 días',
    instructionsPlaceholder: 'Después de las comidas',
    notesPlaceholder: 'Instrucciones o consejos adicionales',
    followUpDatePlaceholder: 'ej., Después de 7 días',
    
    // Messages
    noMedications: 'No se han agregado medicamentos',
    missingInformation: 'Información Faltante',
    fillRequiredFields: 'Por favor complete todos los campos requeridos',
    provideDiagnosisSymptoms: 'Por favor proporcione diagnóstico y síntomas',
    noMedicationsError: 'Sin Medicamentos',
    addAtLeastOneMedication: 'Por favor agregue al menos un medicamento',
    deleteMedicationTitle: 'Eliminar Medicamento',
    deleteMedicationMessage: '¿Está seguro de que desea eliminar este medicamento?',
    clearFormTitle: 'Limpiar Formulario',
    clearFormMessage: 'Esto eliminará todos los datos ingresados. ¿Continuar?',
    errorTitle: 'Error',
    pdfErrorMessage: 'Error al generar PDF. Por favor intente de nuevo.',
    required: 'Requerido',
    
    // PDF specific
    prescriptionTitle: 'Receta Médica',
    date: 'Fecha',
    nextVisit: 'Próxima Visita',
    rxSymbol: '℞',
  },
};
