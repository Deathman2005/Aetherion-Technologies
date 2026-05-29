"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Rocket, MessageSquare, Award, Shield, CreditCard, Scale, Cloud, Globe, Clock, Mail } from "lucide-react";
import { motion } from "framer-motion";

const termsSections = [
  {
    num: "1",
    title: "Services",
    icon: Rocket,
    content: (
      <p className="font-inter text-xs text-platinum/75 leading-relaxed font-light">
        Aetherion Technologies provides software engineering, AI automation, SaaS development, IT consultancy, and digital infrastructure services. All services are delivered based on mutually agreed project scope, timelines, and requirements.
      </p>
    )
  },
  {
    num: "2",
    title: "Project Communication",
    icon: MessageSquare,
    content: (
      <p className="font-inter text-xs text-platinum/75 leading-relaxed font-light">
        Clients are expected to provide accurate project requirements, timely feedback, and necessary resources required for successful project execution. Delays in communication or approvals may affect delivery timelines.
      </p>
    )
  },
  {
    num: "3",
    title: "Intellectual Property",
    icon: Award,
    content: (
      <>
        <p className="font-inter text-xs text-platinum/75 leading-relaxed font-light mb-3">
          Unless otherwise agreed in writing:
        </p>
        <ul className="list-disc pl-5 font-inter text-xs text-platinum/75 leading-relaxed font-light space-y-1.5 mb-3">
          <li>Clients retain ownership of their project content and business assets</li>
          <li>While Aetherion Technologies retains ownership of internal frameworks, reusable systems, development utilities, and proprietary engineering methods</li>
        </ul>
        <p className="font-inter text-xs text-platinum/75 leading-relaxed font-light">
          Upon project completion and final payment, agreed deliverables are transferred to the client.
        </p>
      </>
    )
  },
  {
    num: "4",
    title: "Confidentiality",
    icon: Shield,
    content: (
      <p className="font-inter text-xs text-platinum/75 leading-relaxed font-light">
        All project discussions, technical documents, credentials, and shared information are treated as confidential. Aetherion Technologies does not disclose client information without permission unless legally required.
      </p>
    )
  },
  {
    num: "5",
    title: "Payments",
    icon: CreditCard,
    content: (
      <p className="font-inter text-xs text-platinum/75 leading-relaxed font-light">
        Project pricing, payment schedules, and deliverables are defined before project initiation. Failure to complete agreed payments may result in paused development, restricted access, or delayed delivery.
      </p>
    )
  },
  {
    num: "6",
    title: "Limitation of Liability",
    icon: Scale,
    content: (
      <>
        <p className="font-inter text-xs text-platinum/75 leading-relaxed font-light mb-3">
          Aetherion Technologies is not responsible for:
        </p>
        <ul className="list-disc pl-5 font-inter text-xs text-platinum/75 leading-relaxed font-light space-y-1.5">
          <li>Indirect business losses</li>
          <li>Third-party service interruptions</li>
          <li>External hosting failures</li>
          <li>Issues caused by unauthorized modifications after deployment</li>
        </ul>
        <p className="font-inter text-xs text-platinum/75 leading-relaxed font-light mt-3">
          We strive to maintain stable, secure, and professionally engineered systems at all times.
        </p>
      </>
    )
  },
  {
    num: "7",
    title: "Third-Party Tools & Services",
    icon: Cloud,
    content: (
      <p className="font-inter text-xs text-platinum/75 leading-relaxed font-light">
        Projects may integrate third-party platforms, APIs, hosting providers, analytics tools, or cloud infrastructure services. Aetherion Technologies is not responsible for operational changes or outages caused by external providers.
      </p>
    )
  },
  {
    num: "8",
    title: "Website Usage",
    icon: Globe,
    content: (
      <>
        <p className="font-inter text-xs text-platinum/75 leading-relaxed font-light mb-3">
          Users may not:
        </p>
        <ul className="list-disc pl-5 font-inter text-xs text-platinum/75 leading-relaxed font-light space-y-1.5">
          <li>Misuse the website</li>
          <li>Attempt unauthorized access</li>
          <li>Distribute malicious software</li>
          <li>Use the platform for unlawful activities</li>
        </ul>
      </>
    )
  },
  {
    num: "9",
    title: "Policy Updates",
    icon: Clock,
    content: (
      <p className="font-inter text-xs text-platinum/75 leading-relaxed font-light">
        These Terms & Conditions may be updated periodically to reflect operational, technical, or legal changes. Continued use of the website indicates acceptance of updated terms.
      </p>
    )
  },
  {
    num: "10",
    title: "Contact",
    icon: Mail,
    content: (
      <div className="font-inter text-xs text-platinum/75 leading-relaxed font-light">
        <p className="mb-2">For questions regarding these terms, contact:</p>
        <p className="font-semibold text-ivory">Aetherion Technologies</p>
        <p className="text-steel-blue"><a href="mailto:hello.aetherion.tech@gmail.com" className="hover:underline text-platinum">hello.aetherion.tech@gmail.com</a></p>
      </div>
    )
  }
];

export default function TermsOfService() {
  return (
    <>
      <Header />
      <main className="flex-grow bg-charcoal text-ivory relative pt-32 sm:pt-40 pb-24 px-4 sm:px-8 overflow-hidden">
        {/* Decorative Grid & Glows */}
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none z-0" />
        <div className="absolute inset-0 grid-pattern-fine opacity-20 pointer-events-none z-0" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(circle_at_top,rgba(62,83,107,0.12),transparent_70%)] pointer-events-none z-0" />

        <div className="max-w-3xl mx-auto relative z-10">
          {/* Back Navigation */}
          <a
            href="/"
            className="inline-flex items-center gap-2 font-space text-xs font-semibold uppercase tracking-wider text-steel-blue hover:text-platinum transition-colors mb-12 focus:outline-none"
          >
            <ArrowLeft size={14} />
            Back to Hub
          </a>

          {/* Heading */}
          <div className="flex flex-col items-start text-left mb-16 sm:mb-20">
            <span className="text-steel-blue font-space text-xs font-semibold uppercase tracking-[0.2em] mb-4">
              Service Guidelines
            </span>
            <h1 className="font-space text-4xl sm:text-5xl font-medium tracking-tight text-ivory mb-6 leading-[1.1]">
              Terms & Conditions
            </h1>
            <div className="font-inter text-platinum text-[16px] leading-relaxed max-w-2xl font-light">
              <p className="mb-4">Effective Date: May 28, 2026</p>
              <p className="text-sm text-platinum/70">
                By accessing or using the Aetherion Technologies website and services, you agree to the following terms and conditions.
              </p>
            </div>
          </div>

          {/* Content sections */}
          <div className="flex flex-col gap-8">
            {termsSections.map((sec, index) => {
              const IconComponent = sec.icon;
              return (
                <motion.section
                  key={sec.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: Math.min(index * 0.05, 0.25), ease: [0.16, 1, 0.3, 1] }}
                  className="glass-panel p-6 sm:p-8 rounded-2xl border-ivory/5 bg-graphite/10 flex flex-col gap-4 hover:border-steel-blue/20 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 text-steel-blue">
                    <div className="p-1.5 rounded-lg bg-steel-blue/5 border border-steel-blue/20">
                      <IconComponent size={18} />
                    </div>
                    <h2 className="font-space text-md font-semibold text-ivory">
                      {sec.num}. {sec.title}
                    </h2>
                  </div>
                  <div className="pl-0 sm:pl-10">
                    {sec.content}
                  </div>
                </motion.section>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
