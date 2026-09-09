import React, { useState } from 'react';
import {
  Sprout,
  Download,
  FileSpreadsheet,
  Printer,
  Presentation,
  LayoutDashboard,
  GraduationCap,
  RotateCcw,
  Home,
  Layers,
  Award,
  LogIn,
  UserPlus,
  LogOut,
  User,
  ChevronDown,
} from 'lucide-react';
import { FarmRecord } from '../types/agriculture';
import { exportToCSV, downloadAnalysisSummary } from '../utils/csvHandler';
import { OverallKPIs } from '../utils/analytics';
import { User as UserType } from '../types/auth';

export type PageId = 'home' | 'dashboard' | 'methodology' | 'about' | 'login' | 'register';

interface HeaderProps {
  kpis: OverallKPIs;
  filteredRecords: FarmRecord[];
  allRecords: FarmRecord[];
  isPresentationMode: boolean;
  onTogglePresentationMode: () => void;
  onResetBenchmark: () => void;
  currentPage: PageId;
  onNavigatePage: (page: PageId) => void;
  currentUser: UserType | null;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  kpis,
  filteredRecords,
  allRecords,
  isPresentationMode,
  onTogglePresentationMode,
  onResetBenchmark,
  currentPage,
  onNavigatePage,
  currentUser,
  onLogout,
}) => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleExportCSV = () => {
    exportToCSV(filteredRecords, `agriculture_filtered_${filteredRecords.length}_records.csv`);
  };

  const handleDownloadSummary = () => {
    downloadAnalysisSummary(
      {
        project: 'Seasonal Agriculture Performance Analysis and Decision Support System',
        student: 'GIDDAM SAIKIRAN (STU ID: STU67627f99c8c1f1734508441)',
        institution: 'KG Reddy College of Engineering and Technology (JNTUH)',
        kpis,
        totalDatasetRecords: allRecords.length,
        filteredRecordsCount: filteredRecords.length,
        exportedAt: new Date().toISOString(),
      },
      'agricultural_analysis_kpi_summary.json'
    );
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <header id="app-header" className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      {/* Top Academic Accreditation Banner */}
      <div className="bg-emerald-900 text-emerald-100 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-3.5 h-3.5 text-emerald-300" />
            <span className="font-semibold text-white">B.Tech Major Project</span>
            <span className="text-emerald-300">|</span>
            <span>CSE – Data Science</span>
            <span className="hidden md:inline text-emerald-300">|</span>
            <span className="hidden md:inline font-medium text-emerald-200">
              KG Reddy College of Engineering and Technology (JNTUH)
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-emerald-200 bg-emerald-950/60 px-2 py-0.5 rounded text-[11px] border border-emerald-800">
              STU: STU67627f99c8c1f1734508441
            </span>
            <span className="font-semibold text-emerald-100">GIDDAM SAIKIRAN</span>
            <span className="text-emerald-400 font-mono text-[11px]">2026–27</span>
          </div>
        </div>
      </div>

      {/* Main App Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Brand & Title */}
          <div className="flex items-center justify-between">
            <div
              onClick={() => onNavigatePage('home')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-700 flex items-center justify-center text-white shadow-sm shrink-0 group-hover:bg-emerald-800 transition-colors">
                <Sprout className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-tight">
                    AgriDSS
                  </span>
                  <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Decision Support System
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-normal truncate max-w-xs sm:max-w-md">
                  Seasonal Agriculture Performance Analysis (Kharif, Rabi & Zaid)
                </p>
              </div>
            </div>

            {/* Mobile Auth Button */}
            <div className="lg:hidden flex items-center gap-2">
              {currentUser ? (
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="p-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1 text-xs font-bold"
                >
                  <User className="w-3.5 h-3.5" />
                  <span className="max-w-[80px] truncate">{currentUser.name.split(' ')[0]}</span>
                </button>
              ) : (
                <button
                  onClick={() => onNavigatePage('login')}
                  className="px-2.5 py-1 rounded-lg bg-emerald-800 text-white text-xs font-semibold"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>

          {/* Primary Navigation Links */}
          <nav className="flex items-center gap-1 overflow-x-auto py-1 text-xs font-semibold">
            <button
              id="nav-home-btn"
              onClick={() => onNavigatePage('home')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                currentPage === 'home'
                  ? 'bg-emerald-800 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>

            <button
              id="nav-dashboard-btn"
              onClick={() => onNavigatePage('dashboard')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                currentPage === 'dashboard'
                  ? 'bg-emerald-800 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Analytics Dashboard</span>
            </button>

            <button
              id="nav-methodology-btn"
              onClick={() => onNavigatePage('methodology')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                currentPage === 'methodology'
                  ? 'bg-emerald-800 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Methodology & 28 Schema</span>
            </button>

            <button
              id="nav-about-btn"
              onClick={() => onNavigatePage('about')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                currentPage === 'about'
                  ? 'bg-emerald-800 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>About & Viva Pitch</span>
            </button>
          </nav>

          {/* Right Utilities & Authentication Controls */}
          <div className="flex items-center flex-wrap gap-2 self-start lg:self-center">
            {/* If on Dashboard, show dashboard utility buttons */}
            {currentPage === 'dashboard' && (
              <>
                <button
                  id="presentation-mode-toggle"
                  onClick={onTogglePresentationMode}
                  className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors border ${
                    isPresentationMode
                      ? 'bg-amber-500 text-white border-amber-600 shadow-2xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                  }`}
                  title="Toggle Exhibition / Viva Presentation Mode"
                >
                  <Presentation className="w-3.5 h-3.5" />
                  <span>{isPresentationMode ? 'Exit Demo' : 'Demo Mode'}</span>
                </button>

                <button
                  id="export-csv-btn"
                  onClick={handleExportCSV}
                  className="hidden md:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 transition-colors"
                  title="Export filtered dataset as CSV"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span>CSV</span>
                </button>

                <button
                  id="reset-benchmark-btn"
                  onClick={onResetBenchmark}
                  className="inline-flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
                  title="Reset data to standard 4,000-record benchmark"
                >
                  <RotateCcw className="w-3 h-3 text-slate-400" />
                  <span className="hidden xl:inline">Reset</span>
                </button>
              </>
            )}

            {/* Auth Controls */}
            {currentUser ? (
              <div className="relative">
                <button
                  id="user-profile-btn"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 transition-all text-xs"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-[10px]">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div className="text-left hidden sm:block">
                    <div className="font-bold leading-none max-w-[110px] truncate text-slate-900">
                      {currentUser.name}
                    </div>
                    <div className="text-[10px] text-slate-500 leading-none mt-0.5">
                      {currentUser.role}
                    </div>
                  </div>
                  <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl border border-slate-200 shadow-lg p-3 z-50 animate-in fade-in slide-in-from-top-1">
                    <div className="pb-2 mb-2 border-b border-slate-100">
                      <div className="font-bold text-xs text-slate-900">{currentUser.name}</div>
                      <div className="text-[11px] text-slate-500 truncate">{currentUser.email}</div>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {currentUser.role}
                      </span>
                      {currentUser.studentId && (
                        <div className="text-[10px] font-mono text-slate-400 mt-1">
                          ID: {currentUser.studentId}
                        </div>
                      )}
                    </div>

                    <div className="space-y-1">
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          onNavigatePage('dashboard');
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5 text-slate-500" />
                        <span>Go to Analytics</span>
                      </button>

                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          onLogout();
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-rose-700 hover:bg-rose-50 flex items-center gap-2 font-medium"
                      >
                        <LogOut className="w-3.5 h-3.5 text-rose-600" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  id="signin-btn"
                  onClick={() => onNavigatePage('login')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    currentPage === 'login'
                      ? 'bg-emerald-800 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
                  }`}
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>

                <button
                  id="register-btn"
                  onClick={() => onNavigatePage('register')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    currentPage === 'register'
                      ? 'bg-emerald-800 text-white'
                      : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-2xs'
                  }`}
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Register</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
