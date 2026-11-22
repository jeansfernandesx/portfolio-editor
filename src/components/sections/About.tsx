"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Clapperboard, Palette, Music, Layers, CircleDot, SquarePen, Check } from "lucide-react";
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
};

export function About() {
  return (
    <section id="about" className="py-20 lg:py-32 bg-gray-950/50" aria-labelledby="about-title">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="relative aspect-square max-w-xs mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl" aria-hidden="true" />
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-900">
                <Image
                  src={profile.avatar}
                  alt={profile.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 lg:-bottom-8 lg:-right-8 w-24 h-24 lg:w-32 lg:h-32 bg-white/5 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/10">
                <Clapperboard className="h-12 w-12 lg:h-16 lg:w-16 text-white" aria-hidden="true" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="text-white/60 text-sm tracking-widest uppercase font-medium mb-3">Sobre Mim</p>
            <h2 id="about-title" className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
              {profile.name}
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-xl">
              {profile.bio}
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span className="px-4 py-1.5 bg-white/5 text-white/70 text-sm rounded-full border border-white/10">
                {profile.location}
              </span>
              <span className="px-4 py-1.5 bg-white/10 text-white text-sm rounded-full border border-white/20 font-medium">
                {profile.availability}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-10">
              {profile.specialties.map((specialty, index) => {
                const Icon = iconMap[specialty.icon];
                return (
                  <motion.div
                    key={specialty.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                    className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-colors"
                  >
                    <div className="p-2 bg-white/10 rounded-lg">
                      <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                    </div>
                    <span className="font-medium text-white">{specialty.name}</span>
                  </motion.div>
                );
              })}
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Ferramentas</h3>
              <div className="flex flex-wrap gap-2">
                {profile.software.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1.5 bg-white/5 text-white/70 text-sm rounded-full border border-white/10"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}