// Main entry point for programmatic usage
export { downloadTemplateFiles } from './utils/download';
export { modifyPackageJson, cleanCIConfigs } from './utils/modify-package';
export { initializeGit, isGitInstalled } from './utils/git';
export { installDependencies } from './utils/install';
export { getTemplateById, getTemplateChoices, TEMPLATES } from './templates/registry';
export type { TemplateConfig } from './templates/registry';
export type { CliOptions, PackageManager, TemplateInfo, ScaffoldResult } from './types';
