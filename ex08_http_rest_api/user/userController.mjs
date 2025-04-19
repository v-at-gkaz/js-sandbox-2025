import bodyParser from "../libs/bodyParser.mjs";

export const userController = (req, res, db) => {

    const {method, url, headers, query} = req;

    switch(method) {
        case 'GET':
            let parsedQueryParams = [];
            const parsedUrl = url.split('?')[1];
            if(parsedUrl && parsedUrl.length){
                parsedQueryParams = parsedUrl.split('&').map(keyValue => {
                    const parsedKeyValue = keyValue.split('=');
                    return {
                        key: parsedKeyValue[0],
                        val: parsedKeyValue[1]
                    }
                });
                console.log('parsedQueryParams', parsedQueryParams);
            }

            const foundId = parsedQueryParams.find(itm=>{
                return itm.key === 'id';
            });

            if(foundId) {
                const oneItem = db.getOne(foundId.val);
                if(oneItem) {
                    res.writeHead(200, {'Content-Type': 'application/json'})
                    res.end(JSON.stringify(oneItem));
                    return;   
                }
            } else {
                const data = db.getAll();
                if(data) {
                    res.writeHead(200, {'Content-Type': 'application/json'})
                    res.end(JSON.stringify(data));
                    return;    
                }
            }
            res.writeHead(500, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Something Went Wrong'}));
            
        break;
        case 'POST':
            const contentType = req.headers['content-type'];

            let data = '';
            req.on('data', (chunk) => {
                console.log(`>>>>>> chunk detected! length: ${chunk.length}`);
                if(chunk) {
                    data+=chunk;
                }
            });

            req.on('end', () => {
                console.log(`>>>>>> data detected! length: ${data.length}`);
                if(data.length) {

                    console.log(`>>>>>> data: |${data}|`);

                    const parsedBody = bodyParser(contentType, data);

                    if(parsedBody) {

                        console.log('>>> !!!! >>> parsedBody', parsedBody);
                        const user = {...parsedBody, id: (new Date()).getTime()};

                        const createdUser = db.add(user);
                        if(createdUser){
                            res.writeHead(201, {'Content-Type': 'application/json'})
                            res.end(JSON.stringify(createdUser));
                            return;
                        };
                        res.writeHead(500, {'Content-Type': 'application/json'})
                        res.end(JSON.stringify({message: 'Something Went Wrong'}));

                    } else {
                        res.writeHead(500, {'Content-Type': 'application/json'})
                        res.end(JSON.stringify({error: 'Unknown Content-Type'}));
                    }

                } else {
                    res.writeHead(500, {'Content-Type': 'application/json'})
                    res.end(JSON.stringify({error: 'body is empty'}));
                }
            });
        break;
        case 'PUT':
        case 'PATCH':

            let parsedQueryParamsEdit = [];
            const parsedUrlEdit = url.split('?')[1];
            if(parsedUrlEdit && parsedUrlEdit.length){
                parsedQueryParamsEdit = parsedUrlEdit.split('&').map(keyValue => {
                    const parsedKeyValue = keyValue.split('=');
                    return {
                        key: parsedKeyValue[0],
                        val: parsedKeyValue[1]
                    }
                });
            }

            const foundEditId = parsedQueryParamsEdit.find(itm=>{
                return itm.key === 'id';
            });


            const contentType2 = req.headers['content-type'];
            let data2 = '';
            req.on('data', (chunk) => {
                if(chunk) {
                    data2+=chunk;
                }
            });

            req.on('end', () => {
                if(data2.length) {
                    const parsedBody = bodyParser(contentType2, data2);

                    if(parsedBody && foundEditId) {
                        const userId = +foundEditId.val;
                        const user = {...parsedBody, id: userId};
                        const updatedUser = db.edit(user, userId);

                        console.log('updatedUser', updatedUser);

                        if(updatedUser){
                            res.writeHead(200, {'Content-Type': 'application/json'})
                            res.end(JSON.stringify(updatedUser));
                            return;
                        };
                        res.writeHead(500, {'Content-Type': 'application/json'})
                        res.end(JSON.stringify({message: 'Something Went Wrong'}));

                    } else {
                        res.writeHead(500, {'Content-Type': 'application/json'})
                        res.end(JSON.stringify({error: 'Unknown Content-Type'}));
                    }

                } else {
                    res.writeHead(500, {'Content-Type': 'application/json'})
                    res.end(JSON.stringify({error: 'body is empty'}));
                }
            });
        break;
        case 'DELETE':
            let parsedQueryParamsDel = [];
            const parsedUrlDel = url.split('?')[1];
            if(parsedUrlDel && parsedUrlDel.length){
                parsedQueryParamsDel = parsedUrlDel.split('&').map(keyValue => {
                    const parsedKeyValue = keyValue.split('=');
                    return {
                        key: parsedKeyValue[0],
                        val: parsedKeyValue[1]
                    }
                });
            }

            const foundDelId = parsedQueryParamsDel.find(itm=>{
                return itm.key === 'id';
            });

            if(foundDelId) {
                if(db.delete(foundDelId.val)) {
                    res.writeHead(204)
                    res.end(null);
                    return;   
                }
            }
            res.writeHead(500, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Something Went Wrong'}));
        break;
        default:
        res.writeHead(404);
        res.end("UNKNOWN METHOD");        
    }

};