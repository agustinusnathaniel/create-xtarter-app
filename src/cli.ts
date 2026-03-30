import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { cancel, intro, note, outro } from '@clack/prompts';
import { defineCommand, runMain } from 'citty';
import consola from 'consola';
import pc from 'picocolors';
import { APP_NAME, BANNER, HELP_TEXT, VERSION } from '@/constants';
import { promptCleanCI, promptGitInit } from '@/prompts/options';
import { promptPackageManager } from '@/prompts/package-manager';
import { previewTemplate } from '@/prompts/preview';
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
    preview: {
      type: 'boolean',
      alias: 'P',
      description: 'Preview template details',
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
    yes: {
      type: 'boolean',
      alias: 'y',
      description: 'Use defaults (pnpm, git init, no clean)',
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
  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: CLI run function orchestrates multiple steps
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

    // Handle preview flag
    if (args.preview) {
      await previewTemplate(args.template as string | undefined);
      return;
    }

    // Show banner
    console.log(BANNER);

    // Handle --yes flag: use defaults
    const useDefaults = args.yes === true;
    const defaultPackageManager: PackageManager = 'pnpm';
    const defaultGitInit = !args.noGit;
    const defaultCleanCI = false;

    try {
      // Start the scaffolding process
      intro(`${APP_NAME} - Let's create your project!`);

      // 1. Get project name (required)
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

      // 2. Get template (always prompt unless specified)
      const template = await promptTemplate(args.template as string | undefined);

      // 3. Get package manager (use default if --yes)
      const packageManager = useDefaults
        ? defaultPackageManager
        : await promptPackageManager(args.pm as PackageManager | undefined);

      // 4. Git initialization (use default if --yes)
      const shouldInitGit = useDefaults ? defaultGitInit : await promptGitInit(args.noGit);

      // Check if git is installed if user wants git init
      if (shouldInitGit) {
        const gitInstalled = await isGitInstalled();
        if (!gitInstalled) {
          consola.warn('Git is not installed. Skipping git initialization.');
        }
      }

      // 5. Clean CI configs (use default if --yes)
      const shouldCleanCI = useDefaults ? defaultCleanCI : await promptCleanCI(args.clean);

      // Note: Summary of choices
      note(
        [
          `Project: ${pc.cyan(projectName)}`,
          `Template: ${pc.cyan(template.name)}`,
          `Package Manager: ${pc.cyan(packageManager)}`,
          `Git Init: ${pc.cyan(shouldInitGit ? 'Yes' : 'No')}`,
          `Clean CI/CD: ${pc.cyan(shouldCleanCI ? 'Yes' : 'No')}`,
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
      outro(pc.green(`🎉 Successfully created ${pc.cyan(projectName)}!`));

      // Display next steps
      console.log(`\n${pc.bold('Next steps:')}
  ${pc.gray('1.')} ${pc.cyan(`cd ${projectName}`)}
  ${pc.gray('2.')} ${pc.cyan(`${packageManager} dev`)}
  ${pc.gray('3.')} Open ${pc.cyan('http://localhost:3000')} (or the port shown)

${pc.bold('Template:')} ${template.name}
${pc.bold('Docs:')} ${pc.underline(`https://github.com/${template.repo}`)}
`);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      cancel(`${pc.red('Error:')} ${message}`);
      process.exit(1);
    }
  },
});

runMain(mainCommand);
