"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  tags: string[];
}

const testimonials: Testimonial[] = [
  {
    quote: "Aetherion rebuilt our core automation infrastructure from the ground up. Their engineering team is disciplined, transparent, and technically deep. Our API transaction volume scaled 14x with zero latency degradation.",
    author: "Elena Rostova",
    role: "Chief Technology Officer",
    company: "Valo Financial",
    tags: ["AI Automation", "Scale"],
  },
  {
    quote: "Unlike agencies that deliver basic templates, Aetherion engineered a custom type-safe SaaS analytics dashboard that connects directly to our Mongo clusters. The dashboard performance is exceptionally fast.",
    author: "Marcus Vance",
    role: "Founder & CEO",
    company: "Apex Logistics",
    tags: ["SaaS Engine", "MongoDB"],
  },
  {
    quote: "Their direct architect consulting format saved us months of planning. We bypass traditional account managers and coordinate system designs directly with senior developers who understand SOC2 compliance details.",
    author: "Dr. Sarah Chen",
    role: "VP of Systems Engineering",
    company: "MedVibe Corp",
    tags: ["IT Consultancy", "Security"],
  },
];

export default function Testimonials() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section id="testimonials" className="relative py-24 sm:py-32 px-4 sm:px-8 border-b border-graphite/40">
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none z-0" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Title Details */}
        <div className="flex flex-col items-start text-left mb-16 sm:mb-24">
          <span className="text-steel-blue font-space text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            Testimonials
          </span>
          <h2 className="font-space text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-ivory mb-6 max-w-2xl leading-[1.1]">
            Trusted by engineering leaders.
          </h2>
          <p className="font-inter text-platinum text-[15px] sm:text-[16px] leading-relaxed max-w-xl font-light">
            We build long-term development partnerships founded on clean code, transparent timelines, and measurable outcomes.
          </p>
        </div>

        {/* Dynamic Spotlight test cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {testimonials.map((test, index) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              key={test.author}
              onMouseMove={handleMouseMove}
              className="glow-card glass-panel p-6 sm:p-8 rounded-2xl border-ivory/5 bg-graphite/10 flex flex-col justify-between shadow-sm group min-h-[300px]"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-2 rounded-lg bg-steel-blue/10 border border-steel-blue/20 text-steel-blue">
                    <Quote size={16} />
                  </div>
                  
                  {/* Testimonial Tags */}
                  <div className="flex gap-1.5">
                    {test.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[9px] px-2 py-0.5 rounded bg-graphite/40 border border-ivory/5 text-platinum/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="font-inter text-[13.5px] leading-relaxed text-platinum/80 font-light mb-8 group-hover:text-platinum transition-colors italic">
                  "{test.quote}"
                </p>
              </div>

              {/* Author profiles */}
              <div className="pt-4 border-t border-ivory/5 flex flex-col gap-1">
                <span className="font-space text-sm font-semibold text-ivory">
                  {test.author}
                </span>
                <div className="flex items-center gap-1.5 font-inter text-xs text-platinum/40">
                  <span>{test.role}</span>
                  <span>•</span>
                  <span className="text-steel-blue font-medium">{test.company}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
