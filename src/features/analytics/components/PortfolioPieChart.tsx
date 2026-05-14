"use client";

import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { InventoryItem } from "@/features/inventory/types";

interface PortfolioPieChartProps {
  data: InventoryItem[];
}

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4", "#f43f5e", "#14b8a6", "#6366f1"];

export function PortfolioPieChart({ data }: PortfolioPieChartProps) {
  // Total valuation by category
  const categoryMap = data.reduce((acc, item) => {
    const value = item.stock * item.price;
    acc[item.category] = (acc[item.category] || 0) + value;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(categoryMap)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  const totalValue = chartData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="h-[400px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="45%"
            innerRadius={80}
            outerRadius={120}
            paddingAngle={4}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0];
                const percentage = ((data.value as number) / totalValue * 100).toFixed(1);
                return (
                  <div className="bg-white dark:bg-slate-900 border border-border p-3 rounded-xl shadow-xl">
                    <p className="text-[12px] font-bold text-foreground mb-1">{data.name}</p>
                    <p className="text-[11px] text-muted-foreground flex flex-col gap-1">
                      <span>Value: <span className="font-semibold text-foreground">${(data.value as number).toLocaleString()}</span></span>
                      <span>Share: <span className="font-semibold text-foreground">{percentage}%</span></span>
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={80}
            content={({ payload }) => (
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-8">
                {payload?.map((entry: any, index: number) => (
                  <div key={`legend-${index}`} className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                    <span className="text-[11px] font-medium text-muted-foreground">{entry.value}</span>
                  </div>
                ))}
              </div>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
