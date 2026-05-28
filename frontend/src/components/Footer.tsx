"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === "/") {
      e.preventDefault();
      const hash = href.includes("#") ? "#" + href.split("#")[1] : "#";
      const element = document.querySelector(hash);
      if (element) {
        const topOffset = element.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({
          top: topOffset,
          behavior: "smooth",
        });
      } else if (hash === "#") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
  };

  const isSystemAdmin = pathname === "/analytics";

  if (isSystemAdmin) {
    return (
      <footer className="relative border-t border-graphite/40 bg-charcoal py-8 px-4 sm:px-8">
        <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none z-0" />
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo & Operational Label */}
          <div className="flex items-center gap-2 font-space select-none">
            <span className="font-semibold text-xs tracking-[0.1em] text-ivory">
              AETHERION
            </span>
            <span className="text-[10px] text-platinum/30 font-light">/</span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-steel-blue flex items-center gap-1">
              Admin Panel
            </span>
          </div>

          {/* Centered Legal Notice */}
          <span className="font-inter text-[11px] text-platinum/40 text-center sm:text-left">
            Aetherion Technologies © 2026. All rights reserved.
          </span>

          {/* Secure Sync Notice */}
          <div className="flex items-center gap-3 font-mono text-[9px] text-platinum/35 select-none uppercase tracking-wider">
            <span className="px-2 py-0.5 rounded bg-graphite/40 border border-ivory/5 text-emerald-400 font-semibold flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              SECURE SYNC
            </span>
            <span>v1.0.0</span>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="relative border-t border-graphite/40 bg-charcoal pt-16 pb-12 px-4 sm:px-8">
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none z-0" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Footer Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12 mb-16 items-start">
          
          {/* Logo & Tagline column */}
          <div className="md:col-span-4 flex flex-col items-start gap-4">
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, "/")}
              className="flex items-center gap-3 group focus:outline-none"
            >
              <div className="relative w-7 h-7 flex items-center justify-center">
                {/* Replace '/logo.png' below with your custom logo file path (e.g. /logo.svg or /logo.png placed in the public folder) */}
                <img
                  src="/logo.png"
                  alt="Aetherion Logo"
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <span className="font-space font-semibold text-base tracking-[0.1em] text-ivory">
                AETHERION
              </span>
            </a>
            <p className="font-inter text-xs text-platinum/60 leading-relaxed font-light max-w-xs">
              Aetherion Technologies builds high-performance, enterprise-grade AI automation, full stack systems, and bespoke SaaS platforms.
            </p>
          </div>

          {/* Nav Quicklinks columns */}
          <div className="grid grid-cols-3 col-span-1 md:col-span-8 gap-6 w-full">
            <div className="flex flex-col gap-3.5">
              <span className="font-space text-[10.5px] font-semibold text-platinum/30 uppercase tracking-widest block mb-1">
                Company
              </span>
              <a
                href="/#about"
                onClick={(e) => handleLinkClick(e, "/#about")}
                className="font-inter text-xs text-platinum/70 hover:text-ivory transition-colors self-start"
              >
                About Narrative
              </a>
              <a
                href="/#workflow"
                onClick={(e) => handleLinkClick(e, "/#workflow")}
                className="font-inter text-xs text-platinum/70 hover:text-ivory transition-colors self-start"
              >
                Workflow Timeline
              </a>
              <a
                href="/#why-choose-us"
                onClick={(e) => handleLinkClick(e, "/#why-choose-us")}
                className="font-inter text-xs text-platinum/70 hover:text-ivory transition-colors self-start"
              >
                Why Choose Us
              </a>
            </div>

            <div className="flex flex-col gap-3.5">
              <span className="font-space text-[10.5px] font-semibold text-platinum/30 uppercase tracking-widest block mb-1">
                Solutions
              </span>
              <a
                href="/#services"
                onClick={(e) => handleLinkClick(e, "/#services")}
                className="font-inter text-xs text-platinum/70 hover:text-ivory transition-colors self-start"
              >
                Core Services
              </a>
              <a
                href="/#portfolio"
                onClick={(e) => handleLinkClick(e, "/#portfolio")}
                className="font-inter text-xs text-platinum/70 hover:text-ivory transition-colors self-start"
              >
                Case Studies
              </a>
              <a
                href="/#tech-stack"
                onClick={(e) => handleLinkClick(e, "/#tech-stack")}
                className="font-inter text-xs text-platinum/70 hover:text-ivory transition-colors self-start"
              >
                Technical Stack
              </a>
            </div>

            <div className="flex flex-col gap-3.5">
              <span className="font-space text-[10.5px] font-semibold text-platinum/30 uppercase tracking-widest block mb-1">
                Resources
              </span>
              <a
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="font-inter text-xs text-platinum/70 hover:text-ivory transition-colors self-start"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="font-inter text-xs text-platinum/70 hover:text-ivory transition-colors self-start"
              >
                Terms & Conditions
              </a>
              <a
                href="/careers"
                target="_blank"
                rel="noopener noreferrer"
                className="font-inter text-xs text-platinum/70 hover:text-ivory transition-colors self-start"
              >
                Careers
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-inter text-xs text-platinum/70 hover:text-ivory transition-colors self-start"
              >
                LinkedIn
              </a>
            </div>
          </div>

        </div>

        {/* Footer Bottom Block */}
        <div className="pt-8 border-t border-ivory/5 flex justify-center text-center">
          <span className="font-inter text-[11px] text-platinum/40">
            Aetherion Technologies © 2026. All rights reserved.
          </span>
        </div>

      </div>
    </footer>
  );
}
