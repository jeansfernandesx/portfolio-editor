# Portfolio Editor — Next.js + Tailwind + Framer Motion

Portfólio profissional para editor de vídeos com estética dark cinematográfica.

## 🚀 Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** (animações)
- **Lucide React** (ícones)
- **Next/Image** (otimização de imagens)

## 📁 Estrutura

```
portfolio-editor/
├── public/
│   ├── projects/          # Thumbnails dos projetos (SVG)
│   ├── avatar.svg         # Foto de perfil
│   ├── showreel-thumb.svg # Thumbnail do showreel
│   └── og-image.svg       # Open Graph image
├── src/
│   ├── app/
│   │   ├── globals.css    # Estilos globais + Tailwind
│   │   ├── layout.tsx     # Layout raiz + SEO
│   │   ├── page.tsx       # Página principal (Home)
│   │   ├── sitemap.ts     # Sitemap XML
│   │   └── robots.ts      # Robots.txt
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── Portfolio.tsx
│   │   │   ├── About.tsx
│   │   │   └── Contact.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       └── Container.tsx
│   ├── data/
│   │   ├── profile.ts     # Dados do perfil (nome, bio, contatos)
│   │   └── projects.ts    # Lista de projetos
│   └── lib/
│       ├── types.ts       # Types TypeScript
│       └── utils.ts       # Utilitários (cn, formatação, video embed)
├── next.config.ts
├── tsconfig.json
└── package.json
```

## 🛠 Instalação

```bash
# 1. Entre no diretório
cd portfolio-editor

# 2. Instale dependências
npm install

# 3. Rode em desenvolvimento
npm run dev

# 4. Abra http://localhost:3000
```

## ✏️ Como Editar

### 1. Perfil (`src/data/profile.ts`)

```typescript
export const profile = {
  name: "SEU NOME",
  role: "Editor de Vídeos & Motion Designer",
  tagline: "Sua frase de apresentação curta.",
  bio: "Bio completa para a seção Sobre.",
  avatar: "/avatar.svg",           // Substitua por sua foto
  location: "Sua Cidade, PAÍS",
  availability: "Disponível para freelas",
  specialties: [
    { name: "Edição Narrativa", icon: "Clapperboard" },
    { name: "Motion Graphics", icon: "SquarePen" },
    // ... adicione/remova
  ],
  software: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
  contacts: {
    whatsapp: "5511999999999",
    instagram: "@seuusuario",
    email: "seu@email.com",
  },
  socialLinks: {
    whatsapp: "https://wa.me/5511999999999",
    instagram: "https://instagram.com/seuusuario",
    email: "mailto:seu@email.com",
  },
  showreel: {
    title: "Showreel 2024",
    videoUrl: "https://player.vimeo.com/video/SEU_ID",
    thumbnail: "/showreel-thumb.svg",
  },
};
```

### 2. Projetos (`src/data/projects.ts`)

Cada projeto:

```typescript
{
  id: "1",
  title: "Título do Projeto",
  description: "Descrição detalhada...",
  category: "Comerciais", // Reels | Shorts | YouTube | Comerciais | Outros
  thumbnail: "/projects/thumb-1.svg", // Coloque em public/projects/
  videoUrl: "https://player.vimeo.com/video/ID", // YouTube, Vimeo ou MP4 direto
  date: "2024-11-15",
  featured: true, // Destaque no card
  duration: "30s",
  client: "Nome do Cliente",
  role: "Seu Papel",
  tools: ["Premiere Pro", "After Effects"],
}
```

**Categorias disponíveis:** `Reels`, `Shorts`, `YouTube`, `Comerciais`, `Outros`

### 3. Thumbnails

- Coloque arquivos em `public/projects/` (recomendado: SVG ou WebP, 1920x1080)
- Atualize o campo `thumbnail` no projeto
- Para produção, use imagens otimizadas (WebP/AVIF)

### 4. Avatar e Showreel

- Substitua `public/avatar.svg` pela sua foto (512x512)
- Substitua `public/showreel-thumb.svg` pelo thumbnail do showreel (1920x1080)
- Atualize `videoUrl` no profile.ts para o link do Vimeo/YouTube

### 5. Open Graph

- Edite `public/og-image.svg` (1200x630) para preview no WhatsApp/LinkedIn/Twitter

## 🎨 Personalização Visual

### Cores (Tailwind v4)

Edite `src/app/globals.css` na seção `@layer base`:

```css
:root {
  --background: 0 0% 0%;      /* Preto puro */
  --foreground: 0 0% 100%;    /* Branco puro */
}
```

### Tipografia

A fonte padrão é **Inter** (via `next/font/google`). Para mudar, edite `src/app/layout.tsx`:

```typescript
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
```

### Animações (Framer Motion)

Todas as animações usam `ease: [0.25, 0.46, 0.45, 0.94]` (curva cinematográfica). Ajuste em cada componente seção.

## 📱 Responsividade

- Mobile-first (Tailwind)
- Breakpoints: `sm:640px`, `md:768px`, `lg:1024px`, `xl:1280px`
- Menu mobile com animação no Header
- Grid de projetos: 1 col (mobile) → 2 col (tablet) → 3 col (desktop)

## ♿ Acessibilidade

- Semântica HTML5 (`header`, `main`, `section`, `footer`, `nav`, `article`)
- ARIA labels em botões e links
- Focus visible em todos elementos interativos
- `prefers-reduced-motion` respeitado
- Alt text em todas imagens
- Contraste WCAG AA+

## 🚀 Deploy na Vercel

```bash
# 1. Push para GitHub
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/seuusuario/portfolio-editor.git
git push -u origin main

# 2. Na Vercel:
# - Import Project → Selecione o repo
# - Framework: Next.js (auto-detect)
# - Deploy
```

**Variáveis de ambiente** (opcional):
- `NEXT_PUBLIC_SITE_URL` — URL do site para sitemap/canonical

## 📦 Build de Produção

```bash
npm run build
npm start
```

## 🔧 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento (Turbopack) |
| `npm run build` | Build de produção |
| `npm start` | Servidor de produção |
| `npm run lint` | ESLint |

## 📄 Licença

MIT — Use livremente para seu portfólio pessoal.

---

**Dúvidas?** Abra uma issue ou consulte a documentação do Next.js/Tailwind/Framer Motion.