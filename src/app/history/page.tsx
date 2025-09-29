"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaClock } from "react-icons/fa";
import { useHistoryData } from "../../hooks/useHistoryData";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ErrorMessage } from "@/components/ui/ErrorMessage";

export default function HistoricoCo2() {
  const router = useRouter();
  const { dadosHistoricos, loading, error } = useHistoryData();

  const getMediaColor = (media: number) => {
    if (media > 2000) return 'bg-red-500/20 text-red-400';
    if (media > 1000) return 'bg-orange-500/20 text-orange-400';
    if (media > 800) return 'bg-yellow-500/20 text-yellow-400';
    return 'bg-green-500/20 text-green-400';
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col items-center p-5 sm:p-10">
        <div className="w-full max-w-4xl">
          <h1 className="text-3xl font-bold mb-6 text-center text-white">Histórico de Medições</h1>
          
          <div className="bg-gray-400/10 backdrop-blur-sm border border-gray-100/20 shadow-2xl rounded-3xl p-6 overflow-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
              <div className="flex items-center text-gray-400">
                <FaClock className="mr-2" size={16} />
                <span>Dados agrupados por dia e local</span>
              </div>
              <Link href="/dashboard" className="bg-sky-500/80 rounded-full py-2 px-6 w-full sm:w-auto text-white font-semibold hover:bg-sky-600 transition-colors text-center">
                Voltar ao Dashboard
              </Link>
            </div>

            {loading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} />}
            
            {!loading && !error && (
              <table className="min-w-full table-auto border-collapse text-white">
                <thead>
                  <tr className="text-left text-gray-300 border-b border-gray-700">
                    <th className="py-3 px-4 font-semibold">📅 Data</th>
                    <th className="py-3 px-4 font-semibold">📍 Local</th>
                    <th className="py-3 px-4 font-semibold">📊 Média (PPM)</th>
                    <th className="py-3 px-4 font-semibold">📥 Download</th>
                  </tr>
                </thead>
                <tbody>
                  {dadosHistoricos.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-800 hover:bg-white/5 transition cursor-pointer"
                      onClick={() => router.push(`/historico/grupo/${item.id}`)}
                    >
                      <td className="py-3 px-4">{item.data}</td>
                      <td className="py-3 px-4 font-medium text-gray-200">{item.local}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${getMediaColor(item.media)}`}>
                          {item.media}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <a
                          href={`http://localhost:3001/sensor/grupo/${item.id}/pdf`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()} // Evita que o clique na linha seja acionado
                          className="text-sky-400 hover:text-sky-300 font-semibold transition"
                        >
                          PDF
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}