"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Clapperboard, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { profile } from "@/data/profile";

export function Hero() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowScroll(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  const scrollToPortfolio = () => {
    const section = document.getElementById("portfolio");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden" aria-labelledby="hero-title" style={{ minHeight: "100vh" }}>
      {/* Background Video Layer */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={profile.showreel.thumbnail}
          style={{ opacity: 0.15 }}
        >
          <source src={profile.showreel.videoUrl.replace("player.vimeo.com/video/", "player.vimeo.com/external/") + ".mp4" + "?s=1"} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_100%,_transparent_0%,_black_70%)]" />
      </div>

      {/* Foreground Accent Lines */}
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" style={{ transform: "translateX(-50%)" }} />
        <div className="absolute left-0 right-0 top-1/3 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute left-0 right-0 top-2/3 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>

      <Container className="relative z-10 pb-20 pt-32 w-full">
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          {/* Left Column - Editorial Info */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-5 lg:col-start-1 self-start pt-16"
          >
            <div className="flex items-center gap-3 mb-8">
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 20 }}
                className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center"
              >
                <Clapperboard className="h-7 w-7 text-white" aria-hidden="true" />
              </motion.div>
              <div>
                <p className="text-white/50 text-xs tracking-widest uppercase font-medium">Editor de Vídeos & Motion Designer</p>
                <p className="text-white/30 text-xs tracking-wider uppercase">São Paulo, BR · Disponível para projetos</p>
              </div>
            </div>

            <motion.h1
              id="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[0.95] mb-6"
              style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
            >
              EDITOR<span className="text-white/40 block text-4xl sm:text-5xl lg:text-6xl font-light mt-2">DEMO</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-base sm:text-lg text-gray-300 max-w-xs leading-relaxed font-light"
            >
              {profile.tagline}
            </motion.p>
          </motion.div>

          {/* Center - Showreel Player */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 100, damping: 15 }}
            className="lg:col-span-6 lg:col-start-6 relative group"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-950 border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.05),_0_25px_50px_-12px_rgba(0,0,0,0.8)]">
              <video
                className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-90"
                autoPlay
                muted
                loop
                playsInline
                poster={profile.showreel.thumbnail}
              >
                <source src={profile.showreel.videoUrl.replace("player.vimeo.com/video/", "player.vimeo.com/external/") + ".mp4" + "?s=1"} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />

              {/* Play Button Overlay */}
              <motion.button
                className="absolute inset-0 flex items-center justify-center z-10 p-8"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToPortfolio}
                aria-label="Assistir showreel e ver projetos"
              >
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center"
                >
                  <Play className="h-8 w-8 sm:h-10 sm:w-10 text-white ml-1" aria-hidden="true" />
                </motion.div>
              </motion.button>

              {/* Showreel Label */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none">
                <div className="text-white/70 text-sm font-medium tracking-wide uppercase">{profile.showreel.title}</div>
                <div className="flex items-center gap-2 text-white/40 text-xs">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" aria-hidden="true" />
                  <span>Ao vivo</span>
                </div>
              </div>
            </div>

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 grid grid-cols-3 gap-4 text-center"
            >
              {[
                { label: "Anos Exp.", value: "5+" },
                { label: "Projetos", value: "120+" },
                { label: "Clientes", value: "40+" },
              ].map((stat, i) => (
                <div key={stat.label} className="relative">
                  <div className="text-3xl sm:text-4xl font-black text-white leading-none">{stat.value}</div>
                  <div className="text-white/40 text-xs tracking-wider uppercase mt-1">{stat.label}</div>
                  {i < 2 && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent" aria-hidden="true" />}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - CTA + Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-1 lg:col-start-12 self-end pb-8 flex flex-col items-end gap-6"
          >
            <div className="flex flex-col items-end gap-3 w-full max-w-xs">
              <Button size="lg" onClick={scrollToPortfolio} className="w-full justify-end gap-2 bg-white text-black hover:bg-white/90 active:bg-white">
                Ver Projetos
                <ChevronDown className="h-5 w-5" aria-hidden="true" />
              </Button>
              <Button size="lg" variant="outline" onClick={scrollToPortfolio} className="w-full justify-end gap-2 border-white/20 text-white hover:bg-white/5">
                Entrar em Contato
              </Button>
            </div>

            <AnimatePresence mode="wait">
              {showScroll && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="w-px h-24 bg-gradient-to-b from-white/20 to-transparent relative"
                  aria-hidden="true"
                >
                  <motion.div
                    animate={{ y: [0, 24, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute left-1/2 top-0 w-px h-8 -translate-x-1/2 bg-white/40"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}