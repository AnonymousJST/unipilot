import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { ArrowLeft, MapPin, Clock, Upload, Sparkles } from 'lucide-react-native';
import { useSchedule, ScheduleItem } from './useSchedule';
import { pickImage } from '../../services/imageService';
import { parseSyllabus } from '../../services/gemini';
import { supabase } from '../../services/supabase';
import { useAuth } from '../../contexts/AuthProvider';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export default function CalendarScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [isProcessing, setIsProcessing] = useState(false);
  const { schedule, loading, refetch } = useSchedule();

  // Filter schedule for selected day
  const daySchedule = schedule.filter(item => item.day === selectedDay);

  const handleUploadSyllabus = async () => {
    try {
        const base64 = await pickImage();
        if (!base64) return;

        setIsProcessing(true);
        Alert.alert("Analyzing", "Gemini is reading your syllabus... 🧠");

        // 1. Parse with Gemini
        const events = await parseSyllabus(base64);
        
        // 2. Insert into Supabase
        if (events && events.length > 0) {
            const { error } = await supabase.from('schedules').insert(
                events.map((e: any) => ({
                    ...e,
                    user_id: user?.id,
                }))
            );

            if (error) throw error;

            Alert.alert("Success", `Added ${events.length} classes to your calendar! 🎉`);
            refetch();
        } else {
            Alert.alert("No events found", "We couldn't find any clear schedule items.");
        }

    } catch (error) {
        Alert.alert("Error", "Failed to process syllabus.");
        console.error(error);
    } finally {
        setIsProcessing(false);
    }
  };

  const renderItem = ({ item, index }: { item: ScheduleItem; index: number }) => (
    <MotiView
      from={{ opacity: 0, scale: 0.9, translateY: 20 }}
      animate={{ opacity: 1, scale: 1, translateY: 0 }}
      transition={{ 
        type: 'spring', 
        damping: 15, 
        stiffness: 100, 
        delay: index * 100 
      }}
      className="bg-white p-5 rounded-3xl mb-4 border border-gray-100 shadow-sm"
    >
      <View className="flex-row justify-between items-start mb-2">
        <Text className="text-lg font-bold text-black">{item.subject}</Text>
        <View className="bg-blue-50 px-3 py-1 rounded-full">
            <Text className="text-blue-600 text-xs font-bold uppercase">{item.start_time.slice(0, 5)}</Text>
        </View>
      </View>
      
      <View className="flex-row items-center space-x-4 mt-2">
        <View className="flex-row items-center mr-4">
            <Clock size={14} color="#6b7280" />
            <Text className="text-gray-500 text-xs ml-1">
                {item.start_time.slice(0, 5)} - {item.end_time.slice(0, 5)}
            </Text>
        </View>
        
        {item.location && (
            <View className="flex-row items-center">
                <MapPin size={14} color="#6b7280" />
                <Text className="text-gray-500 text-xs ml-1">{item.location}</Text>
            </View>
        )}
      </View>
    </MotiView>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50 flex"  edges={['top']}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="px-6 py-4 flex-row items-center justify-between bg-white">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
            <ArrowLeft size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-black">My Schedule</Text>
        
        <TouchableOpacity onPress={handleUploadSyllabus} disabled={isProcessing}>
             {isProcessing ? (
                 <ActivityIndicator color="black" />
             ) : (
                <Sparkles size={24} color="black" />
             )}
        </TouchableOpacity>
      </View>

      {/* Day Selector */}
      <View className="bg-white pb-4">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, gap: 12 }}>
            {DAYS.map((day) => (
                <TouchableOpacity 
                    key={day}
                    onPress={() => setSelectedDay(day)}
                    className={`px-6 py-3 rounded-full border ${
                        selectedDay === day 
                        ? 'bg-black border-black' 
                        : 'bg-white border-gray-200'
                    }`}
                >
                    <Text className={`font-semibold ${selectedDay === day ? 'text-white' : 'text-gray-600'}`}>
                        {day}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
      </View>

      {/* Schedule List */}
      <View className="flex-1 px-6 pt-6">
        {loading ? (
             <Text className="text-center text-gray-400 mt-10">Loading schedule...</Text>
        ) : daySchedule.length > 0 ? (
            <FlatList
                data={daySchedule}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            />
        ) : (
            <MotiView 
                from={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 justify-center items-center opacity-50"
            >
                <View className="w-20 h-20 bg-gray-200 rounded-full items-center justify-center mb-4">
                    <Text className="text-3xl">☕</Text>
                </View>
                <Text className="text-gray-500 font-medium">No classes today.</Text>
                <Text className="text-gray-400 text-sm mt-1">Enjoy the free time!</Text>
            </MotiView>
        )}
      </View>
    </SafeAreaView>
  );
}
