const pdf = require("pdf-parse");

// O objetivo do Fluent API é executar tarefas
// como um pipeline, step by step
// e ao fim, chama o build, MUITO similar ao padrão Builder
// e a diferença que aqui é sobre processos, o Builder é sobre construção
// de objetos
class TextProcessorFluentAPI {
    // propriedade privada!
    #content;
    constructor(content) {
        this.#content = content;
    }

    extractPeopleData() {
        // ?<= fala que vai extrair os dados que virao depois desse grupo
        // [contratante|contratado] ou um ou outro, (e tem a flag no fim da expressao para pegar maiusculo e minusculo)
        // :\s{1} vai procura caracter literal do dois pontos seguido de um espaco
        // tudo acima fica dentro de um parenteses para falar "vamos pegar dai para frente"

        // (?!\s) negative look around, vai ignorar os contratantes do fim do documento (que tem so espaco a frente deles)

        // .*\n pega qualquer coisa ate a primeira quebra de linha \n
        // .*? non greety, esse ? faz com que ele pare na primeira recorrencia, assim ele evita ficar em loop

        // $ informar que a pesquisa acaba no final da linha
        // g -> global
        // m -> multiline
        // i -> case insensitive

        const matchPerson = /(?<=[contratante|contratado]:\s{1})(?!\s)(.*\n.*?)$/gmi;
        // faz o match para encontrar a string inteira que contem os dados que precisamos
        const onlyPerson = this.#content.match(matchPerson);
        this.#content = onlyPerson;

        return this;
    }

    build() {
        return this.#content;
    }
}

module.exports = TextProcessorFluentAPI;