import React from 'react';
import {
  LayoutDashboard,
  Calendar,
  Wheat,
  CloudRain,
  Droplets,
  ShieldAlert,
  Coins,
  Sparkles,
  ArrowRight,
  Award,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  FileSpreadsheet,
  GraduationCap,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { OverallKPIs, SeasonSummary } from '../../types/agriculture';
import { User } from '../../types/auth';

interface HomePageProps {
  kpis: OverallKPIs;
  seasonSummaries: SeasonSummary[];
  currentUser: User | null;
  onNavigateTab: (tabId: string) => void;
  onNavigatePage: (pageId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  kpis,
  seasonSummaries,
  currentUser,
  onNavigateTab,
  onNavigatePage,
}) => {
  const kharif = seasonSummaries.find((s) => s.season === 'Kharif');
  const rabi = seasonSummaries.find((s) => s.season === 'Rabi');
  const zaid = seasonSummaries.find((s) => s.season === 'Zaid');

  return (
    <div id="home-page-container" className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 text-white rounded-3xl p-6 sm:p-12 shadow-xl border border-emerald-800/50 overflow-hidden">
        <div className="absolute -top-12 -right-12 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>B.Tech Capstone Academic Project (2026–27)</span>
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-800/80 text-slate-300 border border-slate-700">
              JNTUH Curriculum
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Seasonal Agriculture Performance Analysis & Decision Support System
          </h1>

          <p className="text-emerald-100/90 text-sm sm:text-base md:text-lg mt-3 font-light leading-relaxed">
            Data-driven insights for better seasonal agricultural planning across Kharif, Rabi, and Zaid seasons. Built with empirical benchmarking across 4,000 records and 28 variables.
          </p>

          {/* User Welcome badge if logged in */}
          {currentUser && (
            <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-900/60 border border-emerald-700/60 text-xs text-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Authenticated Researcher: <strong>{currentUser.name}</strong> ({currentUser.role})</span>
            </div>
          )}

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 mt-8">
            <button
              onClick={() => onNavigatePage('dashboard')}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <span>Launch Analytics Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigatePage('methodology')}
              className="px-5 py-3 bg-slate-800/80 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm rounded-xl border border-slate-700 transition-all flex items-center gap-2"
            >
              <span>Research Methodology & 28 Schema</span>
            </button>

            <button
              onClick={() => onNavigatePage('about')}
              className="px-5 py-3 bg-transparent hover:bg-white/10 text-emerald-300 font-semibold text-xs sm:text-sm rounded-xl border border-emerald-700/60 transition-all flex items-center gap-2"
            >
              <span>Viva Pitch & Team</span>
            </button>
          </div>
        </div>

        {/* Researcher Credit Pill in Hero */}
        <div className="mt-8 pt-6 border-t border-emerald-800/60 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300">
          <div>
            <span className="text-emerald-400 font-medium">Student Researcher:</span>{' '}
            <strong className="text-white">GIDDAM SAIKIRAN</strong> (STU67627f99c8c1f1734508441)
          </div>
          <div>
            <span className="text-emerald-400 font-medium">Institution:</span>{' '}
            <span>KG Reddy College of Engineering & Technology, JNTUH</span>
          </div>
        </div>
      </section>

      {/* High-Level Verified Dataset Metrics */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Benchmark Dataset</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">4,000</div>
          <div className="text-xs text-emerald-700 font-semibold mt-1">Verified farm records</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Analytical Schema</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">28</div>
          <div className="text-xs text-slate-600 mt-1">Agronomic variables</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Seasonal Cycles</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-800 mt-1">3 Seasons</div>
          <div className="text-xs text-slate-600 mt-1">Kharif, Rabi, and Zaid</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Statistical Rigor</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">p &lt; 0.001</div>
          <div className="text-xs text-emerald-700 font-semibold mt-1">One-Way ANOVA Validated</div>
        </div>
      </section>

      {/* 4 Core Empirical Discoveries */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="mb-6">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            Empirical Findings
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            Major Agricultural Discoveries & Diagnoses
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Statistical synthesis derived from the multi-criteria analysis of Indian agricultural cycles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Finding 1: Kharif Peak */}
          <div className="p-5 rounded-2xl border border-emerald-200 bg-emerald-50/40 hover:bg-emerald-50/70 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-200">
                Peak Performer
              </span>
              <span className="text-xs font-mono font-bold text-emerald-800">Yield: 5.64 t/ha</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">Kharif Seasonal Superiority</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Kharif emerges as the most productive and financially rewarding season with an average yield of 5.64 t/ha and net profit of ₹178,914.65 per farm. Favorable monsoon precipitation (852 mm) and elevated water efficiency (5.89 t/1,000 m³) drive its dominance.
            </p>
          </div>

          {/* Finding 2: Biological Paradox */}
          <div className="p-5 rounded-2xl border border-amber-200 bg-amber-50/40 hover:bg-amber-50/70 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200">
                Biological Paradox
              </span>
              <span className="text-xs font-mono font-bold text-amber-900">Risk: 54.47%</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">The Kharif Disease Risk Paradox</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Despite leading in yield, Kharif demonstrates the highest vulnerability to crop disease and pest attacks (54.47%). High sustained humidity (71.8%) and elevated temperatures create ideal pathogen incubation conditions, necessitating prophylactic IPM intervention.
            </p>
          </div>

          {/* Finding 3: Zaid Deficit */}
          <div className="p-5 rounded-2xl border border-rose-200 bg-rose-50/40 hover:bg-rose-50/70 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-900 border border-rose-200">
                Economic Deficit
              </span>
              <span className="text-xs font-mono font-bold text-rose-800">Loss: -₹24,804.82</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">Zaid Summer Vulnerability</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Zaid represents the weakest economic season, recording an average net deficit of -₹24,804.82 per farm and lowest water productivity (4.41 t/1,000 m³). Extreme summer heat (31.0°C) and low rainfall (299 mm) cause excessive input costs without yield parity.
            </p>
          </div>

          {/* Finding 4: Irrigation Technology */}
          <div className="p-5 rounded-2xl border border-sky-200 bg-sky-50/40 hover:bg-sky-50/70 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-100 text-sky-900 border border-sky-200">
                Hydrological Impact
              </span>
              <span className="text-xs font-mono font-bold text-sky-800">+28% Water Efficiency</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">Micro-Irrigation Supremacy</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Drip and Sprinkler micro-irrigation systems deliver up to 28% higher water productivity than conventional flood/canal methods. Transitioning Zaid farms to drip irrigation is the primary empirical recommendation to reverse summer deficits.
            </p>
          </div>
        </div>
      </section>

      {/* Direct Module Links to Analytics Tabs */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Decision Support Modules</h2>
            <p className="text-xs text-slate-500">
              Direct access into specialized analytical views within the dashboard.
            </p>
          </div>
          <button
            onClick={() => onNavigatePage('dashboard')}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
          >
            <span>Open Full Dashboard</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              id: 'overview',
              name: 'Executive Overview',
              icon: LayoutDashboard,
              desc: 'Executive KPIs, best season indicator, and multi-variable comparison.',
              color: 'text-emerald-600 bg-emerald-50',
            },
            {
              id: 'seasonal',
              name: 'Seasonal Analysis',
              icon: Calendar,
              desc: '11 seasonal parameters compared across Kharif, Rabi, and Zaid.',
              color: 'text-blue-600 bg-blue-50',
            },
            {
              id: 'crop',
              name: 'Crop × Season Matrix',
              icon: Wheat,
              desc: '15 crop varieties analyzed for yield and profit across growing cycles.',
              color: 'text-amber-600 bg-amber-50',
            },
            {
              id: 'environmental',
              name: 'Environmental & Correlation',
              icon: CloudRain,
              desc: 'Pearson 8×8 correlation matrix linking weather and soil to yield.',
              color: 'text-cyan-600 bg-cyan-50',
            },
            {
              id: 'resource',
              name: 'Water & Resource Efficiency',
              icon: Droplets,
              desc: 'Volumetric water usage, irrigation rankings, and fertilizer curves.',
              color: 'text-indigo-600 bg-indigo-50',
            },
            {
              id: 'ai-insights',
              name: 'AI Advisory Engine',
              icon: Sparkles,
              desc: 'Server-side Gemini 2.5 Flash generating context-aware agronomic advice.',
              color: 'text-purple-600 bg-purple-50',
            },
          ].map((mod) => {
            const Icon = mod.icon;
            return (
              <button
                key={mod.id}
                onClick={() => {
                  onNavigatePage('dashboard');
                  onNavigateTab(mod.id);
                }}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-600 hover:shadow-sm transition-all text-left group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2.5 rounded-xl ${mod.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-emerald-800 transition-colors text-sm">
                    {mod.name}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{mod.desc}</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* 30-Second Viva Pitch Callout */}
      <section className="bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-transparent border border-amber-200/80 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-md">
              Viva Voce Defense
            </span>
            <h2 className="text-lg font-bold text-slate-900 mt-2">
              Ready for Academic Defense & Examination
            </h2>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl">
              Equipped with a 30-second presentation script, complete statistical formulation (ANOVA & Pearson), data cleaning audit logs, and clear boundaries between implemented scope and future work.
            </p>
          </div>

          <button
            onClick={() => onNavigatePage('about')}
            className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-xl shadow-xs shrink-0 flex items-center gap-1.5"
          >
            <span>Read 30-Sec Pitch</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
};
