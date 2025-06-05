import createDebug from "debug";
import db from "./DatabaseService.mjs";
const debug = createDebug('ex10_express_sequelize:user-service');

export default class UserService {

    getAll = async () => {
        try {
            // const resp = await db.sequelize.query('select * from users;');
            const resp = await db.User.findAll();

            // debug(resp);

            return {
                status: 'success',
                data: resp
            };
        } catch (error) {
            return {
                status: 'error',
                data: error
            };
        }
    };

    getById = async (id) => {
        try {
            const resp = await db.User.findOne({
                where: {id}
            });

            return {
                status: 'success',
                data: resp
            };
        } catch (error) {
            return {
                status: 'error',
                data: error
            };
        }
    };

    create = async (payload) => {
        try {
            const resp = await db.User.create(payload);

            return {
                status: 'created',
                data: resp
            };
        } catch (error) {
            return {
                status: 'error',
                data: error
            };
        }
    };

    patch = async (id, payload) => {

        const found = await db.User.findOne({
            where: {id}
        });

        for (const key in payload) {
            found[key] = payload[key];
        }

        try {
            await found.save();
            return {
                status: 'patched',
                data: found
            };
        } catch (error) {
            return {
                status: 'error',
                data: error
            };
        }
    };

    update = async (id, payload) => {
        try {
            await db.User.update(payload, {where: {id}});
            return {
                status: 'updated',
                data: {id}
            };
        } catch (error) {
            return {
                status: 'error',
                data: error
            };
        }
    };

    delete = async (id) => {
        try {
            await db.User.destroy({where: {id}});
            return {
                status: 'deleted',
                data: {id}
            };
        } catch (error) {
            return {
                status: 'error',
                data: error
            };
        }
    }

}