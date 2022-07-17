const { deepStrictEqual } = require("assert");

// TIPO DE VALOR - TIPOS PRIMITIVOS (INT, BOOLEAN, UNDEFINED) GERAM UMA COPIA EM MEMORIA - ARMAZENADOS NO CALL STACK

let counter = 0;
let counter2 = counter;
counter2++;

// TIPO PRIMITIVO GERA UMA COPIA EM MEMORIA
deepStrictEqual(counter, 0);
deepStrictEqual(counter2, 1);


// TIPO DE REFERENCIA - GUARDA OS ENDEREÇO DE MEMORIA - ARMAZENADOS NO MEMORY HEAP

const item = { counter: 0 };
const item2 = item;

// TIPO DE REFERENCIA, COPIA O ENDERECO DE MEMORIA
// E APONTA PARA O MESMO LUGAR

item2.counter++;
deepStrictEqual(item, { counter: 1 });
item.counter++;
deepStrictEqual(item2, { counter: 2 });



