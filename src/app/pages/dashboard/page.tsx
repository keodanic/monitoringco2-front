"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FaMapMarkerAlt, FaClock, FaWind } from "react-icons/fa";
import { BsCloudFog2 } from "react-icons/bs";
import logo from "../../../assets/img/CapivaraLab-SF.png";

const Dashboard = () => {
  const [data, setData] = useState<{ day: string; value: number }[]>([]);
  const [ultimaLeitura, setUltimaLeitura] = useState<{
    co2Level: number;
    airQuality: string;
    location: string;
    timestamp: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseHistorico = await fetch("http://localhost:3001/sensor/media-semana");
        const resultHistorico = await responseHistorico.json();

        if (!responseHistorico.ok) throw new Error(resultHistorico.message || "Erro ao buscar dados");

        const formattedData = resultHistorico.dados.map((dado: any) => ({
          day: dado.day,
          value: dado.value,
        }));

        setData(formattedData);

        const responseUltimaLeitura = await fetch("http://localhost:3001/sensor/ultima-leitura");
        const resultUltimaLeitura = await responseUltimaLeitura.json();

        if (!responseUltimaLeitura.ok) throw new Error(resultUltimaLeitura.message || "Erro ao buscar última leitura");

        setUltimaLeitura(resultUltimaLeitura.dados);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getAirQualityColor = (quality: string) => {
    switch (quality.toLowerCase()) {
      case "excelente":
        return "bg-blue-500";
      case "boa":
        return "bg-green-500";
      case "moderada":
        return "bg-yellow-500";
      case "ruim":
        return "bg-orange-500";
      case "muito ruim":
        return "bg-red-500";
      case "perigoso":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatarData = (dataString: string) => {
    const data = new Date(dataString);
    return data.toLocaleString();
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white h-16 border-black flex justify-start items-center p-5 sm:ml-10 sm:mt-5">
        <img src={logo.src} alt="Logo Capivara Lab" className="h-[80px]" />
      </header>

      {/* Main Content */}
      <main className="flex flex-col sm:flex-row items-center justify-between p-5 sm:p-10 gap-6 sm:gap-0">
        {/* Última Leitura Section */}
        <div className="flex flex-col gap-6 items-center w-full sm:w-auto">
          <section className="w-full sm:w-[400px] h-[275px] shadow-2xl rounded-3xl flex flex-col items-center justify-center text-xl p-6 bg-white">
            {loading ? (
              <p className="text-gray-500 animate-pulse">Carregando última leitura...</p>
            ) : error ? (
              <p className="text-red-500 font-semibold">{error}</p>
            ) : ultimaLeitura ? (
              <div className="grid gap-3 text-center">
                <div className="flex items-center">
                  <FaWind className="text-blue-600 mr-2" size={24} />
                  <p className="font-semibold">Nível de CO₂:</p>
                  <span className={`w-3 h-3 ${getAirQualityColor(ultimaLeitura.airQuality)} rounded-full ml-2`}></span>
                  <span className="font-bold ml-2">{ultimaLeitura.co2Level} PPM</span>
                </div>

                <div className="flex items-center">
                  <BsCloudFog2 className="text-blue-500 mr-2" size={24} />
                  <p className="font-semibold">Qualidade do Ar:</p>
                  <span
                    className={`${getAirQualityColor(ultimaLeitura.airQuality)} text-white px-3 py-1 rounded-md ml-2`}
                  >
                    {ultimaLeitura.airQuality}
                  </span>
                </div>

                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-red-500 mr-2" size={24} />
                  <p className="font-semibold">Localização:</p>
                  <span className="font-bold ml-2">{ultimaLeitura.location}</span>
                </div>

                <div className="flex items-center text-gray-500 text-base">
                  <FaClock className="mr-2" size={20} />
                  <p>Última Atualização:</p>
                  <span className="font-bold ml-2">{formatarData(ultimaLeitura.timestamp)}</span>
                </div>
                <p className="text-neutral-500 text-sm translate-y-4">As informações serão atualizadas a cada 10 minutos</p>
              </div>
            ) : (
              <p className="text-gray-500">Nenhuma leitura disponível</p>
            )}
          </section>
          <button 
            className="bg-blue-500 rounded-2xl p-3 w-36 text-white hover:bg-blue-600 transition-colors"
            onClick={() => window.location.reload()}
          >
            Atualizar Página
          </button>
        </div>

        {/* Gráfico Section */}
        <section className="w-full sm:w-auto flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-3">Histórico de CO₂ - Semanal</h2>

          {loading ? (
            <p className="text-gray-500 animate-pulse" aria-live="polite">Carregando...</p>
          ) : error ? (
            <p className="text-red-500 font-semibold" aria-live="polite">{error}</p>
          ) : (
            <div className="shadow-xl w-full sm:w-[400px] h-[400px] rounded-2xl p-4 bg-white overflow-hidden">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} role="img" aria-label="Gráfico semanal de CO₂">
                  <XAxis dataKey="day" stroke="#4B5563" tick={{ fill: "#4B5563" }} />
                  <YAxis domain={[0, 2500]} tickCount={6} stroke="#4B5563" tick={{ fill: "#4B5563" }} />
                  <Tooltip contentStyle={{ backgroundColor: "#FFF", borderRadius: "6px" }} />
                  <Bar dataKey="value" fill="#007bff" radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          <p className="mt-2 text-base text-gray-900">Últimos 7 dias</p>
        </section>
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
};

export default Dashboard;