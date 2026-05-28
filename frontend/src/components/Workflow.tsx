"use client";

import { motion } from "framer-motion";
import { Search, Compass, Cpu, CheckCircle2, Rocket } from "lucide-react";

interface Step {
  num: string;
  name: string;
  subtitle: string;
  details: string;
  icon: any;
}

const steps: Step[] = [
  {
    num: "01",
    name: "Discovery & Strategy",
    subtitle: "Understand goals & requirements.",
    details: "We analyze business parameters, workflow bottle-necks, legacy stacks, and formulate precise project roadmaps.",
    icon: Search,
  },
  {
    num: "02",
    name: "Planning & Architecture",
    subtitle: "Create scalable blueprints.",
    details: "We design SOC2 compliant database topologies, multi-region container grids, schema architectures, and interactive wireframes.",
    icon: Compass,
  },
  {
    num: "03",
    name: "Design & Development",
    subtitle: "High-performance engineering.",
    details: "Our engineers build clean, type-safe frontend modules and bulletproof REST APIs following modular OOP practices.",
    icon: Cpu,
  },
  {
    num: "04",
    name: "Testing & Optimization",
    subtitle: "Absolute code validation.",
    details: "We conduct stress testing, enforce 95% unit test coverage, and benchmark latencies down to the single digit millisecond.",
    icon: CheckCircle2,
  },
  {
    num: "05",
    name: "Deployment & Support",
    subtitle: "Continuous scaling checks.",
    details: "We deploy onto global CDN channels, configure real-time diagnostic gateways, and provide ongoing architectural partnerships.",
    icon: Rocket,
  },
];

export default function Workflow() {
  return (
    <section id="workflow" className="relative py-24 sm:py-32 px-4 sm:px-8 border-b border-graphite/40">
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none z-0" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Title details */}
        <div className="flex flex-col items-start text-left mb-20 sm:mb-28">
          <span className="text-steel-blue font-space text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            Our Process
          </span>
          <h2 className="font-space text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-ivory mb-6 max-w-2xl leading-[1.1]">
            How We Work
          </h2>
          <p className="font-inter text-platinum text-[15px] sm:text-[16px] leading-relaxed max-w-xl font-light">
            Our process is built around clarity, scalability, and intelligent execution.
          </p>
        </div>

        {/* Desktop Pipeline (Horizontal Grid) */}
        <div className="hidden lg:grid grid-cols-5 gap-6 relative items-start">
          {/* Connector Lane Line */}
          <div className="absolute top-8 left-[10%] right-[10%] h-[1.5px] bg-gradient-to-r from-ivory/5 via-steel-blue/30 to-ivory/5 z-0" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className="relative z-10 flex flex-col items-center text-center px-4 group">
                
                {/* Step Circle & Icon */}
                <div className="w-16 h-16 rounded-2xl glass-panel border-ivory/8 bg-charcoal flex items-center justify-center mb-6 relative transition-all duration-400 group-hover:border-steel-blue group-hover:bg-graphite/40 group-hover:scale-105 group-hover:shadow-[0_0_25px_rgba(62,83,107,0.25)] shadow-sm">
                  <Icon size={20} className="text-platinum group-hover:text-ivory transition-colors" />
                  
                  {/* Floating Number Badge */}
                  <span className="absolute -top-2 -right-2 font-mono text-[9px] tracking-wider font-semibold px-2 py-0.5 rounded-full bg-steel-blue text-ivory border border-steel-blue">
                    {step.num}
                  </span>
                </div>

                <h3 className="font-space text-[15px] font-semibold text-ivory mb-2 group-hover:text-platinum transition-colors">
                  {step.name}
                </h3>
                <h4 className="font-inter text-xs text-steel-blue font-medium mb-3.5">
                  {step.subtitle}
                </h4>
                <p className="font-inter text-[12px] text-platinum/70 leading-relaxed font-light group-hover:text-platinum transition-colors">
                  {step.details}
                </p>
              </div>
            );
          })}
        </div>

        {/* Mobile / Tablet Pipeline (Vertical List) */}
        <div className="lg:hidden flex flex-col gap-6 relative pl-8">
          {/* Vertical Connector Line */}
          <div className="absolute left-0 top-6 bottom-6 w-[1.5px] bg-gradient-to-b from-ivory/5 via-steel-blue/30 to-ivory/5 z-0" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={step.num}
                className="relative glass-panel p-5 rounded-2xl border-ivory/5 bg-graphite/10"
              >
                {/* Connecting Circle overlay on vertical gradient line */}
                <div className="absolute top-6 -left-[44px] w-6 h-6 rounded-full bg-charcoal border border-ivory/20 flex items-center justify-center z-10 text-[9px] font-mono text-platinum">
                  {step.num}
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2.5 rounded-lg border border-ivory/5 bg-charcoal text-steel-blue">
                    <Icon size={16} />
                  </div>
                  <div>
                    <h3 className="font-space text-[15px] font-semibold text-ivory">
                      {step.name}
                    </h3>
                    <h4 className="font-inter text-xs text-platinum/40 uppercase tracking-widest font-semibold mt-0.5">
                      {step.subtitle}
                    </h4>
                  </div>
                </div>

                <p className="font-inter text-[12.5px] text-platinum/75 leading-relaxed font-light">
                  {step.details}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
