import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { Spacing, Typography, BorderRadius, Shadows } from '../../constants/theme';

interface SectionCardProps {
  title: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  children: React.ReactNode;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  title,
  icon,
  children,
  collapsible = false,
  defaultCollapsed = false,
}) => {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
      <Pressable
        onPress={() => collapsible && setCollapsed(!collapsed)}
        disabled={!collapsible}
      >
        <View style={[styles.header, { borderBottomColor: colors.borderLight }]}>
          <View style={styles.titleRow}>
            <MaterialIcons name={icon} size={20} color={colors.primary} />
            <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
          </View>
          {collapsible && (
            <MaterialIcons
              name={collapsed ? 'expand-more' : 'expand-less'}
              size={24}
              color={colors.textSecondary}
            />
          )}
        </View>
      </Pressable>
      {!collapsed && <View style={styles.content}>{children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    ...Shadows.sm,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomWidth: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  title: {
    ...Typography.h3,
  },
  content: {
    padding: Spacing.md,
  },
});
