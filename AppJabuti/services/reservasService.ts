import { add_back } from "../address";
import { getItem } from "./storage";


const API_URL = add_back
interface ReservaPayload {
  dia: string;           // "01/07/2025"
  hora: string;          // "09:00 - 10:00"
  quadra: string;
  nomeAtividade: string;
  seuNome: string;
  telefone: string;
}


export const criarReserva = async (payload: ReservaPayload) => {
  const token = await getItem("token");

  if (!token) {
    throw new Error("Usuário não autenticado");
  }

  const response = await fetch(`${API_URL}/reservas/criaReserva`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const dataResponse = await response.json();

  if (!response.ok) {
    throw new Error(dataResponse.error || "Erro ao criar reserva");
  }

  return dataResponse;
};


export const listarReservas = async () => {
  const token = await getItem("token"); // busca o token salvo após login

  const response = await fetch(`${API_URL}/reservas/listaReservas`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Erro ao buscar reservas");
  }

  return data; // já é um array de reservas
};