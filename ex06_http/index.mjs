import http from 'node:http';
import * as dotenv from 'dotenv';
dotenv.config();
const PORT = +process.env.APP_PORT || 3000;

const serverHandler = (req, res) => {

    const {method, url, headers} = req;
    console.log(`method = ${method}`);
    console.log(`url = ${url}`);

    switch(url){
        case '/api/contacts':
            switch(method) {
                case 'GET':
                    res.end("GET DETECTED");
                break;
                case 'POST':
                    res.end("POST DETECTED");
                break;
                case 'PATCH':
                    res.end("PATCH DETECTED");
                break;
                case 'DELETE':
                    res.end("DELETE DETECTED");
                break;
                default:
                res.writeHead(404);
                res.end("UNKNOWN METHOD");        
            }
        break;
        default:
            res.writeHead(404);
            res.end("PAGE NOT FOUND");
    }
};

const server = http.createServer(serverHandler);

server.listen(PORT, ()=>{
    console.log(`Server listen on port ${PORT}`);
});