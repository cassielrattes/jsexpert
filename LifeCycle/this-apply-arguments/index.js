'use strict';

const { watch, promises: { readFile } } = require('fs');

class File {
    watch(event, filename) {
        console.log('this', this);
        console.log('arguments', Array.prototype.slice.call(arguments));

        this.showContent(filename);
    }

    async showContent(filename) {
        console.log((await readFile(filename)).toString());
    }
}

const file = new File();

// Ignora o this da classe File e herda o this do watch
// watch(__filename, file.watch)

// alternativa para nao herdar o this da funcao (NAO É A MELHOR ALTERNATIVA)
// watch(__filename, (event, filename) => file.watch(event, filename))

// Podemos deixar explicito qual o contexto que a funcao deve seguir
// O bind retorna uma funcao com o this que se mantem de file, ignorando o do watch
watch(__filename, file.watch.bind(file));

// a diferenca entre um e outro é que o .call passa uma lista de argumentos e o .apply passa os argumentos como array
// file.watch.call({ showContent: () => console.log('call: hello showContent!') }, null, __filename);
// file.watch.apply({ showContent: () => console.log('apply: hello showContent!') }, [null, __filename]);