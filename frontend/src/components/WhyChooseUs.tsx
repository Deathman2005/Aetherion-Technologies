"use client";

import { Shield, Sparkles, Code, Terminal, Clock, MessageSquare, Check } from "lucide-react";
import { motion } from "framer-motion";

interface Capability {
  title: string;
  description: string;
  metric: string;
  icon: any;
}

const capabilities: Capability[] = [
  {
    title: "Scalable Architecture",
    description: "Our systems are engineered on top of containerized edge grids, featuring load balancers and isolated VPC networks that protect against peak surges.",
    metric: "Target Availability: 99.999%",
    icon: Shield,
  },
  {
    title: "Intelligent Engineering",
    description: "We integrate direct reasoning pathways, vector caches, and custom multi-agent LLM systems into core company operations.",
    metric: "Workflow Speeds: 10x Avg Increase",
    icon: Sparkles,
  },
  {
    title: "Clean Development Practices",
    description: "Strict TypeScript compilation, comprehensive automated testing suites, and strict peer code audits prevent post-deploy defects.",
    metric: "Code Coverage target: 95%+",
    icon: Code,
  },
  {
    title: "Modern Core Technologies",
    description: "We bypass legacy constraints to construct high-performance platforms using Next.js 16, React 19, Tailwind CSS v4, and Mongoose.",
    metric: "First Contentful Paint: <0.4s",
    icon: Terminal,
  },
  {
    title: "Rapid Implementation",
    description: "We maintain highly focused agile sprints, removing administrative lag and deploying production-grade systems on schedule.",
    metric: "On-time Delivery: 100.0%",
    icon: Clock,
  },
  {
    title: "Direct Specialist Support",
    description: "Clients consult directly with lead systems architects, bypassed call centers to establish real product design partnerships.",
    metric: "Response SLA: Under 2 Hours",
    icon: MessageSquare,
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="relative py-24 sm:py-32 px-4 sm:px-8 border-b border-graphite/40 bg-charcoal/30">
      <div className="absolute inset-0 grid-pattern-fine opacity-20 pointer-events-none z-0" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Title Block */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 sm:mb-24 gap-6">
          <div className="flex flex-col items-start text-left max-w-2xl">
            <span className="text-steel-blue font-space text-xs font-semibold uppercase tracking-[0.2em] mb-4">
              Our Standards
            </span>
            <h2 className="font-space text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-ivory mb-6 leading-[1.1]">
              Engineered beyond industry averages.
            </h2>
            <p className="font-inter text-platinum text-[15px] sm:text-[16px] leading-relaxed font-light">
              We benchmark ourselves against strict technical standards. Our reputation is built on high-fidelity execution, zero-fluff workflows, and systems that stay online under load.
            </p>
          </div>
          <div className="text-right shrink-0">
            <span className="font-mono text-[10px] text-platinum/30 uppercase tracking-widest block">
              Global SLA metrics
            </span>
            <span className="font-space text-2xl sm:text-3xl font-semibold text-steel-blue mt-1 block">
              99.99% Uptime
            </span>
          </div>
        </div>

        {/* Technical Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, index) => {
            const Icon = cap.icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                key={cap.title}
                className="glass-panel p-6 sm:p-8 rounded-2xl border-ivory/5 bg-graphite/10 hover:border-ivory/10 hover:bg-graphite/20 transition-all flex flex-col justify-between group shadow-sm min-h-[220px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-lg border border-ivory/5 bg-charcoal text-platinum/70 group-hover:text-ivory group-hover:bg-steel-blue/10 group-hover:border-steel-blue/30 transition-colors">
                      <Icon size={18} />
                    </div>
                    
                    {/* Tiny Checkbox tag */}
                    <div className="w-5 h-5 rounded-full border border-steel-blue/30 bg-steel-blue/5 flex items-center justify-center text-steel-blue">
                      <Check size={10} />
                    </div>
                  </div>

                  <h3 className="font-space text-[15px] font-semibold text-ivory mb-2 group-hover:text-platinum transition-colors">
                    {cap.title}
                  </h3>
                  <p className="font-inter text-xs leading-relaxed text-platinum/70 font-light group-hover:text-platinum transition-colors">
                    {cap.description}
                  </p>
                </div>

                {/* Subtitle tag with verified metric */}
                <div className="mt-6 pt-3.5 border-t border-ivory/5 flex items-center gap-1.5 font-mono text-[9px] text-steel-blue uppercase tracking-wider font-semibold">
                  <span className="w-1 h-1 rounded-full bg-steel-blue" />
                  {cap.metric}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
