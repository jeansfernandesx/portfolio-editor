"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageCircle, AtSign, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    // Simulação de envio - em produção, conectar a um serviço como Formspree, EmailJS, ou API própria
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Aqui você integraria com seu serviço de email
      // Exemplo com Formspree:
      // const response = await fetch("https://formspree.io/f/SEU_ID", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      // });
      // if (!response.ok) throw new Error("Erro no envio");

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

  return (
    <section id="contact" className="py-20 lg:py-32 bg-black" aria-labelledby="contact-title">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="text-white/60 text-sm tracking-widest uppercase font-medium mb-3">Vamos Trabalhar Juntos</p>
            <h2 id="contact-title" className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
              Entre em Contato
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-xl">
              Tem um projeto em mente? Preencha o formulário ou me chame direto no WhatsApp. Respondo em até 24h nos dias úteis.
            </p>

            <div className="space-y-5">
              <a
                href={profile.socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all group"
              >
                <div className="p-3 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-colors">
                  <MessageCircle className="h-6 w-6 text-green-400" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">WhatsApp</p>
                  <p className="text-white font-medium">
                    {profile.contacts.whatsapp.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")}
                  </p>
                </div>
              </a>

              <a
                href={profile.socialLinks.email}
                className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all group"
              >
                <div className="p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                  <Mail className="h-6 w-6 text-blue-400" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">E-mail</p>
                  <p className="text-white font-medium">{profile.contacts.email}</p>
                </div>
              </a>

              <a
                href={profile.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all group"
              >
                <div className="p-3 bg-pink-500/20 rounded-lg group-hover:bg-pink-500/30 transition-colors">
                  <AtSign className="h-6 w-6 text-pink-400" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Instagram</p>
                  <p className="text-white font-medium">{profile.contacts.instagram}</p>
                </div>
              </a>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            onSubmit={handleSubmit}
            className="bg-gray-950/50 border border-white/10 rounded-2xl p-6 lg:p-8"
            noValidate
          >
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center gap-3 text-green-400"
                role="alert"
              >
                <CheckCircle className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                <p>Mensagem enviada com sucesso! Retornarei em breve.</p>
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3 text-red-400"
                role="alert"
              >
                <AlertCircle className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                <p>{errorMessage}</p>
              </motion.div>
            )}

            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Nome completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={status === "submitting"}
                  className={cn(
                    "w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500",
                    "focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "transition-colors"
                  )}
                  placeholder="Seu nome"
                  aria-required="true"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  E-mail *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={status === "submitting"}
                  className={cn(
                    "w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500",
                    "focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "transition-colors"
                  )}
                  placeholder="seu@email.com"
                  aria-required="true"
                />
              </div>

              <div>
                <label htmlFor="project" className="block text-sm font-medium text-gray-300 mb-2">
                  Tipo de projeto *
                </label>
                <select
                  id="project"
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                  required
                  disabled={status === "submitting"}
                  className={cn(
                    "w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white",
                    "focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "transition-colors"
                  )}
                  aria-required="true"
                >
                  <option value="">Selecione o tipo</option>
                  <option value="reels">Reels / Shorts / TikTok</option>
                  <option value="youtube">Vídeo YouTube</option>
                  <option value="comercial">Comercial / Publicidade</option>
                  <option value="documentario">Documentário / Institucional</option>
                  <option value="curso">Curso / Conteúdo Educativo</option>
                  <option value="evento">Aftermovie / Evento</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Detalhes do projeto *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={status === "submitting"}
                  rows={5}
                  className={cn(
                    "w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 resize-none",
                    "focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "transition-colors"
                  )}
                  placeholder="Conte sobre seu projeto: duração, prazo, referências, orçamento estimado..."
                  aria-required="true"
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                loading={status === "submitting"}
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Enviando..." : "Enviar Mensagem"}
                <Send className="h-5 w-5" aria-hidden="true" />
              </Button>

              <p className="text-center text-gray-500 text-sm">
                Campos marcados com * são obrigatórios.
              </p>
            </div>
          </motion.form>
        </div>
      </Container>
    </section>
  );
}