const Square = require('./square.js');

const mySq = new Square(2);

console.log(`Area = ${mySq.area()}`);

async function a(){
    return 'qwerty';
}

// WORK!
(async () => {
    const res = await a();
    console.log(res);
})()

// WORK!
a().then(res => {
    console.log(res);
});

// NOT WORK!
// const res = await a();
// console.log(res);