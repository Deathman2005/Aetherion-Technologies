"use client";

import { useState } from "react";
import { Code2, Server, Wrench, Layers, Cpu, Cloud, Database, Layout } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TechItem {
  name: string;
  category: "frontend" | "backend" | "tools";
  description: string;
  badge: string;
}

const techItems: TechItem[] = [
  // Frontend
  {
    name: "Next.js",
    category: "frontend",
    description: "App Router setup utilizing server-side rendering (SSR), static site generation (SSG), and edge routes for fast loading times and optimized SEO performance.",
    badge: "v15/16",
  },
  {
    name: "React.js",
    category: "frontend",
    description: "High-performance component architecture, leveraging hooks, concurrent rendering, and server components for dynamic browser layouts.",
    badge: "v19",
  },
  {
    name: "TypeScript",
    category: "frontend",
    description: "Strict compile-time type-safety, catching application defects early and providing robust documentation profiles across engineering groups.",
    badge: "Strict Mode",
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    description: "Tailwind v4 utility architecture. Built with CSS-first thematic configurations and highly optimized bundle delivery pipelines.",
    badge: "v4.0",
  },
  {
    name: "Redux Toolkit",
    category: "frontend",
    description: "Predictable, centralized state engine managing complex multi-slice application logic, middleware workflows, and devtools integration.",
    badge: "State Engine",
  },
  {
    name: "Framer Motion",
    category: "frontend",
    description: "Production-ready declarative gesture and animation primitives, driving sleek layout morphs and interactive component transitions.",
    badge: "Animations",
  },
  {
    name: "Shadcn/UI",
    category: "frontend",
    description: "Beautifully designed custom components crafted with Tailwind and Radix primitives, fully unstyled and optimized for atomic custom layouts.",
    badge: "UI Components",
  },
  {
    name: "Radix UI",
    category: "frontend",
    description: "Robust unstyled accessible web primitives built for absolute compliance with comprehensive WAI-ARIA validation standards.",
    badge: "Primitives",
  },
  {
    name: "Axios",
    category: "frontend",
    description: "Secure, promise-based HTTP request orchestration layer featuring global interceptor routing, signal aborts, and automated payload parsing.",
    badge: "HTTP Client",
  },
  {
    name: "GSAP",
    category: "frontend",
    description: "Advanced professional timeline-based animation orchestrator driving ultra-high performance scroll triggers and custom micro-effects.",
    badge: "Timeline FX",
  },
  // Backend
  {
    name: "Node.js",
    category: "backend",
    description: "Fast, asynchronous event-driven JavaScript runtime running on Google's V8 engine, optimizing scalable microservice servers.",
    badge: "v20 LTS",
  },
  {
    name: "Express.js",
    category: "backend",
    description: "Minimalist, robust web framework for routing APIs. Configured with strict helmet headers, CORS, and request validations.",
    badge: "REST Gateway",
  },
  {
    name: "MongoDB",
    category: "backend",
    description: "High-performance NoSQL database for flexible JSON scaling. Set up with Mongoose schemas, indexes, and write concern pipelines.",
    badge: "Replica Set",
  },
  {
    name: "Firebase",
    category: "backend",
    description: "Backend-as-a-Service integration enabling seamless authentication flows, cloud messaging, and rapid multi-platform telemetry updates.",
    badge: "BaaS Platform",
  },
  {
    name: "Supabase",
    category: "backend",
    description: "Open-source PostgreSQL alternative providing direct row-level security parameters, real-time sync hooks, and secure database engines.",
    badge: "BaaS Platform",
  },
  {
    name: "Socket.io",
    category: "backend",
    description: "Low-latency event-based communication library establishing resilient, bi-directional client-server WebSocket connections.",
    badge: "WebSockets",
  },
  {
    name: "OAuth 2.0",
    category: "backend",
    description: "Industrial authorization standard protecting resource scopes, multi-tenant token exchanges, and single-sign-on (SSO) gateways.",
    badge: "Security Standard",
  },
  {
    name: "Mongoose",
    category: "backend",
    description: "Structured MongoDB object modeling library for Node.js, providing type validation, middleware triggers, and query builders.",
    badge: "ODM Schema",
  },
  {
    name: "TensorFlow",
    category: "backend",
    description: "End-to-end open machine learning framework driving advanced deep neural network models, predictions, and numerical operations.",
    badge: "ML Engine",
  },
  {
    name: "Google Gemini",
    category: "backend",
    description: "Multimodal generative model suite empowering next-generation reasoning, multi-agent pipelines, and context-rich semantic searches.",
    badge: "Multimodal LLM",
  },
  {
    name: "Groq AI",
    category: "backend",
    description: "Ultra-fast LPU inference hosting driving blistering-fast language generation speeds and latency optimized completions.",
    badge: "LPU Inference",
  },
  // Tools
  {
    name: "GitHub",
    category: "tools",
    description: "Strict branch controls, peer reviews, code audit logs, and automated integration checks.",
    badge: "CI/CD",
  },
  {
    name: "Vercel",
    category: "tools",
    description: "Edge network delivery platform providing automatic microservice deploys and instant preview builds.",
    badge: "Global CDN",
  },
  {
    name: "Docker",
    category: "tools",
    description: "Isolated containerization of backend services, guaranteeing identical behavior across staging, dev, and production.",
    badge: "Isolated",
  },
  {
    name: "Postman",
    category: "tools",
    description: "Collaborative team API validation workspace, checking REST payloads and running automated diagnostic queries.",
    badge: "API Tests",
  },
  {
    name: "Figma",
    category: "tools",
    description: "Vector-perfect wireframing and interactive UI prototyping, securing design-to-development alignment.",
    badge: "Design",
  },
  {
    name: "Stripe",
    category: "tools",
    description: "Secure global payment processing infrastructure managing subscription lifecycle billing, custom invoices, and tiered access rules.",
    badge: "SaaS Payments",
  },
  {
    name: "Lemon Squeezy",
    category: "tools",
    description: "Comprehensive merchant of record platform handling international tax compliance, automated invoicing, and billing checkouts.",
    badge: "SaaS Billing",
  },
  {
    name: "Nodemailer",
    category: "tools",
    description: "Lightweight email sending architecture for Node.js backend systems, facilitating transactional messages, SMTP protocols, and verification.",
    badge: "SMTP Mailer",
  },
  {
    name: "Cloudinary",
    category: "tools",
    description: "Integrated cloud management infrastructure powering high-fidelity real-time media optimization, CDN transformations, and deliveries.",
    badge: "Media CDN",
  },
  {
    name: "GitHub Actions",
    category: "tools",
    description: "Automated continuous integration and deployment runner suites, evaluating code styling, linters, tests, and releases.",
    badge: "CI/CD Pipeline",
  },
];

export default function TechStack() {
  const [activeTab, setActiveTab] = useState<"all" | "frontend" | "backend" | "tools">("all");

  const filteredItems = techItems.filter((item) => activeTab === "all" || item.category === activeTab);

  return (
    <section id="tech-stack" className="relative py-24 sm:py-32 px-4 sm:px-8 border-b border-graphite/40">
      <div className="absolute inset-0 grid-pattern-fine opacity-20 pointer-events-none z-0" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Title Details */}
        <div className="flex flex-col items-start text-left mb-16 sm:mb-20">
          <span className="text-steel-blue font-space text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            Our Stack
          </span>
          <h2 className="font-space text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-ivory mb-6 max-w-2xl leading-[1.1]">
            Modern technologies, engineered to perform.
          </h2>
          <p className="font-inter text-platinum text-[15px] sm:text-[16px] leading-relaxed max-w-2xl font-light">
            We use a modern, industry-standard stack selected for rapid page speeds, absolute security, and infinite scalability.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap gap-2 border-b border-ivory/5 pb-6 mb-12">
          {([
            { id: "all", name: "Complete Stack", icon: Layers },
            { id: "frontend", name: "Frontend Core", icon: Code2 },
            { id: "backend", name: "Backend & Data", icon: Server },
            { id: "tools", name: "Tools & DevOps", icon: Wrench },
          ] as const).map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`font-mono text-[10.5px] px-4 py-2 rounded-xl border transition-all uppercase tracking-wider font-semibold flex items-center gap-2 focus:outline-none ${
                  activeTab === tab.id
                    ? "bg-steel-blue/20 border-steel-blue/40 text-ivory shadow-sm"
                    : "bg-graphite/20 border-ivory/5 text-platinum/50 hover:text-ivory hover:bg-graphite/30"
                }`}
              >
                <Icon size={12} />
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* Responsive Grid layout */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                key={item.name}
                className="glass-panel p-5 rounded-2xl border-ivory/5 bg-graphite/10 hover:border-ivory/12 hover:bg-graphite/20 transition-all flex flex-col justify-between group shadow-sm min-h-[170px]"
              >
                <div>
                  <div className="flex justify-between items-center mb-3.5">
                    <h3 className="font-space text-[15px] font-semibold text-ivory flex items-center gap-2">
                      {item.name}
                    </h3>
                    <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-graphite/40 border border-ivory/5 text-platinum/50">
                      {item.badge}
                    </span>
                  </div>
                  <p className="font-inter text-xs leading-relaxed text-platinum/70 font-light group-hover:text-platinum transition-colors">
                    {item.description}
                  </p>
                </div>

                {/* Subtitle tag indicating category */}
                <div className="mt-4 pt-3.5 border-t border-ivory/5 flex items-center gap-1.5 font-mono text-[9px] text-platinum/30 uppercase tracking-widest">
                  {item.category === "frontend" && <Layout size={10} className="text-steel-blue" />}
                  {item.category === "backend" && <Cpu size={10} className="text-steel-blue" />}
                  {item.category === "tools" && <Cloud size={10} className="text-steel-blue" />}
                  {item.category} layer
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
