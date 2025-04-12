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
            const user = {
                id: (new Date()).getTime(),
                name: "UserNameFromPost"
            }
            const createdUser = db.add(user); // FIXME: получать данные о пользователе из запроса!
            if(createdUser){
                res.writeHead(201, {'Content-Type': 'application/json'})
                res.end(JSON.stringify(createdUser));
                return;
            };
            res.writeHead(500, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Something Went Wrong'}));
        break;
        case 'PUT':
            res.end("PUT DETECTED");
        break;
        case 'PATCH':
            res.end("PATCH DETECTED");
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