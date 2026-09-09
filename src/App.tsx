import React, { useState, useMemo, useEffect } from 'react';
import {
  LayoutDashboard,
  Calendar,
  Wheat,
  CloudRain,
  Droplets,
  ShieldAlert,
  Coins,
  Lightbulb,
  Sparkles,
  Database,
  Award,
  ChevronRight,
  Menu,
  X,
  Presentation,
  CheckCircle2,
} from 'lucide-react';

import { FarmRecord, FilterState, ValidationReport } from './types/agriculture';
import { User } from './types/auth';
import { getStoredUser, setStoredUser } from './utils/authStorage';
import { generateBenchmarkDataset } from './data/benchmarkDataset';
import {
  calculateOverallKPIs,
  calculateSeasonSummaries,
  generateActionableRecommendations,
} from './utils/analytics';

import { Header, PageId } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { OverviewTab } from './components/OverviewTab';
import { SeasonalTab } from './components/SeasonalTab';
import { CropTab } from './components/CropTab';
import { EnvironmentalTab } from './components/EnvironmentalTab';
import { ResourceWaterTab } from './components/ResourceWaterTab';
import { RiskAnomalyTab } from './components/RiskAnomalyTab';
import { EconomicTab } from './components/EconomicTab';
import { InsightsRecommendationsTab } from './components/InsightsRecommendationsTab';
import { AIInsightsTab } from './components/AIInsightsTab';
import { DataUploadTab } from './components/DataUploadTab';
import { ProjectShowcaseTab } from './components/ProjectShowcaseTab';

// Web Pages
import { HomePage } from './components/pages/HomePage';
import { MethodologyPage } from './components/pages/MethodologyPage';
import { AboutPage } from './components/pages/AboutPage';
import { LoginPage } from './components/auth/LoginPage';
import { RegisterPage } from './components/auth/RegisterPage';

type TabId =
  | 'overview'
  | 'seasonal'
  | 'crop'
  | 'environmental'
  | 'resource'
  | 'risk'
  | 'economic'
  | 'recommendations'
  | 'ai-insights'
  | 'data'
  | 'showcase';

interface TabDefinition {
  id: TabId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const TABS: TabDefinition[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'seasonal', label: 'Seasonal Analysis', icon: Calendar },
  { id: 'crop', label: 'Crop Analysis', icon: Wheat },
  { id: 'environmental', label: 'Environmental', icon: CloudRain },
  { id: 'resource', label: 'Resource & Water', icon: Droplets },
  { id: 'risk', label: 'Risk & Anomalies', icon: ShieldAlert },
  { id: 'economic', label: 'Economics & Cost', icon: Coins },
  { id: 'recommendations', label: 'Recommendations', icon: Lightbulb },
  { id: 'ai-insights', label: 'AI Advisory Engine', icon: Sparkles, badge: 'Gemini' },
  { id: 'data', label: 'Data Cleaning & Explorer', icon: Database },
  { id: 'showcase', label: 'Viva & Project Defense', icon: Award, badge: 'Viva' },
];

export default function App() {
  // Page Routing: 'home' | 'dashboard' | 'methodology' | 'about' | 'login' | 'register'
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [currentUser, setCurrentUser] = useState<User | null>(() => getStoredUser());
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize with the 4,000 benchmark records directly for instant render
  const [allRecords, setAllRecords] = useState<FarmRecord[]>(() => generateBenchmarkDataset());
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [validationReport, setValidationReport] = useState<ValidationReport>({
    totalRows: 4000,
    validRows: 4000,
    missingValuesHandled: 0,
    duplicatesRemoved: 0,
    columnsFound: 28,
  });

  const [filters, setFilters] = useState<FilterState>({
    season: '',
    state: '',
    district: '',
    crop: '',
    irrigationMethod: '',
    searchQuery: '',
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setStoredUser(user);
    showToast(`Welcome back, ${user.name}! Authenticated as ${user.role}.`);
    setCurrentPage('dashboard');
  };

  const handleRegisterSuccess = (user: User) => {
    setCurrentUser(user);
    setStoredUser(user);
    showToast(`Account successfully created for ${user.name}. Welcome to AgriDSS!`);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setStoredUser(null);
    showToast('You have been signed out successfully.');
    setCurrentPage('home');
  };

  // Filter records dynamically
  const filteredRecords = useMemo(() => {
    return allRecords.filter((record) => {
      if (filters.season && record.Season !== filters.season) return false;
      if (filters.state && record.State !== filters.state) return false;
      if (filters.district && record.District !== filters.district) return false;
      if (filters.crop && record.Crop !== filters.crop) return false;
      if (filters.irrigationMethod && record.Irrigation_Method !== filters.irrigationMethod)
        return false;
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        return (
          record.Farm_ID.toLowerCase().includes(q) ||
          record.State.toLowerCase().includes(q) ||
          record.District.toLowerCase().includes(q) ||
          record.Crop.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [allRecords, filters]);

  // Derived analytical summaries
  const kpis = useMemo(() => calculateOverallKPIs(filteredRecords), [filteredRecords]);
  const seasonSummaries = useMemo(
    () => calculateSeasonSummaries(filteredRecords),
    [filteredRecords]
  );
  const recommendations = useMemo(
    () => generateActionableRecommendations(kpis, seasonSummaries),
    [kpis, seasonSummaries]
  );

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      season: '',
      state: '',
      district: '',
      crop: '',
      irrigationMethod: '',
      searchQuery: '',
    });
  };

  const handleDataLoaded = (newRecords: FarmRecord[], report: ValidationReport) => {
    setAllRecords(newRecords);
    setValidationReport(report);
    handleResetFilters();
    showToast(`Dataset loaded: ${report.validRows.toLocaleString()} valid farm records verified.`);
  };

  const handleResetBenchmark = () => {
    const dataset = generateBenchmarkDataset();
    setAllRecords(dataset);
    setValidationReport({
      totalRows: dataset.length,
      validRows: dataset.length,
      missingValuesHandled: 0,
      duplicatesRemoved: 0,
      columnsFound: 28,
    });
    handleResetFilters();
    showToast('Reset to default 4,000-record benchmark dataset.');
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex flex-col font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2.5 text-xs font-medium animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Application Header */}
      <Header
        kpis={kpis}
        filteredRecords={filteredRecords}
        allRecords={allRecords}
        isPresentationMode={isPresentationMode}
        onTogglePresentationMode={() => setIsPresentationMode(!isPresentationMode)}
        onResetBenchmark={handleResetBenchmark}
        currentPage={currentPage}
        onNavigatePage={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Page Routing Switcher */}
      {currentPage === 'home' && (
        <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
          <HomePage
            kpis={kpis}
            seasonSummaries={seasonSummaries}
            currentUser={currentUser}
            onNavigateTab={(tab) => {
              setActiveTab(tab as TabId);
              setCurrentPage('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigatePage={(page) => {
              setCurrentPage(page as PageId);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </div>
      )}

      {currentPage === 'methodology' && (
        <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
          <MethodologyPage />
        </div>
      )}

      {currentPage === 'about' && (
        <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
          <AboutPage />
        </div>
      )}

      {currentPage === 'login' && (
        <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
          <LoginPage
            onLoginSuccess={handleLoginSuccess}
            onNavigateRegister={() => setCurrentPage('register')}
            onNavigateHome={() => setCurrentPage('home')}
            onNavigateDashboard={() => setCurrentPage('dashboard')}
          />
        </div>
      )}

      {currentPage === 'register' && (
        <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
          <RegisterPage
            onRegisterSuccess={handleRegisterSuccess}
            onNavigateLogin={() => setCurrentPage('login')}
            onNavigateHome={() => setCurrentPage('home')}
          />
        </div>
      )}

      {currentPage === 'dashboard' && (
        <>
          {/* Multivariate Filter Bar (Available on all tabs except Viva Showcase) */}
          {activeTab !== 'showcase' && (
            <FilterBar
              allRecords={allRecords}
              filteredCount={filteredRecords.length}
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
            />
          )}

          {/* Main Dashboard Container */}
          <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-5">
            {/* Navigation Tabs Bar */}
            <div className="bg-white rounded-2xl border border-slate-200 p-1.5 mb-6 shadow-2xs">
              {/* Mobile tab dropdown trigger */}
              <div className="md:hidden flex items-center justify-between p-2">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Analytics Modules:
                </span>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>

              <div
                className={`${
                  mobileMenuOpen ? 'flex' : 'hidden'
                } md:flex flex-col md:flex-row flex-wrap gap-1`}
              >
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      id={`tab-btn-${tab.id}`}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                        isActive
                          ? 'bg-emerald-800 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-200' : 'text-slate-500'}`} />
                      <span>{tab.label}</span>
                      {tab.badge && (
                        <span
                          className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold uppercase ${
                            isActive
                              ? 'bg-emerald-950 text-emerald-300'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {tab.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab View Content */}
            <main id="tab-viewport">
              {activeTab === 'overview' && (
                <OverviewTab kpis={kpis} seasonSummaries={seasonSummaries} />
              )}

              {activeTab === 'seasonal' && <SeasonalTab seasonSummaries={seasonSummaries} />}

              {activeTab === 'crop' && <CropTab records={filteredRecords} />}

              {activeTab === 'environmental' && <EnvironmentalTab records={filteredRecords} />}

              {activeTab === 'resource' && (
                <ResourceWaterTab records={filteredRecords} seasonSummaries={seasonSummaries} />
              )}

              {activeTab === 'risk' && (
                <RiskAnomalyTab records={filteredRecords} seasonSummaries={seasonSummaries} />
              )}

              {activeTab === 'economic' && <EconomicTab seasonSummaries={seasonSummaries} />}

              {activeTab === 'recommendations' && (
                <InsightsRecommendationsTab
                  kpis={kpis}
                  recommendations={recommendations}
                  seasonSummaries={seasonSummaries}
                />
              )}

              {activeTab === 'ai-insights' && (
                <AIInsightsTab kpis={kpis} seasonSummaries={seasonSummaries} />
              )}

              {activeTab === 'data' && (
                <DataUploadTab
                  records={filteredRecords}
                  allRecords={allRecords}
                  validationReport={validationReport}
                  onDataLoaded={handleDataLoaded}
                  onResetBenchmark={handleResetBenchmark}
                />
              )}

              {activeTab === 'showcase' && <ProjectShowcaseTab />}
            </main>
          </div>
        </>
      )}

      {/* Footer / Viva Accreditation */}
      <footer className="bg-white border-t border-slate-200 py-5 px-4 sm:px-6 text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <span className="font-bold text-slate-800">
              Seasonal Agriculture Performance Analysis and Decision Support System
            </span>
            <span className="text-slate-400 mx-2">|</span>
            <span>JNTUH Final Year Capstone Project (2026–27)</span>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Department of Computer Science & Engineering (Data Science) • KG Reddy College of Engineering & Technology
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <button
              onClick={() => {
                setCurrentPage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-slate-600 hover:text-emerald-800 font-medium"
            >
              Home
            </button>
            <button
              onClick={() => {
                setCurrentPage('dashboard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-slate-600 hover:text-emerald-800 font-medium"
            >
              Analytics Dashboard
            </button>
            <button
              onClick={() => {
                setCurrentPage('methodology');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-slate-600 hover:text-emerald-800 font-medium"
            >
              Methodology
            </button>
            <button
              onClick={() => {
                setCurrentPage('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-slate-600 hover:text-emerald-800 font-medium"
            >
              About & Team
            </button>
            <span className="text-slate-300">|</span>
            <span className="font-mono text-[11px] text-emerald-800 font-semibold">
              GIDDAM SAIKIRAN (STU67627f99c8c1f1734508441)
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
