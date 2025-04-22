import React from "react";
import { FaClock } from "react-icons/fa";
import logo from "./../../assets/img/CapivaraLab-SF.png";
import Link from "next/link";

const dadosHistoricos = [
  { data: "17/04/2025", local: "Refeitório", media: 1800 },
  { data: "16/04/2025", local: "Refeitório", media: 1200 },
  { data: "15/04/2025", local: "Sala 48", media: 900 },
  { data: "13/04/2025", local: "Sala 48", media: 900 },
  { data: "13/04/2025", local: "Sala 48", media: 900 },
  { data: "13/04/2025", local: "Sala 48", media: 900 },
  { data: "13/04/2025", local: "Hall de Entrada", media: 900 },
  { data: "13/04/2025", local: "Hall de Entrada", media: 900 },
  { data: "13/04/2025", local: "Hall de Entrada", media: 900 },
  { data: "13/04/2025", local: "Hall de Entrada", media: 900 },
  { data: "13/04/2025", local: "Hall de Entrada", media: 900 },
  { data: "13/04/2025", local: "Refeitório", media: 900 },
  { data: "13/04/2025", local: "Refeitório", media: 900 },
  { data: "13/04/2025", local: "Refeitório", media: 900 },
  { data: "13/04/2025", local: "Sala 51", media: 900 },
  { data: "13/04/2025", local: "Sala 51", media: 900 },
];

export default function HistoricoCo2() {
  const formatarData = (dataString: string) => {
    const [day, month, year] = dataString.split('/');
    const data = new Date(`${year}-${month}-${day}`);
    return data.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-white h-16 border-black flex justify-start items-center p-5 sm:ml-10 sm:mt-5">
        <img src={logo.src} alt="Logo Capivara Lab" className="h-[80px]" />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center p-5 sm:p-10">
        <div className="w-full max-w-4xl">
          <h1 className="text-3xl font-semibold mb-6 ">
            Histórico de Mediçōes de CO₂
          </h1>

          <div className="bg-white rounded-2xl shadow-xl p-6 overflow-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center text-gray-500">
                <FaClock className="mr-2" size={20} />
                <span>Dados atualizados em tempo real</span>
              </div>
              <Link 
                href="/dashboard" 
                className="bg-blue-500 rounded-2xl px-4 py-2 text-white hover:bg-blue-600 transition-colors"
              >
                Voltar ao Dashboard
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="text-left text-blue-800 border-b border-gray-200">
                    <th className="py-3 px-4">📅 Data</th>
                    <th className="py-3 px-4">📍 Local</th>
                    <th className="py-3 px-4">📊 Média (PPM)</th>
                    <th className="py-3 px-4">📥 Baixar</th>
                  </tr>
                </thead>
                <tbody>
                  {dadosHistoricos.map((item, idx) => (
                    <tr key={idx} className="border-b border-gray-100 hover:bg-blue-50 transition">
                      <td className="py-3 px-4">{formatarData(item.data)}</td>
                      <td className="py-3 px-4 font-medium">{item.local}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-md ${
                          item.media > 1000 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                        } font-semibold`}>
                          {item.media}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <a
                          href="#"
                          className="text-blue-500 hover:text-blue-700 transition"
                        >
                          Download
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-blue-400">
        <div className="flex justify-center items-center p-1">
          <h1 className="text-center text-white">
            <span className="font-bold italic">© Capivara Solutions</span>
            <br />
            Todos os direitos reservados
          </h1>
        </div>
      </footer>
    </div>
  );
}