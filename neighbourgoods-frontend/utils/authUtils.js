import AsyncStorage from '@react-native-async-storage/async-storage';

export const checkAuthStatus = async () => {
  try {
    const userData = await AsyncStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error checking auth status:', error);
    return null;
  }
};
