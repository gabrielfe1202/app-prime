import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Stack } from 'expo-router';
import { View } from 'react-native';
import { AuthAndChildChecker } from '@/contexts/AuthChildChecker';
import { ChildProvider } from '@/contexts/ChildContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    'Futura': require('../assets/fonts/futur.otf'),
    'Futura-bold': require('../assets/fonts/FuturaBoldfont.otf'),
    'Futura-light': require('../assets/fonts/futuralightbt.otf'),
    'Futura-medium': require('../assets/fonts/futuramediumbt.otf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ChildProvider>
      <AuthAndChildChecker>
        <ThemeProvider value={DefaultTheme}>
          <Stack initialRouteName="(home)" screenOptions={{ headerShown: false }}>

          </Stack>
        </ThemeProvider>
      </AuthAndChildChecker >
    </ChildProvider>
  );
}
