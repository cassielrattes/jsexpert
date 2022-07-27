const assert = require("assert");

const arr1 = ['0', '1', '2'];
const arr2 = ['2', '0', '3'];
const arr3 = arr1.concat(arr2);

assert.deepStrictEqual(arr3.sort(), ['0', '0', '1', '2', '2', '3']);

const set = new Set();

arr1.map(item => set.add(item));
arr2.map(item => set.add(item));

// console.log('Set with add item per item', set);
assert.deepStrictEqual(Array.from(set), ['0', '1', '2', '3']);

assert.deepStrictEqual(Array.from(new Set([...arr1, ...arr2])), ['0', '1', '2', '3']);

// console.log('set.keys', set.keys());
// console.log('set.values', set.values()); // so existe por conta do Map

// no array comum, para saber se um item existe
// [].indexOf('1') !== -1 ou [0].includes(0)
assert.ok(set.has('3'));

// mesma teoria do Map, mas voce sempre trabalha com a lista toda
// nao tem get, entao voce pode saber se o item esta ou nao no array e e isso.
// na documentacao tem exemplos sobre como fazer uma interceptacao, saber o que tem em uma lista ou nao

// tem nos dois arrays

const users01 = new Set([
    'erick',
    'mariazinha',
    'xuxa da silva'
]);

const users02 = new Set([
    'joaozinho',
    'erick',
    'julio'
]);

const intersection = new Set([...users01].filter(user => users02.has(user)));
assert.deepStrictEqual(Array.from(intersection), ['erick']);

const difference = new Set([...users01].filter(user => !users02.has(user)));
assert.deepStrictEqual(Array.from(difference), ['mariazinha', 'xuxa da silva']);

// weakset

// mesma ideia do WeakMap
// nao e enumeravel (iteravel)
// so trabalha com chaves como referencia
// so tem metodos simples

const user = { id: 123 };
const user2 = { id: 321 };

const weakset = new WeakSet([user]);

weakset.add(user2);
weakset.delete(user);
weakset.has(user);

