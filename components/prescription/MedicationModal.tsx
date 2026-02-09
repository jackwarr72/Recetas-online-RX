import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Medication } from '../../types/prescription';
import { MedicationTemplate } from '../../constants/medicationLibrary';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../hooks/useTheme';
import { Spacing, Typography, BorderRadius, Shadows } from '../../constants/theme';

interface MedicationModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (medication: Medication) => void;
  medication?: Medication;
  onOpenLibrary: () => void;
}

export const MedicationModal: React.FC<MedicationModalProps> = ({
  visible,
  onClose,
  onSave,
  medication,
  onOpenLibrary,
}) => {
  const { t, language } = useLanguage();
  const { colors } = useTheme();
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [duration, setDuration] = useState('');
  const [instructions, setInstructions] = useState('');

  useEffect(() => {
    if (medication) {
      setName(medication.name);
      setDosage(medication.dosage);
      setFrequency(medication.frequency);
      setDuration(medication.duration);
      setInstructions(medication.instructions || '');
    } else {
      resetForm();
    }
  }, [medication, visible]);

  const resetForm = () => {
    setName('');
    setDosage('');
    setFrequency('');
    setDuration('');
    setInstructions('');
  };

  const handleSave = () => {
    if (!name || !dosage || !frequency || !duration) return;

    const newMedication: Medication = {
      id: medication?.id || Date.now().toString(),
      name,
      dosage,
      frequency,
      duration,
      instructions,
    };

    onSave(newMedication);
    resetForm();
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <View style={styles.backdrop}>
          <View style={styles.modal}>
            <View style={[styles.header, { borderBottomColor: colors.border }]}>
              <Text style={[styles.title, { color: colors.text }]}>
                {medication ? (language === 'en' ? 'Edit Medication' : 'Editar Medicamento') : t.addMedication}
              </Text>
              <Pressable onPress={onClose} hitSlop={8}>
                <MaterialIcons name="close" size={24} color={colors.text} />
              </Pressable>
            </View>

            {!medication && (
              <Pressable
                onPress={onOpenLibrary}
                style={[styles.libraryButton, { backgroundColor: colors.primary }]}
              >
                <MaterialIcons name="local-pharmacy" size={20} color={colors.surface} />
                <Text style={[styles.libraryButtonText, { color: colors.surface }]}>
                  {language === 'en' ? 'Browse Medication Library' : 'Explorar Biblioteca de Medicamentos'}
                </Text>
                <MaterialIcons name="chevron-right" size={20} color={colors.surface} />
              </Pressable>
            )}

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
              <Input
                label={t.medicineName}
                value={name}
                onChangeText={setName}
                placeholder={t.medicineNamePlaceholder}
                required
              />
              <Input
                label={t.dosage}
                value={dosage}
                onChangeText={setDosage}
                placeholder={t.dosagePlaceholder}
                required
              />
              <Input
                label={t.frequency}
                value={frequency}
                onChangeText={setFrequency}
                placeholder={t.frequencyPlaceholder}
                required
              />
              <Input
                label={t.duration}
                value={duration}
                onChangeText={setDuration}
                placeholder={t.durationPlaceholder}
                required
              />
              <Input
                label={`${t.instructions} (${language === 'en' ? 'Optional' : 'Opcional'})`}
                value={instructions}
                onChangeText={setInstructions}
                placeholder={t.instructionsPlaceholder}
                multiline
                numberOfLines={2}
              />
            </ScrollView>

            <View style={styles.footer}>
              <Button
                title={t.cancel}
                onPress={onClose}
                variant="outline"
                size="medium"
                style={{ flex: 1 }}
              />
              <Button
                title={medication ? (language === 'en' ? 'Update' : 'Actualizar') : (language === 'en' ? 'Add' : 'Agregar')}
                onPress={handleSave}
                size="medium"
                style={{ flex: 1 }}
                disabled={!name || !dosage || !frequency || !duration}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modal: {
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    maxHeight: '85%',
    ...Shadows.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    borderBottomWidth: 1,
  },
  title: {
    ...Typography.h3,
  },
  libraryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    margin: Spacing.lg,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    ...Shadows.sm,
  },
  libraryButtonText: {
    ...Typography.label,
    fontSize: 15,
    flex: 1,
  },
  content: {
    padding: Spacing.lg,
  },
  footer: {
    flexDirection: 'row',
    gap: Spacing.md,
    padding: Spacing.lg,
    borderTopWidth: 1,
  },
});
