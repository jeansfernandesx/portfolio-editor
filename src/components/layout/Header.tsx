"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Clapperboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const navLinks = [
  { href: "#portfolio", label: "Portfólio" },
  { href: "#about", label: "Sobre" },
  { href: "#contact", label: "Contato" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-black/70 backdrop-blur-xl border-b border-white/5 shadow-[0_1px_0_rgba(255,255,255,0.02)]"
          : "bg-transparent"
      )}
      role="banner"
      style={{ willChange: "background-color, border-color, box-shadow" }}
    >
      <Container>
        <nav className="flex items-center justify-between h-16 lg:h-20" aria-label="Navegação principal">
          {/* Logo */}
          <Link
            href="#"
            className="flex items-center gap-2 text-white font-black text-xl sm:text-2xl tracking-tighter relative z-10"
            aria-label="Voltar ao início"
            style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
          >
            <Clapperboard className="h-6 w-6 sm:h-7 sm:w-7 text-white/40" aria-hidden="true" />
            <span className="hidden sm:inline">EDITOR</span>
            <span className="inline sm:hidden">ED</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-gray-400 hover:text-white transition-colors duration-300 text-sm font-medium rounded-lg"
              >
                {link.label}
                <motion.span
                  className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 -translate-x-1/2"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                />
              </Link>
            ))}
            <Link href="#contact">
              <Button size="sm" variant="primary" className="ml-2">
                Contratar
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
              className="p-2"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="lg:hidden overflow-hidden border-t border-white/5 bg-black/95 backdrop-blur-xl"
              role="navigation"
              aria-label="Menu mobile"
            >
              <div className="py-6 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-3 text-white text-lg font-medium rounded-xl hover:bg-white/5 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link href="#contact" onClick={() => setMobileOpen(false)} className="block px-4 pt-2">
                  <Button className="w-full" variant="primary" size="lg">
                    Contratar
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </header>
  );
}