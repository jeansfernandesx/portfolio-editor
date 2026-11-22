"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Clapperboard, Palette, Music, Layers, CircleDot, SquarePen, Award, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { profile } from "@/data/profile";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Clapperboard,
  Palette,
  Music,
  Layers,
  CircleDot,
  SquarePen,
  Award,
  Sparkles,
};

export function About() {
  return (
    <section id="about" className="relative py-24 lg:py-32 bg-black" aria-labelledby="about-title">
      {/* Decorative Lines */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" aria-hidden="true" />
      <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" aria-hidden="true" />

      <Container size="xl" className="relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Image + Quote Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Main Image */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gray-900 mb-8">
              <Image
                src={profile.avatar}
                alt={profile.name}
                fill
                className="object-cover transition-transform duration-1000 ease-out hover:scale-105"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" aria-hidden="true" />

              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-6 left-6 right-6"
              >
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-amber-500/20 rounded-xl">
                      <Award className="h-6 w-6 text-amber-400" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-white/40 text-xs uppercase tracking-widest font-medium">Reconhecimento</p>
                      <p className="text-white font-semibold">Top Rated Editor</p>
                      <p className="text-gray-400 text-sm mt-1">Behance / Vimeo Staff Pick</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Quote Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="bg-gray-950/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 lg:p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.05),_0_25px_50px_-12px_rgba(0,0,0,0.8)]">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-widest font-medium mb-2">Filosofia</p>
                    <blockquote className="text-white text-base lg:text-lg font-light leading-relaxed italic">
                      "{profile.tagline}"
                    </blockquote>
                    <footer className="mt-4 flex items-center gap-2 text-white/50 text-sm">
                      <span className="font-medium text-white">{profile.name}</span>
                      <span aria-hidden="true">—</span>
                      <span>Editor Sênior</span>
                    </footer>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="pt-12 lg:pt-0"
          >
            {/* Header */}
            <div className="mb-12">
              <p className="text-white/40 text-sm tracking-widest uppercase font-medium mb-3">Sobre Mim</p>
              <motion.h2
                id="about-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-white leading-[0.95] mb-6"
                style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
              >
                {profile.name.split(" ").slice(0, -1).join(" ")}<br />
                <span className="text-white/40 font-light text-4xl sm:text-5xl lg:text-6xl block mt-2">{profile.name.split(" ").pop()}</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-xl font-light"
              >
                {profile.bio}
              </motion.p>
            </div>

            {/* Meta Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-3 mb-12"
            >
              <span className="px-4 py-2 bg-white/5 text-white/70 text-sm rounded-full border border-white/10">
                {profile.location}
              </span>
              <span className="px-4 py-2 bg-white/10 text-white text-sm rounded-full border border-white/20 font-medium">
                {profile.availability}
              </span>
              <span className="px-4 py-2 bg-amber-500/20 text-amber-300 text-sm rounded-full border border-amber-500/30 font-medium">
                {profile.specialties.length} Especialidades
              </span>
            </motion.div>

            {/* Specialties Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-3 mb-16"
            >
              <p className="text-white/40 text-xs uppercase tracking-widest font-medium mb-6">Especialidades</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {profile.specialties.map((specialty, index) => {
                  const Icon = iconMap[specialty.icon];
                  return (
                    <motion.div
                      key={specialty.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.6 + index * 0.06 }}
                      className="group relative p-5 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 3 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className="p-3 bg-white/10 rounded-xl flex-shrink-0"
                        >
                          <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-white group-hover:text-white/80 transition-colors">{specialty.name}</p>
                        </div>
                      </div>
                      <div className="absolute left-0 bottom-0 h-px bg-gradient-to-r from-amber-500 to-transparent w-0 group-hover:w-full transition-all duration-500" aria-hidden="true" />
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Stats - Editorial Numbers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pt-8 border-t border-white/10 mb-12"
            >
              {[
                { value: "5+", label: "Anos de Experiência" },
                { value: "120+", label: "Projetos Entregues" },
                { value: "40+", label: "Clientes Atendidos" },
                { value: "98%", label: "Taxa de Satisfação" },
              ].map((stat, i) => (
                <div key={stat.label} className="relative">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-none tracking-tighter">{stat.value}</div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mt-2 font-medium">{stat.label}</p>
                  {i < 3 && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent" aria-hidden="true" />}
                </div>
              ))}
            </motion.div>

            {/* Software/Tools */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="pt-8 border-t border-white/10"
            >
              <p className="text-white/40 text-xs uppercase tracking-widest font-medium mb-6">Ferramentas & Workflow</p>
              <div className="flex flex-wrap gap-2">
                {profile.software.map((tool, index) => (
                  <motion.span
                    key={tool}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.9 + index * 0.03 }}
                    className="px-4 py-2 bg-white/5 text-white/70 text-sm rounded-full border border-white/10 hover:border-white/20 hover:bg-white/10 hover:text-white transition-all"
                  >
                    {tool}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}