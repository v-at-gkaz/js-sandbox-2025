import http from 'node:http';
import * as dotenv from 'dotenv';
import { userController as userCtrl } from './user/userController.mjs';
import { DataSource } from './db/db.mjs';
dotenv.config();
const PORT = +process.env.APP_PORT || 3000;

import fs from 'node:fs';
import {join, dirname} from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new DataSource(join(__dirname, 'database.json'));

const serverHandler = (req, res) => {

    const {method, url, headers} = req;
    console.log(`method = ${method}`);
    console.log(`url = ${url}`);

    if(url.startsWith('/user')){
        userCtrl(req, res, db);
    } else {
        res.writeHead(404);
        res.end("PAGE NOT FOUND");
    }
};

const server = http.createServer(serverHandler);

server.listen(PORT, ()=>{
    console.log(`Server listen on port ${PORT}`);
});