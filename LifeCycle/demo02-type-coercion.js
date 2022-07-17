true + 2;
// 3

true - 2;
// -1

'21' + true;
// '21true'

'21' - true;
// 20

9999999999999999;
// 10000000000000000

0.1 + 0.2 === 0.3;
// false

3 > 2;
// true

2 > 1;
// true

3 > 2 > 1;
// false

'21' - - 1;
// 22

'1' == 1;
// true

'1' === 1;
// false

3 > 2 >= 1;
// true

'B' + 'a' + + 'a' + 'a';
// 'BaNaNa'

// ==================

console.assert(String(123) === '123', 'Explicit convertion to string');
console.assert(123 + '' === '123', 'Implicit convertion to string');
console.assert(('hello' || 123) === 'hello', "|| returns the first element!");
console.assert(('hello' && 123) === 123, "&& returns the last element!");

// ==================

const item = {
    name: 'Cassiel',
    age: 19,
    // string: 1 se nao for primitivo, chamo o valueOf
    toString() {
        return `Name: ${this.name}, Age: ${this.age}`;
    },
    // number: 1 se nao for primitivo, chamo o toString
    valueOf() {
        return { hey: 'dude' };
        // return 007;
    },
    // ele tem prioridade na parada!
    [Symbol.toPrimitive](coercionType) {
        console.log('Trying to convert to', coercionType);
        const types = {
            string: JSON.stringify(this),
            number: '0007'
        };

        return types[coercionType] || types.string;
    }
};

// console.log('toString', String(item));
// // vai retornar NaN pois o toString retornou string
// console.log('valueOf', Number(item));
// console.log('String', String(item));
// console.log('Number', Number(item));
// // chama a conversao default
// console.log('Date', new Date(item));

console.assert(item + 0 === '{"name":"Cassiel","age":19}0');

// console.log('!!item is true', !!item);
console.assert(!!item);

// console.log('string.concat', 'Ae'.concat(item));
console.assert('Ae'.concat(item) === 'Ae{"name":"Cassiel","age":19}');

// console.log('Implicit + Explicit coercion (using ==)', item == String(item));
console.assert(item == String(item));

const item2 = { ...item, name: 'Zezin', age: 20 };
// console.log('New Object', item2);
console.assert(item2.name === 'Zezin' && item2.age === 20);