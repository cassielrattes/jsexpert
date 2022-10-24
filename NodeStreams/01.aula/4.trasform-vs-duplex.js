import { Duplex, Transform } from 'stream';

let count = 0;
const server = new Duplex({
    objectMode: true, // faz nao precisar trabalhar com buffer => gasta mais memoria
    encoding: 'utf-8',
    read() {
        const everySecond = (intervalContext) => {
            if (count++ <= 5) {
                this.push(`My name is Erick${count}`);
                return;
            }
            clearInterval(intervalContext);
            this.push(null);
        };
        setInterval(function () { everySecond(this); });
    },
    // e como se fosse um objeto completamente diferente
    write(chunk, encoding, cb) {
        console.log(`{writable} saving`, chunk);
        cb();
    }
});
// provar que sao canais de comunicacao diferentes
// write aciona o writable do Duplex
server.write('[duplex] hey this is a writable! \n');

// on data loga o que rodou no .push do readable
// server.on('data', msg => console.log(`[readable] ${msg}`));

// o push deixa voce enviar mais dados
server.push(`[duplex] hey this is a also a readable \n`);

// server
//     .pipe(process.stdout);

const transformToUpperCase = Transform({
    objectMode: true,
    transform(chunk, encoding, cb) {
        cb(null, chunk.toUpperCase());
    }
});

// o transform e tambem um duplex, mas nao possui comunicacao independente
transformToUpperCase.write(`[transform] hello from write \n`);
// o push vai ignorar o que voce tem na funcao transform
transformToUpperCase.push(`[transform] hello from read \n`);

server
    .pipe(transformToUpperCase)
    // redireciona todos os dados de readable para writable da duplex
    .pipe(server);