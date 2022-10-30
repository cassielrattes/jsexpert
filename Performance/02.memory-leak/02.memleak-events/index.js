import { createServer } from 'http';

import Event from 'events';
import { randomBytes } from 'crypto';


const myEvent = new Event();

function getBytes() {
    return randomBytes(10000);
}

function onData() {
    getBytes();
    const items = [];
    setInterval(function myInterval() { items.push(Date.now()); });
}


createServer(function handler(request, response) {
    myEvent.on('data', onData);
    myEvent.emit('data', Date.now());
    response.end();
}).listen(3000, () => console.log('running at 3000'));