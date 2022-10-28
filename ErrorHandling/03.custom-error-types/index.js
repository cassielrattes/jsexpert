import http from 'http';
import BusinessError from "./errors/businessError.js";
import { statusCodes } from "./util/httpCodes.js";

function validateHero(hero) {
    if (Reflect.has(hero, 'connectionError')) {
        // erro generico para trazer erro inesxperado
        throw new Error('Error connecting to DB!');
    }

    if (hero.age < 20) throw new BusinessError("Age must be higher then 20!");

    if (hero.name?.length < 4) throw new BusinessError("Name length must be higher then 4!");

    // simulando um outro erro, por exemplo de banco de dados

}

async function handler(request, response) {
    for await (const data of request) {
        try {
            const hero = JSON.parse(data);
            validateHero(hero);

            response.writeHead(statusCodes.OK);
            response.end();
        } catch (error) {
            if (error instanceof BusinessError) {
                response.writeHead(statusCodes.BAD_REQUEST);
                response.end(error.message);
                continue;
            }
            response.writeHead(statusCodes.INTERNAL_SERVER_ERROR);
            response.end();
        }
    }
}

http.createServer(handler).listen(3000, () => console.log({ processId: process.pid, port: 3000 }));

/*
curl -i localhost:3000 -X POST -d '{"name": "Vingador", "age": 80}'
*/