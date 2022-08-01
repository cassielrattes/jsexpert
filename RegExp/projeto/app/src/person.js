class Person {
    // (\w+):\s.*
    // $1,
    constructor([nome, nacionalidade, estadoCivil, documento, rua, numero, bairro, estado]) {
        // (\w+),
        // this.$1 = $1
        this.nome = nome;
        this.nacionalidade = nacionalidade;
        this.estadoCivil = estadoCivil;
        this.documento = documento;
        this.rua = rua;
        this.numero = numero;
        this.bairro = bairro;
        this.estado = estado;
    }
}

module.exports = Person;