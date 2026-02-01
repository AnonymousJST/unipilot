import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';

interface ConfigurationGuardProps {
  children: React.ReactNode;
}

/**
 * ConfigurationGuard Component
 * 
 * Prevents app crashes by checking for required environment variables.
 * If critical keys are missing, it renders a friendly setup UI.
 */
export const ConfigurationGuard: React.FC<ConfigurationGuardProps> = ({ children }) => {
  const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

  const isConfigured = !!supabaseUrl && !!supabaseAnonKey;

  if (!isConfigured) {
    return (
      <SafeAreaView className="flex-1 bg-white" style={{ flex: 1, backgroundColor: 'white' }}>
        <View className="flex-1 justify-center items-center px-8">
          <View className="bg-red-50 p-6 rounded-2xl border border-red-100 items-center">
            <Text className="text-2xl font-bold text-red-800 mb-2 text-center">
              Unipilot Configuration Required
            </Text>
            <Text className="text-red-600 text-center mb-6">
              Critical environment variables are missing. Please configure your Supabase keys to continue.
            </Text>
            
            <View className="bg-white p-4 rounded-xl border border-red-200 self-stretch">
              <Text className="text-xs font-mono text-gray-500 mb-1">Missing Keys:</Text>
              {!supabaseUrl && <Text className="text-sm font-mono text-red-500">• EXPO_PUBLIC_SUPABASE_URL</Text>}
              {!supabaseAnonKey && <Text className="text-sm font-mono text-red-500">• EXPO_PUBLIC_SUPABASE_ANON_KEY</Text>}
            </View>
            
            <Text className="mt-6 text-sm text-gray-400 text-center italic">
              Guardian of Stability: Preventing crashes since 2026
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return <>{children}</>;
};
