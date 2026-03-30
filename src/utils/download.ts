import consola from 'consola';
import { downloadTemplate } from 'giget';
import type { TemplateConfig } from '@/templates/registry';

export interface DownloadOptions {
  template: TemplateConfig;
  targetPath: string;
  offline?: boolean;
}

export async function downloadTemplateFiles({
  template,
  targetPath,
  offline = false,
}: DownloadOptions): Promise<void> {
  const logger = consola.withTag('download');

  logger.start(`Downloading template ${template.name}...`);

  try {
    // Build the source string for giget
    // Format: github:owner/repo#branch
    const source = `github:${template.repo}#${template.branch}`;

    await downloadTemplate(source, {
      dir: targetPath,
      force: true,
      offline,
      name: template.id,
    });

    logger.success(`Template downloaded to ${targetPath}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    logger.fail(`Failed to download template: ${message}`);
    throw error;
  }
}
