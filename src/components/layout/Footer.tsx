"use client";

import Link from "next/link";
import { Mail, MessageCircle, AtSign, Copyright, Heart } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { profile } from "@/data/profile";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black/50" role="contentinfo">
      <Container>
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div>
              <p className="font-bold text-xl tracking-tight mb-4">EDITOR DEMO</p>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                Transformo histórias brutas em narrativas visuais impactantes. Edição ágil, ritmo cinematográfico, entrega técnica.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Contato</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-gray-500" aria-hidden="true" />
                  <a href={profile.socialLinks.email} className="hover:text-white transition-colors">
                    {profile.contacts.email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <MessageCircle className="h-4 w-4 text-gray-500" aria-hidden="true" />
                  <a href={profile.socialLinks.whatsapp} className="hover:text-white transition-colors">
                    WhatsApp: {profile.contacts.whatsapp.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <AtSign className="h-4 w-4 text-gray-500" aria-hidden="true" />
                  <a href={profile.socialLinks.instagram} className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                    {profile.contacts.instagram}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Navegação</h3>
              <nav aria-label="Navegação do rodapé">
                <ul className="space-y-3 text-gray-400 text-sm">
                  <li><Link href="#portfolio" className="hover:text-white transition-colors">Portfólio</Link></li>
                  <li><Link href="#about" className="hover:text-white transition-colors">Sobre</Link></li>
                  <li><Link href="#contact" className="hover:text-white transition-colors">Contato</Link></li>
                </ul>
              </nav>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} EDITOR DEMO. Todos os direitos reservados.
            </p>
            <p className="flex items-center gap-1.5 text-gray-500 text-sm">
              Feito com
              <Heart className="h-3.5 w-3.5 text-red-500" aria-hidden="true" />
              Next.js + Tailwind
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}