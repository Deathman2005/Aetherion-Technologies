"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useRef } from "react";
import {
  Briefcase, ArrowRight, ArrowLeft, Upload, FileText, CheckCircle2,
  Loader2, AlertCircle, Sparkles, Terminal, Globe, Check
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

interface Role {
  title: string;
  department: string;
  type: string;
  experience: string;
  description: string;
  skills: string[];
  prerequisites: string[];
  responsibilities: string[];
}

const openRoles: Role[] = [
  {
    title: "Frontend Developer",
    department: "Design & Interaction",
    type: "Full-Time / Remote",
    experience: "1–3 Years",
    description: "Build immersive, fluid user experiences using React/Next.js. Transform high-fidelity design schemas into interactive, responsive, and performant web interfaces.",
    skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "UI/UX Design"],
    prerequisites: [
      "Solid grasp of React.js, Next.js (App Router), and modern TypeScript.",
      "Mastery of responsive layouts, HSL design tokens, and CSS frameworks (Tailwind).",
      "Experience integrating secure JSON/Serverless API endpoints with robust error intercepts.",
      "Eye for dynamic user experiences, glassmorphic themes, and Framer Motion micro-animations.",
      "Commitment to clean modular code structures, Git workflows, and technical reviews."
    ],
    responsibilities: [
      "Translate beautiful UX blueprints into responsive Next.js views.",
      "Build performant, highly interactive metrics dashboards.",
      "Optimize client bundles, hydration streams, and SEO structures.",
      "Integrate AI agent response triggers and file ingestion channels."
    ]
  },
  {
    title: "Lead Generation Associate",
    department: "Business Growth & Research",
    type: "Remote • Founding Team",
    experience: "Students & Freshers Welcome",
    description: "We are looking for a proactive Lead Generation Associate to help identify potential clients and growth opportunities for Aetherion Technologies. You will research businesses, discover decision-makers, and build qualified prospect databases that support the company's expansion efforts.",
    skills: ["Google Search", "LinkedIn", "Google Sheets", "Apollo (Optional)", "Email Research", "Market Research"],
    prerequisites: [
      "Strong internet research and information gathering skills.",
      "Familiarity with Google Search, LinkedIn, and business directories.",
      "Ability to identify decision-makers and business opportunities.",
      "Excellent attention to detail and organizational skills.",
      "Self-motivated mindset with a willingness to learn."
    ],
    responsibilities: [
      "Research companies across multiple industries.",
      "Build and maintain qualified lead databases.",
      "Identify founders, business owners, and decision-makers.",
      "Collect business contact information and market insights.",
      "Support outreach preparation and growth initiatives."
    ]
  },
  {
    title: "Business Development Associate",
    department: "Sales & Client Acquisition",
    type: "Remote • Founding Team",
    experience: "Students & Freshers Welcome",
    description: "We are looking for a confident and ambitious Business Development Associate to help build relationships with potential clients and contribute to Aetherion's growth. You will engage with prospects, initiate conversations, and help convert opportunities into meaningful business relationships.",
    skills: ["LinkedIn", "Email Outreach", "WhatsApp", "Google Meet", "CRM Systems", "Sales Research"],
    prerequisites: [
      "Strong verbal and written communication skills.",
      "Professional and confident approach to client conversations.",
      "Ability to understand business requirements.",
      "Comfortable with email, LinkedIn, and WhatsApp outreach.",
      "Growth-oriented and self-driven mindset."
    ],
    responsibilities: [
      "Conduct outreach to potential clients.",
      "Schedule discovery calls and meetings.",
      "Follow up with prospects and maintain communication.",
      "Support client acquisition and relationship building.",
      "Assist in proposal and business development activities."
    ]
  }
];

const coreTechnologies = [
  "React.js", "Next.js", "TypeScript", "Node.js", "MongoDB",
  "Express.js", "Tailwind CSS", "Docker", "Firebase",
  "Supabase", "Python", "AI / LLM Integration", "DevOps", "UI/UX Design"
];

const businessSkills = [
  "Google Search", "LinkedIn", "Google Sheets", "Apollo (Optional)", "Email Research",
  "Market Research", "Email Outreach", "WhatsApp", "Google Meet", "CRM Systems", "Sales Research"
];

export default function CareersPage() {
  const [activeStep, setActiveStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState(openRoles[0].title);
  const [skills, setSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Form Fields State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [whyJoin, setWhyJoin] = useState("");
  const [proudProject, setProudProject] = useState("");
  const [resume, setResume] = useState<File | null>(null);

  // UI States
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const handleSelectRoleToApply = (roleTitle: string) => {
    setSelectedRole(roleTitle);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleToggleSkill = (skill: string) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter((s) => s !== skill));
    } else {
      setSkills([...skills, skill]);
    }
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    const allowedExtensions = ["pdf", "docx"];

    if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
      setErrorMsg("Invalid file type. Only PDF and DOCX CVs are accepted.");
      setResume(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg("File exceeds 5MB size limit.");
      setResume(null);
      return;
    }

    setErrorMsg("");
    setResume(file);
  };

  const handleNextStep = () => {
    // Validate Step 1
    if (activeStep === 1) {
      if (!fullName.trim() || !email.trim()) {
        setErrorMsg("Please fill out your Name and Professional Email.");
        return;
      }
    }

    // Validate Step 2
    if (activeStep === 2) {
      if (!selectedRole || !experience) {
        setErrorMsg("Please select the Role and your Experience Level.");
        return;
      }
      if (selectedRole === "Frontend Developer" && !githubUrl.trim()) {
        setErrorMsg("Your GitHub profile link is mandatory for engineering roles.");
        return;
      }
      if (selectedRole !== "Frontend Developer" && !linkedinUrl.trim()) {
        setErrorMsg("Your LinkedIn profile link is mandatory for business growth roles.");
        return;
      }
    }

    // Validate Step 3
    if (activeStep === 3) {
      if (skills.length === 0) {
        setErrorMsg(
          selectedRole === "Frontend Developer"
            ? "Please select at least one core technology skill."
            : "Please select at least one core tool skill."
        );
        return;
      }
      if (!whyJoin.trim() || !proudProject.trim()) {
        setErrorMsg("Please answer the short application essays.");
        return;
      }
    }

    setErrorMsg("");
    setActiveStep(activeStep + 1);
  };

  const handlePrevStep = () => {
    setErrorMsg("");
    setActiveStep(activeStep - 1);
  };

  const handleSubmitApplication = async () => {
    if (!resume) {
      setErrorMsg("Please upload your Resume/CV to transmit application.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("location", location);
      formData.append("role", selectedRole);
      formData.append("experience", experience);
      formData.append("portfolioUrl", portfolioUrl);
      formData.append("githubUrl", githubUrl);
      formData.append("linkedinUrl", linkedinUrl);
      formData.append("skills", JSON.stringify(skills));
      formData.append("whyJoin", whyJoin);
      formData.append("proudProject", proudProject);
      formData.append("resume", resume);

      const response = await fetch("/api/careers", {
        method: "POST",
        body: formData,
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setSuccess(true);
      } else {
        setErrorMsg(resData.message || "Failed to submit application.");
      }
    } catch (e: any) {
      setErrorMsg("Network error. Failed to establish upload tunnel.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="flex-grow bg-charcoal text-ivory relative pt-32 sm:pt-40 pb-24 px-4 sm:px-8 overflow-hidden min-h-screen">
        {/* Ambient HSL glows */}
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none z-0" />
        <div className="absolute inset-0 grid-pattern-fine opacity-20 pointer-events-none z-0" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(circle_at_top,rgba(62,83,107,0.12),transparent_70%)] pointer-events-none z-0" />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Header text */}
          <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
            <span className="text-steel-blue font-space text-xs font-semibold uppercase tracking-[0.25em] mb-3 block">
              Architect the Future
            </span>
            <h1 className="font-space text-4xl sm:text-5xl font-medium tracking-tight text-ivory mb-5">
              Engineering Careers
            </h1>
            <p className="font-inter text-sm sm:text-base text-platinum/60 leading-relaxed font-light">
              Aetherion Technologies is in an early, highly selective stage of growth. We are currently searching for exceptional individuals to join our core founding team. Explore our active vacancies below and transmit your credentials.
            </p>
          </div>

          {/* ========================================================
              1. OPEN POSITIONS SECTION (MULTIPLE VACANCIES DESIGN)
             ======================================================== */}
          <div className="mb-24 flex flex-col gap-10">
            <div className="flex items-center gap-4 border-b border-ivory/5 pb-4">
              <Briefcase size={18} className="text-steel-blue" />
              <h2 className="font-space text-xl font-medium text-ivory">Active Vacancies</h2>
            </div>

            {openRoles.map((role) => (
              <div
                key={role.title}
                className="w-full glass-panel p-8 sm:p-10 rounded-2xl border-ivory/8 bg-graphite/10 flex flex-col gap-8 hover:border-steel-blue/20 transition-all duration-300 shadow-lg relative overflow-hidden animate-fade-in"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-steel-blue/5 rounded-full blur-3xl pointer-events-none" />

                {/* Card Title & Meta Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-ivory/5 pb-6 text-left">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-steel-blue font-bold">
                      <span>{role.department}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-steel-blue/30" />
                      <span>{role.type}</span>
                    </div>
                    <h3 className="font-space text-2xl sm:text-3xl font-semibold tracking-tight text-ivory mt-1">
                      {role.title}
                    </h3>
                  </div>

                  <span className="self-start sm:self-center px-3 py-1.5 rounded-xl bg-steel-blue/10 border border-steel-blue/20 text-xs font-mono font-semibold text-steel-blue">
                    {role.experience}
                  </span>
                </div>

                {/* Card Body - Requirements and Responsibilities Columns */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-left">
                  {/* Left Column: Requirements & About */}
                  <div className="md:col-span-7 flex flex-col gap-6">
                    <div className="flex flex-col gap-2.5">
                      <span className="font-space text-[10.5px] font-bold uppercase tracking-wider text-steel-blue">
                        About the Vacancy
                      </span>
                      <p className="font-inter text-xs sm:text-sm text-platinum/70 leading-relaxed font-light">
                        {role.description}
                      </p>
                    </div>

                    <div className="flex flex-col gap-3">
                      <span className="font-space text-[10.5px] font-bold uppercase tracking-wider text-steel-blue">
                        Core Prerequisites
                      </span>
                      <ul className="font-inter text-xs text-platinum/75 flex flex-col gap-2 font-light list-none pl-0">
                        {role.prerequisites.map((req, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <CheckCircle2 size={13} className="text-steel-blue shrink-0 mt-0.5" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Column: Responsibilities & Tech Tags */}
                  <div className="md:col-span-5 flex flex-col gap-6 justify-between border-t md:border-t-0 md:border-l border-ivory/5 pt-6 md:pt-0 md:pl-8">
                    <div className="flex flex-col gap-3">
                      <span className="font-space text-[10.5px] font-bold uppercase tracking-wider text-steel-blue">
                        System Responsibilities
                      </span>
                      <ul className="font-inter text-xs text-platinum/75 flex flex-col gap-2.5 font-light list-none pl-0">
                        {role.responsibilities.map((resp, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <Terminal size={12} className="text-steel-blue/70 shrink-0 mt-0.5" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-col gap-3.5 mt-4">
                      <span className="font-space text-[9px] font-semibold uppercase tracking-wider text-platinum/40">
                        Primary Toolkit / Technologies
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {role.skills.map((s) => (
                          <span key={s} className="text-[10px] font-mono bg-steel-blue/10 border border-steel-blue/20 px-2.5 py-1 rounded-xl text-steel-blue">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Apply Button */}
                <div className="border-t border-ivory/5 pt-6 flex items-center justify-between gap-4">
                  <p className="font-inter text-[11px] text-platinum/40 leading-relaxed font-light hidden sm:block">
                    Applications are reviewed within 48 hours by our founding team.
                  </p>

                  <button
                    onClick={() => handleSelectRoleToApply(role.title)}
                    className="px-6 py-3.5 rounded-xl bg-ivory text-charcoal hover:bg-platinum hover:scale-[1.02] active:scale-[0.98] font-space font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer ml-auto"
                  >
                    <Sparkles size={13} />
                    Apply for Vacancy
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ========================================================
              2. INTERACTIVE PORTAL APPLICATION FORM
             ======================================================== */}
          <div ref={formRef} className="max-w-3xl mx-auto">
            <div className="w-full glass-panel p-6 sm:p-10 rounded-2xl border-ivory/8 bg-graphite/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">

              <AnimatePresence mode="wait">
                {success ? (
                  /* Form Submission Completed View */
                  <motion.div
                    key="success-form"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 flex flex-col items-center text-center gap-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2">
                      <CheckCircle2 size={32} />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-400 font-bold">
                      Transmission Sync complete
                    </span>
                    <h2 className="font-space text-2xl font-semibold text-ivory">
                      Application Recorded
                    </h2>
                    <p className="font-inter text-xs sm:text-sm text-platinum/60 leading-relaxed max-w-sm">
                      Your engineering blueprint and PDF credentials have been securely stored in our operations ledger. Our lead architects will review your project repository and get in touch.
                    </p>
                    <button
                      onClick={() => {
                        setSuccess(false);
                        setActiveStep(1);
                        setSelectedRole("Frontend Developer");
                        setSkills([]);
                        setFullName("");
                        setEmail("");
                        setPhone("");
                        setLocation("");
                        setExperience("");
                        setPortfolioUrl("");
                        setGithubUrl("");
                        setLinkedinUrl("");
                        setWhyJoin("");
                        setProudProject("");
                        setResume(null);
                      }}
                      className="mt-4 px-6 py-2.5 rounded-xl border border-ivory/10 hover:border-ivory/30 text-xs font-space font-semibold uppercase tracking-wider text-ivory transition-all hover:bg-graphite/40"
                    >
                      Apply Again
                    </button>
                  </motion.div>
                ) : (
                  /* Form Input Wizard Steps View */
                  <motion.div key="form-wizard" exit={{ opacity: 0 }}>
                    {/* Form Section Header */}
                    <div className="flex items-center justify-between border-b border-ivory/5 pb-6 mb-8 select-none">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-steel-blue font-bold">
                          Step {activeStep} of 4
                        </span>
                        <h3 className="font-space text-lg font-semibold text-ivory">
                          {activeStep === 1 && "Personal Information"}
                          {activeStep === 2 && "Professional Information"}
                          {activeStep === 3 && "Technical Skills & Essays"}
                          {activeStep === 4 && "Resume Transmission"}
                        </h3>
                      </div>

                      {/* Step Indicator Dot Line */}
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4].map((step) => (
                          <div
                            key={step}
                            className={`h-1.5 rounded-full transition-all duration-300 ${step === activeStep ? "w-6 bg-steel-blue" : "w-1.5 bg-ivory/10"
                              }`}
                          />
                        ))}
                      </div>
                    </div>

                    {errorMsg && (
                      <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-inter flex items-start gap-2 mb-6">
                        <AlertCircle size={14} className="mt-0.5 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    {/* ========================================================
                        STEP 1: PERSONAL INFORMATION
                       ======================================================== */}
                    {activeStep === 1 && (
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col gap-5 text-left"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div className="flex flex-col gap-2">
                            <label className="font-space text-[10px] font-semibold uppercase tracking-wider text-platinum/50">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              placeholder="e.g. Daniel Mercer"
                              className="w-full bg-charcoal/60 border border-ivory/10 rounded-xl px-4 py-3 text-xs text-ivory placeholder-platinum/30 focus:outline-none focus:border-steel-blue focus:ring-1 focus:ring-steel-blue transition-all"
                            />
                          </div>

                          <div className="flex flex-col gap-2">
                            <label className="font-space text-[10px] font-semibold uppercase tracking-wider text-platinum/50">
                              Professional Email *
                            </label>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="e.g. daniel@northbridgehq.com"
                              className="w-full bg-charcoal/60 border border-ivory/10 rounded-xl px-4 py-3 text-xs text-ivory placeholder-platinum/30 focus:outline-none focus:border-steel-blue focus:ring-1 focus:ring-steel-blue transition-all"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div className="flex flex-col gap-2">
                            <label className="font-space text-[10px] font-semibold uppercase tracking-wider text-platinum/50">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="e.g. +1 555-0199"
                              className="w-full bg-charcoal/60 border border-ivory/10 rounded-xl px-4 py-3 text-xs text-ivory placeholder-platinum/30 focus:outline-none focus:border-steel-blue focus:ring-1 focus:ring-steel-blue transition-all"
                            />
                          </div>

                          <div className="flex flex-col gap-2">
                            <label className="font-space text-[10px] font-semibold uppercase tracking-wider text-platinum/50">
                              Current Location
                            </label>
                            <input
                              type="text"
                              value={location}
                              onChange={(e) => setLocation(e.target.value)}
                              placeholder="e.g. San Francisco, CA"
                              className="w-full bg-charcoal/60 border border-ivory/10 rounded-xl px-4 py-3 text-xs text-ivory placeholder-platinum/30 focus:outline-none focus:border-steel-blue focus:ring-1 focus:ring-steel-blue transition-all"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* ========================================================
                        STEP 2: PROFESSIONAL INFORMATION
                       ======================================================== */}
                    {activeStep === 2 && (
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col gap-5 text-left"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div className="flex flex-col gap-2">
                            <label className="font-space text-[10px] font-semibold uppercase tracking-wider text-platinum/50">
                              Role Applying For *
                            </label>
                            <select
                              value={selectedRole}
                              onChange={(e) => {
                                setSelectedRole(e.target.value);
                                setSkills([]); // Reset skills selection on role change to prevent mixing up
                              }}
                              className="w-full bg-charcoal/60 border border-ivory/10 rounded-xl px-4 py-3 text-xs text-ivory focus:outline-none focus:border-steel-blue focus:ring-1 focus:ring-steel-blue transition-all appearance-none cursor-pointer"
                            >
                              {openRoles.map((role) => (
                                <option key={role.title} value={role.title} className="bg-charcoal text-ivory">
                                  {role.title}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="flex flex-col gap-2">
                            <label className="font-space text-[10px] font-semibold uppercase tracking-wider text-platinum/50">
                              Experience Level *
                            </label>
                            <select
                              value={experience}
                              onChange={(e) => setExperience(e.target.value)}
                              className="w-full bg-charcoal/60 border border-ivory/10 rounded-xl px-4 py-3 text-xs text-ivory focus:outline-none focus:border-steel-blue focus:ring-1 focus:ring-steel-blue transition-all appearance-none cursor-pointer"
                            >
                              <option value="" className="bg-charcoal">Select experience...</option>
                              <option value="Intern" className="bg-charcoal">Intern</option>
                              <option value="Fresher" className="bg-charcoal">Fresher</option>
                              <option value="1-2 Years" className="bg-charcoal">1–2 Years</option>
                              <option value="3-5 Years" className="bg-charcoal">3–5 Years</option>
                              <option value="Senior Level" className="bg-charcoal">Senior Level</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="font-space text-[10px] font-semibold uppercase tracking-wider text-platinum/50 flex items-center gap-1.5 select-none">
                            <GithubIcon className="w-3.5 h-3.5 text-steel-blue" /> GitHub Profile {selectedRole === "Frontend Developer" ? "*" : "(Optional)"}
                          </label>
                          <input
                            type="url"
                            value={githubUrl}
                            onChange={(e) => setGithubUrl(e.target.value)}
                            placeholder={selectedRole === "Frontend Developer" ? "e.g. https://github.com/yourprofile" : "e.g. https://github.com/yourprofile (optional)"}
                            className="w-full bg-charcoal/60 border border-ivory/10 rounded-xl px-4 py-3 text-xs text-ivory placeholder-platinum/30 focus:outline-none focus:border-steel-blue focus:ring-1 focus:ring-steel-blue transition-all"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div className="flex flex-col gap-2">
                            <label className="font-space text-[10px] font-semibold uppercase tracking-wider text-platinum/50 flex items-center gap-1.5 select-none">
                              <Globe size={12} className="text-steel-blue" /> Portfolio Website
                            </label>
                            <input
                              type="url"
                              value={portfolioUrl}
                              onChange={(e) => setPortfolioUrl(e.target.value)}
                              placeholder="e.g. https://yourwebsite.com"
                              className="w-full bg-charcoal/60 border border-ivory/10 rounded-xl px-4 py-3 text-xs text-ivory placeholder-platinum/30 focus:outline-none focus:border-steel-blue focus:ring-1 focus:ring-steel-blue transition-all"
                            />
                          </div>

                          <div className="flex flex-col gap-2">
                            <label className="font-space text-[10px] font-semibold uppercase tracking-wider text-platinum/50 flex items-center gap-1.5 select-none">
                              <LinkedinIcon className="w-3.5 h-3.5 text-steel-blue" /> LinkedIn Profile {selectedRole !== "Frontend Developer" ? "*" : "(Optional)"}
                            </label>
                            <input
                              type="url"
                              value={linkedinUrl}
                              onChange={(e) => setLinkedinUrl(e.target.value)}
                              placeholder={selectedRole !== "Frontend Developer" ? "e.g. https://linkedin.com/in/yourprofile" : "e.g. https://linkedin.com/in/yourprofile (optional)"}
                              className="w-full bg-charcoal/60 border border-ivory/10 rounded-xl px-4 py-3 text-xs text-ivory placeholder-platinum/30 focus:outline-none focus:border-steel-blue focus:ring-1 focus:ring-steel-blue transition-all"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* ========================================================
                        STEP 3: TECHNICAL SKILLS & ESSAYS
                       ======================================================== */}
                    {activeStep === 3 && (
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col gap-6 text-left"
                      >
                        {/* Skills Selection Grid */}
                        <div className="flex flex-col gap-3.5">
                          <label className="font-space text-[10px] font-semibold uppercase tracking-wider text-platinum/50">
                            {selectedRole === "Frontend Developer" ? "Core Technologies *" : "Core Tools / Skills *"}
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {(selectedRole === "Frontend Developer" ? coreTechnologies : businessSkills).map((tech) => {
                              const isSelected = skills.includes(tech);
                              return (
                                <button
                                  type="button"
                                  key={tech}
                                  onClick={() => handleToggleSkill(tech)}
                                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl border text-[11px] font-mono text-left transition-all focus:outline-none cursor-pointer ${isSelected
                                      ? "bg-steel-blue/15 border-steel-blue text-ivory"
                                      : "bg-charcoal/40 border-ivory/5 hover:border-ivory/20 text-platinum/60"
                                    }`}
                                >
                                  <span>{tech}</span>
                                  {isSelected && <Check size={12} className="text-steel-blue shrink-0" />}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Essays */}
                        <div className="flex flex-col gap-2 mt-2">
                          <label className="font-space text-[10px] font-semibold uppercase tracking-wider text-platinum/50">
                            Why do you want to join Aetherion? *
                          </label>
                          <textarea
                            rows={3}
                            value={whyJoin}
                            onChange={(e) => setWhyJoin(e.target.value)}
                            placeholder={
                              selectedRole === "Frontend Developer"
                                ? "Tell us what interests you about our engineering culture, systems approach, or technical direction."
                                : "Tell us what interests you about Aetherion, our growth path, and joining our founding team."
                            }
                            className="w-full bg-charcoal/60 border border-ivory/10 rounded-xl px-4 py-3 text-xs text-ivory placeholder-platinum/30 focus:outline-none focus:border-steel-blue focus:ring-1 focus:ring-steel-blue transition-all resize-none leading-relaxed"
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="font-space text-[10px] font-semibold uppercase tracking-wider text-platinum/50">
                            Describe a project or achievement you're proud of *
                          </label>
                          <textarea
                            rows={3}
                            value={proudProject}
                            onChange={(e) => setProudProject(e.target.value)}
                            placeholder={
                              selectedRole === "Frontend Developer"
                                ? "Share a system, application, or technical challenge you enjoyed building and explain your contribution."
                                : "Share a campaign, outreach strategy, client relationship, or project you are proud of and explain your contribution."
                            }
                            className="w-full bg-charcoal/60 border border-ivory/10 rounded-xl px-4 py-3 text-xs text-ivory placeholder-platinum/30 focus:outline-none focus:border-steel-blue focus:ring-1 focus:ring-steel-blue transition-all resize-none leading-relaxed"
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* ========================================================
                        STEP 4: RESUME TRANSMISSION
                       ======================================================== */}
                    {activeStep === 4 && (
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col gap-6 text-left"
                      >
                        <div className="flex flex-col gap-2">
                          <label className="font-space text-[10px] font-semibold uppercase tracking-wider text-platinum/50">
                            Resume / CV Upload *
                          </label>

                          {/* File upload drag zone */}
                          <div
                            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                            onDragLeave={() => setDragOver(false)}
                            onDrop={handleFileDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className={`border border-dashed rounded-2xl py-12 px-6 flex flex-col items-center text-center justify-center gap-4 cursor-pointer transition-all duration-300 ${dragOver
                                ? "border-steel-blue bg-steel-blue/5"
                                : resume
                                  ? "border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500/50"
                                  : "border-ivory/10 hover:border-steel-blue/30 bg-charcoal/20"
                              }`}
                          >
                            <input
                              type="file"
                              ref={fileInputRef}
                              onChange={handleFileChange}
                              accept=".pdf,.docx"
                              className="hidden"
                            />

                            {resume ? (
                              <div className="p-4 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                <FileText size={28} />
                              </div>
                            ) : (
                              <div className="p-4 rounded-xl bg-graphite/40 text-platinum/50 border border-ivory/5">
                                <Upload size={28} className="animate-pulse" />
                              </div>
                            )}

                            <div>
                              <p className="font-space text-xs font-semibold text-ivory">
                                {resume ? resume.name : "Drag & drop your Resume file"}
                              </p>
                              <p className="font-inter text-[10.5px] text-platinum/40 leading-relaxed mt-1">
                                {resume
                                  ? `File accepted: ${(resume.size / 1024 / 1024).toFixed(2)} MB`
                                  : "Supports PDF and DOCX formats up to 5MB"
                                }
                              </p>
                            </div>

                            {!resume && (
                              <span className="px-4 py-2 rounded-lg bg-charcoal/80 border border-ivory/5 text-[10px] font-space font-semibold uppercase tracking-wider text-platinum/70 shadow-sm">
                                Choose File
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Candidate Agreement */}
                        <div className="p-4 rounded-xl bg-charcoal/40 border border-ivory/5 flex items-start gap-3 mt-2 text-[10.5px] font-inter text-platinum/50 leading-relaxed">
                          <CheckCircle2 size={16} className="text-steel-blue shrink-0 mt-0.5" />
                          <p>
                            By submitting your credentials, you agree that Aetherion Technologies may store your technical blueprints and essays inside our encrypted database to evaluate your systems aptitude. We respect your security: none of your details are ever shared or processed externally.
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {/* ========================================================
                        WIZARD BUTTON PANEL
                       ======================================================== */}
                    <div className="flex items-center justify-between border-t border-ivory/5 pt-6 mt-8 select-none">
                      {activeStep > 1 ? (
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          disabled={loading}
                          className="flex items-center gap-1.5 py-3.5 px-6 rounded-xl border border-ivory/10 hover:border-ivory/30 text-xs font-space font-semibold uppercase tracking-wider text-ivory hover:bg-graphite/40 transition-all focus:outline-none disabled:opacity-50 cursor-pointer"
                        >
                          <ArrowLeft size={13} />
                          Back
                        </button>
                      ) : (
                        <div />
                      )}

                      {activeStep < 4 ? (
                        <button
                          type="button"
                          onClick={handleNextStep}
                          className="flex items-center gap-1.5 py-3.5 px-6 rounded-xl bg-ivory text-charcoal hover:bg-platinum text-xs font-space font-semibold uppercase tracking-wider transition-all focus:outline-none cursor-pointer"
                        >
                          Next Step
                          <ArrowRight size={13} />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={handleSubmitApplication}
                          disabled={loading}
                          className="flex items-center gap-1.5 py-3.5 px-6 rounded-xl bg-steel-blue text-ivory hover:bg-steel-blue/80 text-xs font-space font-semibold uppercase tracking-wider transition-all focus:outline-none disabled:opacity-50 cursor-pointer shadow-md"
                        >
                          {loading ? (
                            <>
                              <Loader2 size={13} className="animate-spin" />
                              Transmitting CV...
                            </>
                          ) : (
                            <>
                              Submit Application
                              <Sparkles size={13} />
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
