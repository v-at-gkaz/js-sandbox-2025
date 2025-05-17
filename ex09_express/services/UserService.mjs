import createDebug from "debug";
const debug = createDebug('ex09_express:user-service');

export default class UserService {

    getAll = () => {
        // find all in db
        return [1,2,3];
    };

    getById = (id) => {
        // find one in db
        return `${id}`;
    };

    create = (payload) => {
        // add to db
        return {
            ok: true,
            status: 'create success',
            created: payload
        };
    };

    patch = (id, payload) => {
        return {
            ok: true,
            status: 'patch success',
            patchedFields: payload,
            id: +id
        };
    };

    update = (id, payload) => {
        return {
            ok: true,
            status: 'update success',
            updated: payload,
            id: +id
        };
    };

    delete = (id) => {
        debug('delete id', id);
        return {
            ok: true
        };
    }

}