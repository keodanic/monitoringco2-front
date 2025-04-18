import React from "react";

const dadosHistoricos = [
  { data: "17/04/2025", local: "Sala do Naelly", media: 1800 },
  { data: "16/04/2025", local: "Sala do Naelly", media: 1200 },
  { data: "15/04/2025", local: "Sala do Naelly", media: 900 },
  { data: "13/04/2025", local: "Sala do Mario", media: 900 },
  { data: "13/04/2025", local: "Sala do Mario", media: 900 },
  { data: "13/04/2025", local: "Sala do Mario", media: 900 },
  { data: "13/04/2025", local: "Sala do Mario", media: 900 },
  { data: "13/04/2025", local: "Sala do Mario", media: 900 },
  { data: "13/04/2025", local: "Sala do Mario", media: 900 },
  { data: "13/04/2025", local: "Sala do Mario", media: 900 },
  { data: "13/04/2025", local: "Sala do Mario", media: 900 },
  { data: "13/04/2025", local: "Sala do Mario", media: 900 },
  { data: "13/04/2025", local: "Sala do Mario", media: 900 },
  { data: "13/04/2025", local: "Sala do Mario", media: 900 },
  { data: "13/04/2025", local: "Sala do Mario", media: 900 },
  { data: "13/04/2025", local: "Sala do Mario", media: 900 },

];

export default function HistoricoCo2() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">
          Histórico de Mediçōes de CO₂
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-6 overflow-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="text-left text-blue-800 border-b border-gray-200">
                <th className="py-3 px-4">📅 Data</th>
                <th className="py-3 px-4">📍 Local</th>
                <th className="py-3 px-4">📊 Média (PPM)</th>
              </tr>
            </thead>
            <tbody>
              {dadosHistoricos.map((item, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-blue-50 transition">
                  <td className="py-3 px-4">{item.data}</td>
                  <td className="py-3 px-4 font-medium">{item.local}</td>
                  <td className="py-3 px-4 text-red-600 font-semibold">{item.media}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-500 text-center mt-6">
          Dados atualizados diariamente | © Capivara Solutions
        </p>
      </div>
    </div>
  );
}
