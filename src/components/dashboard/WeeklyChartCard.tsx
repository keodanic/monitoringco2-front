import { MediaSemanal } from "@/types";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid} from "recharts";

type WeeklyChartCardProps = {
  data: MediaSemanal[];
};

export function WeeklyChartCard({ data }: WeeklyChartCardProps) {
  return (
    <div className="w-full max-w-2xl h-[400px] bg-gray-400/10 backdrop-blur-sm border border-gray-100/20 shadow-2xl rounded-3xl p-6">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
           <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0.2}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
          <XAxis dataKey="day" stroke="#9ca3af" tick={{ fill: "#9ca3af" }} />
          <YAxis stroke="#9ca3af" tick={{ fill: "#9ca3af" }} />
          <Tooltip 
            cursor={{fill: 'rgba(100, 116, 139, 0.1)'}}
            contentStyle={{ 
              backgroundColor: "rgba(31, 41, 55, 0.8)", 
              borderColor: "#4b5563",
              borderRadius: "12px" 
            }} 
          />
          <Bar dataKey="value" fill="url(#colorUv)" radius={[5, 5, 0, 0]} barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}