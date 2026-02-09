import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../hooks/useTheme';
import { Spacing, Typography, BorderRadius, Shadows } from '../../constants/theme';

interface ImageUploadCardProps {
  imageUri?: string;
  onImageSelected: (uri: string) => void;
  onRemove: () => void;
}

export const ImageUploadCard: React.FC<ImageUploadCardProps> = ({
  imageUri,
  onImageSelected,
  onRemove,
}) => {
  const { t, language } = useLanguage();
  const { colors } = useTheme();
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      onImageSelected(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {imageUri ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.image} />
          <Pressable
            onPress={onRemove}
            style={({ pressed }) => [
              styles.removeButton,
              { backgroundColor: colors.error },
              pressed && styles.pressed,
            ]}
          >
            <MaterialIcons name="close" size={18} color={colors.surface} />
          </Pressable>
        </View>
      ) : (
        <Pressable
          onPress={pickImage}
          style={({ pressed }) => [
            styles.uploadButton,
            {
              backgroundColor: colors.surface,
              borderColor: colors.primary,
            },
            pressed && styles.pressed,
          ]}
        >
          <MaterialIcons name="cloud-upload" size={40} color={colors.primary} />
          <Text style={[styles.uploadText, { color: colors.primary }]}>{t.uploadTemplate}</Text>
          <Text style={[styles.uploadHint, { color: colors.textSecondary }]}>
            {language === 'en' ? 'Logo or clinic letterhead' : 'Logo o membrete de clínica'}
          </Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  uploadButton: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: {
    ...Typography.body,
    fontWeight: '600',
    marginTop: Spacing.sm,
  },
  uploadHint: {
    ...Typography.caption,
    marginTop: Spacing.xs,
  },
  imageContainer: {
    position: 'relative',
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.md,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  removeButton: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    width: 32,
    height: 32,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.md,
  },
  pressed: {
    opacity: 0.7,
  },
});
