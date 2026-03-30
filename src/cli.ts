#!/usr/bin/env node

import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { cancel, intro, note, outro } from '@clack/prompts';
import chalk from 'chalk';
import { defineCommand, runMain } from 'citty';
import consola from 'consola';
import { APP_NAME, BANNER, HELP_TEXT, VERSION } from '@/constants';
import { promptCleanCI, promptGitInit } from '@/prompts/options';
import { promptPackageManager } from '@/prompts/package-manager';
import { promptProjectName } from '@/prompts/project-name';
import { promptTemplate } from '@/prompts/template';
import type { PackageManager } from '@/types';
import { downloadTemplateFiles } from '@/utils/download';
import { initializeGit, isGitInstalled } from '@/utils/git';
import { installDependencies } from '@/utils/install';
import { cleanCIConfigs, modifyPackageJson } from '@/utils/modify-package';

const mainCommand = defineCommand({
  meta: {
    name: 'create-xtarter-app',
    version: VERSION,
    description: 'Fast project scaffolding for modern web apps',
  },
  args: {
    name: {
      type: 'positional',
      description: 'Project name',
      required: false,
    },
    template: {
      type: 'string',
      alias: 't',
      description: 'Template to use',
      required: false,
    },
    pm: {
      type: 'string',
      alias: 'p',
      description: 'Package manager (pnpm|npm|bun|yarn)',
      required: false,
    },
    noGit: {
      type: 'boolean',
      description: 'Skip git initialization',
      required: false,
    },
    clean: {
      type: 'boolean',
      description: 'Remove CI/CD configs',
      required: false,
    },
    help: {
      type: 'boolean',
      alias: 'h',
      description: 'Show help message',
      required: false,
    },
    version: {
      type: 'boolean',
      alias: 'v',
      description: 'Show version',
      required: false,
    },
  },
  async run(ctx) {
    const args = ctx.args;

    // Handle help flag
    if (args.help) {
      console.log(HELP_TEXT);
      return;
    }

    // Handle version flag
    if (args.version) {
      console.log(VERSION);
      return;
    }

    // Show banner
    console.log(BANNER);

    try {
      // Start the scaffolding process
      intro(`${APP_NAME} - Let's create your project!`);

      // 1. Get project name
      let projectName = args.name;
      if (!projectName) {
        projectName = await promptProjectName();
      }

      const projectPath = resolve(process.cwd(), projectName);

      // Check if directory already exists
      if (existsSync(projectPath)) {
        const files = await import('node:fs').then((m) => m.readdirSync(projectPath));
        if (files.length > 0) {
          cancel(
            `Directory "${projectName}" already exists and is not empty. Please choose a different name.`
          );
          process.exit(1);
        }
      }

      // 2. Get template
      const template = await promptTemplate(args.template as string | undefined);

      // 3. Get package manager
      const packageManager = await promptPackageManager(args.pm as PackageManager | undefined);

      // 4. Git initialization option
      const shouldInitGit = await promptGitInit(args.noGit);

      // Check if git is installed if user wants git init
      if (shouldInitGit) {
        const gitInstalled = await isGitInstalled();
        if (!gitInstalled) {
          consola.warn('Git is not installed. Skipping git initialization.');
        }
      }

      // 5. Clean CI configs option
      const shouldCleanCI = await promptCleanCI(args.clean);

      // Note: Summary of choices
      note(
        [
          `Project: ${chalk.cyan(projectName)}`,
          `Template: ${chalk.cyan(template.name)}`,
          `Package Manager: ${chalk.cyan(packageManager)}`,
          `Git Init: ${chalk.cyan(shouldInitGit ? 'Yes' : 'No')}`,
          `Clean CI/CD: ${chalk.cyan(shouldCleanCI ? 'Yes' : 'No')}`,
        ].join('\n'),
        'Scaffolding with these settings'
      );

      // 6. Download template
      await downloadTemplateFiles({
        template,
        targetPath: projectPath,
      });

      // 7. Modify package.json
      await modifyPackageJson({
        projectPath,
        projectName,
      });

      // 8. Clean CI/CD configs if requested
      if (shouldCleanCI) {
        await cleanCIConfigs({ projectPath });
      }

      // 9. Install dependencies
      await installDependencies({
        packageManager,
        projectPath,
      });

      // 10. Initialize git if requested
      if (shouldInitGit) {
        const gitInstalled = await isGitInstalled();
        if (gitInstalled) {
          await initializeGit({ projectPath });
        }
      }

      // Success!
      outro(chalk.green(`🎉 Successfully created ${chalk.cyan(projectName)}!`));

      // Display next steps
      console.log(`\n${chalk.bold('Next steps:')}
  ${chalk.gray('1.')} ${chalk.cyan(`cd ${projectName}`)}
  ${chalk.gray('2.')} ${chalk.cyan(`${packageManager} dev`)}
  ${chalk.gray('3.')} Open ${chalk.cyan('http://localhost:3000')} (or the port shown)

${chalk.bold('Template:')} ${template.name}
${chalk.bold('Docs:')} ${chalk.underline(`https://github.com/${template.repo}`)}
`);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      cancel(`${chalk.red('Error:')} ${message}`);
      process.exit(1);
    }
  },
});

runMain(mainCommand);
