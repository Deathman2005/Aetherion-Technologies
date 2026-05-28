"use client";

import { useState } from "react";
import { Cpu, Database, BarChart3, ShieldCheck, Zap, Play, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Service {
  id: string;
  name: string;
  description: string;
  icon: any;
  metric: string;
}

const services: Service[] = [
  {
    id: "ai-automation",
    name: "AI Automation",
    description: "Orchestrate agentic workflows, LLM reasoning pathways, and autonomous processing pipelines that streamline operational complexity.",
    icon: Cpu,
    metric: "Efficiency Increase: 320%",
  },
  {
    id: "saas-development",
    name: "SaaS Development",
    description: "Design and build scalable, secure multi-tenant SaaS products with beautiful user interfaces and robust billing architectures.",
    icon: BarChart3,
    metric: "Target Availability: 99.99%",
  },
  {
    id: "fullstack-engineering",
    name: "Full Stack Engineering",
    description: "Professionally engineered web systems using ultra-modern frameworks, scalable APIs, and clean engineering standards.",
    icon: Database,
    metric: "Build Time: Sub-2s",
  },

  {
    id: "it-consultancy",
    name: "IT Consultancy",
    description: "High-level architectural advice, tech stack modernization roadmaps, and security auditing for legacy infrastructures.",
    icon: ShieldCheck,
    metric: "Compliance Level: SOC2 ready",
  },
  {
    id: "business-systems",
    name: "Business Systems",
    description: "Digital transformation blueprints, custom CRM integrations, financial dashboards, and database optimizations.",
    icon: Zap,
    metric: "ROI Achieved: 14x Avg",
  },
];

export default function Services() {
  const [activeTab, setActiveTab] = useState<string>("ai-automation");



  // AI Pipeline Simulator states
  const [aiStep, setAiStep] = useState<number>(0);
  const [aiRunning, setAiRunning] = useState(false);

  const triggerAiPipeline = () => {
    if (aiRunning) return;
    setAiRunning(true);
    setAiStep(1);

    const steps = [1, 2, 3, 4];
    steps.forEach((step, idx) => {
      setTimeout(() => {
        setAiStep(step);
        if (step === 4) {
          setTimeout(() => {
            setAiRunning(false);
            setAiStep(0);
          }, 1500);
        }
      }, (idx + 1) * 1200);
    });
  };



  return (
    <section id="services" className="relative py-24 sm:py-32 px-4 sm:px-8 border-b border-graphite/40">
      <div className="absolute inset-0 grid-pattern-fine opacity-30 pointer-events-none z-0" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Title details */}
        <div className="flex flex-col items-start text-left mb-16 sm:mb-24">
          <span className="text-steel-blue font-space text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            Capabilities
          </span>
          <h2 className="font-space text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-ivory mb-6 max-w-2xl leading-[1.1]">
            Intelligent digital systems, built to scale.
          </h2>
          <p className="font-inter text-platinum text-[15px] sm:text-[16px] leading-relaxed max-w-2xl font-light">
            We move beyond standard templates to engineer robust systems tailored for startups, founders, and large enterprises.
          </p>
        </div>

        {/* Dynamic Interactive Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Glassmorphic Selection Cards */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {services.map((service) => {
              const Icon = service.icon;
              const isActive = activeTab === service.id;
              
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveTab(service.id)}
                  className={`glass-panel text-left p-5 rounded-2xl border-ivory/5 transition-all duration-400 focus:outline-none relative overflow-hidden group ${
                    isActive
                      ? "bg-graphite/50 border-steel-blue/30 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
                      : "hover:bg-graphite/30 hover:border-ivory/10 cursor-pointer"
                  }`}
                >
                  {/* Subtle active line indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-steel-blue"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  <div className="flex items-start gap-4">
                    <div
                      className={`p-2.5 rounded-lg border transition-colors ${
                        isActive
                          ? "bg-steel-blue/10 border-steel-blue/30 text-ivory"
                          : "bg-graphite/60 border-ivory/5 text-platinum/60 group-hover:text-ivory"
                      }`}
                    >
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-space text-[15px] font-semibold text-ivory mb-1.5 flex items-center gap-2">
                        {service.name}
                        {isActive && (
                          <span className="text-[10px] font-sans px-2 py-0.5 rounded bg-steel-blue/20 text-platinum/90 border border-steel-blue/20">
                            Active
                          </span>
                        )}
                      </h3>
                      <p className="font-inter text-[13px] text-platinum/70 leading-relaxed font-light group-hover:text-platinum transition-colors">
                        {service.description}
                      </p>
                      
                      {/* Metric Tag */}
                      <div className="mt-3 flex items-center gap-1.5 text-[11px] text-platinum/40 font-mono">
                        <CheckCircle size={10} className="text-steel-blue" />
                        {service.metric}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Premium Active Workspace Simulator */}
          <div className="lg:col-span-7 flex flex-col justify-stretch">
            <div className="glass-panel border-ivory/5 rounded-2xl p-6 sm:p-8 bg-graphite/10 flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.5)] overflow-hidden min-h-[460px] relative">
              <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-platinum/30 uppercase tracking-widest pointer-events-none">
                SIMULATION CONSOLE
              </div>

              <AnimatePresence mode="wait">
                {activeTab === "ai-automation" && (
                  <motion.div
                    key="ai-automation-widget"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col justify-between h-full w-full"
                  >
                    <div>
                      <h4 className="font-space text-lg font-medium text-ivory mb-2">
                        AI Agent Orchestrator Simulator
                      </h4>
                      <p className="font-inter text-xs text-platinum/70 leading-relaxed mb-8 max-w-md">
                        Witness the automated decision pipeline in action. Click below to feed a live input payload to the reasoning chain.
                      </p>

                      {/* Visual Flow diagram */}
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center relative my-6">
                        <div
                          className={`p-3.5 rounded-xl border text-center font-mono text-[10.5px] transition-all ${
                            aiStep >= 1
                              ? "bg-steel-blue/10 border-steel-blue text-ivory"
                              : "bg-graphite/40 border-ivory/5 text-platinum/50"
                          }`}
                        >
                          <div className="text-[9px] text-platinum/40 mb-1">NODE 01</div>
                          Payload Ingest
                        </div>
                        <div
                          className={`p-3.5 rounded-xl border text-center font-mono text-[10.5px] transition-all ${
                            aiStep >= 2
                              ? "bg-steel-blue/10 border-steel-blue text-ivory"
                              : "bg-graphite/40 border-ivory/5 text-platinum/50"
                          }`}
                        >
                          <div className="text-[9px] text-platinum/40 mb-1">NODE 02</div>
                          LLM Analysis
                        </div>
                        <div
                          className={`p-3.5 rounded-xl border text-center font-mono text-[10.5px] transition-all ${
                            aiStep >= 3
                              ? "bg-steel-blue/10 border-steel-blue text-ivory"
                              : "bg-graphite/40 border-ivory/5 text-platinum/50"
                          }`}
                        >
                          <div className="text-[9px] text-platinum/40 mb-1">NODE 03</div>
                          DB Sync Lock
                        </div>
                        <div
                          className={`p-3.5 rounded-xl border text-center font-mono text-[10.5px] transition-all ${
                            aiStep >= 4
                              ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 font-semibold"
                              : "bg-graphite/40 border-ivory/5 text-platinum/50"
                          }`}
                        >
                          <div className="text-[9px] text-platinum/40 mb-1">OUTPUT</div>
                          Action Dispatched
                        </div>
                      </div>

                      {/* Status console outputs */}
                      <div className="bg-charcoal/80 p-4 rounded-xl border border-ivory/5 font-mono text-[11px] h-[100px] flex flex-col justify-end text-platinum/60">
                        {aiStep === 0 && <div>❯ Console idle. Feed input payload to start.</div>}
                        {aiStep >= 1 && (
                          <div className="text-steel-blue">❯ [INGEST] Ingested user ticket #4089. Validating token length...</div>
                        )}
                        {aiStep >= 2 && (
                          <div className="text-platinum">
                            ❯ [REASONING] Prompting LLM routing agent. Task identified as [DB_MUTATION_CRITICAL].
                          </div>
                        )}
                        {aiStep >= 3 && (
                          <div className="text-yellow-400/90">
                            ❯ [TRANSACTION] Preparing MongoDB transaction. Checking replica consensus...
                          </div>
                        )}
                        {aiStep >= 4 && (
                          <div className="text-emerald-400 font-semibold">
                            ❯ [DISPATCH] Transaction committed. User notified via Webhook. Execution time: 148ms.
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={triggerAiPipeline}
                      disabled={aiRunning}
                      className={`mt-6 w-full py-3.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border border-ivory/10 transition-colors ${
                        aiRunning
                          ? "bg-graphite/20 text-platinum/40 cursor-not-allowed"
                          : "bg-ivory text-charcoal hover:bg-platinum"
                      }`}
                    >
                      <Play size={12} className={aiRunning ? "animate-pulse" : ""} />
                      {aiRunning ? "Processing Pipeline..." : "Trigger Analysis Pipeline"}
                    </button>
                  </motion.div>
                )}

                {activeTab === "saas-development" && (
                  <motion.div
                    key="saas-development-widget"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col justify-between h-full w-full"
                  >
                    <div>
                      <h4 className="font-space text-lg font-medium text-ivory mb-2">
                        SaaS Real-time Metrics Dashboard
                      </h4>
                      <p className="font-inter text-xs text-platinum/70 leading-relaxed mb-6">
                        An interactive snippet of a modern analytics console. Filter and toggle real-time subscription performance metrics below.
                      </p>

                      {/* Mock Chart & Metrics */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="glass-panel p-3.5 rounded-xl border-ivory/5 bg-charcoal/20">
                          <div className="text-[10px] text-platinum/40 uppercase tracking-wide font-semibold mb-1">
                            Monthly Recurring
                          </div>
                          <div className="font-space text-lg font-semibold text-ivory">$148,250</div>
                          <div className="text-[9px] text-emerald-400 font-medium font-mono mt-1">+14.2% MoM</div>
                        </div>
                        <div className="glass-panel p-3.5 rounded-xl border-ivory/5 bg-charcoal/20">
                          <div className="text-[10px] text-platinum/40 uppercase tracking-wide font-semibold mb-1">
                            Active Seats
                          </div>
                          <div className="font-space text-lg font-semibold text-ivory">4,892</div>
                          <div className="text-[9px] text-emerald-400 font-medium font-mono mt-1">+380 seats</div>
                        </div>
                        <div className="glass-panel p-3.5 rounded-xl border-ivory/5 bg-charcoal/20">
                          <div className="text-[10px] text-platinum/40 uppercase tracking-wide font-semibold mb-1">
                            Churn Rate
                          </div>
                          <div className="font-space text-lg font-semibold text-ivory">1.24%</div>
                          <div className="text-[9px] text-emerald-400 font-medium font-mono mt-1">-0.3% drop</div>
                        </div>
                      </div>

                      {/* Custom SVG line chart snippet */}
                      <div className="glass-panel p-4 rounded-xl border-ivory/5 bg-charcoal/40 h-[100px] flex items-end">
                        <svg className="w-full h-full text-steel-blue overflow-visible" viewBox="0 0 300 80">
                          <defs>
                            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
                              <stop offset="100%" stopColor="currentColor" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M 0 65 Q 40 45 80 50 T 160 25 T 240 35 T 300 5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          />
                          <path
                            d="M 0 65 Q 40 45 80 50 T 160 25 T 240 35 T 300 5 L 300 80 L 0 80 Z"
                            fill="url(#chartGrad)"
                          />
                          <circle cx="300" cy="5" r="4.5" fill="#F5F3EF" />
                        </svg>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-between gap-4 font-mono text-[10px] text-platinum/50 uppercase tracking-wide border-t border-ivory/5 pt-4">
                      <span>Live pipeline connected</span>
                      <span>Update: Just now</span>
                    </div>
                  </motion.div>
                )}

                {activeTab === "fullstack-engineering" && (
                  <motion.div
                    key="fullstack-engineering-widget"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col justify-between h-full w-full"
                  >
                    <div>
                      <h4 className="font-space text-lg font-medium text-ivory mb-2">
                        Bespoke Code Base Playground
                      </h4>
                      <p className="font-inter text-xs text-platinum/70 leading-relaxed mb-6">
                        We build using highly structured, modular, and type-safe systems. Examine our code standards inside a mock server bundle.
                      </p>

                      {/* Mock Code Block */}
                      <div className="bg-charcoal/80 rounded-xl border border-ivory/5 p-4 font-mono text-[10.5px] leading-relaxed text-platinum/80 overflow-x-auto">
                        <pre className="text-left">
                          <code className="text-zinc-500">// TypeScript - Clean architecture controller handler</code>
                          <br />
                          <code>
                            <span className="text-steel-blue">export async function</span>{" "}
                            <span className="text-amber-400">handleInquiry</span>(req: Request, res: Response) {"{"}
                          </code>
                          <br />
                          <code>
                            {"  "}
                            <span className="text-zinc-500">
                              // Validate using scalable schema parsing
                            </span>
                          </code>
                          <br />
                          <code>
                            {"  "}
                            <span className="text-purple-400">const</span> parsedPayload = InquirySchema.
                            <span className="text-amber-400">safeParse</span>(req.body);
                          </code>
                          <br />
                          <code>
                            {"  "}
                            <span className="text-purple-400">if</span> (!parsedPayload.success) {"{"}
                          </code>
                          <br />
                          <code>
                            {"    "}
                            <span className="text-purple-400">return</span> res.
                            <span className="text-amber-400">status</span>(400).
                            <span className="text-amber-400">json</span>({"{"} success: false {"}"});
                          </code>
                          <br />
                          <code>{"  }"}</code>
                          <br />
                          <code>
                            {"  "}
                            <span className="text-purple-400">await</span> DatabaseService.
                            <span className="text-amber-400">commitTransaction</span>(parsedPayload.data);
                          </code>
                          <br />
                          <code>{"}"}</code>
                        </pre>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-between gap-4 font-mono text-[10px] text-platinum/50 uppercase tracking-wide border-t border-ivory/5 pt-4">
                      <span>Linter check: Passed</span>
                      <span>Coverage: 96.8%</span>
                    </div>
                  </motion.div>
                )}



                {activeTab === "it-consultancy" && (
                  <motion.div
                    key="it-consultancy-widget"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col justify-between h-full w-full"
                  >
                    <div>
                      <h4 className="font-space text-lg font-medium text-ivory mb-2">
                        Enterprise Infrastructure Audit Preview
                      </h4>
                      <p className="font-inter text-xs text-platinum/70 leading-relaxed mb-6">
                        We build strategic transformation roadmaps. Below is a target checklist representing core milestones for typical SOC2/GDPR alignment.
                      </p>

                      {/* Mock Consultancy Audits */}
                      <div className="flex flex-col gap-3 font-mono text-[11px] text-platinum/80">
                        <div className="flex items-center gap-3 p-3 rounded-lg border border-ivory/5 bg-charcoal/30">
                          <CheckCircle size={14} className="text-steel-blue" />
                          <span>Secret Management: Enforced dynamic vault credentials rotations.</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg border border-ivory/5 bg-charcoal/30">
                          <CheckCircle size={14} className="text-steel-blue" />
                          <span>VPC Isolation: Mapped backend database inside isolated subnets.</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg border border-ivory/5 bg-charcoal/30">
                          <CheckCircle size={14} className="text-steel-blue" />
                          <span>Audit Trail Logs: Implemented immutable access telemetry tables.</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-between gap-4 font-mono text-[10px] text-platinum/50 uppercase tracking-wide border-t border-ivory/5 pt-4">
                      <span>Audit score: 99/100</span>
                      <span>Status: Compliance Ready</span>
                    </div>
                  </motion.div>
                )}

                {activeTab === "business-systems" && (
                  <motion.div
                    key="business-systems-widget"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col justify-between h-full w-full"
                  >
                    <div>
                      <h4 className="font-space text-lg font-medium text-ivory mb-2">
                        Enterprise Cost Optimization Estimator
                      </h4>
                      <p className="font-inter text-xs text-platinum/70 leading-relaxed mb-6">
                        See how automating redundant tasks impacts your bottom line. Move sliders or interact in real-world scenarios.
                      </p>

                      {/* ROI Calculator representation */}
                      <div className="glass-panel p-4.5 rounded-xl border-ivory/5 bg-charcoal/50 flex flex-col gap-4">
                        <div className="flex justify-between items-center text-xs font-mono">
                          <span className="text-platinum/60">Manual Team Hours (Weekly):</span>
                          <span className="text-ivory font-semibold">120 Hours</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-graphite relative overflow-hidden">
                          <div className="absolute left-0 top-0 bottom-0 w-2/3 bg-steel-blue" />
                        </div>
                        <div className="flex justify-between items-center text-xs font-mono border-t border-ivory/5 pt-3">
                          <span className="text-platinum/60">Target Hours (With AI Automation):</span>
                          <span className="text-emerald-400 font-semibold">12 Hours</span>
                        </div>
                        <div className="flex justify-between items-center text-xs font-mono">
                          <span className="text-platinum/60 font-semibold text-emerald-400">Weekly Hours Saved:</span>
                          <span className="text-emerald-400 font-bold">108 Hours (90% reduction)</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-between gap-4 font-mono text-[10px] text-platinum/50 uppercase tracking-wide border-t border-ivory/5 pt-4">
                      <span>Formula: validated by active clients</span>
                      <span>Target: ROI 10x minimum</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
