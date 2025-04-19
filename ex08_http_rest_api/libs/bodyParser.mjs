export default function bodyParser(contentType, body) {

    const parsedContentType = contentType.split(';');
    const testContentType = parsedContentType[0];
    console.log(`>>>>>> contentType = |${parsedContentType[0]}|`);

    switch(testContentType){
        case 'application/x-www-form-urlencoded':
            return body.split('&').map((controlDraft)=>{
                const parsedControlDraft = controlDraft.split('=');
                return {
                    name: parsedControlDraft[0],
                    value: parsedControlDraft[1]
                }
            });
        case 'text/plain':
            return body.split('\r\n').map((controlDraft)=>{
                const parsedControlDraft = controlDraft.split('=');
                return {
                    name: parsedControlDraft[0],
                    value: parsedControlDraft[1]
                }
            }).filter((itm)=>{
                return itm.name.length;
            });
        case 'application/json':
            try {
                const parsedBody = JSON.parse(body);
                return parsedBody;
            } catch(e) {
                return false;
            }
        case 'multipart/form-data':
            // FIXME: рассмотреть на следующем занятии !!!
            return false;
        
        default:
            return false;
    }
}