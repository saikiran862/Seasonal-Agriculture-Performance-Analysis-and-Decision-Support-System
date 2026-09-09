import React, { useState, useMemo } from 'react';
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
} from 'recharts';
import { Wheat, TrendingUp, Trophy, ArrowUpDown, Filter } from 'lucide-react';
import { FarmRecord, SeasonType } from '../types/agriculture';
import { getCropSeasonMatrix, mean } from '../utils/analytics';

interface CropTabProps {
  records: FarmRecord[];
}

export const CropTab: React.FC<CropTabProps> = ({ records }) => {
  const [selectedCrop, setSelectedCrop] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'yield' | 'profit' | 'production'>('yield');

  const { matrix, crops, seasons } = useMemo(() => {
    return getCropSeasonMatrix(records);
  }, [records]);

  // Aggregate stats per crop
  const cropAggregates = useMemo(() => {
    const map = new Map<string, FarmRecord[]>();
    records.forEach((r) => {
      const list = map.get(r.Crop) || [];
      list.push(r);
      map.set(r.Crop, list);
    });

    return Array.from(map.entries()).map(([crop, recs]) => {
      const avgYield = Math.round(mean(recs.map((r) => r.Yield_Tonnes_Ha)) * 100) / 100;
      const avgProduction = Math.round(mean(recs.map((r) => r.Production_Tonnes)) * 100) / 100;
      const avgRevenue = Math.round(mean(recs.map((r) => r.Revenue_INR)));
      const avgProfit = Math.round(mean(recs.map((r) => r.Profit_INR)));
      const primarySeason = recs[0]?.Season || 'Kharif';

      return {
        crop,
        avgYield,
        avgProduction,
        avgRevenue,
        avgProfit,
        sampleCount: recs.length,
        primarySeason,
      };
    });
  }, [records]);

  const sortedCrops = useMemo(() => {
    return [...cropAggregates].sort((a, b) => {
      if (sortBy === 'yield') return b.avgYield - a.avgYield;
      if (sortBy === 'profit') return b.avgProfit - a.avgProfit;
      return b.avgProduction - a.avgProduction;
    });
  }, [cropAggregates, sortBy]);

  // Lookup for Crop x Season matrix cell
  const getCellStat = (crop: string, season: SeasonType) => {
    return matrix.find((m) => m.crop === crop && m.season === season);
  };

  // Color intensity for yield heatmap
  const getHeatmapColor = (yieldVal: number | undefined) => {
    if (!yieldVal) return 'bg-slate-50 text-slate-300';
    if (yieldVal >= 5.8) return 'bg-emerald-600 text-white font-bold';
    if (yieldVal >= 5.2) return 'bg-emerald-500 text-white font-semibold';
    if (yieldVal >= 4.8) return 'bg-emerald-200 text-emerald-950 font-medium';
    if (yieldVal >= 4.4) return 'bg-amber-100 text-amber-900 font-medium';
    return 'bg-rose-100 text-rose-900 font-medium';
  };

  return (
    <div id="crop-tab-content" className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Wheat className="w-5 h-5 text-emerald-600" />
            <h2 className="text-base font-bold text-slate-900">
              Crop Performance & Season Cross-Tabulation
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Empirical evaluation of crop yields, profitability, and optimal seasonal pairings.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Sort Leaderboard by:</span>
          <select
            id="crop-sort-selector"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 font-semibold text-slate-800"
          >
            <option value="yield">Average Yield (t/ha)</option>
            <option value="profit">Net Profit (₹)</option>
            <option value="production">Production (Tonnes)</option>
          </select>
        </div>
      </div>

      {/* Primary Highlight: Crop x Season Performance Matrix Heatmap */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="px-5 py-4 border-b border-slate-200 bg-slate-50/50 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span>Crop × Season Performance Matrix (Average Yield in t/ha)</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                Core Showcase Matrix
              </span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Answers the research question: <span className="font-semibold text-slate-700 italic">"Which crop performs best in which season?"</span>
            </p>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-500">
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-emerald-600 inline-block" />
              <span>&gt; 5.8 t/ha</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-emerald-200 inline-block" />
              <span>4.8–5.2 t/ha</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-rose-100 inline-block" />
              <span>&lt; 4.4 t/ha</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto p-4">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="py-2.5 px-3 font-bold text-slate-700 w-36">Crop Variety</th>
                {seasons.map((s) => (
                  <th key={s} className="py-2.5 px-3 font-bold text-slate-700 text-center">
                    {s} Cycle
                  </th>
                ))}
                <th className="py-2.5 px-3 font-bold text-slate-700 text-center">Best Season</th>
                <th className="py-2.5 px-3 font-bold text-slate-700 text-right">Avg Net Profit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {crops.map((crop) => {
                const kharifStat = getCellStat(crop, 'Kharif');
                const rabiStat = getCellStat(crop, 'Rabi');
                const zaidStat = getCellStat(crop, 'Zaid');

                // Determine best season for this crop
                const stats = [kharifStat, rabiStat, zaidStat].filter(Boolean);
                const best = stats.sort((a, b) => (b?.avgYield || 0) - (a?.avgYield || 0))[0];

                const cropTotalRecs = records.filter((r) => r.Crop === crop);
                const overallProfit = mean(cropTotalRecs.map((r) => r.Profit_INR));

                return (
                  <tr key={crop} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-3 font-bold text-slate-900 flex items-center gap-2">
                      <Wheat className="w-3.5 h-3.5 text-slate-400" />
                      <span>{crop}</span>
                    </td>

                    {/* Kharif Cell */}
                    <td className="py-2 px-3 text-center">
                      {kharifStat ? (
                        <div
                          className={`py-1.5 px-2 rounded-lg text-xs mx-auto max-w-[110px] ${getHeatmapColor(
                            kharifStat.avgYield
                          )}`}
                          title={`Kharif: ${kharifStat.avgYield} t/ha (${kharifStat.recordCount} farms)`}
                        >
                          <div>{kharifStat.avgYield} <span className="text-[10px] opacity-80">t/ha</span></div>
                          <div className="text-[10px] opacity-75">₹{Math.round(kharifStat.avgProfit / 1000)}k</div>
                        </div>
                      ) : (
                        <span className="text-slate-300 font-mono text-[11px]">—</span>
                      )}
                    </td>

                    {/* Rabi Cell */}
                    <td className="py-2 px-3 text-center">
                      {rabiStat ? (
                        <div
                          className={`py-1.5 px-2 rounded-lg text-xs mx-auto max-w-[110px] ${getHeatmapColor(
                            rabiStat.avgYield
                          )}`}
                          title={`Rabi: ${rabiStat.avgYield} t/ha (${rabiStat.recordCount} farms)`}
                        >
                          <div>{rabiStat.avgYield} <span className="text-[10px] opacity-80">t/ha</span></div>
                          <div className="text-[10px] opacity-75">₹{Math.round(rabiStat.avgProfit / 1000)}k</div>
                        </div>
                      ) : (
                        <span className="text-slate-300 font-mono text-[11px]">—</span>
                      )}
                    </td>

                    {/* Zaid Cell */}
                    <td className="py-2 px-3 text-center">
                      {zaidStat ? (
                        <div
                          className={`py-1.5 px-2 rounded-lg text-xs mx-auto max-w-[110px] ${getHeatmapColor(
                            zaidStat.avgYield
                          )}`}
                          title={`Zaid: ${zaidStat.avgYield} t/ha (${zaidStat.recordCount} farms)`}
                        >
                          <div>{zaidStat.avgYield} <span className="text-[10px] opacity-80">t/ha</span></div>
                          <div className="text-[10px] opacity-75 font-semibold">
                            {zaidStat.avgProfit < 0 ? `-₹${Math.abs(Math.round(zaidStat.avgProfit / 1000))}k` : `₹${Math.round(zaidStat.avgProfit / 1000)}k`}
                          </div>
                        </div>
                      ) : (
                        <span className="text-slate-300 font-mono text-[11px]">—</span>
                      )}
                    </td>

                    {/* Best Season */}
                    <td className="py-2 px-3 text-center">
                      {best ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {best.season} ({best.avgYield} t/ha)
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>

                    {/* Overall Profit */}
                    <td className="py-2 px-3 text-right font-mono font-semibold">
                      <span className={overallProfit >= 0 ? 'text-slate-800' : 'text-rose-600'}>
                        ₹{Math.round(overallProfit).toLocaleString('en-IN')}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Crop Leaderboard & Yield Distribution Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart: Top Crops by Yield */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Top Crops by Average Yield</h3>
              <p className="text-xs text-slate-500">Metric tonnes per hectare across all active records</p>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sortedCrops.slice(0, 8)}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                <XAxis type="number" domain={[0, 7]} tick={{ fill: '#475569', fontSize: 11 }} />
                <YAxis dataKey="crop" type="category" width={80} tick={{ fill: '#0F172A', fontSize: 11, fontWeight: 600 }} />
                <Tooltip
                  formatter={(value: any) => [`${value} t/ha`, 'Avg Yield']}
                  contentStyle={{ backgroundColor: '#0F172A', color: '#F8FAFC', borderRadius: '8px', border: 'none', fontSize: '12px' }}
                />
                <Bar dataKey="avgYield" fill="#059669" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart: Top Crops by Profitability */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Crop Profitability Hierarchy</h3>
              <p className="text-xs text-slate-500">Net profit margin per crop cycle (in ₹ Thousands)</p>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sortedCrops.map((c) => ({ ...c, ProfitK: Math.round(c.avgProfit / 1000) }))}
                margin={{ top: 10, right: 20, left: 10, bottom: 25 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis
                  dataKey="crop"
                  angle={-35}
                  textAnchor="end"
                  interval={0}
                  tick={{ fill: '#475569', fontSize: 10 }}
                />
                <YAxis tick={{ fill: '#475569', fontSize: 11 }} tickFormatter={(val) => `₹${val}k`} />
                <Tooltip
                  formatter={(val: any) => [`₹${val}k`, 'Net Profit']}
                  contentStyle={{ backgroundColor: '#0F172A', color: '#F8FAFC', borderRadius: '8px', border: 'none', fontSize: '12px' }}
                />
                <Bar dataKey="ProfitK" radius={[4, 4, 0, 0]}>
                  {sortedCrops.map((entry) => (
                    <Cell
                      key={entry.crop}
                      fill={entry.avgProfit >= 0 ? '#10B981' : '#EF4444'}
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
