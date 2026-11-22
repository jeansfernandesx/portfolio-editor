"use client";

import Link from "next/link";
import { Mail, MessageCircle, AtSign, Copyright, Heart, ArrowUp, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { profile } from "@/data/profile";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { href: "#portfolio", label: "Portfólio" },
    { href: "#about", label: "Sobre" },
    { href: "#contact", label: "Contato" },
  ];

  const socialLinks = [
    {
      label: "E-mail",
      value: profile.contacts.email,
      href: profile.socialLinks.email,
      icon: Mail,
      color: "text-blue-400",
      external: false,
    },
    {
      label: "WhatsApp",
      value: profile.contacts.whatsapp.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3"),
      href: profile.socialLinks.whatsapp,
      icon: MessageCircle,
      color: "text-green-400",
      external: true,
    },
    {
      label: "Instagram",
      value: profile.contacts.instagram,
      href: profile.socialLinks.instagram,
      icon: AtSign,
      color: "text-pink-400",
      external: true,
    },
  ];

  return (
    <footer className="relative border-t border-white/5 bg-black" role="contentinfo">
      {/* Decorative top line */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" aria-hidden="true" />
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none" style={{ transform: "translateX(-50%)" }} aria-hidden="true" />

      <Container size="xl">
        <div className="py-16 lg:py-24 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
            {/* Brand Column */}
            <div className="lg:col-span-4 lg:col-start-1">
              <Link href="#" className="flex items-center gap-2 text-white font-black text-xl sm:text-2xl tracking-tighter mb-6 inline-flex" aria-label="Voltar ao início" style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
                <span className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6z"/><path d="M8 12h8"/><path d="M8 16h5"/></svg>
                </span>
                <span>EDITOR</span>
              </Link>
              <p className="text-gray-400 text-base leading-relaxed max-w-xs font-light">
                Transformo histórias brutas em narrativas visuais impactantes. Edição ágil, ritmo cinematográfico, entrega técnica.
              </p>

              {/* Back to top */}
              <a href="#" className="mt-8 inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium" aria-label="Voltar ao topo">
                <ArrowUp className="h-4 w-4" aria-hidden="true" />
                <span>Topo</span>
              </a>
            </div>

            {/* Contact Column */}
            <div className="lg:col-span-3 lg:col-start-5">
              <h3 className="text-white/40 text-xs uppercase tracking-widest font-medium mb-6">Contato Direto</h3>
              <ul className="space-y-4" role="list">
                {socialLinks.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target={social.external ? "_blank" : undefined}
                      rel={social.external ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 group"
                    >
                      <div className={cn("p-3 rounded-xl", `bg-${social.color.replace("text-", "")}/20`, `border-${social.color.replace("text-", "")}/30`)}>
                        <social.icon className={cn("h-5 w-5", social.color)} aria-hidden="true" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white/50 text-xs uppercase tracking-wider font-medium">{social.label}</p>
                        <p className="text-white font-medium truncate">{social.value}</p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigation Column */}
            <div className="lg:col-span-3 lg:col-start-8">
              <h3 className="text-white/40 text-xs uppercase tracking-widest font-medium mb-6">Navegação</h3>
              <nav aria-label="Navegação do rodapé">
                <ul className="space-y-3" role="list">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-300 group"
                      >
                        <ChevronRight className="h-4 w-4 text-white/30 group-hover:text-white transition-colors" aria-hidden="true" />
                        <span className="text-sm font-medium">{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Availability / CTA Column */}
            <div className="lg:col-span-2 lg:col-start-11">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full">
                <h3 className="text-white/40 text-xs uppercase tracking-widest font-medium mb-4">Disponibilidade</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-black/30 rounded-xl border border-white/5">
                    <div className="p-2 bg-amber-500/20 rounded-lg">
                      <Heart className="h-4 w-4 text-amber-400" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-white/50 text-xs uppercase tracking-wider font-medium">Status</p>
                      <p className="text-white font-medium">{profile.availability}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-black/30 rounded-xl border border-white/5">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <MessageCircle className="h-4 w-4 text-blue-400" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-white/50 text-xs uppercase tracking-wider font-medium">Resposta</p>
                      <p className="text-white font-medium">Até 24h (dias úteis)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-black/30 rounded-xl border border-white/5">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <ChevronLeft className="h-4 w-4 text-green-400" aria-hidden="true" />
                      <ChevronRight className="h-4 w-4 text-green-400" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-white/50 text-xs uppercase tracking-wider font-medium">Próxima Vaga</p>
                      <p className="text-white font-medium">Esta semana</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-start gap-4 text-gray-500 text-sm">
              <p>© {currentYear} EDITOR. Todos os direitos reservados.</p>
              <div className="flex items-center gap-2">
                <span>Feito com</span>
                <Heart className="h-3.5 w-3.5 text-red-500" aria-hidden="true" />
                <span>Next.js 15 + Tailwind v4</span>
              </div>
            </div>

            {/* Scroll to top */}
            <a href="#" className="p-3 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/10 text-white/50 hover:text-white transition-all duration-300" aria-label="Voltar ao topo">
              <ArrowUp className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}