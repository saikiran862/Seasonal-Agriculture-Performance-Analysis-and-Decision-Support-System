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
  AreaChart,
  Area,
} from 'recharts';
import {
  Trophy,
  TrendingDown,
  Droplets,
  Coins,
  Wheat,
  MapPin,
  Layers,
  Sparkles,
  Info,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { SeasonSummary } from '../types/agriculture';
import { OverallKPIs } from '../utils/analytics';

interface OverviewTabProps {
  kpis: OverallKPIs;
  seasonSummaries: SeasonSummary[];
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ kpis, seasonSummaries }) => {
  const yieldData = seasonSummaries.map((s) => ({
    season: s.season,
    avgYield: s.avgYield,
    waterEff: s.waterEfficiency,
  }));

  const profitData = seasonSummaries.map((s) => ({
    season: s.season,
    avgProfit: s.avgProfit,
    margin: s.profitMarginPct,
  }));

  const revenueData = seasonSummaries.map((s) => ({
    season: s.season,
    Revenue: Math.round(s.avgRevenue / 1000), // in ₹ Thousands
    Cost: Math.round(s.avgCost / 1000),
    Profit: Math.round(s.avgProfit / 1000),
  }));

  const productionData = seasonSummaries.map((s) => ({
    season: s.season,
    Production: s.avgProduction,
    Rainfall: s.avgRainfall,
  }));

  return (
    <div id="overview-tab-content" className="space-y-6">
      {/* Best Season Hero Card & Weakest Season Callout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Best Season Badge */}
        <div className="md:col-span-2 bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 rounded-2xl p-5 text-white shadow-md relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2 text-emerald-300 font-semibold text-xs tracking-wider uppercase">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Multi-Criteria Dominance Benchmark</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <span className="text-3xl font-extrabold tracking-tight text-white">
                  {kpis.bestSeason.toUpperCase()}
                </span>
                <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-400/30">
                  Rank #1 Season
                </span>
              </div>
              <p className="text-xs text-emerald-200/90 font-medium">
                Evaluated dynamically across Yield (40%), Profit (40%), and Water Efficiency (20%)
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-emerald-700/50">
              <div className="bg-emerald-950/40 rounded-xl p-3 border border-emerald-700/30">
                <div className="text-[11px] text-emerald-300 font-medium">Best Yield</div>
                <div className="text-xl font-bold text-white mt-0.5">{kpis.bestSeasonYield} <span className="text-xs font-normal text-emerald-300">t/ha</span></div>
                <div className="text-[10px] text-emerald-400 flex items-center mt-1">
                  <ArrowUpRight className="w-3 h-3 mr-0.5" /> +11% vs Rabi
                </div>
              </div>

              <div className="bg-emerald-950/40 rounded-xl p-3 border border-emerald-700/30">
                <div className="text-[11px] text-emerald-300 font-medium">Highest Profit</div>
                <div className="text-xl font-bold text-white mt-0.5">₹{Math.round(kpis.bestSeasonProfit).toLocaleString('en-IN')}</div>
                <div className="text-[10px] text-emerald-400 flex items-center mt-1">
                  <ArrowUpRight className="w-3 h-3 mr-0.5" /> +104% vs Rabi
                </div>
              </div>

              <div className="bg-emerald-950/40 rounded-xl p-3 border border-emerald-700/30">
                <div className="text-[11px] text-emerald-300 font-medium">Water Efficiency</div>
                <div className="text-xl font-bold text-white mt-0.5">{kpis.bestSeasonWaterEff} <span className="text-xs font-normal text-emerald-300">t/1000 m³</span></div>
                <div className="text-[10px] text-emerald-400 flex items-center mt-1">
                  <ArrowUpRight className="w-3 h-3 mr-0.5" /> +33% vs Zaid
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Economic Vulnerability Warning (Zaid) */}
        <div className="bg-white border border-rose-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-rose-700 font-semibold text-xs tracking-wider uppercase mb-1">
              <TrendingDown className="w-4 h-4 text-rose-600" />
              <span>Economic Vulnerability</span>
            </div>
            <h4 className="text-lg font-bold text-slate-900 mt-1">
              {kpis.weakestEconomicSeason} Season Deficit
            </h4>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Records negative average profit (<span className="font-semibold text-rose-600 font-mono">-₹24,805</span>) and lowest water efficiency (<span className="font-semibold text-slate-800">4.41</span> t/1000 m³) despite high irrigation input.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Summer Evaporative Strain</span>
            <span className="font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Needs Intervention
            </span>
          </div>
        </div>
      </div>

      {/* 6 Core KPI Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Total Records */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium">Total Records</span>
            <Layers className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{kpis.totalRecords.toLocaleString()}</div>
          <div className="text-[11px] text-slate-500 mt-1">28 feature variables</div>
        </div>

        {/* Crops */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium">Total Crops</span>
            <Wheat className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{kpis.totalCrops}</div>
          <div className="text-[11px] text-slate-500 mt-1">Across 3 seasons</div>
        </div>

        {/* States */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium">Total States</span>
            <MapPin className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{kpis.totalStates}</div>
          <div className="text-[11px] text-slate-500 mt-1">Major agro-climatic zones</div>
        </div>

        {/* Average Yield */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium">Average Yield</span>
            <Sparkles className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{kpis.avgYield} <span className="text-xs font-normal text-slate-500">t/ha</span></div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">Kharif peak: 5.64</div>
        </div>

        {/* Average Profit */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium">Average Profit</span>
            <Coins className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">₹{Math.round(kpis.avgProfit / 1000)}k</div>
          <div className="text-[11px] text-slate-500 mt-1">Net farm margin</div>
        </div>

        {/* Water Efficiency */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium">Water Efficiency</span>
            <Droplets className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{kpis.avgWaterEfficiency}</div>
          <div className="text-[11px] text-slate-500 mt-1">Tonnes per 1,000 m³</div>
        </div>
      </div>

      {/* 4 Core Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Season-wise Average Yield */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Season-wise Average Yield</h3>
              <p className="text-xs text-slate-500">Crop productivity in metric tonnes per hectare</p>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
              Kharif Peak
            </span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yieldData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="season" tickLine={false} tick={{ fill: '#475569', fontSize: 12 }} />
                <YAxis tickLine={false} tick={{ fill: '#475569', fontSize: 12 }} domain={[0, 7]} />
                <Tooltip
                  formatter={(value: any) => [`${value} tonnes/ha`, 'Avg Yield']}
                  contentStyle={{ backgroundColor: '#0F172A', color: '#F8FAFC', borderRadius: '8px', border: 'none', fontSize: '12px' }}
                />
                <Bar dataKey="avgYield" radius={[6, 6, 0, 0]}>
                  {yieldData.map((entry) => (
                    <Cell
                      key={entry.season}
                      fill={entry.season === 'Kharif' ? '#059669' : entry.season === 'Rabi' ? '#0284C7' : '#D97706'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Season-wise Average Profit */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Season-wise Average Net Profit</h3>
              <p className="text-xs text-slate-500">Highlighting positive return in Kharif/Rabi vs deficit in Zaid</p>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
              Zaid Deficit
            </span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={profitData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="season" tickLine={false} tick={{ fill: '#475569', fontSize: 12 }} />
                <YAxis
                  tickLine={false}
                  tick={{ fill: '#475569', fontSize: 12 }}
                  tickFormatter={(val) => `₹${Math.round(val / 1000)}k`}
                />
                <Tooltip
                  formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Avg Net Profit']}
                  contentStyle={{ backgroundColor: '#0F172A', color: '#F8FAFC', borderRadius: '8px', border: 'none', fontSize: '12px' }}
                />
                <Bar dataKey="avgProfit" radius={[6, 6, 0, 0]}>
                  {profitData.map((entry) => (
                    <Cell
                      key={entry.season}
                      fill={entry.avgProfit >= 0 ? '#10B981' : '#EF4444'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Season-wise Economics (Revenue vs Total Cost) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Revenue vs Total Cost (₹ Thousands)</h3>
              <p className="text-xs text-slate-500">Input cost overhead compared to total market sales</p>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="season" tickLine={false} tick={{ fill: '#475569', fontSize: 12 }} />
                <YAxis tickLine={false} tick={{ fill: '#475569', fontSize: 12 }} tickFormatter={(val) => `₹${val}k`} />
                <Tooltip
                  formatter={(value: any, name: any) => [`₹${Number(value).toLocaleString()}k`, name]}
                  contentStyle={{ backgroundColor: '#0F172A', color: '#F8FAFC', borderRadius: '8px', border: 'none', fontSize: '12px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                <Bar dataKey="Revenue" fill="#059669" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Cost" fill="#64748B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Season-wise Production & Rainfall Relationship */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Average Production (Tonnes)</h3>
              <p className="text-xs text-slate-500">Gross harvest output per farm cluster across cycles</p>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={productionData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="season" tickLine={false} tick={{ fill: '#475569', fontSize: 12 }} />
                <YAxis tickLine={false} tick={{ fill: '#475569', fontSize: 12 }} />
                <Tooltip
                  formatter={(value: any) => [`${value} Tonnes`, 'Avg Production']}
                  contentStyle={{ backgroundColor: '#0F172A', color: '#F8FAFC', borderRadius: '8px', border: 'none', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="Production" stroke="#0D9488" fill="#CCFBF1" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Cross-Season Side-by-Side Summary Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Comparative Seasonal Performance Matrix
            </h3>
            <p className="text-xs text-slate-500">
              Direct empirical comparison of key agronomic, environmental, and financial variables
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">N = {kpis.totalRecords} Records</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Season</th>
                <th className="py-3 px-4">Sample Size</th>
                <th className="py-3 px-4">Avg Yield</th>
                <th className="py-3 px-4">Avg Production</th>
                <th className="py-3 px-4">Avg Revenue</th>
                <th className="py-3 px-4">Avg Net Profit</th>
                <th className="py-3 px-4">Water Efficiency</th>
                <th className="py-3 px-4">Rainfall (mm)</th>
                <th className="py-3 px-4">Disease/Pest Risk</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {seasonSummaries.map((s) => (
                <tr key={s.season} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        s.season === 'Kharif'
                          ? 'bg-emerald-600'
                          : s.season === 'Rabi'
                          ? 'bg-sky-600'
                          : 'bg-amber-600'
                      }`}
                    />
                    {s.season}
                  </td>
                  <td className="py-3.5 px-4 font-mono">{s.recordCount.toLocaleString()}</td>
                  <td className="py-3.5 px-4 font-semibold">{s.avgYield} t/ha</td>
                  <td className="py-3.5 px-4">{s.avgProduction} t</td>
                  <td className="py-3.5 px-4 font-mono">₹{Math.round(s.avgRevenue).toLocaleString('en-IN')}</td>
                  <td className="py-3.5 px-4 font-bold">
                    <span
                      className={
                        s.avgProfit >= 0
                          ? 'text-emerald-700'
                          : 'text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded'
                      }
                    >
                      {s.avgProfit >= 0 ? `₹${Math.round(s.avgProfit).toLocaleString('en-IN')}` : `-₹${Math.abs(Math.round(s.avgProfit)).toLocaleString('en-IN')}`}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold">{s.waterEfficiency} t/k m³</td>
                  <td className="py-3.5 px-4">{s.avgRainfall} mm</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                        s.avgDiseasePestRisk > 50
                          ? 'bg-amber-100 text-amber-900 font-semibold'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {s.avgDiseasePestRisk}%
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {s.season === kpis.bestSeason ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                        Peak Overall
                      </span>
                    ) : s.avgProfit < 0 ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-100 text-rose-800">
                        Deficit Risk
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-sky-100 text-sky-800">
                        Stable Median
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
