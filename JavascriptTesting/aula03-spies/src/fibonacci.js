class Fibonacci {
    *execute(input, current = 0, next = 1) {
        // [0] input = 5, current = 0, next = 1
        // [1] input = 4, current = 1, next = 1
        // [2] input = 3, current = 1, next = 2
        // [3] input = 2, current = 2, next = 3
        // [4] input = 1, current = 3, next = 5
        // [5] input = 0 => PARA
        if (input === 0) {
            return 0;
        }

        // retorna o valor
        yield current;

        // delega a funcao, mas nao retorna valor
        yield* this.execute(input - 1, next, current + next);

    }
}

module.exports = Fibonacci;