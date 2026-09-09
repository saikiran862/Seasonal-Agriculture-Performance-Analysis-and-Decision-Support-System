import React, { useMemo, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import {
  ShieldAlert,
  AlertTriangle,
  Activity,
  Search,
  Filter,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { FarmRecord, SeasonSummary } from '../types/agriculture';
import { detectIQRAnomalies } from '../utils/analytics';

interface RiskAnomalyTabProps {
  records: FarmRecord[];
  seasonSummaries: SeasonSummary[];
}

export const RiskAnomalyTab: React.FC<RiskAnomalyTabProps> = ({
  records,
  seasonSummaries,
}) => {
  const [anomalyFilter, setAnomalyFilter] = useState<'All' | 'Yield' | 'Profit'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const riskData = seasonSummaries.map((s) => ({
    season: s.season,
    'Disease/Pest Risk (%)': s.avgDiseasePestRisk,
    avgYield: s.avgYield,
  }));

  const {
    anomalies,
    yieldQ1,
    yieldQ3,
    yieldIQR,
    yieldLowerBound,
    yieldUpperBound,
    profitLowerBound,
    profitUpperBound,
  } = useMemo(() => {
    return detectIQRAnomalies(records);
  }, [records]);

  const filteredAnomalies = useMemo(() => {
    return anomalies.filter((a) => {
      if (anomalyFilter === 'Yield' && a.metric !== 'Yield_Tonnes_Ha') return false;
      if (anomalyFilter === 'Profit' && a.metric !== 'Profit_INR') return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          a.record.Farm_ID.toLowerCase().includes(q) ||
          a.record.State.toLowerCase().includes(q) ||
          a.record.District.toLowerCase().includes(q) ||
          a.record.Crop.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [anomalies, anomalyFilter, searchQuery]);

  return (
    <div id="risk-anomaly-tab-content" className="space-y-6">
      {/* Viva Highlight Banner: Biological Risk Paradox */}
      <div className="bg-amber-900 text-amber-50 rounded-2xl p-5 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>Key Viva Takeaway: Biological Risk Paradox</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white">
              "Higher Agricultural Performance Does Not Necessarily Mean Lower Biological Risk."
            </h2>
            <p className="text-xs text-amber-200/90 mt-1.5 leading-relaxed">
              Our empirical findings demonstrate that Kharif registers the highest overall disease and pest vulnerability at <span className="font-bold text-white underline">54.47%</span>, compared to 40.48% in Rabi and 38.22% in Zaid. This occurs because heavy monsoon rainfall (852 mm) and high relative humidity (71.8%) create an optimal biophysical microclimate for pathogen proliferation and insect vectors.
            </p>
          </div>

          <div className="bg-amber-950/70 border border-amber-700/60 rounded-xl p-3.5 text-center shrink-0">
            <div className="text-[11px] text-amber-300 font-semibold uppercase">Kharif Pest Risk</div>
            <div className="text-2xl font-extrabold text-amber-400">54.47%</div>
            <div className="text-[10px] text-amber-200 mt-0.5">Highest across all 3 cycles</div>
          </div>
        </div>
      </div>

      {/* Risk Chart & IQR Mathematical Methodology */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart: Disease / Pest Risk by Season */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Disease / Pest Risk Index by Season</h3>
              <p className="text-xs text-slate-500">Biological threat incidence probability across seasons</p>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
              Kharif Peak Risk
            </span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="season" tickLine={false} tick={{ fill: '#475569', fontSize: 12 }} />
                <YAxis domain={[0, 70]} tickLine={false} tick={{ fill: '#475569', fontSize: 12 }} unit="%" />
                <Tooltip
                  formatter={(val: any) => [`${val}%`, 'Disease/Pest Risk']}
                  contentStyle={{ backgroundColor: '#0F172A', color: '#F8FAFC', borderRadius: '8px', border: 'none', fontSize: '12px' }}
                />
                <Bar dataKey="Disease/Pest Risk (%)" radius={[6, 6, 0, 0]}>
                  {riskData.map((entry) => (
                    <Cell
                      key={entry.season}
                      fill={entry.season === 'Kharif' ? '#D97706' : entry.season === 'Rabi' ? '#0284C7' : '#10B981'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* IQR Methodology Architecture */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-emerald-600" />
                <span>IQR-Based Outlier Detection Formulation</span>
              </h3>
              <span className="text-[11px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-semibold">
                Tukey's Fences
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Statistical boundaries used to objectively detect anomalous yield spikes or catastrophic harvest deficits without parametric normality assumptions:
            </p>

            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">First Quartile (Q1):</span>
                <span className="font-bold text-slate-800">{yieldQ1} t/ha</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Third Quartile (Q3):</span>
                <span className="font-bold text-slate-800">{yieldQ3} t/ha</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Interquartile Range (IQR):</span>
                <span className="font-bold text-slate-800">{yieldIQR} t/ha</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between text-rose-700 font-semibold">
                <span>Lower Outlier Bound (Q1 - 1.5×IQR):</span>
                <span>&lt; {yieldLowerBound} t/ha</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Upper Outlier Bound (Q3 + 1.5×IQR):</span>
                <span>&gt; {yieldUpperBound} t/ha</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span>Identified Anomalies in Dataset:</span>
            <span className="font-bold text-slate-900 bg-amber-50 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-200">
              {anomalies.length} Records Flagged
            </span>
          </div>
        </div>
      </div>

      {/* Flagged Anomaly Records Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="px-5 py-4 border-b border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Unusual Farm Records & Outlier Audit Log
            </h3>
            <p className="text-xs text-slate-500">
              Records exhibiting statistical deviation in productivity, economic deficit, or environmental extremes
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search farm ID / crop..."
                className="text-xs bg-white border border-slate-300 rounded-lg pl-8 pr-2.5 py-1.5 w-44"
              />
            </div>

            <div className="inline-flex rounded-lg bg-slate-200/70 p-0.5">
              {(['All', 'Yield', 'Profit'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setAnomalyFilter(filter)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                    anomalyFilter === filter
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto max-h-96">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 sticky top-0">
              <tr>
                <th className="py-2.5 px-4">Farm ID</th>
                <th className="py-2.5 px-4">Location</th>
                <th className="py-2.5 px-4">Crop</th>
                <th className="py-2.5 px-4">Season</th>
                <th className="py-2.5 px-4">Yield</th>
                <th className="py-2.5 px-4">Net Profit</th>
                <th className="py-2.5 px-4">Rainfall</th>
                <th className="py-2.5 px-4">Pest Risk</th>
                <th className="py-2.5 px-4">Anomaly Diagnosis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAnomalies.slice(0, 50).map((a, idx) => (
                <tr key={`${a.record.Farm_ID}_${idx}`} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">
                    {a.record.Farm_ID}
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {a.record.District}, {a.record.State}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-800">{a.record.Crop}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        a.record.Season === 'Kharif'
                          ? 'bg-emerald-50 text-emerald-800'
                          : a.record.Season === 'Rabi'
                          ? 'bg-sky-50 text-sky-800'
                          : 'bg-amber-50 text-amber-800'
                      }`}
                    >
                      {a.record.Season}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900">
                    {a.record.Yield_Tonnes_Ha} t/ha
                  </td>
                  <td className="py-3 px-4 font-mono">
                    <span className={a.record.Profit_INR >= 0 ? 'text-slate-800' : 'text-rose-600 font-semibold'}>
                      ₹{Math.round(a.record.Profit_INR).toLocaleString('en-IN')}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{a.record.Rainfall_mm} mm</td>
                  <td className="py-3 px-4">{a.record.Disease_Pest_Risk_pct}%</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium ${
                        a.severity === 'High'
                          ? 'bg-rose-50 text-rose-800 border border-rose-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {a.reason}
                    </span>
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
