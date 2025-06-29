import { add_back } from "../address"; // URL base do backend
import { getItem } from "./storage";   // Função que retorna o token salvo

const API_URL = add_back;

export interface AvistamentoPayload {
  descricao: string;
  local: string;
  data: string;       // Ex: "29/06/2025"
  horario: string;    // Ex: "21:40"
  suspeito: string;  // Ex: "Homem com mochila preta"
  telefone: string;
  nomeRelator: string; 
  fotoUrl?: string;   // URL opcional de imagem
}

export const registrarAvistamento = async (payload: AvistamentoPayload) => {
  const token = await getItem("token");

  if (!token) {
    throw new Error("Usuário não autenticado");
  }

  const response = await fetch(`${API_URL}/avistamento/registrar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const dataResponse = await response.json();

  if (!response.ok) {
    throw new Error(dataResponse.error || "Erro ao registrar avistamento");
  }

  return dataResponse;
};