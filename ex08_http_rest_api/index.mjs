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
    } else if(url.startsWith('/forms/one')){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(`
        <html>
            <head>
                <title>Demo form 1</title>
            </head>
            <body>
            <h1>Demo form 1 (application/x-www-form-urlencoded)</h1>
                <form method="post" action="/user" enctype="application/x-www-form-urlencoded">
                    <label for="user-name">Enter your name:</label>
                    <input id="user-name" name="user-name" type="text">
                    <br />
                    <label for="user-pass">Enter your password:</label>
                    <input id="user-pass" name="user-pass" type="password">
                    <br />
                    <input id="files" name="files" type="file">
                    <br />
                    <input type="submit" value="send">
                </form>
            </body>
        </html>
        `);
    } else if(url.startsWith('/forms/two')){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(`
        <html>
            <head>
                <title>Demo form 2</title>
            </head>
            <body>
            <h1>Demo form 2 (text/plain)</h1>
                <form method="post" action="/user" enctype="text/plain">
                    <label for="user-name">Enter your name:</label>
                    <input id="user-name" name="user-name" type="text">
                    <br />
                    <label for="user-pass">Enter your password:</label>
                    <input id="user-pass" name="user-pass" type="password">
                    <br />
                    <input id="files" name="files" type="file">
                    <br />
                    <input type="submit" value="send">
                </form>
            </body>
        </html>
        `);
    } else if(url.startsWith('/forms/three')){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(`
        <html>
            <head>
                <title>Demo form 3</title>
            </head>
            <body>
            <h1>Demo form 3 (multipart/form-data)</h1>
                <form method="post" action="/user" enctype="multipart/form-data">
                    <label for="user-name">Enter your name:</label>
                    <input id="user-name" name="user-name" type="text">
                    <br />
                    <label for="user-pass">Enter your password:</label>
                    <input id="user-pass" name="user-pass" type="password">
                    <br />
                    <input id="files" name="files" type="file">
                    <br />
                    <input type="submit" value="send">
                </form>
            </body>
        </html>
        `);
    } else {
        res.writeHead(404);
        res.end("PAGE NOT FOUND");
    }
};

const server = http.createServer(serverHandler);

server.listen(PORT, ()=>{
    console.log(`Server listen on port ${PORT}`);
});