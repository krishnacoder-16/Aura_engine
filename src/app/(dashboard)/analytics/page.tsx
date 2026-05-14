"use client";

import PageHeader from "@/components/shared/PageHeader";
import { AnalyticsStatsCards } from "@/features/analytics/components/AnalyticsStatsCards";
import { RiskAssessmentChart } from "@/features/analytics/components/RiskAssessmentChart";
import { PortfolioPieChart } from "@/features/analytics/components/PortfolioPieChart";
import { ChartCard } from "@/features/analytics/components/ChartCard";
import { MOCK_INVENTORY } from "@/mock/inventory";
import { FileDown, Calendar } from "lucide-react";

export default function AnalyticsPage() {
  const data = MOCK_INVENTORY;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <PageHeader 
        title="Analytics Dashboard" 
        subtitle="Real-time insights and inventory performance metrics."
      >
        <button className="flex items-center gap-1.5 text-[12px] font-medium px-3.5 py-2 rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground transition-colors">
          <Calendar size={13} />
          Last 30 Days
        </button>
        <button className="flex items-center gap-1.5 text-[12px] font-semibold px-3.5 py-2 rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition-colors shadow-sm shadow-orange-500/20">
          <FileDown size={13} />
          Export Report
        </button>
      </PageHeader>

      {/* KPI Stats Grid */}
      <AnalyticsStatsCards data={data} />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard 
          title="Risk Assessment" 
          subtitle="Top 10 products with critical stock levels requiring attention."
        >
          <RiskAssessmentChart data={data} />
        </ChartCard>

        <ChartCard 
          title="Portfolio Distribution" 
          subtitle="Inventory valuation breakdown by category across all warehouses."
        >
          <PortfolioPieChart data={data} />
        </ChartCard>
      </div>

      {/* Insights Section Placeholder */}
      <div className="p-6 rounded-2xl border border-orange-200 bg-orange-50/50 dark:border-orange-900/30 dark:bg-orange-950/10">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center shrink-0">
            <FileDown className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="text-[15px] font-bold text-orange-900 dark:text-orange-400">Inventory Insight</h4>
            <p className="text-[13px] text-orange-800/80 dark:text-orange-500/80 mt-1 max-w-2xl leading-relaxed">
              Automated analysis shows that <span className="font-bold">Fluid Handling</span> and <span className="font-bold">Mechanical Parts</span> currently account for 62% of your total capital investment. Consider optimizing reorder points for high-value items to improve liquidity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
