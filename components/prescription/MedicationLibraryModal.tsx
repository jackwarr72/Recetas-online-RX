import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { MedicationTemplate, medicationCategories } from '../../constants/medicationLibrary';
import { searchMedications, getAllCategories } from '../../services/medicationService';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../hooks/useTheme';
import { Spacing, Typography, BorderRadius, Shadows } from '../../constants/theme';

interface MedicationLibraryModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (medication: MedicationTemplate) => void;
}

export const MedicationLibraryModal: React.FC<MedicationLibraryModalProps> = ({
  visible,
  onClose,
  onSelect,
}) => {
  const { language } = useLanguage();
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = useMemo(() => getAllCategories(), []);
  const categoryLabels = medicationCategories[language];

  const filteredMedications = useMemo(() => {
    return searchMedications(searchQuery, selectedCategory);
  }, [searchQuery, selectedCategory]);

  const handleSelect = (medication: MedicationTemplate) => {
    onSelect(medication);
    setSearchQuery('');
    setSelectedCategory('all');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={[styles.backdrop, { backgroundColor: colors.backdrop }]}>
          <View style={[styles.modal, { backgroundColor: colors.background }]}>
            <View style={[styles.header, { borderBottomColor: colors.border }]}>
              <Text style={[styles.title, { color: colors.text }]}>
                {language === 'en' ? 'Medication Library' : 'Biblioteca de Medicamentos'}
              </Text>
              <Pressable onPress={onClose} hitSlop={8}>
                <MaterialIcons name="close" size={24} color={colors.text} />
              </Pressable>
            </View>

            <View style={styles.searchSection}>
              <View style={[styles.searchBar, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <MaterialIcons name="search" size={20} color={colors.textSecondary} />
                <TextInput
                  style={[styles.searchInput, { color: colors.text }]}
                  placeholder={language === 'en' ? 'Search medications...' : 'Buscar medicamentos...'}
                  placeholderTextColor={colors.textSecondary}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryScroll}
              >
                <Pressable
                  onPress={() => setSelectedCategory('all')}
                  style={[
                    styles.categoryChip,
                    {
                      backgroundColor: selectedCategory === 'all' ? colors.primary : colors.surface,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      { color: selectedCategory === 'all' ? colors.surface : colors.text },
                    ]}
                  >
                    {language === 'en' ? 'All' : 'Todos'}
                  </Text>
                </Pressable>
                {categories.map(cat => (
                  <Pressable
                    key={cat}
                    onPress={() => setSelectedCategory(cat)}
                    style={[
                      styles.categoryChip,
                      {
                        backgroundColor: selectedCategory === cat ? colors.primary : colors.surface,
                        borderColor: colors.border,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        { color: selectedCategory === cat ? colors.surface : colors.text },
                      ]}
                    >
                      {categoryLabels[cat as keyof typeof categoryLabels]}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
              {filteredMedications.length === 0 ? (
                <View style={styles.emptyState}>
                  <MaterialIcons name="local-pharmacy" size={48} color={colors.textSecondary} />
                  <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                    {language === 'en' ? 'No medications found' : 'No se encontraron medicamentos'}
                  </Text>
                </View>
              ) : (
                filteredMedications.map(med => (
                  <Pressable
                    key={med.id}
                    onPress={() => handleSelect(med)}
                    style={({ pressed }) => [
                      styles.medicationCard,
                      {
                        backgroundColor: colors.surface,
                        borderColor: colors.border,
                      },
                      pressed && styles.pressed,
                    ]}
                  >
                    <View style={styles.medicationHeader}>
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.medicationName, { color: colors.text }]}>
                          {med.name}
                        </Text>
                        <Text style={[styles.genericName, { color: colors.textSecondary }]}>
                          {med.genericName}
                        </Text>
                      </View>
                      <View style={[styles.categoryBadge, { backgroundColor: colors.badge }]}>
                        <Text style={[styles.categoryBadgeText, { color: colors.primary }]}>
                          {categoryLabels[med.category as keyof typeof categoryLabels]}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.dosageInfo}>
                      <Text style={[styles.dosageLabel, { color: colors.textSecondary }]}>
                        {language === 'en' ? 'Common dosages:' : 'Dosis comunes:'}
                      </Text>
                      <Text style={[styles.dosageText, { color: colors.text }]}>
                        {med.commonDosages.join(', ')}
                      </Text>
                    </View>
                  </Pressable>
                ))
              )}
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modal: {
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    maxHeight: '90%',
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
  searchSection: {
    padding: Spacing.lg,
    paddingBottom: 0,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    marginBottom: Spacing.md,
  },
  searchInput: {
    flex: 1,
    marginLeft: Spacing.sm,
    ...Typography.body,
  },
  categoryScroll: {
    paddingBottom: Spacing.md,
    gap: Spacing.sm,
  },
  categoryChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  categoryText: {
    ...Typography.label,
  },
  content: {
    padding: Spacing.lg,
  },
  medicationCard: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  medicationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  medicationName: {
    ...Typography.h3,
    fontSize: 16,
  },
  genericName: {
    ...Typography.bodySmall,
    marginTop: 2,
  },
  categoryBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  categoryBadgeText: {
    ...Typography.caption,
    fontWeight: '600',
  },
  dosageInfo: {
    marginTop: Spacing.xs,
  },
  dosageLabel: {
    ...Typography.caption,
  },
  dosageText: {
    ...Typography.bodySmall,
    marginTop: 2,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
  },
  emptyText: {
    ...Typography.body,
    marginTop: Spacing.md,
  },
  pressed: {
    opacity: 0.7,
  },
});
