import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { ConfigurationGuard } from '../src/components/ConfigurationGuard';
import { AuthProvider, useAuth } from '../src/contexts/AuthProvider';
import '../src/styles/global.css';

function InitialLayout() {
  const { session, isLoading } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!session && !inAuthGroup) {
      // If not logged in and not in auth group, redirect to login
      router.replace('/(auth)/login');
    } else if (session && inAuthGroup) {
      // If logged in and in auth group, redirect to home
      router.replace('/');
    }
  }, [session, isLoading, segments]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ConfigurationGuard>
      <AuthProvider>
        <InitialLayout />
      </AuthProvider>
    </ConfigurationGuard>
  );
}
