#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import pkg from 'fs-extra';
const { readJson, writeJson, mkdirp, ensureFile, ensureDir, copy, readFile, writeFile, pathExists, readdir } = pkg;
import { join, dirname, extname, relative } from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import ora from 'ora';
import { cosmiconfig } from 'cosmiconfig';
import pMap from 'p-map';

const __dirname = dirname(fileURLToPath(import.meta.url));
const paths = {
    templates: join(__dirname, 'templates'),
    themes: join(__dirname, 'templates', 'themes'),
    registry: join(__dirname, 'registry.json'),
    config: 'saas-config'
};

const explorer = cosmiconfig(paths.config);
const log = {
    error: (msg: string, err?: unknown) => console.error(chalk.red.bold(`❌ ${msg}:`), err instanceof Error ? err.message : err || ''),
    success: (msg: string) => console.log(chalk.green(`✅ ${msg}`)),
    info: (msg: string) => console.log(chalk.blue(msg))
};

const program = new Command()
    .name('saas-svelte')
    .description('CLI for SAAS Svelte components')
    .version('1.0.0');

program
    .command('init')
    .description('Create the component library structure')
    .action(async () => {
        log.info("Hi, let's set up SAAS Svelte for you!");

        const config = await inquirer.prompt([
            { type: 'input', name: 'componentsDir', message: 'Where should components be created?', default: './src/lib/saas' },
        ]);

        const spinner = ora('Setting up SAAS Svelte...').start();

        try {
            // 1. Create components directory ("component")
            await mkdirp(config.componentsDir);

            // 2. Write config file ("config")
            await writeJson(`${paths.config}.json`, config, { spaces: 2 });

            spinner.succeed(`Setup complete! Config and utils created.`);
        } catch (err) {
            spinner.fail('Setup failed');
            log.error('Error during setup', err);
            process.exit(1);
        }
    });

program
    .command('add <component>')
    .description('Add a new component')
    .action(async (componentName: string) => {
        const spinner = ora(`Adding component: ${componentName}`).start();

        try {
            const configResult = await explorer.search();
            if (!configResult) throw new Error('Project not initialised. Run `saas-svelte init` first.');

            const registry = await readJson(paths.registry);
            const component = registry.find((c: any) => c.name.toLowerCase() === componentName.toLowerCase());

            if (!component) throw new Error(`Component "${componentName}" not found in registry.`);

            const sourcePath = join(paths.templates, component.name);
            const destPath = join(configResult.config.componentsDir, component.name);

            if (!await pathExists(sourcePath)) throw new Error(`Component folder not found: ${sourcePath}`);

            if (await pathExists(destPath)) {
                const { overwrite } = await inquirer.prompt([{
                    type: 'confirm',
                    name: 'overwrite',
                    message: `Component ${component.name} already exists. Overwrite?`,
                    default: false
                }]);
                if (!overwrite) {
                    spinner.info('Skipped adding component');
                    return;
                }
            }

            await copy(sourcePath, destPath, { overwrite: true });
            spinner.succeed(`Added ${component.name} to ${destPath}`);
        } catch (err) {
            spinner.fail('Failed to add component');
            log.error(err instanceof Error ? err.message : 'Unknown error');
            process.exit(1);
        }
    });

program.parse();