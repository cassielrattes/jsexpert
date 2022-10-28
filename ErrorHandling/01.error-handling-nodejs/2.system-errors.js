
import timers from 'timers/promises';
const timeoutAsync = timers.setTimeout;

// const results = ["1", "2"].map(async (item) => {
//     console.log('starting process');
//     await timeoutAsync(100);
//     console.log(item);
//     console.log(await Promise.resolve('timeout order!'));
//     await timeoutAsync(100);
//     console.count('debug');

//     return parseInt(item) * 2;
// });

// console.log(await Promise.all(results));

setTimeout(async () => {
    console.log('starting process');
    await timeoutAsync(100);
    console.count('debug');
    console.log(await Promise.resolve('timeout order!'));
    await timeoutAsync(100);
    console.count('debug');

    await Promise.reject('promise rejected on error timeout!');
}, 1000);

const throwError = (msg) => {
    throw new Error(msg);
};

try {
    console.log('hello');
    console.log('world');
    throwError('error dentro do trycatch');
} catch (error) {
    console.log('pego no catch!', error.message);
} finally {
    console.log('executed after all');
}

process.on('unhandledRejection', (e) => {
    console.log('unhandledRejection', e.message || e);
});

process.on('uncaughtException', (e) => {
    console.log('uncaughtException', e.message || e);
    process.exit(1);
});

Promise.reject('promise rejected!');

// se o promise.reject estiver dentro de um outro contexto
// ele cai no unhandledRejection
setTimeout(async () => {
    await Promise.reject('promise async await rejected!');
});

// mas se ele estiver no contexto global ele cai no uncaughtException
// await Promise.reject('promise async await rejected!');
// uncaughtException
setTimeout(async () => {
    throwError('error fora do catch');
});

