import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeMatch = async (matchId, match = {}) => {
  try {
    await AsyncStorage.setItem(matchId, JSON.stringify(match));
  } catch (error) {
    // Error saving data
  }
};

export const retrieveMatch = async (matchId) => {
  try {
    const value = await AsyncStorage.getItem(matchId);
    if (value !== null) {
      // We have data!!
      return JSON.parse(value);
    }
  } catch (error) {
    // Error retrieving data
  }
};

export const mergeMatch = async (matchId, match) => {
  try {
    const value = await AsyncStorage.mergeItem(matchId, JSON.stringify(match));
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (error) {
    // Error retrieving data
  }
};

export const deleteMatch = async (matchId) => {
  try {
    await AsyncStorage.removeItem(matchId);
  } catch (error) {
    // Error retrieving data
  }
};

export const allMatches = async () => {
  try {
    const matches = await AsyncStorage.multiGet(
      await AsyncStorage.getAllKeys(),
    );
    if (matches !== null) {
      return matches.map((m) => JSON.parse(m[1]));
    }
  } catch (error) {
    // Error retrieving data
  }
};

export const allMatchesCount = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    if (keys !== null) {
      return keys.length;
    }
  } catch (error) {
    console.error(error);
    // Error retrieving data
  }
};
