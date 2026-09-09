import React, { useState } from 'react';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  UserCheck,
} from 'lucide-react';
import { User, DEMO_USERS } from '../../types/auth';
import { setStoredUser, getAllUsers } from '../../utils/authStorage';

interface LoginPageProps {
  onLoginSuccess: (user: User) => void;
  onNavigateRegister: () => void;
  onNavigateHome: () => void;
  onNavigateDashboard: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onNavigateRegister,
  onNavigateHome,
  onNavigateDashboard,
}) => {
  const [email, setEmail] = useState('saikirangiddam0@gmail.com');
  const [password, setPassword] = useState('agri2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please provide both your academic email and password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const all = getAllUsers();
      const found = all.find((u) => u.email.toLowerCase() === email.toLowerCase());

      if (found) {
        setStoredUser(found);
        onLoginSuccess(found);
      } else {
        // Create an authenticated session with this email
        const newUser: User = {
          id: `user-${Date.now()}`,
          name: email.split('@')[0].toUpperCase(),
          email: email,
          role: 'Guest Analyst',
          institution: 'Agricultural Research Network',
          createdAt: new Date().toISOString().split('T')[0],
        };
        setStoredUser(newUser);
        onLoginSuccess(newUser);
      }
    }, 450);
  };

  const handleQuickLogin = (demoUser: User) => {
    setStoredUser(demoUser);
    onLoginSuccess(demoUser);
  };

  return (
    <div id="login-page-container" className="min-h-[80vh] flex items-center justify-center py-8 px-4">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        {/* Left Side: Brand & Academic Context */}
        <div className="lg:col-span-5 bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 translate-x-8 -translate-y-8 w-48 h-48 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="p-2 bg-emerald-500/20 text-emerald-300 rounded-xl border border-emerald-500/30">
                <GraduationCap className="w-5 h-5 text-emerald-300" />
              </span>
              <span className="text-xs font-bold tracking-wider uppercase text-emerald-300">
                AgriDSS Portal
              </span>
            </div>

            <h2 className="text-xl font-bold tracking-tight text-white mb-2 leading-snug">
              Seasonal Agriculture Performance Analysis
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed font-light mb-6">
              Decision support system for multi-criteria evaluation of Kharif, Rabi, and Zaid crop performance across 28 parameters.
            </p>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>4,000 empirical records with automated median imputation & IQR audits</span>
              </div>
              <div className="flex items-start gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>One-Way ANOVA & Pearson correlation matrix analysis</span>
              </div>
              <div className="flex items-start gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>AI-assisted agronomic synthesis via Gemini 2.5 Flash</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-emerald-800/50 text-[11px] text-slate-400">
            <div className="font-semibold text-slate-200">Affiliation:</div>
            <div>KG Reddy College of Engineering & Technology (JNTUH)</div>
            <div className="font-mono text-emerald-400 mt-0.5">Capstone Academic Year 2026–27</div>
          </div>
        </div>

        {/* Right Side: Login Form & Demo Selectors */}
        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Researcher Portal Sign In</h1>
            <p className="text-xs text-slate-500 mt-1">
              Access the agricultural decision support system or review viva presentation materials.
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2 text-xs text-rose-800">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Academic / Researcher Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="researcher@university.edu"
                  required
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-10 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-emerald-800 focus:ring-emerald-700"
                />
                <span>Remember this terminal</span>
              </label>
              <span className="text-slate-400 text-[11px]">Academic Access</span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In to Decision Support System</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Logins for Viva and Testing */}
          <div className="mt-6 pt-5 border-t border-slate-200">
            <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2.5 flex items-center justify-between">
              <span>One-Click Quick Login (Viva / Demo)</span>
              <span className="text-emerald-700 font-normal">Instant Access</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {DEMO_USERS.map((demo) => (
                <button
                  key={demo.id}
                  onClick={() => handleQuickLogin(demo)}
                  type="button"
                  className="p-2.5 rounded-xl border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/50 transition-all text-left group"
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:text-emerald-900 truncate">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{demo.name}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 truncate mt-0.5">{demo.role}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-slate-600 flex items-center justify-center gap-3">
            <span>Don't have an account?</span>
            <button
              onClick={onNavigateRegister}
              className="font-bold text-emerald-800 hover:text-emerald-950 underline"
            >
              Register New Researcher
            </button>
            <span className="text-slate-300">|</span>
            <button
              onClick={onNavigateDashboard}
              className="text-slate-500 hover:text-slate-800 font-medium"
            >
              Continue as Guest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
