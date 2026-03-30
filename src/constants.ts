import chalk from 'chalk';

export const APP_NAME = chalk.cyanBright('create-xtarter-app');

export const BANNER = `
${chalk.cyanBright('╔════════════════════════════════════════════╗')}
${chalk.cyanBright('║')}                                        ${chalk.cyanBright('║')}
${chalk.cyanBright('║')}   ${chalk.bold('create-xtarter-app')}                    ${chalk.cyanBright('║')}
${chalk.cyanBright('║')}                                        ${chalk.cyanBright('║')}
${chalk.cyanBright('║')}   ${chalk.gray('Fast project scaffolding')}               ${chalk.cyanBright('║')}
${chalk.cyanBright('║')}   ${chalk.gray('for modern web apps')}                    ${chalk.cyanBright('║')}
${chalk.cyanBright('║')}                                        ${chalk.cyanBright('║')}
${chalk.cyanBright('╚════════════════════════════════════════════╝')}
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
${chalk.bold('Usage:')}
  ${chalk.cyan('npx create-xtarter-app@latest')} [project-name] [options]

${chalk.bold('Options:')}
  ${chalk.cyan('--template, -t')} <name>     Template to use (skips prompt)
  ${chalk.cyan('--preview, -P')}             Preview template details
  ${chalk.cyan('--pm, -p')} <manager>        Package manager (pnpm|npm|bun|yarn)
  ${chalk.cyan('--no-git')}                  Skip git initialization
  ${chalk.cyan('--clean')}                   Remove CI/CD configs after scaffold
  ${chalk.cyan('--yes, -y')}                 Use defaults (pnpm, git init, no clean)
  ${chalk.cyan('--help, -h')}                Show this help message
  ${chalk.cyan('--version, -v')}             Show version number

${chalk.bold('Examples:')}
  ${chalk.gray('# Preview a template')}
  ${chalk.cyan('npx create-xtarter-app@latest --preview vite-tailwind')}

  ${chalk.gray('# Interactive mode')}
  ${chalk.cyan('npx create-xtarter-app@latest')}

  ${chalk.gray('# Quick scaffold with defaults')}
  ${chalk.cyan('npx create-xtarter-app@latest my-app -y')}

  ${chalk.gray('# Full control')}
  ${chalk.cyan('npx create-xtarter-app@latest my-app -t vite-chakra -p pnpm --no-git')}
`;

export const VERSION = '0.1.0';
