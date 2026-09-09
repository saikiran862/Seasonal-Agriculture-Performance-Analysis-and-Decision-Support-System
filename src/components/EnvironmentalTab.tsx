import React, { useMemo } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import {
  CloudRain,
  Thermometer,
  Droplets,
  Wind,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { FarmRecord } from '../types/agriculture';
import { getEnvironmentalCorrelations } from '../utils/analytics';

interface EnvironmentalTabProps {
  records: FarmRecord[];
}

export const EnvironmentalTab: React.FC<EnvironmentalTabProps> = ({ records }) => {
  const { features, matrix, flatPairs } = useMemo(() => {
    return getEnvironmentalCorrelations(records);
  }, [records]);

  // Downsample to 200 representative points for responsive high-performance scatter rendering
  const scatterPoints = useMemo(() => {
    const step = Math.max(1, Math.floor(records.length / 200));
    return records.filter((_, idx) => idx % step === 0).map((r) => ({
      rainfall: r.Rainfall_mm,
      yield: r.Yield_Tonnes_Ha,
      temp: r.Avg_Temperature_C,
      humidity: r.Humidity_pct,
      moisture: r.Soil_Moisture_pct,
      season: r.Season,
      crop: r.Crop,
      farmId: r.Farm_ID,
    }));
  }, [records]);

  // Heatmap color helper
  const getCorrColor = (val: number) => {
    if (val === 1) return 'bg-slate-200 text-slate-800 font-bold';
    if (val > 0.6) return 'bg-emerald-600 text-white font-bold';
    if (val > 0.3) return 'bg-emerald-400 text-slate-900 font-semibold';
    if (val > 0.05) return 'bg-emerald-100 text-emerald-900';
    if (val > -0.05) return 'bg-slate-100 text-slate-500';
    if (val > -0.3) return 'bg-rose-100 text-rose-900';
    if (val > -0.6) return 'bg-rose-400 text-white font-semibold';
    return 'bg-rose-600 text-white font-bold';
  };

  return (
    <div id="environmental-tab-content" className="space-y-6">
      {/* Crucial Academic Banner: Association vs Causation */}
      <div className="bg-amber-50 border border-amber-300/80 rounded-2xl p-4 flex items-start gap-3 shadow-xs">
        <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-950">
          <div className="font-bold text-amber-900 uppercase tracking-wide flex items-center gap-1.5">
            <span>Academic Rigor Note: Correlation Shows Association, Not Causation</span>
          </div>
          <p className="mt-1 leading-relaxed text-amber-900/90">
            Linear Pearson correlation coefficients quantify statistical co-movement across agricultural variables (e.g., higher rainfall co-occurring with Kharif yields). As documented in our B.Tech project methodology, these associations do not constitute mechanistic proof of unilateral causality. Environmental outcomes in agriculture result from multifactorial interactions between photoperiod, soil chemistry, and micro-climate.
          </p>
        </div>
      </div>

      {/* 4 Scatter / Trend Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Rainfall vs Yield */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <CloudRain className="w-4 h-4 text-sky-600" />
              <div>
                <h3 className="text-sm font-bold text-slate-900">Rainfall (mm) vs Yield (t/ha)</h3>
                <p className="text-xs text-slate-500">Monsoon precipitation association with harvest volume</p>
              </div>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
              Positive Linear Trend
            </span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis
                  type="number"
                  dataKey="rainfall"
                  name="Rainfall"
                  unit=" mm"
                  tick={{ fill: '#475569', fontSize: 11 }}
                  label={{ value: 'Precipitation (mm)', position: 'insideBottom', offset: -10, fontSize: 11, fill: '#64748B' }}
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
                        <div className="font-bold">{d.farmId} ({d.crop} - {d.season})</div>
                        <div>Rainfall: {d.rainfall} mm</div>
                        <div>Yield: {d.yield} t/ha</div>
                      </div>
                    );
                  }}
                />
                <Scatter name="Farms" data={scatterPoints} fill="#0284C7" opacity={0.65} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Temperature vs Yield */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-rose-500" />
              <div>
                <h3 className="text-sm font-bold text-slate-900">Temperature (°C) vs Yield (t/ha)</h3>
                <p className="text-xs text-slate-500">Thermal band sensitivity and summer evaporative stress</p>
              </div>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-rose-50 text-rose-700 font-semibold border border-rose-200">
              High Temp Stress in Zaid
            </span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis
                  type="number"
                  dataKey="temp"
                  name="Temperature"
                  unit=" °C"
                  tick={{ fill: '#475569', fontSize: 11 }}
                  label={{ value: 'Avg Temperature (°C)', position: 'insideBottom', offset: -10, fontSize: 11, fill: '#64748B' }}
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
                        <div className="font-bold">{d.farmId} ({d.crop} - {d.season})</div>
                        <div>Temperature: {d.temp} °C</div>
                        <div>Yield: {d.yield} t/ha</div>
                      </div>
                    );
                  }}
                />
                <Scatter name="Farms" data={scatterPoints} fill="#EF4444" opacity={0.65} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Soil Moisture vs Yield */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-teal-600" />
              <div>
                <h3 className="text-sm font-bold text-slate-900">Soil Moisture (%) vs Yield (t/ha)</h3>
                <p className="text-xs text-slate-500">Root-zone hydration dynamics across soil strata</p>
              </div>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis
                  type="number"
                  dataKey="moisture"
                  name="Soil Moisture"
                  unit="%"
                  tick={{ fill: '#475569', fontSize: 11 }}
                  label={{ value: 'Soil Moisture (%)', position: 'insideBottom', offset: -10, fontSize: 11, fill: '#64748B' }}
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
                        <div className="font-bold">{d.farmId} ({d.crop} - {d.season})</div>
                        <div>Soil Moisture: {d.moisture}%</div>
                        <div>Yield: {d.yield} t/ha</div>
                      </div>
                    );
                  }}
                />
                <Scatter name="Farms" data={scatterPoints} fill="#0D9488" opacity={0.65} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Humidity vs Yield */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Wind className="w-4 h-4 text-indigo-600" />
              <div>
                <h3 className="text-sm font-bold text-slate-900">Humidity (%) vs Yield (t/ha)</h3>
                <p className="text-xs text-slate-500">Atmospheric vapor saturation and agronomic output</p>
              </div>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis
                  type="number"
                  dataKey="humidity"
                  name="Humidity"
                  unit="%"
                  tick={{ fill: '#475569', fontSize: 11 }}
                  label={{ value: 'Atmospheric Humidity (%)', position: 'insideBottom', offset: -10, fontSize: 11, fill: '#64748B' }}
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
                        <div className="font-bold">{d.farmId} ({d.crop} - {d.season})</div>
                        <div>Humidity: {d.humidity}%</div>
                        <div>Yield: {d.yield} t/ha</div>
                      </div>
                    );
                  }}
                />
                <Scatter name="Farms" data={scatterPoints} fill="#6366F1" opacity={0.65} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Correlation Matrix Heatmap */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="px-5 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Pearson Correlation Matrix (r)
            </h3>
            <p className="text-xs text-slate-500">
              Pairwise linear association coefficients between environmental, input, and production variables
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="w-3 h-3 rounded bg-emerald-600" />
            <span className="text-slate-600 font-medium">Positive (+r)</span>
            <span className="w-3 h-3 rounded bg-rose-600 ml-2" />
            <span className="text-slate-600 font-medium">Negative (-r)</span>
          </div>
        </div>

        <div className="overflow-x-auto p-4">
          <table className="w-full text-xs text-center border-collapse">
            <thead>
              <tr>
                <th className="py-2.5 px-3 font-bold text-slate-700 text-left w-28">Variable</th>
                {features.map((feat) => (
                  <th key={feat} className="py-2.5 px-2 font-bold text-slate-700 text-center">
                    {feat}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((rowFeat, i) => (
                <tr key={rowFeat} className="border-t border-slate-100">
                  <td className="py-2.5 px-3 font-semibold text-slate-900 text-left bg-slate-50/50">
                    {rowFeat}
                  </td>
                  {features.map((_, j) => {
                    const val = matrix[i]?.[j] ?? 0;
                    return (
                      <td key={`${i}_${j}`} className="p-1">
                        <div
                          className={`py-1.5 px-2 rounded font-mono text-[11px] ${getCorrColor(val)}`}
                          title={`${rowFeat} × ${features[j]}: r = ${val}`}
                        >
                          {val.toFixed(2)}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Top Associated Pairs List */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/50">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Top Statistical Associations Detected
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-xs">
            {flatPairs.slice(0, 4).map((p, idx) => (
              <div key={idx} className="bg-white p-2.5 rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-800">{p.featureA}</span>
                  <span className="text-slate-400 mx-1">↔</span>
                  <span className="font-semibold text-slate-800">{p.featureB}</span>
                </div>
                <span className={`font-mono font-bold ${p.coefficient >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                  {p.coefficient > 0 ? `+${p.coefficient}` : p.coefficient}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
