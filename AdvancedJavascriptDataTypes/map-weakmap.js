const assert = require("assert");

const myMap = new Map();


myMap.set(1, 'one')
    .set('Erick', { text: 'two' })
    .set(true, () => 'hello');

const myMapWithConstructor = new Map([
    ['1', 'str1'],
    [1, 'num1'],
    [true, 'bool1']
]);

// console.log('myMap: ', myMap);
// console.log('myMap.get(1): ', myMap.get(1));

assert.deepStrictEqual(myMap.get(1), 'one');
assert.deepStrictEqual(myMap.get('Erick'), { text: 'two' });
assert.deepStrictEqual(myMap.get(true)(), 'hello');

// Em Objects a chave so pode ser string ou Symbol (number e coergido a string)

const onlyReferenceWorks = { id: 1 };
myMap.set(onlyReferenceWorks, { name: 'ErickWendel' });
// console.log('get', myMap.get(onlyReferenceWorks));

assert.deepStrictEqual(myMap.get({ id: 1 }), undefined);
assert.deepStrictEqual(myMap.get(onlyReferenceWorks), { name: 'ErickWendel' });

// utilitarios
// - No object seria Object.keys({ a: 1 }).length
assert.deepStrictEqual(myMap.size, 4);

// para verificar se um item existe no objeto
// item.key = se nao existe = undefined
// if() = coersao implicita para boolean e retorna false
// O jeito certo em Object e ({ name: 'ErickWendel' }).hasOwnProperty('name')
assert.ok(myMap.has(onlyReferenceWorks));

// para remover um item do objeto
// delete item.id
// imperformatico para o javascript
assert.ok(myMap.delete(onlyReferenceWorks));


// nao da para iterar em Objects diretamente
// tem que transformar com o Object.entries(item)
assert.deepStrictEqual(JSON.stringify([...myMap]), JSON.stringify([[1, "one"], ["Erick", { "text": "two" }], [true, () => { }]]));

// for (const [key, value] of myMap) {
//     console.log({ key, value });
// }

// Object e inseguro, pois dependendo do nome da chav, pode substituir algum comportamento
({}).toString() === '[object Object]';
({ toString: () => 'Hey' }).toString() === 'Hey';

// qualquer chave pode colidir, com as propriedades herdadas de objects, como
// constructor, toString, valueOf e etc

const actor = {
    name: 'Cassiel',
    toString: 'Queen: Cassiel'
};

myMap.set(actor);

assert.ok(myMap.has(actor));
assert.throws(() => myMap.get(actor).toString, TypeError);

// Nao da para limbar um obj sem reassina-lo
myMap.clear();
assert.deepStrictEqual([...myMap.keys()], []);

// --------- WeakMap

// Pode ser coletado apos perder as referencias
// usado em casos bem especificos

// tem a maioria dos beneficios do Map
// MAS: nao e iteravel
// so chaves de referencia e que voce ja conheca
// mais leve e preve leak de memoria, porque depois que as instancias
// saem da memoria, tudo e limpo

const weakMap = new WeakMap();

const hero = { name: 'Flash' };
weakMap.set(hero);
weakMap.get(hero);
weakMap.delete(hero);
weakMap.has(hero);