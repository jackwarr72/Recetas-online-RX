import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AlertProvider } from '@/template';
import { LanguageProvider } from '../contexts/LanguageContext';
import { ThemeProvider } from '../contexts/ThemeContext';

export default function RootLayout() {
  return (
    <AlertProvider>
      <ThemeProvider>
        <LanguageProvider>
          <SafeAreaProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="preview" />
            </Stack>
          </SafeAreaProvider>
        </LanguageProvider>
      </ThemeProvider>
    </AlertProvider>
  );
}
