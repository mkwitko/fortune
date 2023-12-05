import * as SecureStore from 'expo-secure-store'
import { Platform } from 'react-native'

export async function setCache(key: string, value?: object | string) {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  if (!value) {
    if (Platform.OS === 'web') return localStorage.removeItem(key)
    return await SecureStore.deleteItemAsync(key)
  }

  if (Platform.OS === 'web') await localStorage.setItem(key, value)
  else await SecureStore.setItemAsync(key, value)
}

export async function getCache(key: string): Promise<string | null> {
  if (Platform.OS === 'web') {
    const result = await localStorage.getItem(key)
    if (result) {
      return JSON.parse(result)
    }
    return null
  } else {
    const result = await SecureStore.getItemAsync(key)
    if (result) {
      return result
    }
    return null
  }
}
