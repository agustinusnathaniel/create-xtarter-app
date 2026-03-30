import pc from 'picocolors';

export const APP_NAME = pc.cyanBright('create-xtarter-app');

export const BANNER = `
${pc.cyanBright('╔════════════════════════════════════════════╗')}
${pc.cyanBright('║')}                                        ${pc.cyanBright('║')}
${pc.cyanBright('║')}   ${pc.bold('create-xtarter-app')}                    ${pc.cyanBright('║')}
${pc.cyanBright('║')}                                        ${pc.cyanBright('║')}
${pc.cyanBright('║')}   ${pc.gray('Fast project scaffolding')}               ${pc.cyanBright('║')}
${pc.cyanBright('║')}   ${pc.gray('for modern web apps')}                    ${pc.cyanBright('║')}
${pc.cyanBright('║')}                                        ${pc.cyanBright('║')}
${pc.cyanBright('╚════════════════════════════════════════════╝')}
`;

export const DEFAULT_TEMPLATE = 'next-chakra';

export const SUPPORTED_PACKAGE_MANAGERS = {
  pnpm: {
    name: 'pnpm',
    installCommand: 'install',
    execCommand: 'pnpm',
  },
  npm: {
    name: 'npm',
    installCommand: 'install',
    execCommand: 'npm',
  },
  bun: {
    name: 'bun',
    installCommand: 'install',
    execCommand: 'bun',
  },
  yarn: {
    name: 'yarn',
    installCommand: 'install',
    execCommand: 'yarn',
  },
} as const;

export const HELP_TEXT = `
${pc.bold('Usage:')}
  ${pc.cyan('npx create-xtarter-app@latest')} [project-name] [options]

${pc.bold('Options:')}
  ${pc.cyan('--template, -t')} <name>     Template to use (skips prompt)
  ${pc.cyan('--preview, -P')}             Preview template details
  ${pc.cyan('--pm, -p')} <manager>        Package manager (pnpm|npm|bun|yarn)
  ${pc.cyan('--no-git')}                  Skip git initialization
  ${pc.cyan('--clean')}                   Remove CI/CD configs after scaffold
  ${pc.cyan('--yes, -y')}                 Use defaults (pnpm, git init, no clean)
  ${pc.cyan('--help, -h')}                Show this help message
  ${pc.cyan('--version, -v')}             Show version number

${pc.bold('Examples:')}
  ${pc.gray('# Preview a template')}
  ${pc.cyan('npx create-xtarter-app@latest --preview vite-tailwind')}

  ${pc.gray('# Interactive mode')}
  ${pc.cyan('npx create-xtarter-app@latest')}

  ${pc.gray('# Quick scaffold with defaults')}
  ${pc.cyan('npx create-xtarter-app@latest my-app -y')}

  ${pc.gray('# Full control')}
  ${pc.cyan('npx create-xtarter-app@latest my-app -t vite-chakra -p pnpm --no-git')}
`;

export const VERSION = '0.1.0';
