import { MediaSemanal, UltimaLeitura, RegistroHistorico, Medicao } from "@/types";

const API_BASE_URL = "http://localhost:3001/sensor";

type ApiResponse<T> = {
  message: string;
  dados: T;
};

async function fetchAPI<T>(endpoint: string): Promise<ApiResponse<T>> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`);
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || "Erro na comunicação com a API");
  }
  return json;
}

export const fetchWeeklyAverage = () => fetchAPI<MediaSemanal[]>('/media-semana');
export const fetchLastReading = () => fetchAPI<UltimaLeitura>('/ultima-leitura');
export const fetchHistory = () => fetchAPI<RegistroHistorico[]>('/historico');
export const fetchGroupHistory = (id: string) => fetchAPI<Medicao[]>(`/grupo/${id}`);
