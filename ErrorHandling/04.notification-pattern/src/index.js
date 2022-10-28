import http from 'http';
import HeroEntity from "./heroEntity.js";
import { statusCodes } from "./util/httpCodes.js";


async function handler(request, response) {
    for await (const data of request) {
        try {
            const parsedData = JSON.parse(data);

            if (Reflect.has(parsedData, 'connectionError')) {
                // erro generico para trazer erro inesxperado
                throw new Error('Error connecting to DB!');
            }

            const hero = new HeroEntity(parsedData);

            if (!hero.isValid()) {
                response.writeHead(statusCodes.BAD_REQUEST);
                response.end(hero.notifications.join('\n'));
                continue;
            }

            // cadastra no banco de dados
            response.writeHead(statusCodes.OK);
            response.end();
        } catch (error) {
            response.writeHead(statusCodes.INTERNAL_SERVER_ERROR);
            response.end();
        }
    }
}

http.createServer(handler).listen(3000, () => console.log({ processId: process.pid, port: 3000 }));

/*
curl -i localhost:3000 -X POST -d '{"name": "Vingador", "age": 80}'
*/