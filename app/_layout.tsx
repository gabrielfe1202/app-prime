import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import Constants from 'expo-constants';
//import { useColorScheme } from '@/hooks/useColorScheme';
import { Stack } from 'expo-router';
import { ChildChecker } from '@/contexts/ChildChecker';
import { ChildProvider } from '@/contexts/ChildContext';
import { UserProvider } from '@/contexts/UserContext';
import { AuthChecker } from '@/contexts/AuthChecker';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform, View } from 'react-native';
import { Loading } from '@/components/Loading';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
//SplashScreen.hideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter_900Black,
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
    return <Loading />;
  }

  return (
    <>     
     
      <View style={{
        height: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
        backgroundColor: '#F1F1F1',
      }} />
      <StatusBar
        translucent        
        style='dark'
      />

      <UserProvider>
        <AuthChecker>
          <ChildProvider>
            <ChildChecker>
              <ThemeProvider value={DefaultTheme}>
                <Stack screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="(Gallery)/Zips/index" options={{ animation: 'slide_from_bottom', presentation: 'transparentModal' }} />
                </Stack>
              </ThemeProvider>
            </ChildChecker >
          </ChildProvider>
        </AuthChecker>
      </UserProvider>
    </>
  );
}
