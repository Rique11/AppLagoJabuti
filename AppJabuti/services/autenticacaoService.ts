import * as SecureStore from "expo-secure-store";
import { add_back } from '../address'
import { Platform } from "react-native";
import { storeItem } from "./storage";


const API_URL = add_back; // troque pelo IP real

interface AuthResponse {
  idToken: string;
  userId: string;
  email: string; 
}

export const login = async (
  email: string, 
  password: string
): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/autenticacao/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Erro ao fazer login");
  }

  await storeItem("token", data.idToken);


  return data as AuthResponse;
};

export const register = async (
  email: string,
  password: string,
  cpf: string
): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/autenticacao/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, cpf }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Erro ao registrar");
  }

  
  // Armazenar os dados com segurança
  await storeItem("token", data.idToken);
  await storeItem("userId", data.userId);
  await storeItem("userEmail", data.email);

  return data as AuthResponse;
};
