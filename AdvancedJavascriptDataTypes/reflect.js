'use strict';

const assert = require("assert");

// garantir semantica e seguranca em objetos


const myObj = {
    add(myValue) {
        return this.arg1 + this.arg2 + myValue;
    }
};

// Function.prototype.apply = () => { throw new TypeError('Eita!'); };
// myObj.add.apply = function () { throw new Error('Vixxxx!'); };

assert.deepStrictEqual(myObj.add.apply({ arg1: 10, arg2: 20 }, [100]), 130);

// um problema que pode acontecer (raro)
// Function.prototype.apply = () => { throw new TypeError('Eita!'); };

// essa aqui pode acontecer
myObj.add.apply = function () { throw new TypeError('Vixxxx!'); };

assert.throws(() => myObj.add.apply({}, []), {
    name: "TypeError",
    message: "Vixxxx!"
});

// usando reflet

const result = Reflect.apply(myObj.add, { arg1: 40, arg2: 20 }, [200]);
assert.deepStrictEqual(result, 260);

// ------- apply

// ---- defineProperty

// questoes semanticas
function MyDate() { }

// feio para Kct, tudo e Object, mas Object adicionando prop para uma function?
Object.defineProperty(MyDate, 'withObject', { value: () => 'Hey There' });

// agora faz mais sentido
Reflect.defineProperty(MyDate, 'withReflection', { value: () => 'Hey Dude' });

assert.deepStrictEqual(MyDate.withObject(), 'Hey There');
assert.deepStrictEqual(MyDate.withReflection(), 'Hey Dude');

// ---- defineProperty


// ---- deleteProperty

const withDelete = { user: 'Erick Wendel' };

// imperformatico e tem que evitar
delete withDelete.user;

assert.deepStrictEqual(withDelete.hasOwnProperty('user'), false);

const withReflection = { user: '`Xuxa da Silva`' };
Reflect.deleteProperty(withReflection, 'user');
assert.deepStrictEqual(withDelete.hasOwnProperty('user'), false);

// ---- deleteProperty


// ---- get

// deveriamos fazer um get somente em instacia de referencia

assert.deepStrictEqual(1['userName'], undefined);

// com reflection, uma excecao e lancada
assert.throws(() => Reflect.get(1, "userName"), TypeError);

// ---- get

// ---- has

assert.ok('superman' in { superman: '' });
assert.ok(Reflect.has({ batman: '' }, "batman"));

// ---- has

// ---- ownKeys
const user = Symbol('user');

const databaseUser = {
    id: 1,
    [Symbol.for('password')]: 123,
    [user]: 'erickwendel'
};

// com os metodos de object, temos que fazer 2 requisicoes
const objectKeys = [
    ...Object.getOwnPropertyNames(databaseUser),
    ...Object.getOwnPropertySymbols(databaseUser),
];

assert.deepStrictEqual(objectKeys, ['id', Symbol.for('password'), user]);

// com reflection, so um metodo
assert.deepStrictEqual(Reflect.ownKeys(databaseUser), ['id', Symbol.for('password'), user]);

// ---- ownKeys
