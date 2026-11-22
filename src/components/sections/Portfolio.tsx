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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative cursor-pointer"
      onKeyDown={(e) => e.key === "Enter" && onOpen(project)}
      onClick={() => onOpen(project)}
      tabIndex={0}
      role="button"
      aria-label={`Ver projeto: ${project.title}`}
    >
      <div className="relative aspect-video overflow-hidden rounded-xl bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
            <Loader2 className="h-8 w-8 text-white/50 animate-spin" aria-hidden="true" />
          </div>
        )}
        <Image
          src={project.thumbnail}
          alt={`Thumbnail do projeto: ${project.title}`}
          fill
          className={cn(
            "object-cover transition-all duration-700 ease-out group-hover:scale-105",
            loaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setLoaded(true)}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/10 backdrop-blur-sm rounded-full p-3 text-white"
            aria-hidden="true"
          >
            <Play className="h-6 w-6 ml-1" />
          </motion.div>
        </div>
        {project.featured && (
          <span className="absolute top-3 left-3 bg-white/10 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
            Destaque
          </span>
        )}
      </div>
      <div className="mt-4 text-left">
        <p className="text-gray-500 text-sm uppercase tracking-wide mb-1">{project.category}</p>
        <h3 className="font-semibold text-white group-hover:text-white/80 transition-colors">{project.title}</h3>
        <p className="text-gray-400 text-sm mt-1 line-clamp-2">{project.description}</p>
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
          className="relative w-full max-w-5xl max-h-[90vh] flex flex-col bg-gray-950 rounded-xl overflow-hidden border border-white/10"
          onClick={(e) => e.stopPropagation()}
        >
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
          </div>

          <div className="p-6 lg:p-8 overflow-y-auto flex-1">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <p className="text-gray-500 text-sm uppercase tracking-wide mb-1">{project.category}</p>
                <h2 id="modal-title" className="text-2xl lg:text-3xl font-bold text-white mb-2">
                  {project.title}
                </h2>
                <p className="text-gray-300 text-base leading-relaxed">{project.description}</p>
              </div>
              <button
                onClick={onClose}
                className="flex-shrink-0 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                aria-label="Fechar modal"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm">
              <div>
                <p className="text-gray-500 mb-1">Cliente</p>
                <p className="text-white font-medium">{project.client}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Papel</p>
                <p className="text-white font-medium">{project.role}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Duração</p>
                <p className="text-white font-medium">{project.duration}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Data</p>
                <p className="text-white font-medium">{new Date(project.date).toLocaleDateString("pt-BR")}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1 bg-white/5 text-white/70 text-xs rounded-full border border-white/10"
                >
                  {tool}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={onClose}>
                Fechar
              </Button>
              <a
                href={project.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
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
    <section id="portfolio" className="py-20 lg:py-32 bg-black" aria-labelledby="portfolio-title">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-12 lg:mb-16"
        >
          <p className="text-white/60 text-sm tracking-widest uppercase font-medium mb-3">Projetos Selecionados</p>
          <h2 id="portfolio-title" className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            Portfólio
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-12" role="tablist" aria-label="Filtrar por categoria">
          {categories.map((category) => (
            <button
              key={category}
              role="tab"
              aria-selected={activeCategory === category}
              aria-controls="portfolio-panel"
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                activeCategory === category
                  ? "bg-white text-black shadow-lg shadow-white/10"
                  : "bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800 border border-white/10"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div
          id="portfolio-panel"
          role="tabpanel"
          aria-label={`${activeCategory} projetos`}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} onOpen={handleOpenModal} />
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Nenhum projeto encontrado nesta categoria.
          </div>
        )}
      </Container>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={handleCloseModal} />
      )}
    </section>
  );
}