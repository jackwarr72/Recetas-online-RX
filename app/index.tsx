import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { PrescriptionData, Medication } from '../types/prescription';
import { MedicationTemplate } from '../constants/medicationLibrary';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { SectionCard } from '../components/prescription/SectionCard';
import { MedicationItem } from '../components/prescription/MedicationItem';
import { MedicationModal } from '../components/prescription/MedicationModal';
import { MedicationLibraryModal } from '../components/prescription/MedicationLibraryModal';
import { ImageUploadCard } from '../components/prescription/ImageUploadCard';
import { useAlert } from '@/template';
import { useLanguage } from '../hooks/useLanguage';
import { useTheme } from '../hooks/useTheme';
import { Spacing, Typography, BorderRadius } from '../constants/theme';

export default function PrescriptionApp() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { showAlert } = useAlert();
  const { language, setLanguage, t } = useLanguage();
  const { colors, mode, toggleTheme } = useTheme();
  
  // Doctor Details
  const [doctorName, setDoctorName] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [clinicName, setClinicName] = useState('');
  const [clinicAddress, setClinicAddress] = useState('');
  const [clinicPhone, setClinicPhone] = useState('');
  
  // Patient Details
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientAddress, setPatientAddress] = useState('');
  
  // Clinical Details
  const [diagnosis, setDiagnosis] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [weight, setWeight] = useState('');
  const [temperature, setTemperature] = useState('');
  
  // Medications
  const [medications, setMedications] = useState<Medication[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [libraryModalVisible, setLibraryModalVisible] = useState(false);
  const [editingMedication, setEditingMedication] = useState<Medication | undefined>();
  
  // Additional
  const [notes, setNotes] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');
  const [templateImageUri, setTemplateImageUri] = useState<string>();



  const handleAddMedication = () => {
    setEditingMedication(undefined);
    setModalVisible(true);
  };

  const handleEditMedication = (medication: Medication) => {
    setEditingMedication(medication);
    setModalVisible(true);
  };

  const handleSaveMedication = (medication: Medication) => {
    if (editingMedication) {
      setMedications(medications.map(m => (m.id === medication.id ? medication : m)));
    } else {
      setMedications([...medications, medication]);
    }
  };

  const handleDeleteMedication = (id: string) => {
    showAlert(t.deleteMedicationTitle, t.deleteMedicationMessage, [
      { text: t.cancel, style: 'cancel' },
      {
        text: t.delete,
        style: 'destructive',
        onPress: () => setMedications(medications.filter(m => m.id !== id)),
      },
    ]);
  };

  const validateForm = (): boolean => {
    if (!doctorName || !licenseNumber || !clinicName || !patientName || !patientAge) {
      showAlert(t.missingInformation, t.fillRequiredFields);
      return false;
    }
    if (!diagnosis || !symptoms) {
      showAlert(t.missingInformation, t.provideDiagnosisSymptoms);
      return false;
    }
    if (medications.length === 0) {
      showAlert(t.noMedicationsError, t.addAtLeastOneMedication);
      return false;
    }
    return true;
  };

  const handlePreviewPDF = () => {
    if (!validateForm()) return;

    const prescriptionData: PrescriptionData = {
      doctorName,
      licenseNumber,
      specialization,
      clinicName,
      clinicAddress,
      clinicPhone,
      patientName,
      patientAge,
      patientGender,
      patientPhone,
      patientAddress,
      diagnosis,
      symptoms,
      bloodPressure,
      weight,
      temperature,
      medications,
      notes,
      followUpDate,
      templateImageUri,
      date: new Date().toLocaleDateString(),
    };

    router.push({
      pathname: '/preview',
      params: { data: JSON.stringify(prescriptionData) },
    });
  };

  const handleSelectFromLibrary = (template: MedicationTemplate) => {
    setLibraryModalVisible(false);
    // Pre-fill the medication modal with library data
    setTimeout(() => {
      setEditingMedication({
        id: Date.now().toString(),
        name: template.name,
        dosage: template.commonDosages[0] || '',
        frequency: template.commonFrequencies[0] || '',
        duration: template.commonDurations[0] || '',
        instructions: template.commonInstructions[0] || '',
      });
      setModalVisible(true);
    }, 300);
  };

  const handleClearAll = () => {
    showAlert(t.clearFormTitle, t.clearFormMessage, [
      { text: t.cancel, style: 'cancel' },
      {
        text: t.clearFormTitle,
        style: 'destructive',
        onPress: () => {
          setDoctorName('');
          setLicenseNumber('');
          setSpecialization('');
          setClinicName('');
          setClinicAddress('');
          setClinicPhone('');
          setPatientName('');
          setPatientAge('');
          setPatientGender('');
          setPatientPhone('');
          setPatientAddress('');
          setDiagnosis('');
          setSymptoms('');
          setBloodPressure('');
          setWeight('');
          setTemperature('');
          setMedications([]);
          setNotes('');
          setFollowUpDate('');
          setTemplateImageUri(undefined);
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
      
      <View style={[styles.header, { paddingTop: Math.max(insets.top, Spacing.md), backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <View>
          <Text style={[styles.headerTitle, { color: colors.text }]}>{t.headerTitle}</Text>
          <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>{t.headerSubtitle}</Text>
        </View>
        <View style={styles.headerActions}>
          <Pressable 
            onPress={toggleTheme}
            style={[styles.iconButton, { backgroundColor: colors.surfaceVariant }]}
            hitSlop={8}
          >
            <MaterialIcons name={mode === 'dark' ? 'light-mode' : 'dark-mode'} size={20} color={colors.text} />
          </Pressable>
          <Pressable 
            onPress={() => setLanguage(language === 'en' ? 'es' : 'en')}
            style={[styles.languageButton, { backgroundColor: colors.primary }]}
            hitSlop={8}
          >
            <Text style={[styles.languageText, { color: colors.surface }]}>{language === 'en' ? 'ES' : 'EN'}</Text>
          </Pressable>
          <Pressable onPress={handleClearAll} hitSlop={8}>
            <MaterialIcons name="refresh" size={24} color={colors.primary} />
          </Pressable>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <ImageUploadCard
            imageUri={templateImageUri}
            onImageSelected={setTemplateImageUri}
            onRemove={() => setTemplateImageUri(undefined)}
          />

          <SectionCard title={t.doctorDetails} icon="person">
            <Input
              label={t.doctorName}
              value={doctorName}
              onChangeText={setDoctorName}
              placeholder={t.doctorNamePlaceholder}
              required
            />
            <Input
              label={t.licenseNumber}
              value={licenseNumber}
              onChangeText={setLicenseNumber}
              placeholder={t.licenseNumberPlaceholder}
              required
            />
            <Input
              label={t.specialization}
              value={specialization}
              onChangeText={setSpecialization}
              placeholder={t.specializationPlaceholder}
            />
            <Input
              label={t.clinicName}
              value={clinicName}
              onChangeText={setClinicName}
              placeholder={t.clinicNamePlaceholder}
              required
            />
            <Input
              label={t.address}
              value={clinicAddress}
              onChangeText={setClinicAddress}
              placeholder={t.addressPlaceholder}
              multiline
            />
            <Input
              label={t.phone}
              value={clinicPhone}
              onChangeText={setClinicPhone}
              placeholder={t.phonePlaceholder}
              keyboardType="phone-pad"
            />
          </SectionCard>

          <SectionCard title={t.patientInformation} icon="person-outline">
            <Input
              label={t.patientName}
              value={patientName}
              onChangeText={setPatientName}
              placeholder={t.patientNamePlaceholder}
              required
            />
            <View style={styles.row}>
              <Input
                label={t.age}
                value={patientAge}
                onChangeText={setPatientAge}
                placeholder={t.agePlaceholder}
                keyboardType="numeric"
                required
                style={{ flex: 1 }}
              />
              <Input
                label={t.gender}
                value={patientGender}
                onChangeText={setPatientGender}
                placeholder={t.genderPlaceholder}
                style={{ flex: 1 }}
              />
            </View>
            <Input
              label={t.phone}
              value={patientPhone}
              onChangeText={setPatientPhone}
              placeholder={t.phonePlaceholder}
              keyboardType="phone-pad"
            />
            <Input
              label={t.address}
              value={patientAddress}
              onChangeText={setPatientAddress}
              placeholder="456 Oak Avenue"
              multiline
            />
          </SectionCard>

          <SectionCard title={t.clinicalAssessment} icon="local-hospital">
            <Input
              label={t.diagnosis}
              value={diagnosis}
              onChangeText={setDiagnosis}
              placeholder={t.diagnosisPlaceholder}
              required
            />
            <Input
              label={t.symptoms}
              value={symptoms}
              onChangeText={setSymptoms}
              placeholder={t.symptomsPlaceholder}
              multiline
              required
            />
            <View style={styles.row}>
              <Input
                label={t.bloodPressure}
                value={bloodPressure}
                onChangeText={setBloodPressure}
                placeholder={t.bloodPressurePlaceholder}
                style={{ flex: 1 }}
              />
              <Input
                label={t.weight}
                value={weight}
                onChangeText={setWeight}
                placeholder={t.weightPlaceholder}
                style={{ flex: 1 }}
              />
            </View>
            <Input
              label={t.temperature}
              value={temperature}
              onChangeText={setTemperature}
              placeholder={t.temperaturePlaceholder}
            />
          </SectionCard>

          <SectionCard title={t.medications} icon="medication">
            {medications.length === 0 ? (
              <Text style={styles.emptyText}>{t.noMedications}</Text>
            ) : (
              medications.map((med, index) => (
                <MedicationItem
                  key={med.id}
                  medication={med}
                  index={index}
                  onEdit={() => handleEditMedication(med)}
                  onDelete={() => handleDeleteMedication(med.id)}
                />
              ))
            )}
            <Button
              title={t.addMedication}
              onPress={handleAddMedication}
              variant="outline"
              size="medium"
            />
          </SectionCard>

          <SectionCard title={t.additionalNotes} icon="note" collapsible defaultCollapsed>
            <Input
              label={t.notes}
              value={notes}
              onChangeText={setNotes}
              placeholder={t.notesPlaceholder}
              multiline
              numberOfLines={3}
            />
            <Input
              label={t.followUpDate}
              value={followUpDate}
              onChangeText={setFollowUpDate}
              placeholder={t.followUpDatePlaceholder}
            />
          </SectionCard>

          <View style={styles.actions}>
            <Button
              title={language === 'en' ? 'Preview & Generate PDF' : 'Vista Previa y Generar PDF'}
              onPress={handlePreviewPDF}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <MedicationModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setEditingMedication(undefined);
        }}
        onSave={handleSaveMedication}
        medication={editingMedication}
        onOpenLibrary={() => {
          setModalVisible(false);
          setLibraryModalVisible(true);
        }}
      />

      <MedicationLibraryModal
        visible={libraryModalVisible}
        onClose={() => setLibraryModalVisible(false)}
        onSelect={handleSelectFromLibrary}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
  },
  headerTitle: {
    ...Typography.h1,
  },
  headerSubtitle: {
    ...Typography.bodySmall,
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  emptyText: {
    ...Typography.bodySmall,
    textAlign: 'center',
    paddingVertical: Spacing.lg,
  },
  actions: {
    marginTop: Spacing.md,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  iconButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: BorderRadius.sm,
  },
  languageButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BorderRadius.sm,
  },
  languageText: {
    ...Typography.label,
    fontWeight: '700',
  },
});
