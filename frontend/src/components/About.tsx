"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "5", label: "Bespoke Systems Deployed" },
  { value: "100%", label: "Engineer-Led Team" },
  { value: "Sub-15ms", label: "Average API Latency" },
  { value: "99.99%", label: "Production Uptime" },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32 px-4 sm:px-8 border-b border-graphite/40">
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
          
          {/* Left Column: Heading */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <span className="text-steel-blue font-space text-xs font-semibold uppercase tracking-[0.2em] mb-4">
              Our Philosophy
            </span>
            <h2 className="font-space text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-ivory mb-6 leading-[1.1]">
              Architecting with integrity and intelligence.
            </h2>
            
            {/* Visual Decorative border box */}
            <div className="hidden lg:block w-full border-l border-ivory/10 pl-6 mt-8 py-2">
              <span className="font-space text-[10px] text-platinum/30 uppercase tracking-widest block mb-2">
                Aetherion Standard
              </span>
              <p className="font-inter text-xs text-platinum/50 leading-relaxed max-w-[280px]">
                We reject standard templates. Every system we deploy is custom-crafted, benchmarked, and fully optimized for real-world load.
              </p>
            </div>
          </div>

          {/* Right Column: High Fidelity Narrative Story */}
          <div className="lg:col-span-7 flex flex-col gap-6 sm:gap-8">
            <p className="font-inter text-[15px] sm:text-[16px] text-platinum font-light leading-relaxed">
              Aetherion Technologies was founded with a singular conviction: **high-growth businesses deserve better than generic, cookie-cutter templates.** In a digital landscape saturated with superficial solutions, we stand as a dedicated engineering group focused on technical depth, scalable architecture, and long-term durability.
            </p>
            
            <p className="font-inter text-[15px] sm:text-[16px] text-platinum font-light leading-relaxed">
              We approach system design from first principles. Whether orchestrating distributed multi-agent AI networks, establishing secure database replicas on Mongo clusters, or crafting high-performance SaaS interfaces, we build with rigorous attention to detail. We write type-safe code, isolate backend services, optimize data channels, and configure auto-scaling infrastructure from the outset.
            </p>

            <p className="font-inter text-[15px] sm:text-[16px] text-platinum font-light leading-relaxed">
              Our team serves as a strategic technical partner to startups, founders, and enterprises seeking authentic digital transformation. We do not just build and deploy; we align with your operational roadmap, ensuring that the systems we engineer today remain durable, performant, and elegant years down the line.
            </p>
          </div>

        </div>

        {/* Core Operational Statistics block */}
        <div className="mt-20 sm:mt-28 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              key={stat.label}
              className="glass-panel p-6 sm:p-8 rounded-2xl border-ivory/5 bg-graphite/20 hover:border-ivory/10 hover:bg-graphite/30 transition-all flex flex-col gap-2 shadow-sm"
            >
              <span className="font-space text-2xl sm:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-ivory to-platinum tracking-tight">
                {stat.value}
              </span>
              <span className="font-inter text-[12px] font-medium text-platinum/50 uppercase tracking-wide">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
