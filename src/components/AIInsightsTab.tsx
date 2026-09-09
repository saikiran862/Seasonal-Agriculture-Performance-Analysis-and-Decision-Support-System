import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  FileText,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { OverallKPIs } from '../utils/analytics';
import { SeasonSummary } from '../types/agriculture';

interface AIInsightsTabProps {
  kpis: OverallKPIs;
  seasonSummaries: SeasonSummary[];
}

export const AIInsightsTab: React.FC<AIInsightsTabProps> = ({ kpis, seasonSummaries }) => {
  const [loading, setLoading] = useState(false);
  const [insightData, setInsightData] = useState<{
    executiveSummary: string;
    keyFindings: string[];
    agronomicExplanations: string[];
    riskAssessment: string;
    actionableRecommendations: string[];
    model: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateInsights = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/gemini-insights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          kpis,
          seasonSummaries,
        }),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || `Server responded with status ${response.status}`);
      }

      const data = await response.json();
      setInsightData(data);
    } catch (err: any) {
      console.error('Failed to generate insights:', err);
      setError(err.message || 'Failed to generate AI insights. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="ai-insights-tab-content" className="space-y-6">
      {/* Header & Trigger Section */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-teal-950 text-white rounded-2xl p-6 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Server-Side Gemini 2.5 Flash Agricultural Reasoning Engine</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white">
              AI Agricultural Decision Support & Advisory Generation
            </h2>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              Synthesizes our 4,000-record empirical dataset (yields, water efficiency ratios, profit margins, and pest incidence) using Gemini 2.5 Flash to generate executive agronomic recommendations.
            </p>
          </div>

          <button
            id="generate-ai-insights-btn"
            onClick={handleGenerateInsights}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white shadow-lg transition-all disabled:opacity-50 shrink-0 cursor-pointer"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Analyzing Dataset Patterns...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-emerald-200" />
                <span>Generate AI Agricultural Insight</span>
              </>
            )}
          </button>
        </div>

        {/* Statistical Context Snapshot */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-700/60 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Best Season Fed:</span>
            <span className="font-bold text-emerald-300">{kpis.bestSeason} ({kpis.bestSeasonYield} t/ha)</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Economic Deficit Fed:</span>
            <span className="font-bold text-rose-300">{kpis.weakestEconomicSeason} (-₹24.8k)</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Peak Biological Threat:</span>
            <span className="font-bold text-amber-300">Kharif (54.47% Risk)</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Volumetric Efficiency:</span>
            <span className="font-bold text-teal-300">{kpis.avgWaterEfficiency} t/1000m³</span>
          </div>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="text-xs text-rose-900">
            <span className="font-bold">Error Generating Insights:</span> {error}
            <div className="mt-1 text-rose-700">
              Ensure GEMINI_API_KEY is configured in your project environment settings.
            </div>
          </div>
        </div>
      )}

      {/* Empty State / Prompt to Generate */}
      {!insightData && !loading && !error && (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-xs">
          <Bot className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">
            Ready to Generate Executive Agronomic Insights
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 leading-relaxed">
            Click the button above to synthesize empirical season comparisons, biological risks, and water efficiency metrics into a structured agronomic advisory report.
          </p>
          <div className="mt-5 flex justify-center">
            <button
              onClick={handleGenerateInsights}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 transition-colors"
            >
              <span>Click to Run Gemini 2.5 Flash Advisory</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Generated AI Content Results */}
      {insightData && (
        <div className="space-y-6">
          {/* Executive Summary */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">Executive Agronomic Synthesis</h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                Model: {insightData.model}
              </span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
              {insightData.executiveSummary}
            </p>
          </div>

          {/* Key Findings & Agronomic Explanations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Key Findings */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center gap-2 mb-3 text-slate-900 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Empirical Findings from Calculations</span>
              </div>
              <ul className="space-y-2.5">
                {insightData.keyFindings.map((finding, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{finding}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Possible Agronomic Explanations */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center gap-2 mb-3 text-slate-900 font-bold text-sm">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>Agronomic & Biophysical Explanations</span>
              </div>
              <ul className="space-y-2.5">
                {insightData.agronomicExplanations.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Risk Assessment & Actionable Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Risk Assessment */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center gap-2 mb-3 text-slate-900 font-bold text-sm">
                <ShieldCheck className="w-4 h-4 text-rose-600" />
                <span>Risk & Vulnerability Assessment</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed bg-rose-50/50 p-4 rounded-xl border border-rose-100">
                {insightData.riskAssessment}
              </p>
            </div>

            {/* Actionable Recommendations */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center gap-2 mb-3 text-slate-900 font-bold text-sm">
                <TrendingUp className="w-4 h-4 text-teal-600" />
                <span>Actionable Interventions for Extension Agents</span>
              </div>
              <ul className="space-y-2">
                {insightData.actionableRecommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Academic Attribution Disclaimer */}
          <div className="text-[11px] text-slate-500 text-center py-2">
            Generated via Server-Side Google Gen AI SDK (Gemini 2.5 Flash). Synthesized solely from mathematical aggregations of the benchmark dataset.
          </div>
        </div>
      )}
    </div>
  );
};
