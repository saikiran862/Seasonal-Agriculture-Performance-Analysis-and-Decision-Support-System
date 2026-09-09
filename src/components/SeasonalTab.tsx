import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import {
  Calendar,
  Droplets,
  Coins,
  CloudRain,
  Thermometer,
  ShieldAlert,
  Sprout,
  TrendingUp,
  Percent,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { SeasonSummary, SeasonType } from '../types/agriculture';

interface SeasonalTabProps {
  seasonSummaries: SeasonSummary[];
}

export const SeasonalTab: React.FC<SeasonalTabProps> = ({ seasonSummaries }) => {
  const [selectedSeason, setSelectedSeason] = useState<SeasonType>('Kharif');

  const current = seasonSummaries.find((s) => s.season === selectedSeason) || seasonSummaries[0];

  // Normalized radar data across the 3 seasons for comparison
  const maxVals = {
    yield: Math.max(...seasonSummaries.map((s) => s.avgYield), 1),
    profit: Math.max(...seasonSummaries.map((s) => s.avgProfit), 1),
    waterEff: Math.max(...seasonSummaries.map((s) => s.waterEfficiency), 1),
    rainfall: Math.max(...seasonSummaries.map((s) => s.avgRainfall), 1),
    humidity: Math.max(...seasonSummaries.map((s) => s.avgHumidity), 1),
    pestRisk: Math.max(...seasonSummaries.map((s) => s.avgDiseasePestRisk), 1),
  };

  const radarData = [
    {
      metric: 'Yield',
      Kharif: Math.round(((seasonSummaries.find((s) => s.season === 'Kharif')?.avgYield || 0) / maxVals.yield) * 100),
      Rabi: Math.round(((seasonSummaries.find((s) => s.season === 'Rabi')?.avgYield || 0) / maxVals.yield) * 100),
      Zaid: Math.round(((seasonSummaries.find((s) => s.season === 'Zaid')?.avgYield || 0) / maxVals.yield) * 100),
    },
    {
      metric: 'Profitability',
      Kharif: Math.max(0, Math.round(((seasonSummaries.find((s) => s.season === 'Kharif')?.avgProfit || 0) / maxVals.profit) * 100)),
      Rabi: Math.max(0, Math.round(((seasonSummaries.find((s) => s.season === 'Rabi')?.avgProfit || 0) / maxVals.profit) * 100)),
      Zaid: 0, // Negative profit
    },
    {
      metric: 'Water Efficiency',
      Kharif: Math.round(((seasonSummaries.find((s) => s.season === 'Kharif')?.waterEfficiency || 0) / maxVals.waterEff) * 100),
      Rabi: Math.round(((seasonSummaries.find((s) => s.season === 'Rabi')?.waterEfficiency || 0) / maxVals.waterEff) * 100),
      Zaid: Math.round(((seasonSummaries.find((s) => s.season === 'Zaid')?.waterEfficiency || 0) / maxVals.waterEff) * 100),
    },
    {
      metric: 'Rainfall',
      Kharif: Math.round(((seasonSummaries.find((s) => s.season === 'Kharif')?.avgRainfall || 0) / maxVals.rainfall) * 100),
      Rabi: Math.round(((seasonSummaries.find((s) => s.season === 'Rabi')?.avgRainfall || 0) / maxVals.rainfall) * 100),
      Zaid: Math.round(((seasonSummaries.find((s) => s.season === 'Zaid')?.avgRainfall || 0) / maxVals.rainfall) * 100),
    },
    {
      metric: 'Humidity',
      Kharif: Math.round(((seasonSummaries.find((s) => s.season === 'Kharif')?.avgHumidity || 0) / maxVals.humidity) * 100),
      Rabi: Math.round(((seasonSummaries.find((s) => s.season === 'Rabi')?.avgHumidity || 0) / maxVals.humidity) * 100),
      Zaid: Math.round(((seasonSummaries.find((s) => s.season === 'Zaid')?.avgHumidity || 0) / maxVals.humidity) * 100),
    },
    {
      metric: 'Biological Risk',
      Kharif: Math.round(((seasonSummaries.find((s) => s.season === 'Kharif')?.avgDiseasePestRisk || 0) / maxVals.pestRisk) * 100),
      Rabi: Math.round(((seasonSummaries.find((s) => s.season === 'Rabi')?.avgDiseasePestRisk || 0) / maxVals.pestRisk) * 100),
      Zaid: Math.round(((seasonSummaries.find((s) => s.season === 'Zaid')?.avgDiseasePestRisk || 0) / maxVals.pestRisk) * 100),
    },
  ];

  const seasonalWaterComparison = seasonSummaries.map((s) => ({
    season: s.season,
    'Water Consumption (m³)': s.avgWaterUsed,
    'Efficiency (t/1000m³)': s.waterEfficiency * 1000,
  }));

  return (
    <div id="seasonal-tab-content" className="space-y-6">
      {/* Season Selector Tabs */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Select Cropping Cycle:
          </span>
        </div>

        <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200">
          {(['Kharif', 'Rabi', 'Zaid'] as SeasonType[]).map((season) => (
            <button
              key={season}
              id={`select-season-${season.toLowerCase()}-btn`}
              onClick={() => setSelectedSeason(season)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedSeason === season
                  ? 'bg-white text-emerald-900 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {season}
            </button>
          ))}
        </div>
      </div>

      {/* 11 Season KPI Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        {/* 1. Yield */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium">1. Average Yield</span>
            <Sprout className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl font-bold text-slate-900">{current?.avgYield} <span className="text-xs font-normal text-slate-500">t/ha</span></div>
          <div className="text-[10px] text-slate-400 mt-1">Tonnes per hectare</div>
        </div>

        {/* 2. Production */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium">2. Production</span>
            <TrendingUp className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-xl font-bold text-slate-900">{current?.avgProduction} <span className="text-xs font-normal text-slate-500">t</span></div>
          <div className="text-[10px] text-slate-400 mt-1">Average harvest weight</div>
        </div>

        {/* 3. Revenue */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium">3. Gross Revenue</span>
            <Coins className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-xl font-bold text-slate-900">₹{Math.round((current?.avgRevenue || 0) / 1000)}k</div>
          <div className="text-[10px] text-slate-400 mt-1">₹{Math.round(current?.avgRevenue || 0).toLocaleString('en-IN')}</div>
        </div>

        {/* 4. Cost */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium">4. Total Cost</span>
            <Coins className="w-4 h-4 text-slate-500" />
          </div>
          <div className="text-xl font-bold text-slate-900">₹{Math.round((current?.avgCost || 0) / 1000)}k</div>
          <div className="text-[10px] text-slate-400 mt-1">₹{Math.round(current?.avgCost || 0).toLocaleString('en-IN')}</div>
        </div>

        {/* 5. Profit */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium">5. Net Profit</span>
            <Coins className="w-4 h-4 text-emerald-600" />
          </div>
          <div className={`text-xl font-bold ${current && current.avgProfit >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
            {current && current.avgProfit >= 0 ? `₹${Math.round(current.avgProfit / 1000)}k` : `-₹${Math.abs(Math.round(current?.avgProfit || 0) / 1000)}k`}
          </div>
          <div className="text-[10px] font-semibold text-slate-500 mt-1">
            Margin: {current?.profitMarginPct}%
          </div>
        </div>

        {/* 6. Water Used */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium">6. Water Usage</span>
            <Droplets className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-xl font-bold text-slate-900">{current?.avgWaterUsed} <span className="text-xs font-normal text-slate-500">m³</span></div>
          <div className="text-[10px] text-slate-400 mt-1">Per farm cycle</div>
        </div>

        {/* 7. Water Efficiency */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium">7. Water Efficiency</span>
            <Droplets className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl font-bold text-slate-900">{current?.waterEfficiency}</div>
          <div className="text-[10px] text-slate-400 mt-1">t / 1,000 m³ water</div>
        </div>

        {/* 8. Rainfall */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium">8. Rainfall</span>
            <CloudRain className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-xl font-bold text-slate-900">{current?.avgRainfall} <span className="text-xs font-normal text-slate-500">mm</span></div>
          <div className="text-[10px] text-slate-400 mt-1">Seasonal precipitation</div>
        </div>

        {/* 9. Temperature */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium">9. Temperature</span>
            <Thermometer className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-xl font-bold text-slate-900">{current?.avgTemperature} <span className="text-xs font-normal text-slate-500">°C</span></div>
          <div className="text-[10px] text-slate-400 mt-1">Mean ambient thermal</div>
        </div>

        {/* 10. Humidity */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium">10. Humidity</span>
            <Percent className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-xl font-bold text-slate-900">{current?.avgHumidity}%</div>
          <div className="text-[10px] text-slate-400 mt-1">Relative moisture</div>
        </div>

        {/* 11. Disease / Pest Risk */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs md:col-span-2">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium">11. Disease & Pest Risk Index</span>
            <ShieldAlert className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-xl font-bold text-slate-900">{current?.avgDiseasePestRisk}%</div>
          <div className="text-[10px] text-slate-500 mt-1">
            {selectedSeason === 'Kharif'
              ? '⚠️ High biological pressure (humid monsoon conditions)'
              : 'Moderate biological exposure'}
          </div>
        </div>
      </div>

      {/* Seasonal Profile Context Callout */}
      <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
        <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
          {selectedSeason === 'Kharif' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          ) : selectedSeason === 'Zaid' ? (
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          ) : (
            <Sprout className="w-4 h-4 text-sky-600" />
          )}
          <span>{selectedSeason} Season Agronomic & Economic Diagnosis</span>
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
          {selectedSeason === 'Kharif' &&
            `Kharif stands out as the cornerstone of agricultural productivity in our dataset, yielding 5.64 t/ha with peak farmer revenues (₹7.11 Lakhs) and healthy average profit (₹1.79 Lakhs). Its high water efficiency (5.89 t/1000 m³) is catalyzed by robust monsoon rains (852.08 mm). However, the crucial scientific caveat is that sustained high humidity (71.81%) causes Kharif to register the highest disease/pest vulnerability at 54.47%, necessitating proactive crop protection.`}
          {selectedSeason === 'Rabi' &&
            `Rabi provides high operational stability with 5.08 t/ha yield and a reliable average profit of ₹87,689.47. Cooler ambient temperatures (23.49°C) and moderate humidity (57.89%) suppress pest pressures (40.48%). While rainfall is lower (436.00 mm), water efficiency remains strong at 5.19 t/1000 m³, making Rabi a resilient intermediate production cycle.`}
          {selectedSeason === 'Zaid' &&
            `Zaid presents severe structural and economic challenges. Farms incur an average net loss of -₹24,804.82 and experience the lowest water efficiency (4.41 t/1000 m³), despite absorbing high water volume (6419.89 m³). High summer heat (31.04°C) elevates evaporative losses, while market prices fail to offset irrigation and input expenses. Strategic shift toward drought-tolerant cultivars and precision drip irrigation is strongly recommended.`}
        </p>
      </div>

      {/* Visual Comparison: Radar & Bar Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Profile: 3-Season Multi-Attribute Comparison */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">3-Season Normalized Profile</h3>
              <p className="text-xs text-slate-500">Multi-criteria polygon showing relative seasonal strengths</p>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} outerRadius="75%">
                <PolarGrid stroke="#E2E8F0" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: '#475569', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} />
                <Radar name="Kharif" dataKey="Kharif" stroke="#059669" fill="#10B981" fillOpacity={0.4} />
                <Radar name="Rabi" dataKey="Rabi" stroke="#0284C7" fill="#38BDF8" fillOpacity={0.3} />
                <Radar name="Zaid" dataKey="Zaid" stroke="#D97706" fill="#FBBF24" fillOpacity={0.2} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Water Consumption vs Efficiency Comparison */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Water Consumption vs Efficiency</h3>
              <p className="text-xs text-slate-500">Volumetric water volume (m³) compared across seasons</p>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={seasonalWaterComparison} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="season" tickLine={false} tick={{ fill: '#475569', fontSize: 12 }} />
                <YAxis tickLine={false} tick={{ fill: '#475569', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', color: '#F8FAFC', borderRadius: '8px', border: 'none', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="Water Consumption (m³)" fill="#0D9488" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
