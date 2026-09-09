import React from 'react';
import {
  GraduationCap,
  Award,
  Mic,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles,
  ShieldAlert,
  BarChart3,
  FileCheck,
  Building,
} from 'lucide-react';
import { DATASET_COLUMNS } from '../types/agriculture';

export const ProjectShowcaseTab: React.FC = () => {
  return (
    <div id="project-showcase-tab-content" className="space-y-6 max-w-5xl mx-auto">
      {/* Hero Certificate Style Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg border border-emerald-800/50 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>B.Tech Final Year Capstone Project</span>
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-800/80 text-slate-300 border border-slate-700">
              JNTUH Curriculum 2026–27
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-2">
            Seasonal Agriculture Performance Analysis and Decision Support System
          </h1>
          <p className="text-emerald-200/90 text-sm sm:text-base italic mt-1 font-light">
            "Data-driven insights for better seasonal agricultural planning."
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-emerald-800/60 text-xs">
            <div>
              <span className="text-emerald-400 font-medium block">Student Researcher:</span>
              <span className="font-bold text-white text-sm">GIDDAM SAIKIRAN</span>
            </div>
            <div>
              <span className="text-emerald-400 font-medium block">Student Identification:</span>
              <span className="font-mono text-emerald-300 font-semibold text-xs">
                STU67627f99c8c1f1734508441
              </span>
            </div>
            <div>
              <span className="text-emerald-400 font-medium block">Academic Department:</span>
              <span className="font-semibold text-slate-200">CSE – Data Science</span>
            </div>
            <div>
              <span className="text-emerald-400 font-medium block">Affiliation:</span>
              <span className="font-semibold text-slate-200">KG Reddy College of Engg. & Tech.</span>
            </div>
          </div>
        </div>
      </div>

      {/* 30-Second Viva Pitch Script Box */}
      <div className="bg-amber-50/80 border border-amber-300 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center gap-2 text-amber-900 font-bold text-sm mb-2">
          <Mic className="w-4 h-4 text-amber-700" />
          <span>30-Second Oral Viva Presentation Script</span>
          <span className="ml-auto text-[11px] font-mono bg-amber-200/60 px-2 py-0.5 rounded text-amber-900 font-semibold">
            Memorized Elevator Pitch
          </span>
        </div>
        <blockquote className="text-xs sm:text-sm text-amber-950 font-serif leading-relaxed italic bg-white p-4 rounded-xl border border-amber-200">
          "Good morning/afternoon, Sir/Madam. My project is titled{' '}
          <strong className="font-semibold text-amber-950 font-sans">
            Seasonal Agriculture Performance Analysis and Decision Support System
          </strong>
          . In this project, we analyzed agricultural performance across Kharif, Rabi, and Zaid
          seasons using a 4,000-record dataset with 28 variables. We evaluated yield, profitability,
          environmental factors, resource use, and risk. Based on ANOVA and statistical comparison,
          Kharif emerged as the best overall season with an average yield of 5.64 t/ha and profit of
          ₹178,914.65, while Zaid showed the weakest economic performance. To make this actionable,
          we developed an interactive decision support dashboard and integrated AI-assisted
          agronomic recommendations. Thank you."
        </blockquote>
      </div>

      {/* Problem Statement & Research Objectives */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-3 text-slate-900 font-bold text-sm">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>Problem Statement</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Agricultural productivity across Indian farming agro-climatic zones suffers from severe
            seasonal variability, uncoordinated irrigation scheduling, and acute market price
            volatility. Farmers frequently incur catastrophic seasonal debt—most visibly during the
            summer Zaid window—due to lack of quantitative, multi-criteria decision support systems
            that balance agronomic yield against input expenditures and biological pathogen risks.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-3 text-slate-900 font-bold text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Core Research Objectives</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
              <span>
                <strong>Seasonal Stratification:</strong> Quantify productivity variations between
                Kharif, Rabi, and Zaid cropping cycles.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
              <span>
                <strong>Hydrological Productivity:</strong> Measure volumetric water efficiency (t/1,000 m³) across 5 irrigation technologies.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
              <span>
                <strong>Statistical Validation:</strong> Apply ANOVA and Pearson correlation to test significant yield divergence.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
              <span>
                <strong>Actionable DSS Interface:</strong> Deliver an interactive web dashboard with server-side AI synthesis.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Dataset Schema: 28 Variables Architecture */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="px-5 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>Dataset Architecture: 28 Variables × 4,000 Records</span>
            </h3>
            <p className="text-xs text-slate-500">
              Categorized into 6 logical agronomic, environmental, and financial dimensions
            </p>
          </div>
          <span className="text-xs font-mono bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
            Full 28 Schema
          </span>
        </div>

        <div className="overflow-x-auto p-4">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 font-semibold text-slate-700">
                <th className="py-2 px-3">Category</th>
                <th className="py-2 px-3">Variable Name</th>
                <th className="py-2 px-3">Data Type</th>
                <th className="py-2 px-3">Measurement Unit / Domain</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {DATASET_COLUMNS.map((col, idx) => (
                <tr key={col.name} className="hover:bg-slate-50">
                  <td className="py-1.5 px-3 font-semibold text-emerald-900">{col.category}</td>
                  <td className="py-1.5 px-3 font-mono font-bold text-slate-900">{col.name}</td>
                  <td className="py-1.5 px-3 font-mono text-slate-500 text-[11px]">{col.type}</td>
                  <td className="py-1.5 px-3 text-slate-600">{col.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Statistical Methodology & Academic Integrity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Statistical Formulations */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-3 text-slate-900 font-bold text-sm">
            <BarChart3 className="w-4 h-4 text-emerald-600" />
            <span>Statistical Testing & Methodology</span>
          </div>

          <div className="space-y-3 text-xs text-slate-700">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="font-bold text-slate-900">1. One-Way ANOVA (F-Test)</div>
              <p className="text-[11px] text-slate-600 mt-1">
                Null hypothesis: H₀: μ_kharif = μ_rabi = μ_zaid. Evaluates whether seasonal yield differences are statistically significant or random.
              </p>
              <div className="text-[10px] font-mono text-emerald-700 font-semibold mt-1">
                Result: F-statistic = 142.8, p-value &lt; 0.001 (Reject H₀; significant variation).
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="font-bold text-slate-900">2. Pearson Correlation Coefficient (r)</div>
              <p className="text-[11px] text-slate-600 mt-1">
                Evaluates linear associations between continuous variables: Rainfall, Temperature, Soil Moisture, Fertilizer, and Yield.
              </p>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="font-bold text-slate-900">3. Tukey's Interquartile Range (IQR) Outliers</div>
              <p className="text-[11px] text-slate-600 mt-1">
                Detects non-parametric outliers using Q1 - 1.5×IQR and Q3 + 1.5×IQR boundaries without assuming a normal distribution.
              </p>
            </div>
          </div>
        </div>

        {/* Academic Integrity & Scope Defense */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-3 text-slate-900 font-bold text-sm">
            <FileCheck className="w-4 h-4 text-emerald-600" />
            <span>Scope Boundary: Implemented vs Future Work</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="border border-emerald-200 bg-emerald-50/50 p-3 rounded-xl">
              <span className="font-bold text-emerald-900 block mb-1">
                ✓ What Is Strictly Implemented (Present Scope):
              </span>
              <ul className="space-y-1 text-slate-700 text-[11px]">
                <li>• Automated Data Preprocessing & Median Imputation</li>
                <li>• Descriptive, Inferential, and Diagnostic Statistics (ANOVA, Pearson)</li>
                <li>• IQR Mathematical Anomaly Detection Audit Log</li>
                <li>• Multi-Criteria Season Benchmarking (Yield, Profit, Water Eff)</li>
                <li>• Server-Side Gemini 2.5 Flash Agronomic Synthesis Engine</li>
              </ul>
            </div>

            <div className="border border-amber-200 bg-amber-50/50 p-3 rounded-xl">
              <span className="font-bold text-amber-900 block mb-1">
                ⚠ Viva Defense Rule: What NOT to Claim:
              </span>
              <ul className="space-y-1 text-amber-950 text-[11px]">
                <li>
                  • <strong>Do NOT claim Machine Learning predictive modeling:</strong> This is a Decision Support System (DSS) using exploratory and inferential data science.
                </li>
                <li>
                  • <strong>Do NOT claim causation from correlation:</strong> Association between rainfall and Kharif yield does not constitute unilateral causality.
                </li>
                <li>
                  • <strong>Proposed Future Scope:</strong> Integration of physical IoT soil probes, real-time satellite remote sensing, and supervised Random Forest regressors.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
