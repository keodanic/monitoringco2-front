"use client";
import { useState, useEffect } from "react";
import { fetchHistory } from "@/services/api";
import { RegistroHistorico, AgrupadoHistorico } from "@/types";

export function useHistoryData() {
  const [dadosHistoricos, setDadosHistoricos] = useState<AgrupadoHistorico[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchHistory();
        const registros: RegistroHistorico[] = result.dados;
        const agrupados: Record<string, { total: number; count: number; id: number }> = {};

        registros.forEach(({ id, timestamp, location, co2Level }) => {
          const data = new Date(timestamp).toLocaleDateString("pt-BR");
          const chave = `${data}_${location}`;
          if (!agrupados[chave]) {
            agrupados[chave] = { total: 0, count: 0, id };
          }
          agrupados[chave].total += co2Level;
          agrupados[chave].count++;
        });

        const formatados: AgrupadoHistorico[] = Object.entries(agrupados).map(
          ([chave, { total, count, id }]) => {
            const [data, local] = chave.split("_");
            return { id, data, local, media: parseFloat((total / count).toFixed(2)) };
          }
        );
        setDadosHistoricos(formatados);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    processData();
  }, []);

  return { dadosHistoricos, loading, error };
}