export type UltimaLeitura = {
  id: number;
  co2Level: number;
  airQuality: string;
  location: string;
  timestamp: string;
};

export type MediaSemanal = {
  day: string;
  value: number;
};

export type RegistroHistorico = {
  id: number;
  timestamp: string;
  location: string;
  co2Level: number;
};

export type AgrupadoHistorico = {
  id: number;
  data: string;
  local: string;
  media: number;
};

export type Medicao = {
  id: number;
  timestamp: string;
  location: string;
  co2Level: number;
  airQuality: string;
};