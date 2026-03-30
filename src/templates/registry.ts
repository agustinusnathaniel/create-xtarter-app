export type TemplateProvider = 'github';

export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  repo: string;
  branch: string;
  provider: TemplateProvider;
  path?: string; // Optional subdirectory in repo
}

export const TEMPLATES: TemplateConfig[] = [
  {
    id: 'next-chakra',
    name: 'Next.js + Chakra UI',
    description: 'Next.js 16 with Chakra UI v3, Biome, Turborepo',
    repo: 'agustinusnathaniel/nextarter-chakra',
    branch: 'main',
    provider: 'github',
  },
  {
    id: 'next-tailwind',
    name: 'Next.js + Tailwind',
    description: 'Next.js 16 with Tailwind CSS v4',
    repo: 'agustinusnathaniel/nextarter-tailwind',
    branch: 'main',
    provider: 'github',
  },
  {
    id: 'vite-chakra',
    name: 'Vite + React + Chakra',
    description: 'Vite 7, TanStack Router, Chakra UI v3',
    repo: 'agustinusnathaniel/vite-react-chakra-starter',
    branch: 'main',
    provider: 'github',
  },
  {
    id: 'vite-tailwind',
    name: 'Vite + React + Tailwind',
    description: 'Vite 7, TanStack Router, Tailwind CSS v4',
    repo: 'agustinusnathaniel/vite-react-tailwind-starter',
    branch: 'main',
    provider: 'github',
  },
  {
    id: 'vite-hero',
    name: 'Vite + React + Hero UI',
    description: 'Vite 7 with Hero UI library',
    repo: 'agustinusnathaniel/vite-react-hero-starter',
    branch: 'main',
    provider: 'github',
  },
];

export function getTemplateById(id: string): TemplateConfig | undefined {
  return TEMPLATES.find((t) => t.id === id);
}

export function getTemplateChoices() {
  return TEMPLATES.map((t) => ({
    value: t.id,
    label: `${t.name} - ${t.description}`,
  }));
}
