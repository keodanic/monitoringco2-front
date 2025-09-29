"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { fetchGroupHistory } from "@/services/api";
import { Medicao } from "@/types";

export function useGroupHistoryData() {
  const { id } = useParams();
  const [medicoes, setMedicoes] = useState<Medicao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const buscar = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchGroupHistory(id as string);
        setMedicoes(res.dados);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    buscar();
  }, [id]);

  return { medicoes, loading, error };
}