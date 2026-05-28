"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Services", href: "/#services" },
  { name: "About", href: "/#about" },
  { name: "Portfolio", href: "/#portfolio" },
  { name: "Tech Stack", href: "/#tech-stack" },
  { name: "Workflow", href: "/#workflow" },
  { name: "Why Us", href: "/#why-choose-us" },
  { name: "Commitments", href: "/#commitments" },
];

interface HeaderProps {
  isAdmin?: boolean;
  onLock?: () => void;
}

export default function Header({ isAdmin = false, onLock }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Auto-detect administrative routes to apply refined header aesthetics
  const isSystemAdmin = isAdmin || pathname === "/analytics";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === "/") {
      e.preventDefault();
      setIsOpen(false);
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
    } else {
      setIsOpen(false);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-4 sm:px-8 py-4 sm:py-6`}
      >
        <div
          className={`max-w-7xl mx-auto w-full transition-all duration-500 rounded-2xl flex items-center justify-between px-6 py-3.5 ${
            scrolled
              ? "glass-panel bg-charcoal/80 border-[rgba(245,243,239,0.08)] shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-md"
              : "border border-transparent bg-transparent"
          }`}
        >
          {/* Brand Logo & Administrative Label Group */}
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, "/")}
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Aetherion Technologies Home"
          >
            <div className="relative w-8 h-8 flex items-center justify-center">
              {/* Replace '/logo.png' below with your custom logo file path (e.g. /logo.svg or /logo.png placed in the public folder) */}
              <img
                src="/logo.png"
                alt="Aetherion Logo"
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            
            {isSystemAdmin ? (
              <div className="flex items-center gap-2 sm:gap-2.5 font-space select-none">
                <span className="font-semibold text-lg tracking-[0.1em] text-ivory">
                  AETHERION
                </span>
                <span className="text-[10px] sm:text-xs text-platinum/30 font-light">/</span>
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-steel-blue flex items-center gap-1.5">
                  Operations
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                </span>
              </div>
            ) : (
              <span className="font-space font-semibold text-lg tracking-[0.1em] text-ivory group-hover:text-platinum transition-colors">
                AETHERION
              </span>
            )}
          </a>

          {/* Desktop Navigation Link Cluster */}
          <nav className="hidden lg:flex items-center gap-8">
            {isSystemAdmin ? (
              <a
                href="/"
                onClick={(e) => handleLinkClick(e, "/")}
                className="font-inter text-[13px] font-medium tracking-wide text-platinum hover:text-ivory transition-colors relative py-1.5 focus:outline-none group"
              >
                Back to Site
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-steel-blue group-hover:w-full transition-all duration-300 ease-out" />
              </a>
            ) : (
              navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="font-inter text-[13px] font-medium tracking-wide text-platinum hover:text-ivory transition-colors relative py-1.5 focus:outline-none group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-steel-blue group-hover:w-full transition-all duration-300 ease-out" />
                </a>
              ))
            )}
          </nav>

          {/* Right Action Trigger */}
          <div className="hidden lg:flex items-center">
            {isSystemAdmin ? (
              onLock && (
                <button
                  onClick={onLock}
                  className="glass-panel text-xs font-semibold px-4.5 py-2.5 rounded-lg border-ivory/10 hover:border-ivory/35 text-ivory hover:text-red-400 hover:border-red-500/20 hover:bg-red-500/10 flex items-center gap-1.5 transition-all duration-300 focus:outline-none shadow-sm active:scale-95 cursor-pointer"
                >
                  Lock Portal
                  <Lock size={12} className="opacity-80" />
                </button>
              )
            ) : (
              <a
                href="/#contact"
                onClick={(e) => handleLinkClick(e, "/#contact")}
                className="glass-panel text-xs font-semibold px-4.5 py-2.5 rounded-lg border-ivory/10 hover:border-ivory/30 text-ivory flex items-center gap-1.5 transition-all duration-300 focus:outline-none hover:bg-ivory hover:text-charcoal shadow-sm active:scale-95"
              >
                Book Consultation
                <ArrowUpRight size={13} className="opacity-80" />
              </a>
            )}
          </div>

          {/* Mobile Navigation Trigger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-ivory p-1 focus:outline-none rounded-md hover:bg-graphite/40 transition-colors"
            aria-label="Toggle Navigation Menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Slide-in Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-charcoal/98 lg:hidden pt-28 px-6 flex flex-col justify-between pb-10"
          >
            <div className="flex flex-col gap-6">
              {isSystemAdmin ? (
                <motion.a
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 }}
                  href="/"
                  onClick={(e) => handleLinkClick(e, "/")}
                  className="font-space text-2xl font-medium tracking-wide text-platinum hover:text-ivory py-2 border-b border-graphite/40 transition-colors block"
                >
                  Back to Site
                </motion.a>
              ) : (
                navLinks.map((link, idx) => (
                  <motion.a
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="font-space text-2xl font-medium tracking-wide text-platinum hover:text-ivory py-2 border-b border-graphite/40 transition-colors block"
                  >
                    {link.name}
                  </motion.a>
                ))
              )}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-4"
            >
              {isSystemAdmin ? (
                onLock && (
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onLock();
                    }}
                    className="w-full text-center py-4 rounded-xl font-semibold bg-red-500/15 border border-red-500/20 text-red-400 flex items-center justify-center gap-2 hover:bg-red-500/25 transition-all focus:outline-none cursor-pointer"
                  >
                    Lock Portal
                    <Lock size={15} />
                  </button>
                )
              ) : (
                <a
                  href="/#contact"
                  onClick={(e) => handleLinkClick(e, "/#contact")}
                  className="w-full text-center py-4 rounded-xl font-semibold bg-ivory text-charcoal flex items-center justify-center gap-2 hover:bg-platinum transition-all focus:outline-none"
                >
                  Book Consultation
                  <ArrowUpRight size={16} />
                </a>
              )}
              <span className="text-center font-inter text-[11px] text-platinum/50 uppercase tracking-widest">
                Aetherion Technologies © 2026
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
