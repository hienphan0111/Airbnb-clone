import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { TouchableOpacity, useColorScheme } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (e) {
      console.log('Failed to get token for key', key, e);
      throw e;
    }
  },
  async saveToken(key: string, token: string) {
    try {
      return SecureStore.setItemAsync(key, token);
    } catch (e) {
      console.log('Failed to save token for key', key, e);
      throw e;
    }
  },
};
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    mon: require('../assets/fonts/Montserrat-Regular.ttf'),
    'mon-sb': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'mon-b': require('../assets/fonts/Montserrat-Bold.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
    >
      <RootLayoutNav />
    </ClerkProvider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/(modals)/login');
    }
  }, [isLoaded]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen
          name='(modals)/login'
          options={{
            title: 'Login',
            headerTitleStyle: {
              fontFamily: 'mon-b',
            },
            presentation: 'modal',
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name='close-outline' size={24} />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen name='listing/[id]' options={{ headerTitle: '' }} />
        <Stack.Screen
          name='(modals)/booking'
          options={{
            title: 'Booking',
            headerTitleStyle: {
              fontFamily: 'mon-b',
            },
            animation: 'fade',
            presentation: 'modal',
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name='close-outline' size={24} />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
