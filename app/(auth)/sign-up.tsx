import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';
import { supabase } from '../../src/services/supabase';
import { StatusBar } from 'expo-status-bar';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      Alert.alert("Registration Failed", error.message);
    } else {
        // For MVP, we might auto-login or ask for email confirmation. 
        // Supabase default is often confirmation email.
        Alert.alert("Success", "Please check your email to confirm your account.");
    }
    setLoading(false);
  }

  return (
    <SafeAreaView className='flex-1 bg-white'>
        <StatusBar style="dark" />
      <View className='flex-1 justify-center px-8'>
        
        {/* Header */}
        <View className='mb-12'>
          <Text className='text-4xl font-bold text-black mb-2 tracking-tight'>Create Account</Text>
          <Text className='text-gray-500 text-lg'>Start your journey with Unipilot.</Text>
        </View>

        {/* Form */}
        <View className='gap-y-4'>
          <View>
            <Text className='text-sm text-gray-500 font-medium mb-1 ml-1'>Email</Text>
            <TextInput
              className='bg-gray-50 border border-gray-200 rounded-2xl p-4 text-black font-medium focus:border-black'
              placeholder="alex@university.edu"
              placeholderTextColor="#9ca3af"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View>
            <Text className='text-sm text-gray-500 font-medium mb-1 ml-1'>Password</Text>
            <TextInput
              className='bg-gray-50 border border-gray-200 rounded-2xl p-4 text-black font-medium focus:border-black'
              placeholder="Pick a strong password"
              placeholderTextColor="#9ca3af"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity 
            className={`bg-black py-5 rounded-2xl items-center mt-4 shadow-md ${loading ? 'opacity-70' : ''}`}
            onPress={signUpWithEmail}
            disabled={loading}
          >
            {loading ? (
               <ActivityIndicator color="white" />
            ) : (
                <Text className='text-white text-lg font-semibold'>Sign Up</Text>
            )}
           
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View className='flex-row justify-center mt-8'>
          <Text className='text-gray-500'>Already have an account? </Text>
          <Link href="/(auth)/login" asChild>
            <TouchableOpacity>
              <Text className='text-black font-bold'>Sign In</Text>
            </TouchableOpacity>
          </Link>
        </View>

      </View>
    </SafeAreaView>
  );
}
