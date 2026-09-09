import React from 'react';
import {
  Layers,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  FileCode2,
  Calculator,
  ShieldCheck,
  Binary,
  GitBranch,
} from 'lucide-react';
import { DATASET_COLUMNS } from '../../types/agriculture';

export const MethodologyPage: React.FC = () => {
  return (
    <div id="methodology-page-container" className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">
          <Layers className="w-4 h-4 text-emerald-700" />
          <span>Academic & Scientific Documentation</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Research Methodology & System Architecture
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
          Comprehensive technical and mathematical documentation of data cleaning, statistical inferencing, anomaly detection algorithms, and the 28-variable agricultural schema.
        </p>
      </div>

      {/* Analytical Workflow Pipeline */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <GitBranch className="w-5 h-5 text-emerald-700" />
          <span>End-to-End Analytical Pipeline</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-7 h-7 rounded-full bg-emerald-800 text-white font-bold text-xs flex items-center justify-center mb-2">
              1
            </div>
            <h3 className="font-bold text-xs text-slate-900">Data Preprocessing</h3>
            <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
              Automated median imputation for null numerical cells, string trimming, duplicate row deduplication, and schema validation against the 28-variable specification.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-7 h-7 rounded-full bg-emerald-800 text-white font-bold text-xs flex items-center justify-center mb-2">
              2
            </div>
            <h3 className="font-bold text-xs text-slate-900">Inferential Testing (ANOVA)</h3>
            <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
              One-Way ANOVA hypothesis testing evaluating whether seasonal yield variance across Kharif, Rabi, and Zaid exceeds within-group randomness ($F$-statistic with $p &lt; 0.001$).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-7 h-7 rounded-full bg-emerald-800 text-white font-bold text-xs flex items-center justify-center mb-2">
              3
            </div>
            <h3 className="font-bold text-xs text-slate-900">Diagnostic Correlation</h3>
            <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
              $8 \times 8$ Pearson correlation matrix ($r$) mapping continuous associations between rainfall, temperature, soil moisture, fertilizer, water usage, and crop yield.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-7 h-7 rounded-full bg-emerald-800 text-white font-bold text-xs flex items-center justify-center mb-2">
              4
            </div>
            <h3 className="font-bold text-xs text-slate-900">Multi-Criteria DSS & AI</h3>
            <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
              Composite weighting formula (Yield 40%, Profit 40%, Water Efficiency 20%) combined with server-side Gemini 2.5 Flash for context-aware agronomic advisory.
            </p>
          </div>
        </div>
      </div>

      {/* Mathematical Formulations & Statistical Rigor */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ANOVA Formulation */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <Calculator className="w-4 h-4 text-emerald-700" />
            <span>1. One-Way Analysis of Variance (ANOVA)</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Tests the null hypothesis that seasonal yields share equal population means:
          </p>
          <div className="bg-slate-50 p-3 rounded-xl font-mono text-xs text-slate-800 border border-slate-200 text-center">
            H₀: μ_kharif = μ_rabi = μ_zaid
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            The variance ratio is computed as Mean Square Between ($MS_B$) divided by Mean Square Within ($MS_W$):
          </p>
          <div className="bg-slate-50 p-3 rounded-xl font-mono text-[11px] text-slate-800 border border-slate-200">
            <div>SS_between = Σ n_i (ȳ_i - ȳ)² &nbsp;&nbsp;(df = k - 1 = 2)</div>
            <div className="mt-1">SS_within = Σ Σ (y_ij - ȳ_i)² &nbsp;&nbsp;(df = N - k = 3997)</div>
            <div className="mt-1.5 font-bold text-emerald-800">F = MS_between / MS_within &gt;&gt; 3.0 (p &lt; 0.001)</div>
          </div>
          <p className="text-[11px] text-slate-500 italic">
            Conclusion: The null hypothesis is decisively rejected; seasonal yield variations are statistically significant.
          </p>
        </div>

        {/* Pearson Correlation & IQR Formula */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <Binary className="w-4 h-4 text-emerald-700" />
            <span>2. Pearson Correlation & IQR Anomaly Bounds</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Linear association between continuous variables $X$ and $Y$:
          </p>
          <div className="bg-slate-50 p-3 rounded-xl font-mono text-[11px] text-slate-800 border border-slate-200 text-center">
            r = Σ[(x - x̄)(y - ȳ)] / √[Σ(x - x̄)² · Σ(y - ȳ)²]
          </div>
          <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200 text-[11px] text-amber-900">
            <strong>Scientific Rigor Note:</strong> Correlation indicates association, not causality. High rainfall in Kharif accompanies high yields, but does not unilaterally cause it without soil fertility and pest controls.
          </div>
          <p className="text-xs text-slate-600 leading-relaxed pt-1">
            <strong>Tukey's IQR Outlier Detection:</strong>
          </p>
          <div className="bg-slate-50 p-2.5 rounded-xl font-mono text-[11px] text-slate-800 border border-slate-200">
            IQR = Q3 - Q1; Lower = Q1 - 1.5×IQR; Upper = Q3 + 1.5×IQR
          </div>
        </div>
      </div>

      {/* Complete 28 Variables Specification Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="px-6 py-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
              <FileCode2 className="w-4 h-4 text-emerald-700" />
              <span>Full 28-Variable Architecture Schema</span>
            </h2>
            <p className="text-xs text-slate-500">
              Categorized across Identifier, Geographic, Cropping, Environmental, Edaphic, Resource, and Economic dimensions
            </p>
          </div>
          <span className="text-xs font-mono bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full">
            28 Variables
          </span>
        </div>

        <div className="overflow-x-auto p-4">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 font-semibold text-slate-700 bg-slate-50/50">
                <th className="py-2.5 px-3">#</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Variable Name</th>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3">Unit / Domain Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {DATASET_COLUMNS.map((col, idx) => (
                <tr key={col.name} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2 px-3 text-slate-400 font-mono text-[11px]">{idx + 1}</td>
                  <td className="py-2 px-3 font-semibold text-emerald-900">{col.category}</td>
                  <td className="py-2 px-3 font-mono font-bold text-slate-900">{col.name}</td>
                  <td className="py-2 px-3 font-mono text-slate-500 text-[11px]">{col.type}</td>
                  <td className="py-2 px-3 text-slate-600">{col.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
