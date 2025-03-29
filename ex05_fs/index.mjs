import * as dotenv from 'dotenv';
dotenv.config();
// импорт стандартного модуля node:fs
import fs from 'node:fs';
import {join, dirname} from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(`DEBUG: __filename=${__filename}, __dirname=${__dirname}`);

const dbFileDir = process.env.DB_FILE_DIR 
? join(__dirname, process.env.DB_FILE_DIR) 
: join(__dirname, 'tmp', 'db');

const dbFile = join(dbFileDir, 'db.json');

console.log(`DEBUG: Current dbFileDir ${dbFileDir}`);
console.log('exist? ', fs.existsSync(dbFileDir));

let db = [];

try {
    if(!fs.existsSync(dbFileDir)){
        fs.mkdirSync(dbFileDir, {recursive: true});
    }

    if(!fs.existsSync(dbFile)){
        fs.writeFileSync(dbFile, JSON.stringify(db));
    }

    if(fs.existsSync(dbFile)){
        db = JSON.parse(fs.readFileSync(dbFile));
        db.push({
            name: 'ivan',
            age: 15
        });
        db.push({
            name: 'maria',
            age: 17
        });
        fs.writeFileSync(dbFile, JSON.stringify(db));
    }

    fs.copyFileSync(dbFile, dbFile + '.baskup');
    fs.unlinkSync(dbFile);

} catch(e) {
    console.error('Error:', e);
}
