"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import {
  ArrowLeft, Lock, Loader2, Search, Filter, Mail, Copy, CheckCircle2,
  ChevronDown, ChevronUp, BarChart3, Users, Award, ShieldCheck,
  FileText, Globe, Briefcase, Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Custom premium SVG brand icons replacing deprecated lucide-react brand items
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface Submission {
  id: string;
  name: string;
  email: string;
  company: string;
  companySize: string;
  service: string;
  message: string;
  createdAt: string;
}

interface CandidateApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  role: string;
  experience: string;
  portfolioUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  skills: string[];
  whyJoin: string;
  proudProject: string;
  resumeUrl: string;
  createdAt: string;
}

export default function AnalyticsDashboard() {
  const [pin, setPin] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [authError, setAuthError] = useState("");
  const [leadsError, setLeadsError] = useState<string | null>(null);
  const [appsError, setAppsError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Dashboard Pane state
  const [activeTab, setActiveTab] = useState<"leads" | "candidates">("leads");

  // Ingested Data states
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [applications, setApplications] = useState<CandidateApplication[]>([]);

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Search & Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  // Check sessionStorage on mount so reloading doesn't lock the dashboard again
  useEffect(() => {
    const savedPin = sessionStorage.getItem("admin_access_pin");
    if (savedPin) {
      verifyAndFetch(savedPin);
    }
  }, []);

  const verifyAndFetch = async (inputPin: string) => {
    setLoading(true);
    setAuthError("");
    setLeadsError(null);
    setAppsError(null);

    try {
      let leadsSuccess = false;
      let leadsData: any = null;
      let leadsResponse: Response | null = null;

      // 1. Fetch Consultation Leads
      try {
        leadsResponse = await fetch("/api/analytics", {
          method: "GET",
          headers: { "x-admin-pin": inputPin },
        });
        leadsData = await leadsResponse.json();
        if (leadsResponse.ok && leadsData.success) {
          setSubmissions(leadsData.data);
          leadsSuccess = true;
        } else {
          setLeadsError(leadsData.message || "Failed to retrieve consultation leads from database.");
        }
      } catch (err: any) {
        setLeadsError(err.message || "Failed to connect to consultation leads API.");
      }

      let appsSuccess = false;
      let appsData: any = null;
      let appsResponse: Response | null = null;

      // 2. Fetch Careers Applications
      try {
        appsResponse = await fetch("/api/analytics/applications", {
          method: "GET",
          headers: { "x-admin-pin": inputPin },
        });
        appsData = await appsResponse.json();
        if (appsResponse.ok && appsData.success) {
          setApplications(appsData.data);
          appsSuccess = true;
        } else {
          setAppsError(appsData.message || "Failed to retrieve candidate applications from database.");
        }
      } catch (err: any) {
        setAppsError(err.message || "Failed to connect to careers applications API.");
      }

      // Authorization Rules:
      // If either returns 401 Unauthorized, then it's a PIN authentication failure.
      if (
        (leadsResponse && leadsResponse.status === 401) ||
        (appsResponse && appsResponse.status === 401)
      ) {
        const msg = (leadsResponse && leadsResponse.status === 401 ? leadsData?.message : appsData?.message) || "Invalid Access PIN.";
        setAuthError(msg);
        sessionStorage.removeItem("admin_access_pin");
        setAuthorized(false);
      } else if (leadsSuccess || appsSuccess) {
        // If at least one succeeds, authorize the dashboard
        setAuthorized(true);
        sessionStorage.setItem("admin_access_pin", inputPin);
      } else {
        // Both failed and not a 401 (e.g. general 500 error on both)
        setAuthError("Failed to retrieve analytics data from database.");
        sessionStorage.removeItem("admin_access_pin");
        setAuthorized(false);
      }
    } catch (err: any) {
      setAuthError("Failed to authenticate API connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin) {
      setAuthError("Please enter your admin access PIN.");
      return;
    }
    verifyAndFetch(pin);
  };

  const handleLock = () => {
    sessionStorage.removeItem("admin_access_pin");
    setAuthorized(false);
    setPin("");
    setLeadsError(null);
    setAppsError(null);
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Reset filters when switching tabs
  const handleTabChange = (tab: "leads" | "candidates") => {
    setActiveTab(tab);
    setSearchTerm("");
    setServiceFilter("");
    setRoleFilter("");
    setExpandedId(null);
  };

  // ========================================================
  // COMPUTE LIVE SEARCH & FILTERS
  // ========================================================

  // Leads Filtering
  const filteredSubmissions = submissions.filter((sub) => {
    const matchesSearch =
      sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesService = serviceFilter === "" || sub.service === serviceFilter;
    return matchesSearch && matchesService;
  });

  // Candidates Filtering
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRole = roleFilter === "" || app.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // ========================================================
  // COMPUTE METRICS & KPIS
  // ========================================================

  // Leads KPIs
  const totalLeads = submissions.length;
  const serviceCounts = submissions.reduce((acc: { [key: string]: number }, sub) => {
    acc[sub.service] = (acc[sub.service] || 0) + 1;
    return acc;
  }, {});
  const topService = Object.keys(serviceCounts).reduce((a, b) => (serviceCounts[a] > serviceCounts[b] ? a : b), "None");
  const enterpriseCount = submissions.filter(
    (sub) => sub.companySize === "250+" || sub.companySize === "50-250"
  ).length;

  // Candidates KPIs
  const totalApps = applications.length;
  const roleCounts = applications.reduce((acc: { [key: string]: number }, app) => {
    acc[app.role] = (acc[app.role] || 0) + 1;
    return acc;
  }, {});
  const topRole = Object.keys(roleCounts).reduce((a, b) => (roleCounts[a] > roleCounts[b] ? a : b), "None");
  const experiencedAppsCount = applications.filter(
    (app) => app.experience === "Senior Level" || app.experience === "3-5 Years"
  ).length;

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return isoString;
    }
  };

  const renderRulesGuide = (errorMsg: string, title: string) => (
    <div className="p-8 text-left flex flex-col gap-6 max-w-3xl mx-auto">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mt-1">
          <ShieldCheck size={24} />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-space text-lg font-semibold text-ivory">
            {title}
          </h3>
          <p className="font-inter text-xs text-platinum/70 leading-relaxed">
            The portal connected successfully using your PIN, but Firestore returned a permission error:
          </p>
          <code className="block font-mono text-[11px] p-3.5 bg-black/40 rounded-lg text-red-400 border border-red-500/10 max-w-full overflow-x-auto whitespace-pre-wrap select-all">
            {errorMsg}
          </code>
        </div>
      </div>

      <div className="h-px bg-ivory/5 w-full my-2" />

      <div className="flex flex-col gap-4">
        <span className="font-space text-[10px] font-semibold uppercase tracking-wider text-steel-blue">
          How to Fix This:
        </span>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs font-inter text-platinum/70">
          <div className="md:col-span-1 flex justify-center">
            <span className="w-6 h-6 rounded-full bg-steel-blue/10 border border-steel-blue/20 text-steel-blue flex items-center justify-center font-mono font-bold">1</span>
          </div>
          <div className="md:col-span-11 flex flex-col gap-1.5">
            <p className="font-semibold text-ivory">Navigate to Firebase Console</p>
            <p className="text-[11px] leading-relaxed">Go to <a href="https://console.firebase.google.com" target="_blank" rel="noopener noreferrer" className="text-steel-blue hover:underline">Firebase Console</a>, select your project <strong className="text-ivory">placementms-8adb5</strong>, and click on <strong className="text-ivory">Firestore Database</strong> in the left menu.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs font-inter text-platinum/70">
          <div className="md:col-span-1 flex justify-center">
            <span className="w-6 h-6 rounded-full bg-steel-blue/10 border border-steel-blue/20 text-steel-blue flex items-center justify-center font-mono font-bold">2</span>
          </div>
          <div className="md:col-span-11 flex flex-col gap-1.5">
            <p className="font-semibold text-ivory">Open the Rules Tab</p>
            <p className="text-[11px] leading-relaxed">Click the <strong className="text-ivory">Rules</strong> tab at the top of the Firestore Database panel.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs font-inter text-platinum/70">
          <div className="md:col-span-1 flex justify-center">
            <span className="w-6 h-6 rounded-full bg-steel-blue/10 border border-steel-blue/20 text-steel-blue flex items-center justify-center font-mono font-bold">3</span>
          </div>
          <div className="md:col-span-11 flex flex-col gap-1.5">
            <p className="font-semibold text-ivory">Deploy Open Access Rules for Ledgers</p>
            <p className="text-[11px] leading-relaxed">Since the dashboard requests use secure serverless endpoints without user credentials, update the security rules to allow read/write operations for both the <code className="font-mono text-ivory bg-graphite/40 px-1 py-0.5 rounded text-[10.5px]">contacts</code> and <code className="font-mono text-ivory bg-graphite/40 px-1 py-0.5 rounded text-[10.5px]">applications</code> collections:</p>
            <pre className="block font-mono text-[10.5px] p-4 bg-black/40 rounded-xl border border-ivory/5 text-emerald-400 overflow-x-auto whitespace-pre select-all shadow-inner my-2">
              {`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /contacts/{document} {
      allow create, read: if true;
    }
    match /applications/{document} {
      allow create, read: if true;
    }
  }
}`}
            </pre>
            <p className="text-[11px] text-platinum/40 italic">Note: Only your secure `/api` router proxies load document arrays; client-side keys remain fully protected on the server.</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Header isAdmin={true} onLock={authorized ? handleLock : undefined} />
      <main className="flex-grow bg-charcoal text-ivory relative pt-32 sm:pt-40 pb-24 px-4 sm:px-8 overflow-hidden min-h-screen">
        {/* Ambient HSL Grid Lines */}
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none z-0" />
        <div className="absolute inset-0 grid-pattern-fine opacity-20 pointer-events-none z-0" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(circle_at_top,rgba(62,83,107,0.12),transparent_70%)] pointer-events-none z-0" />

        <div className="max-w-6xl mx-auto relative z-10">

          <AnimatePresence mode="wait">

            {/* ========================================================
                1. PIN ENTRY AUTHORIZATION VIEW
               ======================================================== */}
            {!authorized ? (
              <motion.div
                key="auth-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-md mx-auto py-16 sm:py-24"
              >
                <div className="w-full glass-panel p-8 rounded-2xl border-ivory/5 bg-graphite/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-xl bg-steel-blue/10 border border-steel-blue/20 text-steel-blue flex items-center justify-center mb-6">
                    <Lock size={20} />
                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-steel-blue mb-2 font-bold">
                    Aetherion Systems
                  </span>
                  <h1 className="font-space text-2xl font-semibold text-ivory mb-2">
                    Operations Portal
                  </h1>
                  <p className="font-inter text-xs text-platinum/50 leading-relaxed max-w-xs mb-8">
                    Authorized systems architects only. Enter the secure decryption PIN to review consultation and careers analytics.
                  </p>

                  <form onSubmit={handleAuthSubmit} className="w-full flex flex-col gap-4">
                    {authError && (
                      <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-inter text-left">
                        {authError}
                      </div>
                    )}

                    <input
                      type="password"
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      placeholder="••••"
                      disabled={loading}
                      className="w-full bg-charcoal/60 border border-ivory/10 rounded-xl px-4 py-3.5 text-center font-mono text-lg tracking-[0.4em] text-ivory placeholder-platinum/30 focus:outline-none focus:border-steel-blue focus:ring-1 focus:ring-steel-blue transition-all disabled:opacity-50"
                    />

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 rounded-xl bg-ivory text-charcoal hover:bg-platinum font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          Authenticating...
                        </>
                      ) : (
                        "Verify Decryption PIN"
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>
            ) : (

              // ========================================================
              // 2. STUNNING DUAL-PANE ANALYTICS DASHBOARD VIEW
              // ========================================================
              <motion.div
                key="dashboard-view"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-8"
              >

                {/* Dashboard Heading */}
                <div className="border-b border-ivory/5 pb-6">
                  <span className="text-steel-blue font-space text-xs font-semibold uppercase tracking-[0.2em] mb-2 block">
                    Operations Dashboard
                  </span>
                  <h1 className="font-space text-3xl sm:text-4xl font-medium tracking-tight text-ivory">
                    System Administration Ledgers
                  </h1>
                </div>

                {/* Glassmorphic Tab Controller */}
                <div className="flex items-center gap-2 border-b border-ivory/5 pb-2">
                  <button
                    onClick={() => handleTabChange("leads")}
                    className={`font-space text-xs font-semibold uppercase tracking-wider px-5 py-3.5 border-b-2 transition-all cursor-pointer ${activeTab === "leads"
                        ? "border-steel-blue text-ivory"
                        : "border-transparent text-platinum/40 hover:text-platinum/60"
                      }`}
                  >
                    Consultation Leads ({totalLeads})
                  </button>
                  <button
                    onClick={() => handleTabChange("candidates")}
                    className={`font-space text-xs font-semibold uppercase tracking-wider px-5 py-3.5 border-b-2 transition-all cursor-pointer ${activeTab === "candidates"
                        ? "border-steel-blue text-ivory"
                        : "border-transparent text-platinum/40 hover:text-platinum/60"
                      }`}
                  >
                    Candidate Applications ({totalApps})
                  </button>
                </div>

                {/* KPI Metrics Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {activeTab === "leads" ? (
                    <>
                      {/* Leads KPI 1 */}
                      <div className="glass-panel p-6 rounded-2xl border-ivory/5 bg-graphite/10 flex items-center gap-5 shadow-sm">
                        <div className="p-3.5 rounded-xl bg-steel-blue/10 border border-steel-blue/20 text-steel-blue">
                          <BarChart3 size={20} />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-platinum/40 block mb-0.5">
                            Total Ingested Leads
                          </span>
                          <span className="font-space text-2xl font-bold text-ivory">
                            {totalLeads}
                          </span>
                        </div>
                      </div>

                      {/* Leads KPI 2 */}
                      <div className="glass-panel p-6 rounded-2xl border-ivory/5 bg-graphite/10 flex items-center gap-5 shadow-sm">
                        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                          <Sparkles size={20} />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-platinum/40 block mb-0.5">
                            Primary Service Demand
                          </span>
                          <span className="font-space text-[13px] font-semibold text-ivory truncate max-w-[200px] block">
                            {topService}
                          </span>
                        </div>
                      </div>

                      {/* Leads KPI 3 */}
                      <div className="glass-panel p-6 rounded-2xl border-ivory/5 bg-graphite/10 flex items-center gap-5 shadow-sm">
                        <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                          <Users size={20} />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-platinum/40 block mb-0.5">
                            Enterprise Inquiries
                          </span>
                          <span className="font-space text-2xl font-bold text-ivory">
                            {enterpriseCount}
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Candidates KPI 1 */}
                      <div className="glass-panel p-6 rounded-2xl border-ivory/5 bg-graphite/10 flex items-center gap-5 shadow-sm">
                        <div className="p-3.5 rounded-xl bg-steel-blue/10 border border-steel-blue/20 text-steel-blue">
                          <Briefcase size={20} />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-platinum/40 block mb-0.5">
                            Total Candidates
                          </span>
                          <span className="font-space text-2xl font-bold text-ivory">
                            {totalApps}
                          </span>
                        </div>
                      </div>

                      {/* Candidates KPI 2 */}
                      <div className="glass-panel p-6 rounded-2xl border-ivory/5 bg-graphite/10 flex items-center gap-5 shadow-sm">
                        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                          <Sparkles size={20} />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-platinum/40 block mb-0.5">
                            Top Role Applied For
                          </span>
                          <span className="font-space text-[13px] font-semibold text-ivory truncate max-w-[200px] block">
                            {topRole}
                          </span>
                        </div>
                      </div>

                      {/* Candidates KPI 3 */}
                      <div className="glass-panel p-6 rounded-2xl border-ivory/5 bg-graphite/10 flex items-center gap-5 shadow-sm">
                        <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                          <Users size={20} />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-platinum/40 block mb-0.5">
                            Experienced Candidates
                          </span>
                          <span className="font-space text-2xl font-bold text-ivory">
                            {experiencedAppsCount}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Filter and Query Control Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 w-full items-center">
                  {/* Live Search Bar */}
                  <div className="sm:col-span-8 relative">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-platinum/30" />
                    <input
                      type="text"
                      placeholder={
                        activeTab === "leads"
                          ? "Search inquiries by name, email, or company..."
                          : "Search candidates by name, email, or core technology..."
                      }
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-charcoal/60 border border-ivory/10 rounded-xl pl-11 pr-4 py-3 text-xs text-ivory placeholder-platinum/30 focus:outline-none focus:border-steel-blue focus:ring-1 focus:ring-steel-blue transition-all"
                    />
                  </div>

                  {/* Dropdown Filters */}
                  <div className="sm:col-span-4 relative">
                    <Filter size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-platinum/30" />
                    {activeTab === "leads" ? (
                      <select
                        value={serviceFilter}
                        onChange={(e) => setServiceFilter(e.target.value)}
                        className="w-full bg-charcoal/60 border border-ivory/10 rounded-xl pl-10 pr-4 py-3 text-xs text-ivory focus:outline-none focus:border-steel-blue focus:ring-1 focus:ring-steel-blue transition-all cursor-pointer appearance-none"
                      >
                        <option value="" className="bg-charcoal text-platinum/60">Filter by service...</option>
                        <option value="AI Automation" className="bg-charcoal">AI Automation</option>
                        <option value="SaaS Development" className="bg-charcoal">SaaS Development</option>
                        <option value="Full Stack Engineering" className="bg-charcoal">Full Stack Engineering</option>
                        <option value="IT Consultancy" className="bg-charcoal">IT Consultancy</option>
                        <option value="Business Systems" className="bg-charcoal">Business Systems</option>
                      </select>
                    ) : (
                      <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="w-full bg-charcoal/60 border border-ivory/10 rounded-xl pl-10 pr-4 py-3 text-xs text-ivory focus:outline-none focus:border-steel-blue focus:ring-1 focus:ring-steel-blue transition-all cursor-pointer appearance-none"
                      >
                        <option value="" className="bg-charcoal text-platinum/60">Filter by role...</option>
                        <option value="Frontend Engineer" className="bg-charcoal">Frontend Engineer</option>
                        <option value="Backend Engineer" className="bg-charcoal">Backend Engineer</option>
                        <option value="Full Stack Engineer" className="bg-charcoal">Full Stack Engineer</option>
                        <option value="AI Automation Engineer" className="bg-charcoal">AI Automation Engineer</option>
                        <option value="DevOps Engineer" className="bg-charcoal">DevOps Engineer</option>
                        <option value="UI/UX Designer" className="bg-charcoal">UI/UX Designer</option>
                        <option value="Technical Intern" className="bg-charcoal">Technical Intern</option>
                      </select>
                    )}
                  </div>
                </div>

                {/* Submissions Datatable container */}
                <div className="w-full glass-panel border-ivory/8 rounded-2xl overflow-hidden shadow-lg">
                  {activeTab === "leads" ? (
                    leadsError ? (
                      renderRulesGuide(leadsError, "Firestore Rules Configuration Required (Leads)")
                    ) : (
                      filteredSubmissions.length === 0 ? (
                        <div className="py-20 text-center flex flex-col items-center justify-center">
                          <p className="font-space text-sm text-platinum/40">
                            No operations logs found matching the current search parameters.
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col">

                          {/* Table Header Row (Desktop Layout) */}
                          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 border-b border-ivory/5 bg-graphite/40 font-space text-[10px] uppercase tracking-widest text-platinum/40 font-semibold select-none">
                            <div className="col-span-3">Contact Name</div>
                            <div className="col-span-3">Business Email</div>
                            <div className="col-span-3">Company Details</div>
                            <div className="col-span-2">Service Requested</div>
                            <div className="col-span-1 text-right">Details</div>
                          </div>

                          {/* Submissions Rows */}
                          <div className="flex flex-col divide-y divide-ivory/5">
                            {filteredSubmissions.map((sub) => {
                              const isExpanded = expandedId === sub.id;
                              return (
                                <div key={sub.id} className={`transition-all duration-300 ${isExpanded ? "bg-charcoal/30" : "hover:bg-graphite/10"}`}>

                                  {/* Row Summary Trigger */}
                                  <div
                                    onClick={() => toggleExpand(sub.id)}
                                    className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4.5 items-center cursor-pointer text-left select-none text-xs"
                                  >
                                    <div className="col-span-1 md:col-span-3 font-space font-medium text-ivory flex flex-col gap-1">
                                      <span className="text-[13px]">{sub.name}</span>
                                      <span className="md:hidden font-mono text-[9px] text-platinum/30">{formatDate(sub.createdAt)}</span>
                                    </div>

                                    <div className="col-span-1 md:col-span-3 font-mono text-platinum/70 truncate">
                                      {sub.email}
                                    </div>

                                    <div className="col-span-1 md:col-span-3 text-platinum/70 flex items-center gap-1.5 font-inter">
                                      {sub.company ? (
                                        <>
                                          <span className="font-semibold text-ivory">{sub.company}</span>
                                          {sub.companySize && (
                                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-graphite/40 border border-ivory/5 text-platinum/40 font-mono">
                                              {sub.companySize}
                                            </span>
                                          )}
                                        </>
                                      ) : (
                                        <span className="text-platinum/30 italic">No Company</span>
                                      )}
                                    </div>

                                    <div className="col-span-1 md:col-span-2 text-steel-blue font-space font-semibold uppercase tracking-wider text-[10px]">
                                      {sub.service}
                                    </div>

                                    <div className="hidden md:flex col-span-1 justify-end text-platinum/30">
                                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                    </div>
                                  </div>

                                  {/* Expandable Project Scope Panel */}
                                  <AnimatePresence initial={false}>
                                    {isExpanded && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                      >
                                        <div className="px-6 pb-6 pt-2 border-t border-ivory/5 grid grid-cols-1 md:grid-cols-12 gap-6 text-left">
                                          <div className="md:col-span-8 flex flex-col gap-3">
                                            <span className="font-space text-[9px] font-semibold uppercase tracking-wider text-steel-blue">
                                              Project Scope details
                                            </span>
                                            <p className="font-inter text-xs text-platinum/80 leading-relaxed font-light whitespace-pre-wrap bg-charcoal/40 p-4 rounded-xl border border-ivory/5">
                                              {sub.message}
                                            </p>
                                          </div>

                                          <div className="md:col-span-4 flex flex-col gap-4 justify-between h-full">
                                            <div className="flex flex-col gap-3">
                                              <span className="font-space text-[9px] font-semibold uppercase tracking-wider text-steel-blue">
                                                Transaction details
                                              </span>
                                              <div className="font-mono text-[10px] text-platinum/40 flex flex-col gap-1.5 bg-charcoal/20 p-3 rounded-lg border border-ivory/5">
                                                <div>ID: <span className="text-platinum/60">{sub.id}</span></div>
                                                <div>Date: <span className="text-platinum/60">{formatDate(sub.createdAt)}</span></div>
                                              </div>
                                            </div>

                                            <div className="flex flex-col sm:flex-row gap-2 mt-4">
                                              <a
                                                href={`mailto:${sub.email}?subject=Aetherion Consultation Scope Response&body=Hello ${sub.name},%0D%0A%0D%0AThank you for submitting your consultation request for Aetherion ${sub.service} systems.%0D%0A%0D%0ARegards,%0D%0ALead Systems Architect`}
                                                className="flex-1 py-2.5 rounded-lg bg-steel-blue text-ivory hover:bg-steel-blue/80 font-space font-semibold text-[10.5px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors focus:outline-none"
                                              >
                                                <Mail size={12} />
                                                Respond
                                              </a>

                                              <button
                                                onClick={() => handleCopyText(sub.id, sub.message)}
                                                className="py-2.5 px-4 rounded-lg glass-panel border-ivory/10 hover:border-ivory/30 text-ivory hover:bg-graphite/40 font-space font-semibold text-[10.5px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all focus:outline-none"
                                              >
                                                {copiedId === sub.id ? (
                                                  <>
                                                    <CheckCircle2 size={12} className="text-emerald-400" />
                                                    Copied
                                                  </>
                                                ) : (
                                                  <>
                                                    <Copy size={12} />
                                                    Copy
                                                  </>
                                                )}
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>

                                </div>
                              );
                            })}
                          </div>

                        </div>
                      )
                    )) : (
                    appsError ? (
                      renderRulesGuide(appsError, "Firestore Rules Configuration Required (Applications)")
                    ) : (
                      filteredApplications.length === 0 ? (
                        <div className="py-20 text-center flex flex-col items-center justify-center">
                          <p className="font-space text-sm text-platinum/40">
                            No candidate applications logs found matching the current search parameters.
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col">

                          {/* Table Header Row (Desktop Layout) */}
                          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 border-b border-ivory/5 bg-graphite/40 font-space text-[10px] uppercase tracking-widest text-platinum/40 font-semibold select-none">
                            <div className="col-span-3">Candidate Name</div>
                            <div className="col-span-3">Professional Email</div>
                            <div className="col-span-3">Role Applied For</div>
                            <div className="col-span-2">Experience Level</div>
                            <div className="col-span-1 text-right">Details</div>
                          </div>

                          {/* Candidate Rows */}
                          <div className="flex flex-col divide-y divide-ivory/5">
                            {filteredApplications.map((app) => {
                              const isExpanded = expandedId === app.id;
                              return (
                                <div key={app.id} className={`transition-all duration-300 ${isExpanded ? "bg-charcoal/30" : "hover:bg-graphite/10"}`}>

                                  {/* Row Summary Trigger */}
                                  <div
                                    onClick={() => toggleExpand(app.id)}
                                    className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4.5 items-center cursor-pointer text-left select-none text-xs"
                                  >
                                    <div className="col-span-1 md:col-span-3 font-space font-medium text-ivory flex flex-col gap-1">
                                      <span className="text-[13px]">{app.fullName}</span>
                                      <span className="md:hidden font-mono text-[9px] text-platinum/30">{formatDate(app.createdAt)}</span>
                                    </div>

                                    <div className="col-span-1 md:col-span-3 font-mono text-platinum/70 truncate">
                                      {app.email}
                                    </div>

                                    <div className="col-span-1 md:col-span-3 text-steel-blue font-space font-semibold uppercase tracking-wider text-[10.5px]">
                                      {app.role}
                                    </div>

                                    <div className="col-span-1 md:col-span-2 text-platinum/70 flex items-center font-inter">
                                      <span className="text-[11px] px-2 py-0.5 rounded bg-graphite/40 border border-ivory/5 text-platinum/50 font-mono">
                                        {app.experience}
                                      </span>
                                    </div>

                                    <div className="hidden md:flex col-span-1 justify-end text-platinum/30">
                                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                    </div>
                                  </div>

                                  {/* Expandable Applications Panel */}
                                  <AnimatePresence initial={false}>
                                    {isExpanded && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                      >
                                        <div className="px-6 pb-6 pt-2 border-t border-ivory/5 grid grid-cols-1 md:grid-cols-12 gap-6 text-left">

                                          {/* Essay Details & Skills */}
                                          <div className="md:col-span-8 flex flex-col gap-4">
                                            {/* Skills Tags */}
                                            <div className="flex flex-col gap-1.5">
                                              <span className="font-space text-[9px] font-semibold uppercase tracking-wider text-steel-blue">
                                                Candidate Core Technologies
                                              </span>
                                              <div className="flex flex-wrap gap-1.5 mt-1">
                                                {app.skills.map((skill) => (
                                                  <span key={skill} className="text-[9.5px] font-mono bg-steel-blue/10 border border-steel-blue/20 px-2 py-0.5 rounded text-steel-blue">
                                                    {skill}
                                                  </span>
                                                ))}
                                              </div>
                                            </div>

                                            {/* Essay 1 */}
                                            <div className="flex flex-col gap-2">
                                              <span className="font-space text-[9px] font-semibold uppercase tracking-wider text-steel-blue">
                                                Why do you want to join Aetherion?
                                              </span>
                                              <p className="font-inter text-xs text-platinum/80 leading-relaxed font-light whitespace-pre-wrap bg-charcoal/40 p-4 rounded-xl border border-ivory/5">
                                                {app.whyJoin}
                                              </p>
                                            </div>

                                            {/* Essay 2 */}
                                            <div className="flex flex-col gap-2">
                                              <span className="font-space text-[9px] font-semibold uppercase tracking-wider text-steel-blue">
                                                Describe a project you're proud of
                                              </span>
                                              <p className="font-inter text-xs text-platinum/80 leading-relaxed font-light whitespace-pre-wrap bg-charcoal/40 p-4 rounded-xl border border-ivory/5">
                                                {app.proudProject}
                                              </p>
                                            </div>
                                          </div>

                                          {/* Resume PDF & Repos Links */}
                                          <div className="md:col-span-4 flex flex-col gap-4 justify-between h-full">
                                            <div className="flex flex-col gap-3">
                                              <span className="font-space text-[9px] font-semibold uppercase tracking-wider text-steel-blue">
                                                Metadata & Links
                                              </span>

                                              {/* Dynamic Link Triggers */}
                                              <div className="flex flex-col gap-2 bg-charcoal/20 p-3.5 rounded-xl border border-ivory/5">
                                                <div className="font-mono text-[9px] text-platinum/40 flex flex-col gap-1.5 mb-3">
                                                  <div>ID: <span className="text-platinum/60">{app.id}</span></div>
                                                  <div>Location: <span className="text-platinum/60">{app.location || "Not Provided"}</span></div>
                                                  <div>Phone: <span className="text-platinum/60">{app.phone || "Not Provided"}</span></div>
                                                  <div>Date: <span className="text-platinum/60">{formatDate(app.createdAt)}</span></div>
                                                </div>

                                                <div className="flex flex-col gap-1.5 select-none">
                                                  <a
                                                    href={app.githubUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 font-mono text-[10px] text-platinum hover:text-ivory transition-colors"
                                                  >
                                                    <GithubIcon className="w-3 h-3 text-steel-blue" />
                                                    GitHub Profile
                                                  </a>
                                                  {app.linkedinUrl && (
                                                    <a
                                                      href={app.linkedinUrl}
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                      className="flex items-center gap-2 font-mono text-[10px] text-platinum hover:text-ivory transition-colors"
                                                    >
                                                      <LinkedinIcon className="w-3 h-3 text-steel-blue" />
                                                      LinkedIn Profile
                                                    </a>
                                                  )}
                                                  {app.portfolioUrl && (
                                                    <a
                                                      href={app.portfolioUrl}
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                      className="flex items-center gap-2 font-mono text-[10px] text-platinum hover:text-ivory transition-colors"
                                                    >
                                                      <Globe size={12} className="text-steel-blue" />
                                                      Portfolio Website
                                                    </a>
                                                  )}
                                                </div>
                                              </div>
                                            </div>

                                            <div className="flex flex-col gap-2 mt-4">
                                              {/* View Resume Button */}
                                              <a
                                                href={app.resumeUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full py-3 rounded-lg bg-ivory text-charcoal hover:bg-platinum font-space font-semibold text-[10.5px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors focus:outline-none"
                                              >
                                                <FileText size={13} />
                                                View Resume (PDF)
                                              </a>

                                              <a
                                                href={`mailto:${app.email}?subject=Aetherion Careers Application Response&body=Hello ${app.fullName},%0D%0A%0D%0AThank you for submitting your engineering blueprints to Aetherion Technologies for the ${app.role} position.%0D%0A%0D%0ARegards,%0D%0ALead Systems Architect`}
                                                className="w-full py-2.5 rounded-lg bg-steel-blue text-ivory hover:bg-steel-blue/80 font-space font-semibold text-[10.5px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors focus:outline-none"
                                              >
                                                <Mail size={12} />
                                                Contact Candidate
                                              </a>
                                            </div>
                                          </div>

                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>

                                </div>
                              );
                            })}
                          </div>

                        </div>
                      )
                    ))}
                </div>

              </motion.div>
            )}

          </AnimatePresence>

        </div>
      </main>
      <Footer />
    </>
  );
}
