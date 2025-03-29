// импорт стандартного модуля node:process
import process from 'node:process';
// альтернативный способ импорта только stdin, stdout из node:process
// import {stdin, stdout} from 'node:process';

import * as dotenv from 'dotenv';
dotenv.config();

const dbHost = process.env.DB_HOST || 'localhost';

console.log(`DB_HOST = |${dbHost}|`);