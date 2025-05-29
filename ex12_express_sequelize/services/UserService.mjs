import createDebug from "debug";
import db from "./DatabaseService.mjs";
const debug = createDebug('ex10_express_sequelize:user-service');

export default class UserService {

    getAll = async () => {
        try {
            const resp = await db.sequelize.query('select * from users;');

            debug(resp);

            return {
                status: 'success',
                data: resp[0]
            };
        } catch (error) {
            return {
                status: 'error',
                data: error
            };
        }
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