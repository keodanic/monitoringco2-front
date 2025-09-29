"use client";
import { useState, useEffect } from "react";
import { fetchLastReading, fetchWeeklyAverage } from "@/services/api";
import { UltimaLeitura, MediaSemanal } from "@/types";

export function useDashboardData() {
  const [ultimaLeitura, setUltimaLeitura] = useState<UltimaLeitura | null>(null);
  const [weeklyData, setWeeklyData] = useState<MediaSemanal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [ultimaLeituraRes, mediaSemanaRes] = await Promise.all([
        fetchLastReading(),
        fetchWeeklyAverage(),
      ]);
      setUltimaLeitura(ultimaLeituraRes.dados);
      setWeeklyData(mediaSemanaRes.dados);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { ultimaLeitura, weeklyData, loading, error, refresh: fetchData };
}