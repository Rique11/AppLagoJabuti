// services/storage.ts ARQUIVO PARA DEBUG DE DESENVOLVIMENTO
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

export const storeItem = async (key: string, value: string) => {
  if (Platform.OS === "web") {
    localStorage.setItem(key, value);
  } else {
    await SecureStore.setItemAsync(key, value);
  }
};

export const getItem = async (key: string): Promise<string | null> => {
  if (Platform.OS === "web") {
    return localStorage.getItem(key);
  } else {
    return await SecureStore.getItemAsync(key);
  }
};
