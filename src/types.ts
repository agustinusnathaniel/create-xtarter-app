import type { TemplateProvider } from './templates/registry';

export interface CliOptions {
  /** Project name */
  name?: string;
  /** Template ID to use (skips prompt) */
  template?: string;
  /** Package manager to use (skips prompt) */
  pm?: PackageManager;
  /** Skip git initialization */
  noGit?: boolean;
  /** Remove CI/CD configs */
  clean?: boolean;
  /** Show help message */
  help?: boolean;
  /** Show version */
  version?: boolean;
}

export type PackageManager = 'pnpm' | 'npm' | 'bun' | 'yarn';

export interface TemplateInfo {
  id: string;
  name: string;
  description: string;
  repo: string;
  branch: string;
  provider: TemplateProvider;
}

export interface ScaffoldResult {
  projectName: string;
  projectPath: string;
  template: TemplateInfo;
  packageManager: PackageManager;
  gitInitialized: boolean;
  cleanMode: boolean;
}
