import React, { useState } from 'react';
import {
  GraduationCap,
  Award,
  Mic,
  Copy,
  Check,
  Building,
  UserCheck,
  FileCheck,
  ShieldAlert,
  Send,
  Mail,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [reviewerName, setReviewerName] = useState('');
  const [feedbackText, setFeedbackText] = useState('');

  const vivaPitchText =
    'Good morning/afternoon, Sir/Madam. My project is titled Seasonal Agriculture Performance Analysis and Decision Support System. In this project, we analyzed agricultural performance across Kharif, Rabi, and Zaid seasons using a 4,000-record dataset with 28 variables. We evaluated yield, profitability, environmental factors, resource use, and risk. Based on ANOVA and statistical comparison, Kharif emerged as the best overall season with an average yield of 5.64 t/ha and profit of ₹178,914.65, while Zaid showed the weakest economic performance. To make this actionable, we developed an interactive decision support dashboard and integrated AI-assisted agronomic recommendations. Thank you.';

  const handleCopyPitch = () => {
    navigator.clipboard.writeText(vivaPitchText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !feedbackText.trim()) return;
    setFeedbackSent(true);
    setTimeout(() => {
      setReviewerName('');
      setFeedbackText('');
    }, 2500);
  };

  return (
    <div id="about-page-container" className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Hero Certificate Style Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-emerald-800/50 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Capstone Project Accreditation</span>
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
              <span className="text-emerald-400 font-medium block">Lead Researcher:</span>
              <span className="font-bold text-white text-sm">GIDDAM SAIKIRAN</span>
            </div>
            <div>
              <span className="text-emerald-400 font-medium block">Student ID:</span>
              <span className="font-mono text-emerald-300 font-semibold text-xs">
                STU67627f99c8c1f1734508441
              </span>
            </div>
            <div>
              <span className="text-emerald-400 font-medium block">Academic Program:</span>
              <span className="font-semibold text-slate-200">B.Tech CSE (Data Science)</span>
            </div>
            <div>
              <span className="text-emerald-400 font-medium block">Institution:</span>
              <span className="font-semibold text-slate-200">KG Reddy College of Engg. & Tech.</span>
            </div>
          </div>
        </div>
      </div>

      {/* 30-Second Viva Pitch Script Box */}
      <div className="bg-amber-50/90 border border-amber-300 rounded-3xl p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 text-amber-950 font-bold text-sm">
            <Mic className="w-4 h-4 text-amber-700" />
            <span>30-Second Oral Viva Presentation Pitch</span>
          </div>
          <button
            onClick={handleCopyPitch}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-amber-300 text-amber-900 hover:bg-amber-100 text-xs font-semibold transition-all shadow-2xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Pitch Copied!' : 'Copy Script'}</span>
          </button>
        </div>

        <blockquote className="text-xs sm:text-sm text-amber-950 font-serif leading-relaxed italic bg-white p-5 rounded-2xl border border-amber-200 shadow-2xs">
          "{vivaPitchText}"
        </blockquote>
      </div>

      {/* Scope Boundary: Implemented vs Proposed */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-emerald-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
            <FileCheck className="w-4 h-4 text-emerald-700" />
            <span>✓ What Is Strictly Implemented (Present Scope)</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
              <span>
                <strong>Data Layer:</strong> 4,000 benchmark records across 28 variables with automated median imputation and deduplication audits.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
              <span>
                <strong>Statistical Inference:</strong> One-Way ANOVA ($F$-statistic with $p &lt; 0.001$) and Pearson $8 \times 8$ correlation matrix.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
              <span>
                <strong>Diagnostic Outliers:</strong> Tukey's IQR anomaly detector identifying yield anomalies and extreme economic deficits.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
              <span>
                <strong>Server-Side AI:</strong> Gemini 2.5 Flash server-side integration via Vite middleware with structured agronomic advisory.
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-amber-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
            <ShieldAlert className="w-4 h-4 text-amber-700" />
            <span>⚠ Viva Defense Rule: What NOT to Claim</span>
          </div>
          <div className="space-y-2 text-xs text-amber-950">
            <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200/80 leading-relaxed">
              <strong>1. Do NOT claim Machine Learning prediction:</strong>
              <p className="text-[11px] text-amber-900 mt-0.5">
                This project is a Decision Support System (DSS) utilizing descriptive, inferential, and diagnostic data science, not an ML regressor.
              </p>
            </div>
            <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200/80 leading-relaxed">
              <strong>2. Do NOT claim causation from correlation:</strong>
              <p className="text-[11px] text-amber-900 mt-0.5">
                Correlation between rainfall and Kharif yield demonstrates association, not unilateral causation.
              </p>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-600 leading-relaxed">
              <strong>3. Proposed Future Scope:</strong>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Integration of physical IoT soil moisture probes, Sentinel-2 satellite imagery, and trained supervised forecasting algorithms.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Academic Reviewer Feedback / Viva Inquiry Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="mb-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Mail className="w-4 h-4 text-emerald-700" />
            <span>Academic Reviewer & Examiner Feedback</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Record oral feedback, viva evaluation notes, or faculty comments on the system.
          </p>
        </div>

        {feedbackSent ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 font-medium flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Thank you, Sir/Madam. Your viva evaluation comments have been recorded for the academic file.</span>
          </div>
        ) : (
          <form onSubmit={handleSendFeedback} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Examiner / Reviewer Name
                </label>
                <input
                  type="text"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  placeholder="e.g. Dr. Internal Examiner / External Reviewer"
                  required
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Reviewer Designation / Affiliation
                </label>
                <input
                  type="text"
                  defaultValue="Department of Computer Science & Engineering, JNTUH"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Evaluation Notes / Comments
              </label>
              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Enter comments on statistical validity, dashboard responsiveness, or agronomic recommendations..."
                rows={3}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Examination Feedback</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
