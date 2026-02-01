import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useAuth } from '../src/contexts/AuthProvider';
import { supabase } from '../src/services/supabase';

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <SafeAreaView className="flex-1 bg-white" style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar style="dark" />
      
      <View className="flex-1 px-6 pt-6">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-8">
            <View>
                <Text className="text-sm text-gray-500 font-medium">Welcome back,</Text>
                <Text className="text-xl font-bold text-black">{user?.email}</Text>
            </View>
            <TouchableOpacity 
                onPress={handleSignOut}
                className="bg-gray-100 px-4 py-2 rounded-full"
            >
                <Text className="text-xs font-semibold text-black">Sign Out</Text>
            </TouchableOpacity>
        </View>

        <Text className="text-2xl font-bold text-black mb-6">Your Pilot</Text>

        <ScrollView contentContainerStyle={{ gap: 16 }}>
            {/* Feature Card 1: Smart Calendar */}
            <View className="bg-academic-blue p-6 rounded-3xl shadow-sm min-h-[160px] justify-between">
                <View>
                    <Text className="text-white text-lg font-bold mb-1">Smart Calendar</Text>
                    <Text className="text-blue-200 text-sm">Next Class: No classes today</Text>
                </View>
                <TouchableOpacity 
                    onPress={() => router.push('/calendar')}
                    className="bg-white/20 self-start px-4 py-2 rounded-xl"
                >
                    <Text className="text-white font-semibold text-xs">View Schedule</Text>
                </TouchableOpacity>
            </View>

            {/* Feature Card 2: AI Notes */}
             <View className="bg-gray-50 p-6 rounded-3xl border border-gray-100 min-h-[160px] justify-between">
                <View>
                    <Text className="text-black text-lg font-bold mb-1">Lesson Notes</Text>
                    <Text className="text-gray-500 text-sm">Ready to listen and summarize.</Text>
                </View>
                <TouchableOpacity className="bg-black self-start px-4 py-2 rounded-xl">
                    <Text className="text-white font-semibold text-xs">Start Recording</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
