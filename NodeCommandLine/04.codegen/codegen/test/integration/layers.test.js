import {
    expect,
    describe,
    test,
    jest,
    beforeEach,
    beforeAll,
    afterAll
} from '@jest/globals';

import { tmpdir } from 'os';
import fsPromises from 'fs/promises';
import { join } from 'path';

import { createLayersIfNotExists } from './../../src/createLayers.js';

async function getFolders({ mainPath, defaultMainFolder }) {
    return await fsPromises.readdir(join(mainPath, defaultMainFolder));
}


describe('#Integration - Layers - Folder Structure', () => {
    const config = {
        defaultMainFolder: 'src',
        mainPath: '',
        layers: ['service', 'factory', 'repository'].sort()
    };

    beforeAll(async () => {
        config.mainPath = await fsPromises.mkdtemp(join(tmpdir(), 'skeleton-'));
    });

    beforeEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });

    afterAll(async () => {
        await fsPromises.rm(tmpDirectory, { recursive: true });
    });


    test('Should not create folders if it exists', async () => {
        const beforeRun = await fsPromises.readdir(config.mainPath);

        await createLayersIfNotExists(config);
        const afterRun = await getFolders(config);

        expect(beforeRun).not.toStrictEqual(afterRun);
        expect(afterRun).toEqual(config.layers);
    });

    test('Should create folders if it doesnt exists', async () => {
        const beforeRun = await getFolders(config);
        await createLayersIfNotExists(config);
        const afterRun = await getFolders(config);

        expect(afterRun).toEqual(beforeRun);
    });

});

