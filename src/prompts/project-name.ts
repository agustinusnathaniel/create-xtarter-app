import { text, isCancel, cancel } from '@clack/prompts';
import chalk from 'chalk';

export async function promptProjectName(defaultValue?: string): Promise<string> {
  const result = await text({
    message: 'What is your project named?',
    placeholder: defaultValue || 'my-app',
    defaultValue,
    validate: (value) => {
      if (!value || value.trim().length === 0) {
        return 'Project name is required';
      }
      if (!/^[a-zA-Z0-9-_]+$/.test(value)) {
        return 'Name can only contain letters, numbers, hyphens, and underscores';
      }
      if (value.length > 214) {
        return 'Name must be less than 214 characters';
      }
    },
  });

  if (isCancel(result)) {
    cancel('Operation cancelled');
    process.exit(0);
  }

  return result.trim();
}
