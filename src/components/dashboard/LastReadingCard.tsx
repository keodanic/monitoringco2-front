import { UltimaLeitura } from "@/types";
import { FaMapMarkerAlt, FaClock, FaWind } from "react-icons/fa";
import { BsCloudFog2 } from "react-icons/bs";

type LastReadingCardProps = {
  data: UltimaLeitura | null;
};

const getAirQualityInfo = (quality: string = "") => {
  switch (quality.toLowerCase()) {
    case "excelente": return { color: "bg-blue-500", text: "Excelente" };
    case "boa": return { color: "bg-green-500", text: "Boa" };
    case "moderada": return { color: "bg-yellow-500", text: "Moderada" };
    case "ruim": return { color: "bg-orange-500", text: "Ruim" };
    case "muito ruim": return { color: "bg-red-500", text: "Muito Ruim" };
    case "perigoso": return { color: "bg-purple-500", text: "Perigoso" };
    default: return { color: "bg-gray-500", text: "N/A" };
  }
};

const formatarData = (dataString: string) => {
  if (!dataString) return "";
  return new Date(dataString).toLocaleString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
};

export function LastReadingCard({ data }: LastReadingCardProps) {
  const qualityInfo = getAirQualityInfo(data?.airQuality);

  return (
    <section className="w-full max-w-sm h-auto bg-gray-400/10 backdrop-blur-sm border border-gray-100/20 shadow-2xl rounded-3xl p-6 text-white">
      {data ? (
        <div className="flex flex-col gap-5">
          <div className="text-center">
            <p className="font-light text-gray-300 text-lg">Nível de CO₂</p>
            <div className="flex items-center justify-center gap-3 mt-1">
              <FaWind className="text-sky-400" size={28} />
              <span className="font-bold text-5xl tracking-tight">{data.co2Level}</span>
              <span className="font-semibold text-gray-400 text-2xl">PPM</span>
            </div>
          </div>
          
          <hr className="border-gray-600" />

          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="font-light text-gray-300 text-sm mb-1">Qualidade do Ar</p>
              <div className="flex items-center justify-center gap-2">
                <span className={`w-3 h-3 ${qualityInfo.color} rounded-full`}></span>
                <span className="font-semibold text-lg">{qualityInfo.text}</span>
              </div>
            </div>
            <div>
              <p className="font-light text-gray-300 text-sm mb-1">Localização</p>
              <div className="flex items-center justify-center gap-2">
                 <FaMapMarkerAlt className="text-red-500" size={16} />
                 <span className="font-semibold text-lg">{data.location}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center text-gray-400 text-sm mt-4">
            <FaClock className="mr-2" size={14} />
            <span>{formatarData(data.timestamp)}</span>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-400">Nenhuma leitura disponível</p>
        </div>
      )}
    </section>
  );
}