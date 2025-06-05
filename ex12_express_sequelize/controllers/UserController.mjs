import UserService from '../services/UserService.mjs';
const userSrv = new UserService();
import createDebug from "debug";
const debug = createDebug('ex09_express:user-controller');

export default class UserController {

    getData = (req, res) => {
        debug('query', req.query.id);
        debug('params', req.params.id);
        const isSetQueryId = req.query.id;
        const isSetParamsId = req.params.id;

        if(isSetQueryId || isSetParamsId){
            this.getById(req, res);
        } else {
            this.getAll(req, res);
        }
    };

    getAll = async (req, res) => {
        res.send(await userSrv.getAll());
    };

    getById = async (req, res) => {
        const id = this.getId(req);
        res.send(await userSrv.getById(id));
    };

    create = async (req, res) => {
        const payload = req.body;

        // validation before call db service
        let valid = true;
        valid = valid && payload.login;
        valid = valid && payload.password;

        if(!valid) {
            res.status(400).send({
                error: 'Invalid format',
                payload
            });
            return;
        }

        try {
            res.send(await userSrv.create(payload));
        } catch (e) {
            res.status(500).send({error: 'Database error'});
        }
    };

    patch = async (req, res) => {
        const id = this.getId(req);
        const payload = req.body;

        // validation before call db service
        let valid = true;
        valid = valid && (payload.login || payload.password);

        if(!valid) {
            res.status(400).send({
                error: 'Invalid format',
                payload
            });
            return;
        }

        try {
            res.send(await userSrv.patch(id, payload));
        } catch (e) {
            res.status(500).send({error: 'Database error'});
        }
    };

    update = async (req, res) => {
        const id = this.getId(req);

        const payload = req.body;

        // validation before call db service
        let valid = true;
        valid = valid && payload.login;
        valid = valid && payload.password;

        if(!valid) {
            res.status(400).send({
                error: 'Invalid format',
                payload
            });
            return;
        }

        try {
            res.send(await userSrv.update(id, payload));
        } catch (e) {
            res.status(500).send({error: 'Database error'});
        }
    };

    delete = async (req, res) => {
        const id = this.getId(req);
        try {
            res.send(await userSrv.delete(id));
        } catch (e) {
            res.status(500).send({error: 'Database error'});
        }
    }

    getId = (req) => {
        let id = null;
        if(req.query.id) {
            id = req.query.id;
        }
        if(req.params.id) {
            id = req.params.id;
        }
        return id;
    }

}