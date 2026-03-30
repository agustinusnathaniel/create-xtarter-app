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
  ${chalk.cyan('--pm, -p')} <manager>        Package manager (pnpm|npm|bun|yarn)
  ${chalk.cyan('--no-git')}                  Skip git initialization
  ${chalk.cyan('--clean')}                   Remove CI/CD configs after scaffold
  ${chalk.cyan('--help, -h')}                Show this help message
  ${chalk.cyan('--version, -v')}             Show version number

${chalk.bold('Templates:')}
  ${chalk.cyan('next-chakra')}       Next.js 16 + Chakra UI v3
  ${chalk.cyan('next-tailwind')}     Next.js 16 + Tailwind CSS v4
  ${chalk.cyan('vite-chakra')}       Vite 7 + React + Chakra UI v3
  ${chalk.cyan('vite-tailwind')}     Vite 7 + React + Tailwind CSS v4
  ${chalk.cyan('vite-hero')}         Vite 7 + React + Hero UI

${chalk.bold('Examples:')}
  ${chalk.gray('# Interactive mode')}
  ${chalk.cyan('npx create-xtarter-app@latest')}

  ${chalk.gray('# With project name and template')}
  ${chalk.cyan('npx create-xtarter-app@latest my-app --template vite-tailwind')}

  ${chalk.gray('# With all options')}
  ${chalk.cyan('npx create-xtarter-app@latest my-app -t vite-chakra -p pnpm --no-git')}
`;

export const VERSION = '0.1.0';
