import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import WebView from 'react-native-webview';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { PrescriptionData } from '../types/prescription';
import { generatePrescriptionHTML } from '../services/pdfGenerator';
import { useLanguage } from '../hooks/useLanguage';
import { useTheme } from '../hooks/useTheme';
import { useAlert } from '@/template';
import { Spacing, Typography, BorderRadius, Shadows } from '../constants/theme';

export default function PreviewScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { language, t } = useLanguage();
  const { colors } = useTheme();
  const { showAlert } = useAlert();
  const [loading, setLoading] = React.useState(false);

  const prescriptionData: PrescriptionData = params.data 
    ? JSON.parse(params.data as string) 
    : null;

  if (!prescriptionData) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.errorContainer}>
          <MaterialIcons name="error-outline" size={64} color={colors.error} />
          <Text style={[styles.errorText, { color: colors.text }]}>
            {language === 'en' ? 'No prescription data found' : 'No se encontraron datos de receta'}
          </Text>
          <Pressable
            onPress={() => router.back()}
            style={[styles.backButton, { backgroundColor: colors.primary }]}
          >
            <Text style={[styles.backButtonText, { color: colors.surface }]}>
              {language === 'en' ? 'Go Back' : 'Volver'}
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const htmlContent = generatePrescriptionHTML(prescriptionData, language);

  const handleGeneratePDF = async () => {
    setLoading(true);
    try {
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      
      const canShare = await Sharing.isAvailableAsync();
      if (canShare) {
        await Sharing.shareAsync(uri, {
          mimeType: 'application/pdf',
          dialogTitle: `Prescription_${prescriptionData.patientName}_${prescriptionData.date}.pdf`,
          UTI: 'com.adobe.pdf',
        });
      }
    } catch (error) {
      showAlert(t.errorTitle, t.pdfErrorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <StatusBar style={colors.text === '#F1F5F9' ? 'light' : 'dark'} />
      
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <MaterialIcons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          {language === 'en' ? 'Preview Prescription' : 'Vista Previa de Receta'}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <WebView
          source={{ html: htmlContent }}
          style={styles.webview}
          originWhitelist={['*']}
          scalesPageToFit={Platform.OS === 'android'}
        />
      </View>

      <View style={[styles.footer, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
        <Pressable
          onPress={() => router.back()}
          style={[styles.button, styles.outlineButton, { borderColor: colors.border }]}
        >
          <MaterialIcons name="edit" size={20} color={colors.text} />
          <Text style={[styles.buttonText, { color: colors.text }]}>
            {language === 'en' ? 'Edit' : 'Editar'}
          </Text>
        </Pressable>
        
        <Pressable
          onPress={handleGeneratePDF}
          disabled={loading}
          style={[styles.button, styles.primaryButton, { backgroundColor: colors.primary }]}
        >
          <MaterialIcons name="picture-as-pdf" size={20} color={colors.surface} />
          <Text style={[styles.buttonText, { color: colors.surface }]}>
            {loading ? (language === 'en' ? 'Generating...' : 'Generando...') : t.generatePDF}
          </Text>
        </Pressable>
      </View>
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
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
  },
  headerTitle: {
    ...Typography.h3,
  },
  content: {
    flex: 1,
    padding: Spacing.md,
  },
  webview: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.md,
    ...Shadows.md,
  },
  footer: {
    flexDirection: 'row',
    gap: Spacing.md,
    padding: Spacing.lg,
    borderTopWidth: 1,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  outlineButton: {
    borderWidth: 1,
  },
  primaryButton: {
    ...Shadows.sm,
  },
  buttonText: {
    ...Typography.label,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  errorText: {
    ...Typography.h3,
    marginTop: Spacing.lg,
    marginBottom: Spacing.xl,
    textAlign: 'center',
  },
  backButton: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  backButtonText: {
    ...Typography.label,
    fontSize: 16,
  },
});
