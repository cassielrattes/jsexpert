// https://static.wikia.nocookie.net/mortal-kombat-brasil/images/e/e2/Mortal_Kombat_X_IOS_Render_Freddy_Krueger_.png/revision/latest?cb=20171206142923&path-prefix=pt-br
// https://cdn11.bigcommerce.com/s-526eec/images/stencil/1280x1280/products/138/856/photo_Freddie_Kruger-remove_bg.__80062.1598166298.png?c=2



// background
// https://w.wallhaven.cc/full/4l/wallhaven-4lmljr.jpg
// https://static-wp-tor15-prd.torcedores.com/wp-content/uploads/2022/09/corinthians-bandeira-certa.jpg


import { createServer } from 'http';
import { parse, fileURLToPath } from 'url';
import { Worker } from 'worker_threads';
import { dirname } from 'path';

import sharp from 'sharp';


const currentFolder = dirname(fileURLToPath(import.meta.url));
const workerFileName = 'worker.js';
async function JoinImages(images) {
    return new Promise((resolve, reject) => {
        const worker = new Worker(`${currentFolder}/${workerFileName}`);
        worker.postMessage(images);
        worker.once('message', resolve);
        worker.once('error', reject);
        worker.once('exit', code => {
            if (code !== 0) {
                return reject(new Error(`Thread ${worker.threadId} stopped with exit code ${code}`));
            }
            console.log(`the thread ${worker.threadId} exited!`);
        });
    });
}

async function handler(request, response) {
    if (request.url.includes('joinImages')) {
        const { query: { img, background } } = parse(request.url, true);
        const imageBase64 = await JoinImages({
            image: img,
            background
        });

        response.writeHead(200, {
            'Content-Type': 'text/html'
        });

        response.end(`<img style="width:100%; height:100%" src="data:image/jpeg;base64,${imageBase64}" />`);
        return;
    }


    return response.end('OK');
}

createServer(handler)
    .listen(3000, () => console.log(`Server running at http://localhost:3000 and pid ${process.pid}`));

