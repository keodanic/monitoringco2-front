"use client";
import Link from "next/link";
import { useGroupHistoryData } from "@/hooks/useGroupHistoryData";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function GrupoHistorico() {
  const { medicoes, loading, error } = useGroupHistoryData();

  const formatarHora = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const dataFormatada = medicoes[0]
    ? new Date(medicoes[0].timestamp).toLocaleDateString("pt-BR")
    : "";

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto bg-gray-400/10 backdrop-blur-sm border border-gray-100/20 shadow-2xl rounded-3xl p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
            <h1 className="text-xl sm:text-2xl font-bold text-white text-center sm:text-left">
              {medicoes.length > 0
                ? `Medições em ${medicoes[0].location} - ${dataFormatada}`
                : "Histórico do Grupo"}
            </h1>
            <Link href="/history" className="bg-sky-500/80 rounded-full py-2 px-6 w-full sm:w-auto text-white font-semibold hover:bg-sky-600 transition-colors text-center">
              ← Voltar
            </Link>
          </div>

          {loading && <LoadingSpinner />}
          {error && <ErrorMessage message={error} />}

          {!loading && !error && (
            medicoes.length === 0 ? (
              <p className="text-gray-400 text-center py-4">
                Nenhuma medição encontrada para este grupo.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse text-white">
                  <thead>
                    <tr className="bg-white/5 text-left text-gray-300">
                      <th className="py-3 px-4 font-semibold rounded-tl-lg">🕒 Horário</th>
                      <th className="py-3 px-4 font-semibold">📍 Local</th>
                      <th className="py-3 px-4 font-semibold">🌫️ CO₂ (PPM)</th>
                      <th className="py-3 px-4 font-semibold rounded-tr-lg">💡 Qualidade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medicoes.map((medicao) => (
                      <tr key={medicao.id} className="border-b border-gray-800 hover:bg-white/5 transition">
                        <td className="py-3 px-4">{formatarHora(medicao.timestamp)}</td>
                        <td className="py-3 px-4 text-gray-200">{medicao.location}</td>
                        <td className="py-3 px-4 font-medium">{medicao.co2Level}</td>
                        <td className="py-3 px-4">{medicao.airQuality}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}