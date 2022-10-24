import { Readable, Writable } from 'stream';

// fonte de dados
const readable = Readable({
    read() {
        this.push('Hello World 1');
        this.push('Hello World 2');
        this.push('Hello World 3');

        // informa que os dados acabaram
        this.push(null);
    }

});

// saida de dados
const writable = Writable({
    write(chunk, encoding, cb) {
        console.log("msg", chunk.toString());

        cb();
    }
});

readable
    // writable e sempre a saida imprimir salvar ou ignorar
    .pipe(writable);
    // .pipe(process.stdout);