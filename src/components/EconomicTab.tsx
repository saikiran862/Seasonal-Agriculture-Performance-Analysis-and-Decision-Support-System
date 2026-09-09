import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
  PieChart,
  Pie,
} from 'recharts';
import { Coins, TrendingDown, TrendingUp, AlertTriangle, IndianRupee } from 'lucide-react';
import { SeasonSummary } from '../types/agriculture';

interface EconomicTabProps {
  seasonSummaries: SeasonSummary[];
}

export const EconomicTab: React.FC<EconomicTabProps> = ({ seasonSummaries }) => {
  const economicData = seasonSummaries.map((s) => ({
    season: s.season,
    Revenue: Math.round(s.avgRevenue),
    Cost: Math.round(s.avgCost),
    Profit: Math.round(s.avgProfit),
    margin: s.profitMarginPct,
  }));

  const profitMarginData = seasonSummaries.map((s) => ({
    season: s.season,
    'Profit Margin (%)': s.profitMarginPct,
  }));

  const zaidSummary = seasonSummaries.find((s) => s.season === 'Zaid');

  return (
    <div id="economic-tab-content" className="space-y-6">
      {/* Financial Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {seasonSummaries.map((s) => (
          <div
            key={s.season}
            className={`p-5 rounded-2xl border ${
              s.avgProfit >= 0
                ? 'bg-white border-slate-200 shadow-xs'
                : 'bg-rose-50/50 border-rose-200 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    s.season === 'Kharif'
                      ? 'bg-emerald-600'
                      : s.season === 'Rabi'
                      ? 'bg-sky-600'
                      : 'bg-rose-600'
                  }`}
                />
                {s.season} Cropping Economics
              </span>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  s.avgProfit >= 0
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {s.profitMarginPct}% Margin
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Gross Revenue:</span>
                <span className="font-mono font-semibold text-slate-800">
                  ₹{Math.round(s.avgRevenue).toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Production Cost:</span>
                <span className="font-mono text-slate-600">
                  ₹{Math.round(s.avgCost).toLocaleString('en-IN')}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
                <span className="font-bold text-slate-700">Net Average Profit:</span>
                <span
                  className={`font-mono text-base font-extrabold ${
                    s.avgProfit >= 0 ? 'text-emerald-700' : 'text-rose-600'
                  }`}
                >
                  {s.avgProfit >= 0 ? `₹${Math.round(s.avgProfit).toLocaleString('en-IN')}` : `-₹${Math.abs(Math.round(s.avgProfit)).toLocaleString('en-IN')}`}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Critical Deficit Analysis: Zaid Focus */}
      {zaidSummary && zaidSummary.avgProfit < 0 && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="text-xs text-rose-950">
            <h4 className="font-bold text-rose-900">
              Critical Finding: Systematic Negative Profit in Zaid Season (-₹{Math.abs(Math.round(zaidSummary.avgProfit)).toLocaleString('en-IN')})
            </h4>
            <p className="mt-1 text-rose-900/90 leading-relaxed">
              Zaid represents an economically precarious window where farm input costs (water pumping, summer pest prevention, electricity) routinely surpass farm-gate market realizations. With a negative profit margin of {zaidSummary.profitMarginPct}%, conventional commercial cropping during this period causes capital erosion unless high-value specialized horticultural or drip-fertigated crops are adopted.
            </p>
          </div>
        </div>
      )}

      {/* 2 Major Economic Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue vs Cost vs Profit Comparison */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Revenue, Total Cost, & Profit Comparison (₹)
              </h3>
              <p className="text-xs text-slate-500">Cross-seasonal balance sheet breakdown</p>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={economicData} margin={{ top: 10, right: 20, left: 15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="season" tickLine={false} tick={{ fill: '#475569', fontSize: 12 }} />
                <YAxis
                  tickLine={false}
                  tick={{ fill: '#475569', fontSize: 12 }}
                  tickFormatter={(v) => `₹${Math.round(v / 1000)}k`}
                />
                <Tooltip
                  formatter={(val: any, name: any) => [`₹${Number(val).toLocaleString('en-IN')}`, name]}
                  contentStyle={{ backgroundColor: '#0F172A', color: '#F8FAFC', borderRadius: '8px', border: 'none', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="Revenue" fill="#059669" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Cost" fill="#64748B" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Profit" fill="#0284C7" radius={[4, 4, 0, 0]}>
                  {economicData.map((entry) => (
                    <Cell
                      key={entry.season}
                      fill={entry.Profit >= 0 ? '#10B981' : '#EF4444'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Profit Margin % by Season */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Net Profit Margin (%)</h3>
              <p className="text-xs text-slate-500">
                Percentage of revenue retained as net income after input recovery
              </p>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={profitMarginData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="season" tickLine={false} tick={{ fill: '#475569', fontSize: 12 }} />
                <YAxis unit="%" tickLine={false} tick={{ fill: '#475569', fontSize: 12 }} />
                <Tooltip
                  formatter={(val: any) => [`${val}%`, 'Profit Margin']}
                  contentStyle={{ backgroundColor: '#0F172A', color: '#F8FAFC', borderRadius: '8px', border: 'none', fontSize: '12px' }}
                />
                <Bar dataKey="Profit Margin (%)" radius={[6, 6, 0, 0]}>
                  {profitMarginData.map((entry) => (
                    <Cell
                      key={entry.season}
                      fill={entry['Profit Margin (%)'] >= 0 ? '#059669' : '#EF4444'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
