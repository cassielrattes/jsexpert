import { createServer } from 'http';
import { randomUUID } from 'crypto';

import { pipeline } from 'stream/promises';
import { createWriteStream } from 'fs';

async function handler(request, response) {
    const fileName = `file-${randomUUID()}.csv`;
    await pipeline(
        request,
        createWriteStream(fileName)
    );

    response.end('upload with success');
}

createServer(handler)
    .listen(3000, () => console.log(`Server running at http://localhost:3000 and pid ${process.pid}`));
