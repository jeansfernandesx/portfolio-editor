"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Play, X, ExternalLink, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { projects, categories, type Category } from "@/data/projects";
import { getVideoPlatform, getEmbedUrl } from "@/lib/utils";

interface ProjectCardProps {
  project: (typeof projects)[0];
  index: number;
  onOpen: (project: typeof projects[0]) => void;
}

function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative cursor-pointer"
      onKeyDown={(e) => e.key === "Enter" && onOpen(project)}
      onClick={() => onOpen(project)}
      tabIndex={0}
      role="button"
      aria-label={`Ver projeto: ${project.title}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />

        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <Loader2 className="h-8 w-8 text-white/30 animate-spin" aria-hidden="true" />
          </div>
        )}

        <Image
          src={project.thumbnail}
          alt={`Thumbnail do projeto: ${project.title}`}
          fill
          className={cn(
            "object-cover transition-all duration-1000 ease-out",
            "group-hover:scale-105",
            loaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setLoaded(true)}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
        />

        {/* Overlay with Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white"
            aria-hidden="true"
          >
            <Play className="h-7 w-7 ml-1" />
          </motion.div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className={cn(
            "px-3 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider backdrop-blur-sm border transition-all",
            project.featured
              ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
              : "bg-white/10 text-white/70 border-white/20"
          )}>
            {project.category}
          </span>
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <motion.div
            initial={{ rotate: -5, scale: 0 }}
            animate={{ rotate: -5, scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 15 }}
            className="absolute top-4 right-4 z-10"
          >
            <span className="px-3 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider bg-white/10 text-white/70 border border-white/20 backdrop-blur-sm">
              Destaque
            </span>
          </motion.div>
        )}

        {/* Duration */}
        <div className="absolute bottom-4 right-4 z-10 text-white/70 text-xs font-medium px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-full border border-white/10">
          {project.duration}
        </div>
      </div>

      {/* Content */}
      <div className="mt-5">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 + index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="space-y-2"
        >
          <p className="text-white/40 text-xs uppercase tracking-widest font-medium">{project.category}</p>
          <h3 className="text-xl font-bold text-white group-hover:text-white/80 transition-colors leading-tight pr-8">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 max-w-xs sm:max-w-md">
            {project.description}
          </p>
          <div className="flex items-center gap-2 mt-3 text-white/30 text-xs">
            <span>{project.client}</span>
            <span aria-hidden="true">·</span>
            <span>{new Date(project.date).getFullYear()}</span>
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
}

function ProjectModal({ project, onClose }: { project: (typeof projects)[0]; onClose: () => void }) {
  const embedUrl = getEmbedUrl(project.videoUrl);
  const platform = getVideoPlatform(project.videoUrl);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-6xl max-h-[90vh] flex flex-col bg-gray-950 rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.05),_0_25px_50px_-12px_rgba(0,0,0,0.8)]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Video Player */}
          <div className="relative aspect-video bg-black">
            {platform === "youtube" || platform === "vimeo" ? (
              <iframe
                src={embedUrl + (embedUrl.includes("?") ? "&" : "?") + "autoplay=1"}
                title={project.title}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <video
                src={project.videoUrl}
                className="w-full h-full object-contain"
                autoPlay
                controls
                playsInline
              />
            )}

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 text-gray-400 hover:text-white transition-all"
              aria-label="Fechar modal"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 lg:p-8 overflow-y-auto flex-1">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="flex-1">
                <p className="text-white/40 text-xs uppercase tracking-widest font-medium mb-2">{project.category}</p>
                <h2 id="modal-title" className="text-3xl sm:text-4xl font-black text-white mb-3 leading-tight">
                  {project.title}
                </h2>
                <p className="text-gray-300 text-base leading-relaxed max-w-2xl">{project.description}</p>
              </div>
            </div>

            {/* Meta Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 pb-6 border-b border-white/10">
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Cliente</p>
                <p className="text-white font-medium">{project.client}</p>
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Papel</p>
                <p className="text-white font-medium">{project.role}</p>
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Duração</p>
                <p className="text-white font-medium">{project.duration}</p>
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Entrega</p>
                <p className="text-white font-medium">{new Date(project.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" })}</p>
              </div>
            </div>

            {/* Tools */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="px-4 py-1.5 bg-white/5 text-white/70 text-sm rounded-full border border-white/10 hover:border-white/20 hover:bg-white/10 transition-colors"
                >
                  {tool}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-4 border-t border-white/10">
              <Button variant="outline" onClick={onClose} className="flex-1 sm:flex-none">
                Fechar
              </Button>
              <a
                href={project.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-medium px-4 py-2"
              >
                Ver original
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<Category>("Todos");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "Todos") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const handleOpenModal = (project: typeof projects[0]) => {
    setSelectedProject(project);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "";
  };

  return (
    <section id="portfolio" className="py-24 lg:py-32 bg-black" aria-labelledby="portfolio-title">
      {/* Decorative Lines */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" aria-hidden="true" />
      <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" aria-hidden="true" />

      <Container size="xl" className="relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-16 lg:mb-20"
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
            <div>
              <p className="text-white/40 text-sm tracking-widest uppercase font-medium mb-3">Projetos Selecionados</p>
              <h2 id="portfolio-title" className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-white leading-[0.95]">
                Portfólio
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-white/30 text-sm hidden sm:block">Filtrar por:</span>
              <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtrar por categoria">
                {categories.map((category) => (
                  <button
                    key={category}
                    role="tab"
                    aria-selected={activeCategory === category}
                    aria-controls="portfolio-grid"
                    onClick={() => setActiveCategory(category)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                      activeCategory === category
                        ? "bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                        : "bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800 border border-white/10"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid - Simple Responsive Grid */}
        <motion.div
          id="portfolio-grid"
          role="tabpanel"
          aria-label={`${activeCategory} projetos`}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpen={handleOpenModal}
            />
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <p className="text-gray-500 text-lg">Nenhum projeto encontrado nesta categoria.</p>
          </motion.div>
        )}
      </Container>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={handleCloseModal} />
      )}
    </section>
  );
}