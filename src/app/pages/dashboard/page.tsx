"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
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
        const responseHistorico = await fetch("http://localhost:3001/sensor/media-diaria");
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
      case "boa":
        return "bg-green-500";
      case "moderada":
        return "bg-yellow-500";
      case "ruim":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatarData = (dataString: string) => {
    const data = new Date(dataString);
    return data.toLocaleString();
  };

  return (
    <div>
      {/* Cabeçalho com logo */}
      <div className="bg-white h-16 border-black flex justify-start ml-10 mt-5 items-center">
        <img src={logo.src} alt="Logo Capivara Lab" className="h-[80px]" />
      </div>

      {/* Conteúdo principal */}
      <div className="flex items-center justify-between p-10">
        {/* Seção de Nível de CO₂ e Qualidade do Ar */}
        <div className="w-[400px] h-[300px] shadow-2xl ml-10 rounded-3xl flex flex-col items-center justify-center text-xl p-6 bg-white">
          {ultimaLeitura ? (
            <>
              <div className="flex items-center mb-3">
                <h1 className="mr-2">Nível de CO₂:</h1>
                <span className={`w-3 h-3 ${getAirQualityColor(ultimaLeitura.airQuality)} rounded-full mr-2`}></span>
                <span className="font-bold">{ultimaLeitura.co2Level} PPM</span>
              </div>
              <div className="flex items-center">
                <h1 className="mr-2">Qualidade do Ar:</h1>
                <span className={`${getAirQualityColor(ultimaLeitura.airQuality)} text-white px-3 py-1 rounded-md`}>
                  {ultimaLeitura.airQuality}
                </span>
              </div>
              <div className="mt-3 flex">
                <h1 className="mr-2">Localização:</h1>
                <span className="font-bold">{ultimaLeitura.location}</span>
              </div>
              <div className="mt-3 text-base text-gray-500">
                <h1 className="mr-2">Última Atualização:</h1>
                <span className="font-bold">{formatarData(ultimaLeitura.timestamp)}</span>
              </div>
            </>
          ) : (
            <p>Carregando última leitura...</p>
          )}
        </div>

        {/* Seção do gráfico dinâmico */}
        <div className="mr-10 flex flex-col items-center">
          <h1 className="text-2xl mb-3 ">Histórico de CO₂ - Semanal</h1>
          {loading && <p>Carregando...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && (
            <div className="shadow-2xl w-[400px] h-[400px] rounded-2xl p-4 bg-white">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <XAxis dataKey="day" />
                  <YAxis domain={[0, 2500] } tickCount={6}/>
                  <Tooltip />
                  <Bar dataKey="value" fill="#007bff" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
          <p className="mt-2 text-base text-gray-500">Últimos 7 dias</p>
        </div>
      </div>

      {/* Rodapé */}
      <div className="mt-70 bg-blue-400">
        <div className="flex justify-center items-center p-1">
          <h1 className="text-center text-white">
            <span className="font-bold italic">© Capivara Solutions</span>
            <br />Todos os direitos reservados.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
