export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  videoUrl: string;
  date: string;
  featured: boolean;
  duration: string;
  client: string;
  role: string;
  tools: string[];
}

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  avatar: string;
  location: string;
  availability: string;
  specialties: { name: string; icon: string }[];
  software: string[];
  contacts: {
    whatsapp: string;
    instagram: string;
    email: string;
  };
  socialLinks: {
    whatsapp: string;
    instagram: string;
    email: string;
  };
  showreel: {
    title: string;
    videoUrl: string;
    thumbnail: string;
  };
}

export interface NavLink {
  href: string;
  label: string;
}