"use client";

import { motion } from "framer-motion";
import { Quote, Cpu, Terminal, CheckCircle2, Rocket, ArrowDown, Server, Code, ShieldCheck, Heart, Share2 } from "lucide-react";

interface Commitment {
  title: string;
  description: string;
  focus: string;
  category: string;
  tags: string[];
}

const commitments: Commitment[] = [
  {
    title: "3-Partner Max Roster",
    description: "To guarantee deep attention to detail, we restrict our active client loading to exactly three concurrent partners. Your project is never pushed to junior developers or outsourced.",
    focus: "Elite Craftsmanship",
    category: "Client Selectivity",
    tags: ["Focused Dev", "Zero Outsourcing"],
  },
  {
    title: "Zero Management Overhead",
    description: "Bypass layers of sales reps and generalist managers. You will collaborate and consult directly with our core engineering specialists on dedicated, real-time Slack channels.",
    focus: "Direct Collaboration",
    category: "Communication",
    tags: ["Direct Slack", "No Middleware"],
  },
  {
    title: "100% Repository Autonomy",
    description: "Every line of type-safe code, container build, and deployment script is your property from day one. We deliver clean, modern, and self-documenting codebases built to scale.",
    focus: "Code Ownership",
    category: "Intellectual Property",
    tags: ["Clean TS", "Full IP Transfer"],
  },
];

export default function Commitments() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section id="commitments" className="relative py-24 sm:py-32 px-4 sm:px-8 border-b border-graphite/40 bg-charcoal/20">
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none z-0" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Title Details */}
        <div className="flex flex-col items-start text-left mb-16 sm:mb-20">
          <span className="text-steel-blue font-space text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            Bespoke Orchestration
          </span>
          <h2 className="font-space text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-ivory mb-6 max-w-2xl leading-[1.1]">
            Architectural Convergence
          </h2>
          <p className="font-inter text-platinum text-[15px] sm:text-[16px] leading-relaxed max-w-xl font-light">
            We orchestrate three separate development vectors—Frontend Interfaces, Backend Databases, and Intelligent Agents—converging them into a single SLA-verified production system.
          </p>
        </div>

        {/* ========================================================
            DIVERGENT-CONVERGENT PIPELINE DIAGRAM
           ======================================================== */}
        <div className="mb-28 w-full max-w-5xl mx-auto">
          
          {/* Desktop Pipeline (Horizontal Grid + Scaled SVGs) */}
          <div className="hidden lg:block relative w-full">
            
            {/* Style tag inside SVG to run dynamic data packet flow animations */}
            <svg className="hidden">
              <defs>
                <style>{`
                  @keyframes flow-left {
                    0% { stroke-dashoffset: 40; }
                    100% { stroke-dashoffset: 0; }
                  }
                  .animate-data-flow {
                    stroke-dasharray: 8 12;
                    animation: flow-left 2s linear infinite;
                  }
                `}</style>
              </defs>
            </svg>

            {/* Step 1: The Three Branches */}
            <div className="grid grid-cols-3 gap-8 relative z-10 items-stretch">
              
              {/* Branch A: Frontend (Left Column) */}
              <div className="glass-panel p-6 rounded-2xl border-ivory/5 bg-graphite/10 hover:border-platinum/30 transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-graphite/40 border border-ivory/5 text-platinum/50 uppercase tracking-widest">
                      Vector A
                    </span>
                    <Code size={16} className="text-platinum group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="font-space text-[15px] font-semibold text-ivory mb-2">Full-Stack & SaaS Engines</h3>
                  <p className="font-inter text-xs text-platinum/70 leading-relaxed font-light">
                    Designing and building beautiful, responsive multi-tenant SaaS interfaces and robust front-end web architectures using Next.js and React 19.
                  </p>
                </div>
              </div>

              {/* Branch B: Backend (Center Column) */}
              <div className="glass-panel p-6 rounded-2xl border-ivory/5 bg-graphite/10 hover:border-ivory/20 transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-graphite/40 border border-ivory/5 text-platinum/50 uppercase tracking-widest">
                      Vector B
                    </span>
                    <Server size={16} className="text-ivory group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="font-space text-[15px] font-semibold text-ivory mb-2">Robust Systems & Security</h3>
                  <p className="font-inter text-xs text-platinum/70 leading-relaxed font-light">
                    Orchestrating secure Mongoose database schemas, VPC isolated subnets, high-throughput REST APIs, and digital systems optimized for SOC2 readiness and enterprise data pipelines.
                  </p>
                </div>
              </div>

              {/* Branch C: AI Intelligence (Right Column) */}
              <div className="glass-panel p-6 rounded-2xl border-ivory/5 bg-graphite/10 hover:border-platinum/30 transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-graphite/40 border border-ivory/5 text-platinum/50 uppercase tracking-widest">
                      Vector C
                    </span>
                    <Cpu size={16} className="text-platinum group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="font-space text-[15px] font-semibold text-ivory mb-2">AI & Autonomous Workflows</h3>
                  <p className="font-inter text-xs text-platinum/70 leading-relaxed font-light">
                    Integrating direct agentic reasoning pathways, vector database context caches, custom LLM pipelines, and CRM automation flows that streamline operational complexity.
                  </p>
                </div>
              </div>

            </div>

            {/* SVG Connecting Flow Lines (Desktop Dynamic Scale) */}
            <div className="relative w-full h-[100px] z-0">
              <svg width="100%" height="100" viewBox="0 0 600 100" preserveAspectRatio="none" className="absolute inset-0 select-none overflow-visible">
                {/* Background static lines */}
                <path d="M 100,0 C 100,50 300,50 300,100" fill="none" stroke="rgba(245,243,239,0.05)" strokeWidth="1.5" />
                <path d="M 300,0 L 300,100" fill="none" stroke="rgba(245,243,239,0.05)" strokeWidth="1.5" />
                <path d="M 500,0 C 500,50 300,50 300,100" fill="none" stroke="rgba(245,243,239,0.05)" strokeWidth="1.5" />
                
                {/* Animated active glowing flows */}
                <path d="M 100,0 C 100,50 300,50 300,100" fill="none" stroke="rgba(62,83,107,0.35)" strokeWidth="1.5" className="animate-data-flow" />
                <path d="M 300,0 L 300,100" fill="none" stroke="rgba(245,243,239,0.25)" strokeWidth="1.5" className="animate-data-flow" style={{ animationDelay: "0.5s" }} />
                <path d="M 500,0 C 500,50 300,50 300,100" fill="none" stroke="rgba(62,83,107,0.35)" strokeWidth="1.5" className="animate-data-flow" style={{ animationDelay: "1s" }} />
              </svg>
            </div>

            {/* Step 2: The Convergence Card */}
            <div className="relative z-10 w-full flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="w-full max-w-xl glass-panel p-6 rounded-2xl border-steel-blue/20 bg-charcoal flex flex-col items-center text-center shadow-[0_15px_40px_rgba(0,0,0,0.4)] group"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-400 font-semibold">
                    Convergence Point
                  </span>
                </div>
                <h3 className="font-space text-[16px] font-semibold text-ivory mb-2 flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-steel-blue" />
                  Unified SLA Audit & Integration Testing
                </h3>
                <p className="font-inter text-xs text-platinum/80 max-w-md leading-relaxed font-light">
                  All branches are compiled, validated, and stress-tested in isolation before being integrated. We verify 95%+ code coverage and microsecond routing latency.
                </p>
              </motion.div>
            </div>

            {/* SVG Final Path */}
            <div className="relative w-full h-[60px] z-0">
              <svg width="100%" height="60" viewBox="0 0 600 60" preserveAspectRatio="none" className="absolute inset-0 select-none overflow-visible">
                <line x1="300" y1="0" x2="300" y2="60" stroke="rgba(245,243,239,0.05)" strokeWidth="1.5" />
                <line x1="300" y1="0" x2="300" y2="60" stroke="rgba(62,83,107,0.35)" strokeWidth="1.5" className="animate-data-flow" style={{ animationDelay: "0.2s" }} />
              </svg>
            </div>

            {/* Step 3: The Unified End Node */}
            <div className="relative z-10 w-full flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-panel px-8 py-5 rounded-2xl border-ivory/10 bg-graphite/40 hover:border-ivory/20 transition-all flex items-center gap-4 text-left shadow-lg"
              >
                <div className="p-3 rounded-xl bg-ivory text-charcoal shadow-md">
                  <Rocket size={18} />
                </div>
                <div>
                  <span className="font-space text-xs font-semibold uppercase tracking-widest text-steel-blue block mb-0.5">
                    Launch State
                  </span>
                  <h4 className="font-space text-sm font-semibold text-ivory">
                    100% Repository Autonomy & Production Launch
                  </h4>
                </div>
              </motion.div>
            </div>

          </div>

          {/* Mobile / Tablet Pipeline (Vertical List) */}
          <div className="lg:hidden flex flex-col gap-6 relative pl-6">
            
            {/* Vertical Flow connector Line */}
            <div className="absolute left-[11px] top-6 bottom-6 w-[1.5px] bg-gradient-to-b from-ivory/5 via-steel-blue/30 to-ivory/5 z-0" />

            {/* Branch 1 */}
            <div className="relative glass-panel p-5 rounded-2xl border-ivory/5 bg-graphite/10 flex items-start gap-4">
              <div className="absolute top-6 -left-[20px] w-4 h-4 rounded-full bg-charcoal border border-steel-blue/30 z-10 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-steel-blue" />
              </div>
              <div>
                <span className="font-mono text-[8px] text-platinum/40 uppercase tracking-widest block mb-1">
                  Vector A
                </span>
                <h3 className="font-space text-[14px] font-semibold text-ivory mb-1">Full-Stack & SaaS Engines</h3>
                <p className="font-inter text-xs text-platinum/70 leading-relaxed font-light">
                  Responsive multi-tenant SaaS interfaces and robust frontend systems in Next.js 16 and Tailwind v4.
                </p>
              </div>
            </div>

            {/* Branch 2 */}
            <div className="relative glass-panel p-5 rounded-2xl border-ivory/5 bg-graphite/10 flex items-start gap-4">
              <div className="absolute top-6 -left-[20px] w-4 h-4 rounded-full bg-charcoal border border-ivory/20 z-10 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-platinum/40" />
              </div>
              <div>
                <span className="font-mono text-[8px] text-platinum/40 uppercase tracking-widest block mb-1">
                  Vector B
                </span>
                <h3 className="font-space text-[14px] font-semibold text-ivory mb-1">Robust Systems & Security</h3>
                <p className="font-inter text-xs text-platinum/70 leading-relaxed font-light">
                  Secure Mongoose database schemas, VPC isolated subnets, and high-throughput REST APIs engineered for SOC2 readiness.
                </p>
              </div>
            </div>

            {/* Branch 3 */}
            <div className="relative glass-panel p-5 rounded-2xl border-ivory/5 bg-graphite/10 flex items-start gap-4">
              <div className="absolute top-6 -left-[20px] w-4 h-4 rounded-full bg-charcoal border border-steel-blue/30 z-10 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-steel-blue" />
              </div>
              <div>
                <span className="font-mono text-[8px] text-platinum/40 uppercase tracking-widest block mb-1">
                  Vector C
                </span>
                <h3 className="font-space text-[14px] font-semibold text-ivory mb-1">AI & Autonomous Workflows</h3>
                <p className="font-inter text-xs text-platinum/70 leading-relaxed font-light">
                  Direct agentic reasoning pathways, vector database context caches, and custom CRM automation flows.
                </p>
              </div>
            </div>

            {/* Merge Mobile Card */}
            <div className="relative glass-panel p-5 rounded-2xl border-emerald-500/20 bg-charcoal/80 flex items-start gap-4">
              <div className="absolute top-6 -left-[20px] w-4 h-4 rounded-full bg-charcoal border border-emerald-500/30 z-10 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-[8px] text-emerald-400 font-semibold uppercase tracking-widest">
                    Convergence Point
                  </span>
                </div>
                <h3 className="font-space text-[14px] font-semibold text-ivory mb-1 flex items-center gap-2">
                  Unified SLA Audit & Integration
                </h3>
                <p className="font-inter text-xs text-platinum/80 leading-relaxed font-light">
                  Comprehensive compilation, peer-reviewed audits, unit testing, and isolated validation.
                </p>
              </div>
            </div>

            {/* Final Mobile Node */}
            <div className="relative glass-panel p-5 rounded-2xl border-ivory/10 bg-graphite/30 flex items-start gap-4">
              <div className="absolute top-6 -left-[20px] w-4 h-4 rounded-full bg-charcoal border border-ivory/20 z-10 flex items-center justify-center">
                <Rocket size={8} className="text-platinum" />
              </div>
              <div>
                <span className="font-space text-[9px] font-semibold uppercase tracking-widest text-steel-blue block mb-0.5">
                  Launch State
                </span>
                <h4 className="font-space text-[14px] font-semibold text-ivory">
                  100% Autonomy & Launch
                </h4>
              </div>
            </div>

          </div>

        </div>

        {/* ========================================================
            OUR COMMITMENTS CARDS (Replacing Testimonials)
           ======================================================== */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <span className="text-steel-blue font-space text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            How We Partner
          </span>
          <h2 className="font-space text-3xl sm:text-4xl font-medium tracking-tight text-ivory mb-6 max-w-2xl leading-[1.1]">
            Our Service Commitments
          </h2>
          <p className="font-inter text-platinum text-[15px] leading-relaxed max-w-xl font-light">
            We reject the typical sales-heavy agency model. We establish tight, highly technical partnerships built on craftsmanship and transparency.
          </p>
        </div>

        {/* Commitments spotlight cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {commitments.map((com, index) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              key={com.title}
              onMouseMove={handleMouseMove}
              className="glow-card glass-panel p-6 sm:p-8 rounded-2xl border-ivory/5 bg-graphite/10 flex flex-col justify-between shadow-sm group min-h-[280px]"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-2 rounded-lg bg-steel-blue/10 border border-steel-blue/20 text-steel-blue">
                    <ShieldCheck size={16} />
                  </div>
                  
                  {/* Category Tags */}
                  <div className="flex gap-1.5">
                    {com.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[9px] px-2 py-0.5 rounded bg-graphite/40 border border-ivory/5 text-platinum/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="font-space text-[16px] font-semibold text-ivory mb-3 group-hover:text-platinum transition-colors">
                  {com.title}
                </h3>

                <p className="font-inter text-[13px] leading-relaxed text-platinum/70 font-light mb-8 group-hover:text-platinum/90 transition-colors">
                  {com.description}
                </p>
              </div>

              {/* Tag Info line */}
              <div className="pt-4 border-t border-ivory/5 flex flex-col gap-0.5">
                <span className="font-space text-[10px] uppercase tracking-wider font-semibold text-steel-blue">
                  {com.category}
                </span>
                <span className="font-inter text-xs text-platinum/40">
                  Guarantee: <span className="text-platinum/60 font-medium">{com.focus}</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
