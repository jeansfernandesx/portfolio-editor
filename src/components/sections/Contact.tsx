"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageCircle, AtSign, Send, CheckCircle, AlertCircle, Loader2, ArrowRight, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { profile } from "@/data/profile";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    project: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      setFormData({ name: "", email: "", project: "", message: "" });
    } catch {
      setStatus("error");
      setErrorMessage("Erro ao enviar. Tente novamente ou entre em contato direto.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFocus = (field: string) => setFocusedField(field);
  const handleBlur = () => setFocusedField(null);

  const contactMethods = [
    {
      label: "WhatsApp",
      value: profile.contacts.whatsapp.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3"),
      href: profile.socialLinks.whatsapp,
      icon: MessageCircle,
      color: "text-green-400",
      bgColor: "bg-green-500/20",
      borderColor: "border-green-500/30",
      hoverBg: "hover:bg-green-500/30",
      external: true,
      description: "Resposta em até 2h (dias úteis)",
    },
    {
      label: "E-mail",
      value: profile.contacts.email,
      href: profile.socialLinks.email,
      icon: Mail,
      color: "text-blue-400",
      bgColor: "bg-blue-500/20",
      borderColor: "border-blue-500/30",
      hoverBg: "hover:bg-blue-500/30",
      external: false,
      description: "Resposta em até 24h (dias úteis)",
    },
    {
      label: "Instagram",
      value: profile.contacts.instagram,
      href: profile.socialLinks.instagram,
      icon: AtSign,
      color: "text-pink-400",
      bgColor: "bg-pink-500/20",
      borderColor: "border-pink-500/30",
      hoverBg: "hover:bg-pink-500/30",
      external: true,
      description: "DM para projetos rápidos",
    },
  ];

  return (
    <section id="contact" className="relative py-24 lg:py-32 bg-black" aria-labelledby="contact-title">
      {/* Decorative Lines */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" aria-hidden="true" />
      <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" aria-hidden="true" />

      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" style={{ transform: "translateX(-50%)" }} />
        <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>

      <Container size="xl" className="relative">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">

          {/* Left Column - Direct Contact Cards */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-5 lg:col-start-1 pt-12"
          >
            <div className="space-y-6">
              <div>
                <p className="text-white/40 text-sm tracking-widest uppercase font-medium mb-3">Contato Direto</p>
                <motion.h2
                  id="contact-title"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-white leading-[0.95] mb-4"
                  style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
                >
                  Vamos<br />
                  <span className="text-white/40 font-light block mt-2">Conversar?</span>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-xl font-light"
                >
                  Tem um projeto em mente? Escolha o canal que preferir — respondo rápido.
                  Se preferir, preencha o formulário ao lado com os detalhes.
                </motion.p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4" role="list" aria-label="Métodos de contato direto">
                {contactMethods.map((method, index) => (
                  <motion.article
                    key={method.label}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="group relative"
                    role="listitem"
                  >
                    <a
                      href={method.href}
                      target={method.external ? "_blank" : undefined}
                      rel={method.external ? "noopener noreferrer" : undefined}
                      className={cn(
                        "flex items-center gap-5 p-5 bg-white/5 rounded-2xl border border-white/10",
                        "hover:border-white/20 hover:bg-white/10 transition-all duration-300",
                        "group"
                      )}
                      aria-label={`${method.label}: ${method.value}`}
                    >
                      <div className={cn(
                        "p-4 rounded-xl flex-shrink-0 transition-all duration-300",
                        method.bgColor,
                        method.borderColor,
                        "group-hover:scale-110"
                      )}>
                        <method.icon className={cn("h-6 w-6", method.color)} aria-hidden="true" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white/50 text-xs uppercase tracking-widest font-medium">{method.label}</p>
                        <p className="text-white font-medium text-lg truncate">{method.value}</p>
                        <p className="text-gray-500 text-sm mt-1">{method.description}</p>
                      </div>
                      <motion.div
                        whileHover={{ x: 4 }}
                        className="text-white/30 group-hover:text-white transition-colors flex-shrink-0"
                        aria-hidden="true"
                      >
                        <ArrowRight className="h-5 w-5" />
                      </motion.div>
                    </a>
                    {/* Accent line */}
                    <div className="absolute left-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent w-0 group-hover:w-full transition-all duration-500" aria-hidden="true" />
                  </motion.article>
                ))}
              </div>

              {/* Availability Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="pt-8 border-t border-white/10 grid grid-cols-3 gap-6"
              >
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/5 rounded-xl">
                    <Clock className="h-5 w-5 text-white/50" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-wider font-medium">Horário</p>
                    <p className="text-white text-sm font-medium">Seg–Sex: 9h–19h</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/5 rounded-xl">
                    <MapPin className="h-5 w-5 text-white/50" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-wider font-medium">Localização</p>
                    <p className="text-white text-sm font-medium">{profile.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-500/20 rounded-xl border border-amber-500/30">
                    <CheckCircle className="h-5 w-5 text-amber-400" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-wider font-medium">Disponibilidade</p>
                    <p className="text-white text-sm font-medium">{profile.availability}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-6 lg:col-start-7"
          >
            <div className="bg-gray-950/50 border border-white/10 rounded-2xl p-6 lg:p-8 h-full">
              <div className="mb-8">
                <p className="text-white/40 text-sm tracking-widest uppercase font-medium mb-3">Briefing do Projeto</p>
                <h3 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                  Me Conte Sobre<br />
                  <span className="text-white/40 font-light">Seu Projeto</span>
                </h3>
              </div>

              <AnimatePresence mode="wait">
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="mb-6 p-5 bg-green-500/10 border border-green-500/30 rounded-xl flex items-start gap-4"
                    role="alert"
                  >
                    <div className="flex-shrink-0 p-2 bg-green-500/20 rounded-xl">
                      <CheckCircle className="h-5 w-5 text-green-400" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-green-400 font-medium">Mensagem Enviada!</p>
                      <p className="text-gray-400 text-sm mt-1">Recebi seu briefing. Retornarei em até 24h nos dias úteis.</p>
                    </div>
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="mb-6 p-5 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-4"
                    role="alert"
                  >
                    <div className="flex-shrink-0 p-2 bg-red-500/20 rounded-xl">
                      <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-red-400 font-medium">Erro no Envio</p>
                      <p className="text-gray-400 text-sm mt-1">{errorMessage}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Name Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Nome completo <span className="text-white/40" aria-hidden="true">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => handleFocus("name")}
                      onBlur={handleBlur}
                      required
                      disabled={status === "submitting"}
                      className={cn(
                        "w-full px-5 py-4 bg-black/50 border rounded-xl text-white placeholder-gray-500",
                        "focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent",
                        "disabled:opacity-50 disabled:cursor-not-allowed",
                        "transition-all duration-200",
                        focusedField === "name"
                          ? "border-white/30 bg-black/30"
                          : "border-white/10 hover:border-white/20"
                      )}
                      placeholder="Seu nome completo"
                      aria-required="true"
                    />
                    {focusedField === "name" && (
                      <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        exit={{ opacity: 0, scaleX: 0 }}
                        className="absolute bottom-0 left-0 h-px bg-white w-full transform-origin-left"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                </motion.div>

                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                >
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    E-mail <span className="text-white/40" aria-hidden="true">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => handleFocus("email")}
                      onBlur={handleBlur}
                      required
                      disabled={status === "submitting"}
                      className={cn(
                        "w-full px-5 py-4 bg-black/50 border rounded-xl text-white placeholder-gray-500",
                        "focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent",
                        "disabled:opacity-50 disabled:cursor-not-allowed",
                        "transition-all duration-200",
                        focusedField === "email"
                          ? "border-white/30 bg-black/30"
                          : "border-white/10 hover:border-white/20"
                      )}
                      placeholder="seu@email.com"
                      aria-required="true"
                    />
                    {focusedField === "email" && (
                      <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        exit={{ opacity: 0, scaleX: 0 }}
                        className="absolute bottom-0 left-0 h-px bg-white w-full transform-origin-left"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                </motion.div>

                {/* Project Type Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <label htmlFor="project" className="block text-sm font-medium text-gray-300 mb-2">
                    Tipo de projeto <span className="text-white/40" aria-hidden="true">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="project"
                      name="project"
                      value={formData.project}
                      onChange={handleChange}
                      onFocus={() => handleFocus("project")}
                      onBlur={handleBlur}
                      required
                      disabled={status === "submitting"}
                      className={cn(
                        "w-full px-5 py-4 bg-black/50 border rounded-xl text-white appearance-none",
                        "focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent",
                        "disabled:opacity-50 disabled:cursor-not-allowed",
                        "transition-all duration-200",
                        focusedField === "project"
                          ? "border-white/30 bg-black/30"
                          : "border-white/10 hover:border-white/20"
                      )}
                      aria-required="true"
                    >
                      <option value="">Selecione o tipo de projeto</option>
                      <option value="reels">Reels / Shorts / TikTok</option>
                      <option value="youtube">Vídeo YouTube (longa duração)</option>
                      <option value="comercial">Comercial / Publicidade</option>
                      <option value="documentario">Documentário / Institucional</option>
                      <option value="curso">Curso / Conteúdo Educativo</option>
                      <option value="evento">Aftermovie / Evento</option>
                      <option value="outro">Outro</option>
                    </select>
                    {focusedField === "project" && (
                      <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        exit={{ opacity: 0, scaleX: 0 }}
                        className="absolute bottom-0 left-0 h-px bg-white w-full transform-origin-left"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                </motion.div>

                {/* Message Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                >
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Detalhes do projeto <span className="text-white/40" aria-hidden="true">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => handleFocus("message")}
                      onBlur={handleBlur}
                      required
                      disabled={status === "submitting"}
                      rows={6}
                      className={cn(
                        "w-full px-5 py-4 bg-black/50 border rounded-xl text-white placeholder-gray-500 resize-none",
                        "focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent",
                        "disabled:opacity-50 disabled:cursor-not-allowed",
                        "transition-all duration-200",
                        focusedField === "message"
                          ? "border-white/30 bg-black/30"
                          : "border-white/10 hover:border-white/20"
                      )}
                      placeholder="Conte sobre seu projeto: duração estimada, prazo de entrega, referências visuais, orçamento disponível, plataforma de publicação..."
                      aria-required="true"
                    />
                    {focusedField === "message" && (
                      <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        exit={{ opacity: 0, scaleX: 0 }}
                        className="absolute bottom-0 left-0 h-px bg-white w-full transform-origin-left"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Button
                    type="submit"
                    className="w-full group"
                    size="lg"
                    loading={status === "submitting"}
                    disabled={status === "submitting" || status === "success"}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {status === "success" ? (
                        <>
                          <CheckCircle className="h-5 w-5" aria-hidden="true" />
                          Mensagem Enviada!
                        </>
                      ) : status === "submitting" ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          Enviar Briefing
                          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                        </>
                      )}
                    </span>
                  </Button>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-center text-gray-500 text-sm mt-6"
                >
                  Campos marcados com <span className="text-white/40" aria-hidden="true">*</span> são obrigatórios.
                  Seus dados são usados apenas para responder seu projeto.
                </motion.p>
              </form>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}