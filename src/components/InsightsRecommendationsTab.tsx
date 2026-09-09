import React from 'react';
import {
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  Droplets,
  ShieldAlert,
  Sprout,
  Trophy,
  TrendingDown,
  ArrowRight,
} from 'lucide-react';
import { OverallKPIs, ActionableRecommendation } from '../utils/analytics';
import { SeasonSummary } from '../types/agriculture';

interface InsightsRecommendationsTabProps {
  kpis: OverallKPIs;
  recommendations: ActionableRecommendation[];
  seasonSummaries: SeasonSummary[];
}

export const InsightsRecommendationsTab: React.FC<InsightsRecommendationsTabProps> = ({
  kpis,
  recommendations,
  seasonSummaries,
}) => {
  return (
    <div id="insights-recommendations-tab-content" className="space-y-6">
      {/* Executive Decision Matrix Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Dominant Season */}
        <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-2xs">
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Trophy className="w-4 h-4 text-emerald-600" />
            <span>Optimal Cropping Cycle</span>
          </div>
          <div className="text-xl font-black text-slate-900">{kpis.bestSeason} Season</div>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            Dominates with {kpis.bestSeasonYield} t/ha average yield, ₹{Math.round(kpis.bestSeasonProfit).toLocaleString('en-IN')} net profit, and 5.89 t/1000m³ water efficiency.
          </p>
          <div className="mt-3 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-1 rounded inline-block">
            Priority for high-yield cereal & cash crops
          </div>
        </div>

        {/* Card 2: Deficit Window */}
        <div className="bg-white p-5 rounded-2xl border border-rose-200 shadow-2xs">
          <div className="flex items-center gap-2 text-rose-700 text-xs font-bold uppercase tracking-wider mb-2">
            <TrendingDown className="w-4 h-4 text-rose-600" />
            <span>Economic Deficit Window</span>
          </div>
          <div className="text-xl font-black text-slate-900">{kpis.weakestEconomicSeason} Season</div>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            Averages net loss (-₹24,805) and lowest water efficiency (4.41 t/1000m³) driven by high evaporative thermal stress.
          </p>
          <div className="mt-3 text-[11px] font-semibold text-rose-800 bg-rose-50 px-2 py-1 rounded inline-block">
            Restructure or mandate precision drip
          </div>
        </div>

        {/* Card 3: Pest Risk Vulnerability */}
        <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-2xs">
          <div className="flex items-center gap-2 text-amber-700 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            <span>Biological Risk Peak</span>
          </div>
          <div className="text-xl font-black text-slate-900">Kharif Pathogen Exposure</div>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            54.47% disease/pest incidence during monsoon months due to 71.8% ambient relative humidity.
          </p>
          <div className="mt-3 text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-1 rounded inline-block">
            Pre-monsoon fungicide & IPM schedule
          </div>
        </div>

        {/* Card 4: Water Stewardship */}
        <div className="bg-white p-5 rounded-2xl border border-teal-200 shadow-2xs">
          <div className="flex items-center gap-2 text-teal-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Droplets className="w-4 h-4 text-teal-600" />
            <span>Irrigation Technology</span>
          </div>
          <div className="text-xl font-black text-slate-900">Drip & Sprinkler Superiority</div>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            Micro-irrigation techniques demonstrate up to 35% higher water productivity over traditional flood/canal channels.
          </p>
          <div className="mt-3 text-[11px] font-semibold text-teal-800 bg-teal-50 px-2 py-1 rounded inline-block">
            Target 100% micro-irrigation in summer
          </div>
        </div>
      </div>

      {/* Structured Actionable Recommendations by Domain */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="px-5 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>Tailored Agronomic & Policy Recommendations</span>
            </h3>
            <p className="text-xs text-slate-500">
              Prescriptive guidance derived from empirical multivariate analysis
            </p>
          </div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
            DSS Output
          </span>
        </div>

        <div className="divide-y divide-slate-100 p-2">
          {recommendations.map((rec) => (
            <div key={rec.id} className="p-4 hover:bg-slate-50/70 transition-colors rounded-xl">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      rec.priority === 'High'
                        ? 'bg-rose-100 text-rose-800'
                        : rec.priority === 'Medium'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {rec.priority} Priority
                  </span>
                  <span className="text-xs font-bold text-slate-500 font-mono">
                    [{rec.category}]
                  </span>
                  <h4 className="text-sm font-bold text-slate-900">{rec.title}</h4>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed pl-1">{rec.recommendation}</p>

              <div className="mt-2.5 pl-1 flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Expected Agronomic Impact: {rec.impact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
