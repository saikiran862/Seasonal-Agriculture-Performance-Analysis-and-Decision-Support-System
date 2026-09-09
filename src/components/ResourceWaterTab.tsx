import React, { useMemo } from 'react';
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
  ScatterChart,
  Scatter,
} from 'recharts';
import { Droplets, Gauge, Sprout, CheckCircle2, TrendingUp } from 'lucide-react';
import { FarmRecord, SeasonSummary } from '../types/agriculture';
import { getIrrigationStats } from '../utils/analytics';

interface ResourceWaterTabProps {
  records: FarmRecord[];
  seasonSummaries: SeasonSummary[];
}

export const ResourceWaterTab: React.FC<ResourceWaterTabProps> = ({
  records,
  seasonSummaries,
}) => {
  const irrigationStats = useMemo(() => {
    return getIrrigationStats(records);
  }, [records]);

  const waterEfficiencyBySeason = seasonSummaries.map((s) => ({
    season: s.season,
    'Water Efficiency (t/1000m³)': s.waterEfficiency,
    'Water Consumption (m³)': Math.round(s.avgWaterUsed),
    avgYield: s.avgYield,
  }));

  // Fertilizer vs Yield scatter points
  const fertilizerScatter = useMemo(() => {
    const step = Math.max(1, Math.floor(records.length / 150));
    return records.filter((_, idx) => idx % step === 0).map((r) => ({
      fertilizer: r.Fertilizer_kg_ha,
      yield: r.Yield_Tonnes_Ha,
      season: r.Season,
      crop: r.Crop,
    }));
  }, [records]);

  return (
    <div id="resource-water-tab-content" className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-teal-900 to-emerald-900 text-white rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-teal-300 text-xs font-bold uppercase tracking-wider mb-1">
            <Droplets className="w-4 h-4 text-teal-300" />
            <span>Hydrological & Nutrient Efficiency Analysis</span>
          </div>
          <h2 className="text-lg font-bold">
            Irrigation Technology & Volumetric Water Productivity
          </h2>
          <p className="text-xs text-teal-100/80 mt-1 max-w-2xl leading-relaxed">
            Measuring how effectively volumetric water consumption translates into crop tonnage. Evidence confirms precision micro-irrigation maximizes yield with significantly reduced volumetric dissipation.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="bg-teal-950/60 border border-teal-700/50 rounded-xl p-3 text-center">
            <div className="text-[10px] text-teal-300 font-semibold uppercase">Kharif Efficiency</div>
            <div className="text-xl font-extrabold text-white">5.89</div>
            <div className="text-[9px] text-teal-400">t / 1,000 m³</div>
          </div>
          <div className="bg-teal-950/60 border border-teal-700/50 rounded-xl p-3 text-center">
            <div className="text-[10px] text-teal-300 font-semibold uppercase">Rabi Efficiency</div>
            <div className="text-xl font-extrabold text-white">5.19</div>
            <div className="text-[9px] text-teal-400">t / 1,000 m³</div>
          </div>
          <div className="bg-teal-950/60 border border-rose-500/40 rounded-xl p-3 text-center">
            <div className="text-[10px] text-rose-300 font-semibold uppercase">Zaid Efficiency</div>
            <div className="text-xl font-extrabold text-rose-200">4.41</div>
            <div className="text-[9px] text-rose-300">Lowest Efficiency</div>
          </div>
        </div>
      </div>

      {/* 2 Primary Charts: Water Efficiency by Season & Irrigation Method vs Yield */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Water Efficiency by Season */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Seasonal Water Efficiency Comparison
              </h3>
              <p className="text-xs text-slate-500">
                Kharif: 5.89 | Rabi: 5.19 | Zaid: 4.41 (Tonnes per 1,000 m³)
              </p>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200">
              Key Viva Metric
            </span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={waterEfficiencyBySeason}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="season" tickLine={false} tick={{ fill: '#475569', fontSize: 12 }} />
                <YAxis domain={[0, 7]} tickLine={false} tick={{ fill: '#475569', fontSize: 12 }} />
                <Tooltip
                  formatter={(val: any) => [`${val} t / 1,000 m³`, 'Water Efficiency']}
                  contentStyle={{ backgroundColor: '#0F172A', color: '#F8FAFC', borderRadius: '8px', border: 'none', fontSize: '12px' }}
                />
                <Bar dataKey="Water Efficiency (t/1000m³)" radius={[6, 6, 0, 0]}>
                  {waterEfficiencyBySeason.map((entry) => (
                    <Cell
                      key={entry.season}
                      fill={entry.season === 'Kharif' ? '#0D9488' : entry.season === 'Rabi' ? '#0284C7' : '#E11D48'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Irrigation Method vs Average Yield */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Irrigation Method vs Average Yield (t/ha)
              </h3>
              <p className="text-xs text-slate-500">
                Drip and Sprinkler precision methods compared with Canal, Tube Well, and Rainfed
              </p>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={irrigationStats}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="method" tickLine={false} tick={{ fill: '#475569', fontSize: 11 }} />
                <YAxis domain={[0, 7]} tickLine={false} tick={{ fill: '#475569', fontSize: 12 }} />
                <Tooltip
                  formatter={(val: any) => [`${val} t/ha`, 'Avg Yield']}
                  contentStyle={{ backgroundColor: '#0F172A', color: '#F8FAFC', borderRadius: '8px', border: 'none', fontSize: '12px' }}
                />
                <Bar dataKey="avgYield" fill="#059669" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Irrigation Technology Table & Fertilizer Scatter */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Irrigation Method Efficiency Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="px-5 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              Irrigation Method Performance Hierarchy
            </h3>
            <span className="text-xs text-slate-500 font-mono">Ranked by Water Efficiency</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-4">Method</th>
                  <th className="py-2.5 px-4">Avg Yield</th>
                  <th className="py-2.5 px-4">Water Used</th>
                  <th className="py-2.5 px-4">Efficiency</th>
                  <th className="py-2.5 px-4 text-right">Avg Profit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {irrigationStats.map((item, idx) => (
                  <tr key={item.method} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-mono text-[10px]">
                        {idx + 1}
                      </span>
                      {item.method}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800">{item.avgYield} t/ha</td>
                    <td className="py-3 px-4 text-slate-600">{item.avgWaterUsed} m³</td>
                    <td className="py-3 px-4 font-bold text-teal-700">{item.waterEfficiency} t/k m³</td>
                    <td className="py-3 px-4 text-right font-mono font-semibold">
                      ₹{Math.round(item.avgProfit).toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Fertilizer Usage vs Yield */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Fertilizer (kg/ha) vs Yield (t/ha)</h3>
              <p className="text-xs text-slate-500">Nutrient saturation response curve</p>
            </div>
            <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
              Diminishing Returns
            </span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis
                  type="number"
                  dataKey="fertilizer"
                  name="Fertilizer"
                  unit=" kg/ha"
                  tick={{ fill: '#475569', fontSize: 11 }}
                  label={{ value: 'Fertilizer Input (kg/ha)', position: 'insideBottom', offset: -10, fontSize: 11, fill: '#64748B' }}
                />
                <YAxis
                  type="number"
                  dataKey="yield"
                  name="Yield"
                  unit=" t/ha"
                  tick={{ fill: '#475569', fontSize: 11 }}
                />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ payload }) => {
                    if (!payload || payload.length === 0) return null;
                    const d = payload[0].payload;
                    return (
                      <div className="bg-slate-900 text-white p-2.5 rounded-lg text-xs shadow-lg">
                        <div className="font-bold">{d.crop} ({d.season})</div>
                        <div>Fertilizer: {d.fertilizer} kg/ha</div>
                        <div>Yield: {d.yield} t/ha</div>
                      </div>
                    );
                  }}
                />
                <Scatter name="Farms" data={fertilizerScatter} fill="#10B981" opacity={0.65} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
