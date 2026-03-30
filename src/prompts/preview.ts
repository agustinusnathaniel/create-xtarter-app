import { cancel, isCancel, text } from '@clack/prompts';
import chalk from 'chalk';
import { getTemplateById, TEMPLATES } from '@/templates/registry';

export async function previewTemplate(templateId?: string): Promise<void> {
  // If template not provided, prompt for it
  if (!templateId) {
    const result = await text({
      message: 'Which template would you like to preview?',
      placeholder: 'vite-tailwind',
      validate: (value) => {
        if (!value || value.trim().length === 0) {
          return 'Template ID is required';
        }
        const template = getTemplateById(value);
        if (!template) {
          return `Unknown template "${value}". Valid: ${TEMPLATES.map((t) => t.id).join(', ')}`;
        }
      },
    });

    if (isCancel(result)) {
      cancel('Operation cancelled');
      process.exit(0);
    }

    templateId = result.trim();
  }

  const template = getTemplateById(templateId);
  if (!template) {
    console.log(chalk.red(`✖ Template "${templateId}" not found`));
    console.log(chalk.yellow(`Available templates: ${TEMPLATES.map((t) => t.id).join(', ')}`));
    process.exit(1);
  }

  // Display template info
  console.log('\n' + chalk.bold.cyan('═'.repeat(60)));
  console.log(chalk.bold.white(`  ${template.name}`));
  console.log(chalk.bold.cyan('═'.repeat(60)));
  console.log();
  console.log(chalk.gray('ID:') + `  ${template.id}`);
  console.log(chalk.gray('Description:'));
  console.log(`  ${template.description}`);
  console.log();
  console.log(chalk.gray('Repository:'));
  console.log(`  https://github.com/${template.repo}`);
  console.log();
  console.log(chalk.gray('Branch:') + `  ${template.branch}`);
  console.log();

  // Show what's included (based on template)
  console.log(chalk.bold('Features:'));

  const featureMap: Record<string, string[]> = {
    'next-chakra': ['Next.js 16', 'Chakra UI v3', 'Biome', 'Turborepo', 'TypeScript', 'Playwright'],
    'next-tailwind': ['Next.js 16', 'Tailwind CSS v4', 'Biome', 'TypeScript', 'Playwright'],
    'vite-chakra': [
      'Vite 7',
      'React 19',
      'Chakra UI v3',
      'TanStack Router',
      'TanStack Query',
      'Biome',
      'Vitest',
    ],
    'vite-tailwind': [
      'Vite 7',
      'React 19',
      'Tailwind CSS v4',
      'TanStack Router',
      'TanStack Query',
      'Biome',
      'Vitest',
    ],
    'vite-hero': ['Vite 7', 'React 19', 'Hero UI', 'TanStack Router', 'Biome', 'Vitest'],
  };

  const features = featureMap[template.id] || ['See repository for details'];
  features.forEach((feature) => {
    console.log(chalk.green('  ✔') + ` ${feature}`);
  });

  console.log();
  console.log(chalk.bold('Usage:'));
  console.log(`  ${chalk.cyan(`npx create-xtarter-app my-app -t ${template.id}`)}`);
  console.log();
  console.log(chalk.bold.cyan('═'.repeat(60)));
  console.log();
}
