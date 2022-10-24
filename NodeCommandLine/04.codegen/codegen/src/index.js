#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { createFiles } from "./createFiles.js";
import { createLayersIfNotExists } from "./createLayers.js";

const { argv: { componentName } } = yargs(hideBin(process.argv))
    .command('skeleton', 'Create project skeleton', (builder) => {
        builder.option('component-name', {
            alias: 'c',
            demandOption: true,
            describe: 'Component name',
            type: 'array'
        })
            .example('skeleton --component-name product', 'Creates a project with a single domain')
            .example('skeleton -c product -c person -c colors', 'Creates a project with a list of domain')
            .epilog('copyright 2022 - Cassiel Rattes Cortez');
    });

const env = process.env.NODE_ENV;

const defaultFolder = env === "dev" ? 'tmp' : 'src';

const layers = ['repository', 'service', 'factory'].sort();

const config = {
    layers,
    defaultMainFolder: defaultFolder,
    mainPath: '.'
};

createLayersIfNotExists(config);

const pendingPromises = [];
for (const domain of componentName) {
    const result = createFiles({
        ...config,
        componentName: domain
    });

    pendingPromises.push(result);
}

await Promise.all(pendingPromises);