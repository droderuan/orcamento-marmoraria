import AsyncStorage from '@react-native-community/async-storage';

export async function saveDataIntoStorage<T>(
  key: string,
  data: T,
): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
}

export async function getDataFromStorage<T>(key: string): Promise<T | null> {
  try {
    const recoveryData = await AsyncStorage.getItem(key);
    if (!recoveryData) {
      return null;
    }
    const parsedData = JSON.parse(recoveryData) as T;
    return parsedData;
  } catch (err) {
    console.log(err);
    return null;
  }
}
