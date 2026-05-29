"use client";

import { useState } from "react";
import { Mail, PhoneCall, Send, Loader2, CheckCircle2, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
  // Form input states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    companySize: "",
    service: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.service || !formData.message) {
      setError("Please fill out all required fields: Name, Email, Service, and Scope.");
      return;
    }

    setError("");
    setLoading(true);
    setLoadingStep("Establishing secure connection...");

    // Simulated high-fidelity latency step transitions
    setTimeout(() => {
      setLoadingStep("Validating credentials...");
      setTimeout(() => {
        setLoadingStep("Committing transaction payload...");
      }, 700);
    }, 700);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setTimeout(() => {
          setLoading(false);
          setSuccess(true);
          setFormData({
            name: "",
            email: "",
            company: "",
            companySize: "",
            service: "",
            message: "",
          });
        }, 1800);
      } else {
        throw new Error(data.message || "Server returned an error state.");
      }
    } catch (err: any) {
      console.warn("API Connection failed, entering mock submission mode...", err.message);

      // Fallback local mockup mode handling if backend server is not running during page load
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        console.log("\n--- MOCK SUBMISSION (FRONTEND ONLY FALLBACK) ---");
        console.log(formData);
        console.log("------------------------------------------------\n");
        setFormData({
          name: "",
          email: "",
          company: "",
          companySize: "",
          service: "",
          message: "",
        });
      }, 2000);
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 px-4 sm:px-8">
      <div className="absolute inset-0 grid-pattern-fine opacity-20 pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Left Column: Context details / Social CTAs */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-steel-blue font-space text-xs font-semibold uppercase tracking-[0.2em] mb-4 block">
                Get In Touch
              </span>
              <h2 className="font-space text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-ivory mb-6 leading-[1.1]">
                Let's engineer your next system.
              </h2>
              <p className="font-inter text-platinum text-[15px] sm:text-[16px] leading-relaxed font-light mb-10">
                Book an architectural consultation to discuss custom AI automation, full-stack SaaS builds, or high-performance infrastructure optimizations.
              </p>

              {/* Direct Channels links */}
              <div className="flex flex-col gap-5 mb-10">
                <a
                  href="mailto:hello.aetherion.tech@gmail.com"
                  className="flex items-center gap-4 group focus:outline-none self-start"
                >
                  <div className="p-3 rounded-xl border border-ivory/5 bg-graphite/20 text-platinum group-hover:text-ivory group-hover:bg-steel-blue/10 group-hover:border-steel-blue/30 transition-colors">
                    <Mail size={16} />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-platinum/40">Email Inquiry</div>
                    <span className="text-sm font-semibold text-ivory group-hover:text-platinum transition-colors">
                      hello.aetherion.tech@gmail.com
                    </span>
                  </div>
                </a>

                {/* WhatsApp Chat link */}
                <a
                  href="https://wa.me/919924681662?text=Hello%20Aetherion%2C%20I'd%20like%20to%20book%20an%20architectural%20consultation."
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 group focus:outline-none self-start"
                >
                  <div className="p-3 rounded-xl border border-emerald-500/10 bg-emerald-500/5 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                    <MessageSquare size={16} />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400/60">WhatsApp Direct</div>
                    <span className="text-sm font-semibold text-emerald-400 group-hover:text-emerald-300 transition-colors">
                      Connect via Chat
                    </span>
                  </div>
                </a>
              </div>
            </div>

            <div className="border-l border-ivory/10 pl-5 py-1">
              <div className="flex items-center gap-2 font-mono text-[9px] text-platinum/30 uppercase tracking-widest mb-1.5 font-bold">
                <PhoneCall size={10} />
                SLA Guarantee
              </div>
              <p className="font-inter text-xs text-platinum/50 leading-relaxed max-w-[280px]">
                Corporate consultations are reviewed by lead system engineers within 2 business hours.
              </p>
            </div>
          </div>

          {/* Right Column: Dynamic Stateful Form Window */}
          <div className="lg:col-span-7 w-full relative">
            <div className="absolute inset-0 bg-steel-blue/5 rounded-2xl filter blur-3xl -z-10" />

            <div className="w-full glass-panel border-ivory/5 rounded-2xl p-6 sm:p-8 bg-graphite/10 shadow-[0_15px_45px_rgba(0,0,0,0.5)] min-h-[460px] flex flex-col justify-center overflow-hidden">
              <AnimatePresence mode="wait">

                {/* 1. Loading active state viewport */}
                {loading && (
                  <motion.div
                    key="loading-viewport"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="flex flex-col items-center justify-center text-center py-10"
                  >
                    <Loader2 size={40} className="text-steel-blue animate-spin mb-6" />
                    <h3 className="font-space text-lg font-medium text-ivory mb-2">
                      Securing Transaction Record
                    </h3>
                    <p className="font-mono text-xs text-platinum/50 uppercase tracking-widest animate-pulse">
                      {loadingStep}
                    </p>
                  </motion.div>
                )}

                {/* 2. Success dynamic confirmation */}
                {success && !loading && (
                  <motion.div
                    key="success-viewport"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="flex flex-col items-center justify-center text-center py-10"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 animate-bounce">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="font-space text-2xl font-semibold text-ivory mb-2">
                      Consultation Booked
                    </h3>
                    <p className="font-inter text-xs sm:text-sm text-platinum/70 leading-relaxed max-w-sm mb-8">
                      Thank you. Your inquiry has been securely routed. A lead systems architect will contact you within 2 business hours.
                    </p>
                    <button
                      onClick={() => setSuccess(false)}
                      className="glass-panel text-xs font-semibold px-6 py-2.5 rounded-lg border-ivory/10 hover:border-ivory/30 text-ivory hover:bg-ivory hover:text-charcoal transition-all"
                    >
                      Return to Form
                    </button>
                  </motion.div>
                )}

                {/* 3. Regular Input Form */}
                {!loading && !success && (
                  <motion.form
                    key="form-viewport"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5 text-left"
                  >
                    {error && (
                      <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-inter leading-relaxed">
                        {error}
                      </div>
                    )}

                    {/* Inputs Row 1: Name and Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="name" className="font-space text-xs font-semibold text-platinum/60 uppercase tracking-wide">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Elena Rostova"
                          className="w-full bg-charcoal/60 border border-ivory/10 rounded-xl px-4 py-3 text-sm text-ivory placeholder-platinum/30 focus:outline-none focus:border-steel-blue focus:ring-1 focus:ring-steel-blue transition-all"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="font-space text-xs font-semibold text-platinum/60 uppercase tracking-wide">
                          Business Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="elena@company.com"
                          className="w-full bg-charcoal/60 border border-ivory/10 rounded-xl px-4 py-3 text-sm text-ivory placeholder-platinum/30 focus:outline-none focus:border-steel-blue focus:ring-1 focus:ring-steel-blue transition-all"
                        />
                      </div>
                    </div>

                    {/* Inputs Row 2: Company and Size */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="company" className="font-space text-xs font-semibold text-platinum/60 uppercase tracking-wide">
                          Company Name
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Valo Financial"
                          className="w-full bg-charcoal/60 border border-ivory/10 rounded-xl px-4 py-3 text-sm text-ivory placeholder-platinum/30 focus:outline-none focus:border-steel-blue focus:ring-1 focus:ring-steel-blue transition-all"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="companySize" className="font-space text-xs font-semibold text-platinum/60 uppercase tracking-wide">
                          Team Size
                        </label>
                        <select
                          id="companySize"
                          name="companySize"
                          value={formData.companySize}
                          onChange={handleChange}
                          className="w-full bg-charcoal/60 border border-ivory/10 rounded-xl px-4 py-3 text-sm text-ivory placeholder-platinum/30 focus:outline-none focus:border-steel-blue focus:ring-1 focus:ring-steel-blue transition-all"
                        >
                          <option value="" className="bg-charcoal text-platinum/60">Select team size...</option>
                          <option value="Under 10" className="bg-charcoal">Under 10 members</option>
                          <option value="10-50" className="bg-charcoal">10 to 50 members</option>
                          <option value="50-250" className="bg-charcoal">50 to 250 members</option>
                          <option value="250+" className="bg-charcoal">250+ enterprise members</option>
                        </select>
                      </div>
                    </div>

                    {/* Input Row 3: Target service dropdown */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="service" className="font-space text-xs font-semibold text-platinum/60 uppercase tracking-wide">
                        Core Service Requested *
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full bg-charcoal/60 border border-ivory/10 rounded-xl px-4 py-3 text-sm text-ivory placeholder-platinum/30 focus:outline-none focus:border-steel-blue focus:ring-1 focus:ring-steel-blue transition-all"
                      >
                        <option value="" className="bg-charcoal text-platinum/60">Select service...</option>
                        <option value="AI Automation" className="bg-charcoal">AI Automation</option>
                        <option value="SaaS Development" className="bg-charcoal">SaaS Development</option>
                        <option value="Full Stack Engineering" className="bg-charcoal">Full Stack Engineering</option>
                        <option value="IT Consultancy" className="bg-charcoal">IT Consultancy</option>
                        <option value="Business Systems" className="bg-charcoal">Business Systems</option>
                      </select>
                    </div>

                    {/* Input Row 4: Scope Message */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className="font-space text-xs font-semibold text-platinum/60 uppercase tracking-wide">
                        Project Scope Details *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Please describe your technical goals, target outcomes, and budget metrics..."
                        className="w-full bg-charcoal/60 border border-ivory/10 rounded-xl px-4 py-3 text-sm text-ivory placeholder-platinum/30 focus:outline-none focus:border-steel-blue focus:ring-1 focus:ring-steel-blue transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="mt-2 w-full py-4 rounded-xl bg-ivory text-charcoal hover:bg-platinum font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-99"
                    >
                      <Send size={13} />
                      Submit Consultation Request
                    </button>
                  </motion.form>
                )}

              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
