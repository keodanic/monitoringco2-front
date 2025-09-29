"use client";
import Link from "next/link";
import { useDashboardData } from "@/hooks/useDashboardData";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { LastReadingCard } from "@/components/dashboard/LastReadingCard";
import { WeeklyChartCard } from "@/components/dashboard/WeeklyChartCard";

export default function Dashboard() {
  const { ultimaLeitura, weeklyData, loading, error, refresh } = useDashboardData();

  const renderContent = () => {
    if (loading) return <div className="flex-1 flex items-center justify-center"><LoadingSpinner /></div>;
    if (error) return <div className="flex-1 flex items-center justify-center"><ErrorMessage message={error} /></div>;
    
    return (
      <div className="flex flex-col xl:flex-row items-center justify-center gap-10 w-full p-4">
        <div className="flex flex-col gap-6 items-center w-full max-w-sm">
          <LastReadingCard data={ultimaLeitura} />
          <button
            onClick={refresh}
            className="bg-sky-500/80 rounded-full py-3 px-8 w-full text-white font-semibold hover:bg-sky-600 transition-colors"
          >
            Atualizar Dados
          </button>
        </div>
        <div className="flex flex-col gap-2 items-center w-full max-w-2xl">
          <h2 className="text-3xl font-bold mb-2 text-white">Média Semanal de CO₂</h2>
          <WeeklyChartCard data={weeklyData} />
           <Link 
            href="/history" 
            className="bg-gray-700/80 rounded-full py-3 px-8 w-full max-w-xs text-white font-semibold hover:bg-gray-800 transition-colors text-center mt-4"
          >
            Ver Histórico Completo
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}