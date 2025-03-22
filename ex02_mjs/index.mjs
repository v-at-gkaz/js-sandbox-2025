import {Square, q} from './square.mjs';

const mySq = new Square(2);

console.log(`Area = ${mySq.area()}`);
console.log(`q=${q}`);

async function a(){
    return 'qwerty';
}

// WORK!
const res = await a();
console.log(res);