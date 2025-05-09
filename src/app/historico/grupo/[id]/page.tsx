"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

type Medicao = {
  id: number;
  timestamp: string;
  location: string;
  co2Level: number;
  airQuality: string;
};

export default function GrupoHistorico() {
  const { id } = useParams();
  const [medicoes, setMedicoes] = useState<Medicao[]>([]);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buscar = async () => {
      try {
        const res = await fetch(`http://localhost:3001/sensor/grupo/${id}`);
        const json = await res.json();

        if (!res.ok) throw new Error(json.message || "Erro ao buscar medições");

        setMedicoes(json.dados);
      } catch (err: any) {
        setErro(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) buscar();
  }, [id]);

  const formatarHora = (timestamp: string) => {
    const d = new Date(timestamp);
    return d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  };

  const dataFormatada = medicoes[0]
    ? new Date(medicoes[0].timestamp).toLocaleDateString("pt-BR")
    : "";

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">
            Medições em {medicoes[0]?.location} - {dataFormatada}
          </h1>
          <Link href="/history" className="text-blue-500 hover:underline">
            ← Voltar
          </Link>
        </div>

        {loading ? (
          <p className="text-gray-500 animate-pulse">Carregando...</p>
        ) : erro ? (
          <p className="text-red-500">{erro}</p>
        ) : medicoes.length === 0 ? (
          <p className="text-gray-600">Nenhuma medição encontrada para este grupo.</p>
        ) : (
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-blue-100 text-blue-800">
                <th className="py-2 px-4">🕒 Horário</th>
                <th className="py-2 px-4">📍 Local</th>
                <th className="py-2 px-4">🌫️ CO₂ (PPM)</th>
                <th className="py-2 px-4">💡 Qualidade</th>
              </tr>
            </thead>
            <tbody>
              {medicoes.map((m) => (
                <tr key={m.id} className="border-b hover:bg-blue-50 transition">
                  <td className="py-2 px-4">{formatarHora(m.timestamp)}</td>
                  <td className="py-2 px-4">{m.location}</td>
                  <td className="py-2 px-4">{m.co2Level}</td>
                  <td className="py-2 px-4">{m.airQuality}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
