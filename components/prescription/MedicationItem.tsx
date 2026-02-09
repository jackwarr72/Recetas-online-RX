import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Medication } from '../../types/prescription';
import { useTheme } from '../../hooks/useTheme';
import { Spacing, Typography, BorderRadius, Shadows } from '../../constants/theme';

interface MedicationItemProps {
  medication: Medication;
  onEdit: () => void;
  onDelete: () => void;
  index: number;
}

export const MedicationItem: React.FC<MedicationItemProps> = ({
  medication,
  onEdit,
  onDelete,
  index,
}) => {
  const { colors } = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
      <View style={[styles.indexBadge, { backgroundColor: colors.badge }]}>
        <Text style={[styles.indexText, { color: colors.primary }]}>{index + 1}</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={[styles.name, { color: colors.text }]}>{medication.name}</Text>
        <Text style={[styles.dosage, { color: colors.textSecondary }]}>{medication.dosage}</Text>
        <View style={styles.detailsRow}>
          <Text style={[styles.detail, { color: colors.textSecondary }]}>
            <MaterialIcons name="schedule" size={14} color={colors.textSecondary} />
            {' '}{medication.frequency}
          </Text>
          <Text style={[styles.detail, { color: colors.textSecondary }]}>
            <MaterialIcons name="calendar-today" size={14} color={colors.textSecondary} />
            {' '}{medication.duration}
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <Pressable
          onPress={onEdit}
          style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
          hitSlop={8}
        >
          <MaterialIcons name="edit" size={20} color={colors.primary} />
        </Pressable>
        <Pressable
          onPress={onDelete}
          style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
          hitSlop={8}
        >
          <MaterialIcons name="delete" size={20} color={colors.error} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    alignItems: 'flex-start',
    ...Shadows.sm,
    borderWidth: 1,
  },
  indexBadge: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  indexText: {
    ...Typography.label,
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
  name: {
    ...Typography.body,
    fontWeight: '600',
    marginBottom: 2,
  },
  dosage: {
    ...Typography.bodySmall,
    marginBottom: Spacing.xs,
  },
  detailsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  detail: {
    ...Typography.caption,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.xs,
    marginLeft: Spacing.sm,
  },
  iconButton: {
    padding: Spacing.xs,
  },
  pressed: {
    opacity: 0.5,
  },
});
