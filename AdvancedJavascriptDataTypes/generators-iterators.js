const assert = require("assert");

function* calculation(arg1, arg2) {
    yield arg1 * arg2;
}


function* main() {
    yield "hello";
    yield "-";
    yield "World";
    yield* calculation(20, 10);
}

const generator = main();

// console.log(generator.next()); // { value: 'hello', done: false }
// console.log(generator.next()); // { value: '-', done: false }
// console.log(generator.next()); // { value: 'World', done: false }
// console.log(generator.next()); // { value: 200, done: false }
// console.log(generator.next()); // { value: undefined, done: true } - FIM


assert.deepStrictEqual(generator.next(), { value: 'hello', done: false });
assert.deepStrictEqual(generator.next(), { value: '-', done: false });
assert.deepStrictEqual(generator.next(), { value: 'World', done: false });
assert.deepStrictEqual(generator.next(), { value: 200, done: false });
assert.deepStrictEqual(generator.next(), { value: undefined, done: true });

// console.log("Array.from", Array.from(main()));
assert.deepStrictEqual(Array.from(main()), ['hello', '-', 'World', 200]);
assert.deepStrictEqual([...main()], ['hello', '-', 'World', 200]);

// ========= async iterators
const { readFile, stat, readdir } = require("fs/promises");

function* promisified() {
    yield readFile(__filename);
    yield Promise.resolve('Hey dude');
}

async function* systemInfo() {
    const file = await readFile(__filename);
    yield { file: file.toString() };

    const { size } = await stat(__filename);
    yield { size };

    const dir = await readdir(__dirname);
    yield { dir };
}

// Promise.all([...promisified()]).then(results => console.log("promisified", results));
// (async () => {
//     for await (const item of promisified()) {
//         console.log("for await", item.toString());
//     }
// })();

(async () => {
    for await (const item of systemInfo()) {
        console.log("systemInfo", item);
    }
})();
