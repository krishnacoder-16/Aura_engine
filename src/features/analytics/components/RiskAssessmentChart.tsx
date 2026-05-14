"use client";

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";
import { InventoryItem } from "@/features/inventory/types";

interface RiskAssessmentChartProps {
  data: InventoryItem[];
}

export function RiskAssessmentChart({ data }: RiskAssessmentChartProps) {
  // Top 10 products with lowest stock
  const chartData = [...data]
    .sort((a, b) => a.stock - b.stock)
    .slice(0, 10)
    .map(item => ({
      name: item.name.length > 20 ? `${item.name.substring(0, 20)}...` : item.name,
      fullName: item.name,
      stock: item.stock,
    }));

  return (
    <div className="h-[400px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
          <XAxis 
            type="number" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false}
            tick={{ fill: "#64748b" }}
          />
          <YAxis 
            dataKey="name" 
            type="category" 
            fontSize={11} 
            tickLine={false} 
            axisLine={false}
            width={120}
            tick={{ fill: "#64748b", fontWeight: 500 }}
          />
          <Tooltip 
            cursor={{ fill: "#f8fafc" }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-white dark:bg-slate-900 border border-border p-3 rounded-xl shadow-xl">
                    <p className="text-[12px] font-bold text-foreground mb-1">{data.fullName}</p>
                    <p className="text-[11px] text-muted-foreground flex items-center gap-2">
                      Stock Level: <span className="font-semibold text-orange-500">{data.stock} units</span>
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar 
            dataKey="stock" 
            radius={[0, 4, 4, 0]}
            barSize={24}
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.stock === 0 ? "#ef4444" : entry.stock <= 20 ? "#f97316" : "#3b82f6"} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
