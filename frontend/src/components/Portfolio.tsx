"use client";

import { useState } from "react";
import { ArrowUpRight, Cpu, Server, Shield, Network, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  id: string;
  name: string;
  tagline: string;
  category: string;
  description: string;
  challenge: string;
  solution: string;
  result: string;
  metrics: { label: string; value: string }[];
  techStack: string[];
}

const projects: Project[] = [
  {
    id: "ai-automation",
    name: "AI Automation",
    tagline: "Autonomous Workflow Orchestration & Multi-Agent Platforms",
    category: "AI Automation / Cognitive Workflows",
    description: "Autonomously manage customer interactions, internal workflows, and operational tasks using intelligent agents.",
    challenge: "Businesses lose significant time and revenue because customer support, lead qualification, appointment scheduling, and repetitive workflows are still handled manually across disconnected platforms.",
    solution: "Build an AI automation platform that autonomously manages customer interactions, internal workflows, and operational tasks using intelligent agents and workflow orchestration.",
    result: "Autonomously resolved 74% of redundant workflows with a 320% overall operational efficiency increase.",
    metrics: [
      { label: "Efficiency Increase", value: "320%" },
      { label: "Autonomous Resolve", value: "74%" },
      { label: "Agent Precision", value: "99.8%" },
    ],
    techStack: ["Google Gemini", "Groq AI", "Redux Toolkit", "Socket.io", "Redis"],
  },
  {
    id: "saas-development",
    name: "SaaS Development",
    tagline: "Scalable Multi-Tenant Enterprise Operations & Billing Suite",
    category: "SaaS Platforms / Enterprise",
    description: "Develop a scalable multi-tenant SaaS platform that centralizes collaboration, billing, analytics, and productivity.",
    challenge: "Small and medium businesses struggle to manage teams, subscriptions, projects, and client operations because existing SaaS tools are either too expensive, overly complex, or fragmented across multiple services.",
    solution: "Develop a scalable multi-tenant SaaS platform that centralizes collaboration, billing, analytics, and productivity into a single cloud-based ecosystem.",
    result: "Consolidated toolsets, lowering operational fragmentation by 45% with 99.99% system availability.",
    metrics: [
      { label: "Target Availability", value: "99.99%" },
      { label: "Fragmentation Cut", value: "45%" },
      { label: "SaaS Multi-Tenants", value: "4,500+" },
    ],
    techStack: ["React", "Express.js", "MongoDB", "Stripe", "OAuth 2.0"],
  },
  {
    id: "fullstack-engineering",
    name: "Full Stack Engineering",
    tagline: "Real-time Tournament Management & Automated Bracket Engine",
    category: "Full Stack Systems / Esports",
    description: "Create a real-time esports tournament management platform with live match tracking and automated brackets.",
    challenge: "Esports communities and tournament organizers lack affordable, real-time platforms for managing competitions, live updates, team registrations, and player engagement efficiently.",
    solution: "Create a real-time esports tournament management platform with live match tracking, automated brackets, leaderboards, and scalable event infrastructure.",
    result: "Orchestrated bracket cycles for 150,000+ active gamers with sub-second live database update speeds.",
    metrics: [
      { label: "Active Gamers", value: "150k+" },
      { label: "Live Latency", value: "<800ms" },
      { label: "Concurrent Scale", value: "12,000/s" },
    ],
    techStack: ["Next.js", "Socket.io", "MongoDB", "Framer Motion", "Redux Toolkit"],
  },
  {
    id: "it-consultancy",
    name: "IT Consultancy",
    tagline: "Enterprise Modernization & Cloud-Native Migration Blueprints",
    category: "Modernization / Cloud Infrastructure",
    description: "Modernize legacy systems, eliminate bottlenecks, and secure cloud-native migration maps.",
    challenge: "Many enterprises still rely on outdated legacy systems that suffer from poor scalability, security vulnerabilities, high maintenance costs, and slow operational performance.",
    solution: "Build a consultancy-driven modernization system that analyzes legacy infrastructure, identifies bottlenecks, and provides cloud-native migration roadmaps with security and performance optimization insights.",
    result: "Delivered SOC2-compliant modern frameworks with a 55% reduction in yearly system maintenance overhead.",
    metrics: [
      { label: "Maintenance Saved", value: "55%" },
      { label: "SOC2 Audit Score", value: "99/100" },
      { label: "Migration Speed", value: "3x Faster" },
    ],
    techStack: ["Docker", "GitHub Actions", "Terraform", "Express.js", "PostgreSQL"],
  },
  {
    id: "business-systems",
    name: "Business Systems",
    tagline: "Unified CRM & Integrated Financial Intelligence Platform",
    category: "Business Systems / Intelligence",
    description: "Design an integrated business operating system that unifies CRM, financial analytics, and workflow management.",
    challenge: "Growing businesses often manage CRM, sales, finance, reporting, employee operations, and analytics across disconnected spreadsheets and software tools, leading to inefficiency and poor decision-making.",
    solution: "Design an integrated business operating system that unifies CRM, financial analytics, workflow management, and operational intelligence into one centralized dashboard.",
    result: "Gained 14x average ROI and saved over 108 manual hours weekly through dashboard intelligence.",
    metrics: [
      { label: "Average ROI Gain", value: "14x" },
      { label: "Weekly Hours Saved", value: "108 hrs" },
      { label: "Decision Accuracy", value: "+45%" },
    ],
    techStack: ["React", "Express.js", "MongoDB", "Lemon Squeezy", "Nodemailer"],
  },
];

export default function Portfolio() {
  const [activeProjectIdx, setActiveProjectIdx] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"overview" | "architecture">("overview");

  const project = projects[activeProjectIdx];

  return (
    <section id="portfolio" className="relative py-24 sm:py-32 px-4 sm:px-8 border-b border-graphite/40 bg-charcoal/50">
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none z-0" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Title block */}
        <div className="flex flex-col items-start text-left mb-16 sm:mb-24">
          <span className="text-steel-blue font-space text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            Case Studies
          </span>
          <h2 className="font-space text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-ivory mb-6 max-w-2xl leading-[1.1]">
            Engineered systems in production.
          </h2>
          <p className="font-inter text-platinum text-[15px] sm:text-[16px] leading-relaxed max-w-2xl font-light">
            Examine the structural design, technical metrics, and real-world results of our recent corporate deployments.
          </p>
        </div>

        {/* Project Selector Navigation */}
        <div className="flex flex-wrap gap-4 border-b border-ivory/5 pb-6 mb-12 sm:mb-16">
          {projects.map((proj, idx) => (
            <button
              key={proj.id}
              onClick={() => {
                setActiveProjectIdx(idx);
                setActiveTab("overview");
              }}
              className={`font-space text-base sm:text-lg font-medium px-4 py-2 rounded-xl transition-all focus:outline-none ${
                activeProjectIdx === idx
                  ? "bg-ivory text-charcoal shadow-md"
                  : "text-platinum/60 hover:text-ivory hover:bg-graphite/30"
              }`}
            >
              {proj.name}
            </button>
          ))}
        </div>

        {/* Core Interactive Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Context details / Metrics */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10.5px] uppercase tracking-widest text-steel-blue font-bold">
                {project.category}
              </span>
              <h3 className="font-space text-2xl sm:text-3xl font-medium text-ivory mt-3 mb-4 leading-snug">
                {project.tagline}
              </h3>
              <p className="font-inter text-sm text-platinum/80 leading-relaxed font-light mb-8">
                {project.description}
              </p>

              {/* Three Stat Cards representing Project outcomes */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {project.metrics.map((metric) => (
                  <div key={metric.label} className="glass-panel p-3.5 rounded-xl border-ivory/5 bg-graphite/20">
                    <div className="font-space text-base sm:text-lg font-semibold text-ivory mb-1">
                      {metric.value}
                    </div>
                    <div className="font-inter text-[9px] text-platinum/40 uppercase tracking-wider font-semibold leading-tight">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tech stack used tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[10px] px-2.5 py-1 rounded bg-graphite/40 text-platinum/60 border border-ivory/5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <a
              href="#contact"
              className="glass-panel border-ivory/10 hover:border-ivory/30 text-ivory hover:bg-ivory hover:text-charcoal px-5 py-3 rounded-xl text-xs font-semibold self-start flex items-center gap-1.5 transition-all duration-300"
            >
              Consult On Similar Systems
              <ArrowUpRight size={13} />
            </a>
          </div>

          {/* Right Column: Dynamic Interactive Application / Dashboard Simulator mockup */}
          <div className="lg:col-span-7 flex flex-col">
            
            {/* Embedded Sub-navigation Tabs */}
            <div className="flex gap-2 mb-4 self-end">
              {(["overview", "architecture"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`font-mono text-[10.5px] px-3.5 py-1.5 rounded-lg border transition-all uppercase tracking-wider font-semibold focus:outline-none ${
                    activeTab === tab
                      ? "bg-steel-blue/20 border-steel-blue/40 text-ivory"
                      : "bg-graphite/20 border-ivory/5 text-platinum/50 hover:text-ivory hover:bg-graphite/40"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Dynamic Content Window mockup container */}
            <div className="glass-panel border-ivory/5 rounded-2xl p-6 sm:p-8 bg-charcoal/80 shadow-[0_15px_45px_rgba(0,0,0,0.6)] min-h-[380px] flex flex-col justify-between overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-platinum/25 uppercase tracking-widest pointer-events-none">
                {project.id.replace("-", "_").toUpperCase()}_LOG
              </div>

              <AnimatePresence mode="wait">
                {activeTab === "overview" && (
                  <motion.div
                    key="overview-tab"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="flex flex-col gap-6"
                  >
                    <div>
                      <div className="font-space text-xs font-semibold text-platinum/40 uppercase tracking-widest mb-1.5">
                        Problem Statement
                      </div>
                      <p className="font-inter text-xs sm:text-sm text-platinum/80 leading-relaxed font-light">
                        {project.challenge}
                      </p>
                    </div>

                    <div>
                      <div className="font-space text-xs font-semibold text-steel-blue uppercase tracking-widest mb-1.5">
                        Product Goal
                      </div>
                      <p className="font-inter text-xs sm:text-sm text-platinum/80 leading-relaxed font-light">
                        {project.solution}
                      </p>
                    </div>

                    <div className="border-t border-ivory/5 pt-4">
                      <div className="font-space text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1">
                        Business Impact
                      </div>
                      <p className="font-inter text-xs sm:text-sm text-platinum font-semibold leading-relaxed">
                        {project.result}
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeTab === "architecture" && (
                  <motion.div
                    key="architecture-tab"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="flex flex-col justify-center items-stretch h-full py-4"
                  >
                    <h4 className="font-space text-sm font-semibold text-ivory mb-6 flex items-center gap-1.5">
                      <Network size={14} className="text-steel-blue" />
                      Visual System Topology Blueprint
                    </h4>

                    {/* Render visual blueprints based on active project */}
                    {project.id === "ai-automation" && (
                      <div className="flex flex-col gap-4 font-mono text-[10.5px]">
                        <div className="flex justify-between items-center bg-graphite/40 border border-ivory/5 p-3 rounded-xl">
                          <span className="text-platinum/60">Multi-Agent Gateway</span>
                          <span className="text-steel-blue">Next.js Edge Runtime</span>
                        </div>
                        <div className="text-center text-platinum/30 text-xs py-0.5">↓ WebSocket Queue Dispatch</div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-graphite/40 border border-ivory/5 p-3 rounded-xl text-center">
                            <div className="text-platinum/40 text-[9px] mb-1">MODEL RUNNER A</div>
                            Google Gemini API
                          </div>
                          <div className="bg-graphite/40 border border-ivory/5 p-3 rounded-xl text-center">
                            <div className="text-platinum/40 text-[9px] mb-1">MODEL RUNNER B</div>
                            Groq AI LPU Node
                          </div>
                        </div>
                        <div className="text-center text-platinum/30 text-xs py-0.5">↓ Transient Memory Synchronization</div>
                        <div className="bg-graphite/40 border border-ivory/5 p-3 rounded-xl text-center flex justify-between items-center">
                          <span className="text-platinum/60">Agent State Datastore</span>
                          <span className="text-emerald-400 font-semibold">Redis Cache Cluster</span>
                        </div>
                      </div>
                    )}

                    {project.id === "saas-development" && (
                      <div className="flex flex-col gap-4 font-mono text-[10.5px]">
                        <div className="bg-graphite/40 border border-ivory/5 p-3 rounded-xl flex justify-between items-center">
                          <span className="text-platinum/60">Multi-Tenant Routing</span>
                          <span className="text-steel-blue">Express Routing Proxy</span>
                        </div>
                        <div className="text-center text-platinum/30 text-xs py-0.5">↓ Subdomain Scope Payloads</div>
                        <div className="bg-graphite/40 border border-ivory/5 p-3 rounded-xl text-center">
                          <div className="text-platinum/40 text-[9px] mb-1">AUTH & BILLING INTEGRATIONS</div>
                          OAuth 2.0 Identity Server / Stripe API Webhooks
                        </div>
                        <div className="text-center text-platinum/30 text-xs py-0.5">↓ ACID Transaction Pipeline</div>
                        <div className="bg-graphite/40 border border-ivory/5 p-3 rounded-xl text-center flex justify-between items-center">
                          <span className="text-platinum/60">Persistent Datastore</span>
                          <span className="text-emerald-400 font-semibold">MongoDB Replica Set</span>
                        </div>
                      </div>
                    )}

                    {project.id === "fullstack-engineering" && (
                      <div className="flex flex-col gap-4 font-mono text-[10.5px]">
                        <div className="bg-graphite/40 border border-ivory/5 p-3 rounded-xl flex justify-between items-center">
                          <span className="text-platinum/60">Live Event Gateway</span>
                          <span className="text-emerald-400">Socket.io WebSocket Server</span>
                        </div>
                        <div className="text-center text-platinum/30 text-xs py-0.5">↓ Real-time State Synchronization</div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-graphite/40 border border-steel-blue/40 p-2.5 rounded-xl text-center">
                            <div className="text-platinum/40 text-[8px]">BRACKETS ENGINE</div>
                            Framer Motion Morph
                          </div>
                          <div className="bg-graphite/40 border border-steel-blue/40 p-2.5 rounded-xl text-center">
                            <div className="text-platinum/40 text-[8px]">CLIENT STORE</div>
                            Redux Toolkit Slice
                          </div>
                        </div>
                        <div className="text-center text-platinum/30 text-xs py-0.5">↓ Live Database Sync</div>
                        <div className="bg-graphite/40 border border-ivory/5 p-3 rounded-xl flex justify-between items-center">
                          <span className="text-platinum/60">Database replicas</span>
                          <span className="text-steel-blue">MongoDB Read Replica</span>
                        </div>
                      </div>
                    )}

                    {project.id === "it-consultancy" && (
                      <div className="flex flex-col gap-4 font-mono text-[10.5px]">
                        <div className="bg-graphite/40 border border-ivory/5 p-3 rounded-xl flex justify-between items-center">
                          <span className="text-platinum/60">Infrastructure blueprints</span>
                          <span className="text-steel-blue">Terraform Declarative IaC</span>
                        </div>
                        <div className="text-center text-platinum/30 text-xs py-0.5">↓ Deployment Containers</div>
                        <div className="bg-graphite/40 border border-ivory/5 p-3 rounded-xl text-center">
                          <div className="text-platinum/40 text-[9px] mb-1">Docker Containers Cluster</div>
                          Enterprise isolated workloads running Express.js and PostgreSQL
                        </div>
                        <div className="text-center text-platinum/30 text-xs py-0.5">↓ Security Pipeline & Delivery</div>
                        <div className="bg-graphite/40 border border-ivory/5 p-3 rounded-xl flex justify-between items-center">
                          <span className="text-platinum/60">CI/CD Security Runner</span>
                          <span className="text-emerald-400 font-semibold">GitHub Actions Pipeline</span>
                        </div>
                      </div>
                    )}

                    {project.id === "business-systems" && (
                      <div className="flex flex-col gap-4 font-mono text-[10.5px]">
                        <div className="bg-graphite/40 border border-ivory/5 p-3 rounded-xl flex justify-between items-center">
                          <span className="text-platinum/60">Dashboard Client Gateway</span>
                          <span className="text-steel-blue">React Unified Operating Portal</span>
                        </div>
                        <div className="text-center text-platinum/30 text-xs py-0.5">↓ Operational Flow integrations</div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-graphite/40 border border-ivory/5 p-3 rounded-xl text-center">
                            <div className="text-platinum/40 text-[9px] mb-1">INVOICING ENGINE</div>
                            Lemon Squeezy API
                          </div>
                          <div className="bg-graphite/40 border border-ivory/5 p-3 rounded-xl text-center">
                            <div className="text-platinum/40 text-[9px] mb-1">DISPATCH MAILER</div>
                            Nodemailer SMTP
                          </div>
                        </div>
                        <div className="text-center text-platinum/30 text-xs py-0.5">↓ Multi-Model Sync Datastore</div>
                        <div className="bg-graphite/40 border border-ivory/5 p-3 rounded-xl flex justify-between items-center">
                          <span className="text-platinum/60">Persistent Datastore</span>
                          <span className="text-emerald-400 font-semibold">MongoDB / PostgreSQL</span>
                        </div>
                      </div>
                    )}
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
