"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-black/80 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      )}
      role="banner"
    >
      <Container>
        <nav className="flex items-center justify-between h-16 lg:h-20" aria-label="Navegação principal">
          <Link
            href="#"
            className="flex items-center gap-2 text-white font-bold text-xl tracking-tight"
            aria-label="Voltar ao início"
          >
            <Clapperboard className="h-6 w-6" aria-hidden="true" />
            <span>EDITOR DEMO</span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-white after:transition-width hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
            <Link href="#contact">
              <Button size="sm" variant="primary">
                Contratar
              </Button>
            </Link>
          </div>

          <div className="lg:hidden flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>

        <div
          id="mobile-menu"
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-white/10 bg-black/95 backdrop-blur-md",
            mobileOpen ? "max-h-64 opacity-100 pb-6" : "max-h-0 opacity-0"
          )}
          role="navigation"
          aria-label="Menu mobile"
        >
          <div className="flex flex-col items-center gap-4 pt-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white text-lg font-medium hover:text-gray-300 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="#contact" onClick={() => setMobileOpen(false)}>
              <Button className="w-full" variant="primary">
                Contratar
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}