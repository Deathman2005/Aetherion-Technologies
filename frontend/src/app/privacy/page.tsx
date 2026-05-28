"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Lock, FileText, ShieldCheck, Eye, Network, Cookie, UserCheck, Mail, Clock } from "lucide-react";
import { motion } from "framer-motion";

const privacySections = [
  {
    num: "1",
    title: "Information We Collect",
    icon: FileText,
    content: (
      <>
        <p className="font-inter text-xs text-platinum/75 leading-relaxed font-light mb-3">
          We may collect the following information:
        </p>
        <ul className="list-disc pl-5 font-inter text-xs text-platinum/75 leading-relaxed font-light space-y-1">
          <li>Name</li>
          <li>Email address</li>
          <li>Company name</li>
          <li>Contact details</li>
          <li>Project requirements</li>
          <li>Technical inquiries submitted through forms or communication channels</li>
        </ul>
        <p className="font-inter text-xs text-platinum/75 leading-relaxed font-light mt-3 italic">
          We only collect information that is voluntarily provided by users.
        </p>
      </>
    )
  },
  {
    num: "2",
    title: "How We Use Your Information",
    icon: Eye,
    content: (
      <>
        <p className="font-inter text-xs text-platinum/75 leading-relaxed font-light mb-3">
          The information collected may be used to:
        </p>
        <ul className="list-disc pl-5 font-inter text-xs text-platinum/75 leading-relaxed font-light space-y-1">
          <li>Respond to consultation requests</li>
          <li>Communicate regarding projects or services</li>
          <li>Improve our website and user experience</li>
          <li>Provide technical support</li>
          <li>Send relevant engineering or service-related updates</li>
        </ul>
        <p className="font-inter text-xs text-platinum/75 leading-relaxed font-light mt-3 italic">
          We do not sell, rent, or trade personal information to third parties.
        </p>
      </>
    )
  },
  {
    num: "3",
    title: "Data Protection & Security",
    icon: ShieldCheck,
    content: (
      <p className="font-inter text-xs text-platinum/75 leading-relaxed font-light">
        Aetherion Technologies follows industry-standard security practices to protect client information and project data. We implement reasonable technical and organizational safeguards to prevent unauthorized access, misuse, or disclosure of information.
      </p>
    )
  },
  {
    num: "4",
    title: "Confidentiality",
    icon: Lock,
    content: (
      <p className="font-inter text-xs text-platinum/75 leading-relaxed font-light">
        All client discussions, project details, and shared technical information are treated as confidential. We respect the privacy of our partners and maintain professional confidentiality throughout all engagements.
      </p>
    )
  },
  {
    num: "5",
    title: "Third-Party Services",
    icon: Network,
    content: (
      <>
        <p className="font-inter text-xs text-platinum/75 leading-relaxed font-light mb-3">
          Our website may use trusted third-party services such as:
        </p>
        <ul className="list-disc pl-5 font-inter text-xs text-platinum/75 leading-relaxed font-light space-y-1">
          <li>Analytics tools</li>
          <li>Hosting providers</li>
          <li>Communication platforms</li>
          <li>Form processing systems</li>
        </ul>
        <p className="font-inter text-xs text-platinum/75 leading-relaxed font-light mt-3">
          These services may process limited technical data required for website functionality and performance.
        </p>
      </>
    )
  },
  {
    num: "6",
    title: "Cookies",
    icon: Cookie,
    content: (
      <p className="font-inter text-xs text-platinum/75 leading-relaxed font-light">
        Our website may use cookies or similar technologies to improve browsing experience, website performance, and analytics. Users may disable cookies through their browser settings if preferred.
      </p>
    )
  },
  {
    num: "7",
    title: "Your Rights",
    icon: UserCheck,
    content: (
      <>
        <p className="font-inter text-xs text-platinum/75 leading-relaxed font-light mb-3">
          You may request to:
        </p>
        <ul className="list-disc pl-5 font-inter text-xs text-platinum/75 leading-relaxed font-light space-y-1">
          <li>Access your information</li>
          <li>Update inaccurate information</li>
          <li>Request deletion of submitted data</li>
        </ul>
        <p className="font-inter text-xs text-platinum/75 leading-relaxed font-light mt-3">
          For any privacy-related requests, please contact us directly.
        </p>
      </>
    )
  },
  {
    num: "8",
    title: "Contact Information",
    icon: Mail,
    content: (
      <div className="font-inter text-xs text-platinum/75 leading-relaxed font-light">
        <p className="mb-2">If you have any questions regarding this Privacy Policy or how your information is handled, contact:</p>
        <p className="font-semibold text-ivory">Aetherion Technologies</p>
        <p className="text-steel-blue">Email: <a href="mailto:hello@aetherion.tech" className="hover:underline text-platinum">hello@aetherion.tech</a></p>
      </div>
    )
  },
  {
    num: "9",
    title: "Policy Updates",
    icon: Clock,
    content: (
      <p className="font-inter text-xs text-platinum/75 leading-relaxed font-light">
        This Privacy Policy may be updated periodically to reflect operational, legal, or technical changes. Continued use of the website indicates acceptance of the updated policy.
      </p>
    )
  }
];

export default function PrivacyPolicy() {
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
              Legal Framework
            </span>
            <h1 className="font-space text-4xl sm:text-5xl font-medium tracking-tight text-ivory mb-6 leading-[1.1]">
              Privacy Policy
            </h1>
            <div className="font-inter text-platinum text-[16px] leading-relaxed max-w-2xl font-light">
              <p className="mb-2">Effective Date: May 28, 2026</p>
              <p className="mb-4 text-sm text-platinum/70">
                Aetherion Technologies values your privacy and is committed to protecting any information shared with us.
              </p>
              <p className="text-sm text-platinum/70 font-light">
                This Privacy Policy explains how we collect, use, and safeguard your information when you interact with our website, services, or consultation forms.
              </p>
            </div>
          </div>

          {/* Content sections */}
          <div className="flex flex-col gap-8">
            {privacySections.map((sec, index) => {
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
