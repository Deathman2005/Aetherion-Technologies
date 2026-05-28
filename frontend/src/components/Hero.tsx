"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, Terminal, RefreshCw, Server, Cpu, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  const [logs, setLogs] = useState<string[]>([
    "system: boot sequence complete",
    "aetherion-core: initializing edge routing clusters",
    "ai-agent-orchestrator: warm pool ready [16 nodes active]",
    "db-gateway: connection established to mongodb-replica-set",
    "gateway: routing initialized [status: healthy, latencies: optimal]",
  ]);
  const [latency, setLatency] = useState(14);
  const [optimizing, setOptimizing] = useState(false);
  const [efficiency, setEfficiency] = useState(98.4);
  const consoleRef = useRef<HTMLDivElement>(null);

  // Fluctuating Latency Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      if (!optimizing) {
        setLatency((prev) => {
          const delta = (Math.random() - 0.5) * 2;
          const val = Number((prev + delta).toFixed(1));
          return Math.max(9, Math.min(20, val));
        });
      }
    }, 1800);
    return () => clearInterval(interval);
  }, [optimizing]);

  // Scroll to bottom of terminal logs without scrolling the entire window
  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [logs]);

  // Simulate optimizations handler
  const handleOptimize = () => {
    if (optimizing) return;
    setOptimizing(true);
    
    // Set system optimizing messages
    const sequence = [
      "system: triggering global network optimization",
      "gateway: scaling edge channels across EU-Central and US-East",
      "db-gateway: active compression routines launched [algorithm: zstd]",
      "ai-agent-orchestrator: pruning stale contextual models",
      "system: performance auto-tuned. current load is balanced.",
    ];

    let delay = 0;
    sequence.forEach((message, index) => {
      delay += 800;
      setTimeout(() => {
        setLogs((prev) => [...prev, message]);
        
        // At the last step, change metrics
        if (index === sequence.length - 1) {
          setLatency(8.4);
          setEfficiency(99.9);
          setOptimizing(false);
        }
      }, delay);
    });
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative min-h-screen pt-32 sm:pt-40 pb-20 px-4 sm:px-8 overflow-hidden flex flex-col justify-center">
      {/* Structural Minimal Grids & Spotlight gradients */}
      <div className="absolute inset-0 grid-pattern opacity-100 pointer-events-none z-0" />
      <div className="absolute inset-0 grid-pattern-fine opacity-70 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-charcoal to-charcoal z-0" />
      
      {/* Light spotlight beam at the top center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-[radial-gradient(circle_at_top,rgba(62,83,107,0.15),transparent_70%)] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center relative z-10">
        
        {/* Left Side: Brand messaging & CTAs */}
        <div className="lg:col-span-6 flex flex-col items-start text-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel text-[11px] font-semibold tracking-[0.2em] uppercase text-platinum border-ivory/10 px-3 py-1.5 rounded-full mb-6 flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-steel-blue animate-pulse" />
            ENTERPRISE DIGITAL SYSTEMS
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-space text-4xl sm:text-5xl lg:text-[56px] font-medium leading-[1.08] tracking-[-0.03em] text-ivory mb-6"
          >
            Engineering <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ivory via-platinum to-steel-blue">
              Intelligent Futures
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-inter text-[15px] sm:text-[17px] leading-relaxed text-platinum max-w-xl mb-10 font-light"
          >
            Aetherion Technologies builds intelligent digital systems, scalable platforms, and modern automation solutions for forward-thinking businesses seeking robust transformation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
          >
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, "#contact")}
              className="bg-ivory text-charcoal hover:bg-platinum font-semibold px-7 py-4 rounded-xl text-[14px] flex items-center justify-center gap-2 transition-all shadow-[0_4px_20px_rgba(245,243,239,0.15)] active:scale-98"
            >
              Book Consultation
              <ArrowRight size={15} />
            </a>
            <a
              href="#services"
              onClick={(e) => handleScrollTo(e, "#services")}
              className="glass-panel text-ivory hover:border-ivory/30 hover:bg-graphite/30 font-semibold px-7 py-4 rounded-xl text-[14px] flex items-center justify-center gap-2 border-ivory/10 transition-all active:scale-98"
            >
              Explore Services
            </a>
          </motion.div>
        </div>

        {/* Right Side: Handcrafted Interactive Developer Console Widget */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 w-full relative"
        >
          {/* Subtle background glow behind the console widget */}
          <div className="absolute inset-0 bg-steel-blue/5 rounded-2xl filter blur-3xl -z-10" />

          <div className="w-full glass-panel border-ivory/8 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden">
            {/* Top Toolbar panel */}
            <div className="px-5 py-3 border-b border-ivory/5 bg-graphite/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <div className="flex items-center gap-2 font-inter text-[11px] text-platinum/60 tracking-wider uppercase font-semibold">
                <Terminal size={12} className="text-steel-blue" />
                aetherion-kernel-v1.0
              </div>
              <div className="w-10" />
            </div>

            {/* Core Metrics Grid */}
            <div className="grid grid-cols-3 border-b border-ivory/5 bg-charcoal/40 text-center py-4">
              <div className="border-r border-ivory/5 flex flex-col justify-center items-center px-2 py-1">
                <div className="flex items-center gap-1.5 text-platinum/40 text-[10px] uppercase font-semibold tracking-wider mb-1">
                  <Server size={11} />
                  Latency
                </div>
                <div className="font-space text-lg font-medium text-ivory flex items-baseline gap-0.5">
                  {latency}
                  <span className="text-[10px] text-platinum/60 font-inter">ms</span>
                </div>
              </div>
              <div className="border-r border-ivory/5 flex flex-col justify-center items-center px-2 py-1">
                <div className="flex items-center gap-1.5 text-platinum/40 text-[10px] uppercase font-semibold tracking-wider mb-1">
                  <Cpu size={11} />
                  Efficiency
                </div>
                <div className="font-space text-lg font-medium text-ivory">
                  {efficiency}%
                </div>
              </div>
              <div className="flex flex-col justify-center items-center px-2 py-1">
                <div className="flex items-center gap-1.5 text-platinum/40 text-[10px] uppercase font-semibold tracking-wider mb-1">
                  <ShieldCheck size={11} />
                  Security
                </div>
                <div className="font-space text-lg font-medium text-emerald-400">
                  Enterprise
                </div>
              </div>
            </div>

            {/* Terminal Live Output Console */}
            <div ref={consoleRef} className="p-5 font-mono text-[11.5px] leading-relaxed text-platinum/80 bg-charcoal/70 h-[190px] overflow-y-auto hide-scrollbar flex flex-col gap-1.5">
              {logs.map((log, index) => (
                <div key={index} className="flex gap-2.5 items-start">
                  <span className="text-steel-blue shrink-0">❯</span>
                  <span className={log.startsWith("system:") ? "text-ivory font-semibold" : ""}>
                    {log}
                  </span>
                </div>
              ))}
            </div>

            {/* Terminal Bottom Controls Panel */}
            <div className="px-5 py-3.5 border-t border-ivory/5 bg-graphite/20 flex items-center justify-between">
              <span className="text-[10px] text-platinum/40 font-mono">
                Last heartbeat: 0s ago
              </span>
              <button
                onClick={handleOptimize}
                disabled={optimizing}
                className={`glass-panel border-ivory/10 hover:border-ivory/30 text-ivory px-3.5 py-1.5 rounded-lg text-[10.5px] font-semibold flex items-center gap-1.5 transition-all ${
                  optimizing ? "opacity-60 cursor-not-allowed" : "hover:bg-ivory hover:text-charcoal"
                }`}
              >
                <RefreshCw size={11} className={optimizing ? "animate-spin" : ""} />
                {optimizing ? "Optimizing..." : "Optimize Engine"}
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
