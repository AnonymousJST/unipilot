import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

export const pickImage = async (): Promise<string | null> => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
  if (status !== 'granted') {
    Alert.alert('Permission Denied', 'We need access to your photos to upload your syllabus.');
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsEditing: true,
    quality: 1,
    base64: true, // Crucial for Gemini
  });

  if (!result.canceled && result.assets[0].base64) {
    return result.assets[0].base64;
  }

  return null;
};
