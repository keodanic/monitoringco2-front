"use client";

import React, { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa";
import logo from "./../../assets/img/CapivaraLab-SF.png";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Registro = {
  id: number;
  timestamp: string;
  location: string;
  co2Level: number;
};

type Agrupado = {
  id: number;
  data: string;
  local: string;
  media: number;
};

export default function HistoricoCo2() {
  const [dadosHistoricos, setDadosHistoricos] = useState<Agrupado[]>([]);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchHistorico = async () => {
      try {
        const response = await fetch("http://localhost:3001/sensor/historico");
        const result = await response.json();

        if (!response.ok) throw new Error(result.message || "Erro ao buscar histórico");

        const registros: Registro[] = result.dados;

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

        const formatados: Agrupado[] = Object.entries(agrupados).map(([chave, { total, count, id }]) => {
          const [data, local] = chave.split("_");
          return {
            id,
            data,
            local,
            media: parseFloat((total / count).toFixed(2)),
          };
        });

        setDadosHistoricos(formatados);
      } catch (err: any) {
        setErro(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistorico();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="bg-white h-16 border-black flex justify-start items-center p-5 sm:ml-10 sm:mt-5">
        <img src={logo.src} alt="Logo Capivara Lab" className="h-[80px]" />
      </header>

      <main className="flex-1 flex flex-col items-center p-5 sm:p-10">
        <div className="w-full max-w-4xl">
          <h1 className="text-3xl font-semibold mb-6">Histórico de Mediçōes de CO₂</h1>

          <div className="bg-white rounded-2xl shadow-xl p-6 overflow-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center text-gray-500">
                <FaClock className="mr-2" size={20} />
                <span>Dados atualizados em tempo real</span>
              </div>
              <Link href="/dashboard" className="bg-blue-500 rounded-2xl px-4 py-2 text-white hover:bg-blue-600 transition-colors">
                Voltar ao Dashboard
              </Link>
            </div>

            {loading ? (
              <p className="text-gray-500 animate-pulse">Carregando...</p>
            ) : erro ? (
              <p className="text-red-500">{erro}</p>
            ) : (
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="text-left text-blue-800 border-b border-gray-200">
                    <th className="py-3 px-4">📅 Data</th>
                    <th className="py-3 px-4">📍 Local</th>
                    <th className="py-3 px-4">📊 Média (PPM)</th>
                    <th className="py-3 px-4">📥 Download</th>

                  </tr>
                </thead>
                <tbody>
                  {dadosHistoricos.map((item, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-100 hover:bg-blue-50 transition cursor-pointer"
                      onClick={() => router.push(`/historico/grupo/${item.id}`)}
                    >
                      <td className="py-3 px-4">{item.data}</td>
                      <td className="py-3 px-4 font-medium">{item.local}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-md ${item.media > 1000 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                            } font-semibold`}
                        >
                          {item.media}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <a
                          href={`http://localhost:3001/sensor/grupo/${item.id}/pdf`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:text-blue-700 transition"
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

      <footer className="mt-auto bg-blue-400">
        <div className="flex justify-center items-center p-1">
          <h1 className="text-center text-white">
            <span className="font-bold italic">© Capivara Solutions</span><br />
            Todos os direitos reservados
          </h1>
        </div>
      </footer>
    </div>
  );
}
