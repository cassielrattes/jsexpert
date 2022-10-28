
import { MongoClient } from 'mongodb';
import { createServer } from 'http';
import { promisify } from 'util';

async function dbConnect() {
    const client = new MongoClient("mongodb://localhost:27017");
    await client.connect();
    console.log("mongodb is connected");

    const db = client.db("comics");

    return {
        collections: {
            heroes: db.collection('heroes'),
        },
        client
    };
}

const { collections, client } = await dbConnect();

async function handler(request, response) {
    for await (const data of request) {
        try {
            const hero = JSON.parse(data);
            await collections.heroes.insertOne({
                ...hero,
                updatedAt: new Date().toISOString()
            });
            const heroes = await collections.heroes.find().toArray();
            response.writeHead(200);
            response.write(JSON.stringify(heroes));
        } catch (error) {
            console.log('error has happened', error);
            response.writeHead(500);
            response.write(JSON.stringify({ message: 'Internal server error!' }));
        } finally {
            response.end();
        }
    }

}
// await client.close();

/*
    curl -i localhost:3000 -X POST --data '{"name": "Batman", "age": "80"}'

    curl localhost:3000 -X POST --data '{"name": "Batman", "age": "80"}' | jq
*/

const server = createServer(handler)
    .listen(3000, () => console.log('running at 3000 and process', process.pid));

const onStop = async (signal) => {
    console.info(`\n${signal} signal received`);

    console.log('Closing http server');
    await promisify(server.close.bind(server))();
    console.log('http server has closed');
    // close true forca o encerramento
    await client.close();
    console.log('mongo connection closed');
    // zero e tudo certo, 1 e erro!
    process.exit(0);
};

// SIGINT - ctrl + c
// SIGINT - kill {pid}
['SIGINT', 'SIGTERM'].forEach(event => {
    process.on(event, onStop);
})


