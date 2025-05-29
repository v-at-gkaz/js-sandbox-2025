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

    getById = (req, res) => {
        const id = this.getId(req);
        res.send(userSrv.getById(id));
    };

    create = (req, res) => {
        const payload = req.body;

        // validation before call db service
        let valid = true;
        valid = valid && payload.name;
        valid = valid && payload.surname;

        if(!valid) {
            res.status(400).send({
                error: 'Invalid format',
                payload
            });
            return;
        }

        // validation service respone
        const serviceQueryResult = userSrv.create(payload);

        if(!serviceQueryResult.ok) {
            res.status(500).send({error: 'Database error'});
            return;
        }

        // response to client
        res.send(serviceQueryResult);
    };

    patch = (req, res) => {
        const id = this.getId(req);

        const payload = req.body;

        // validation before call db service
        let valid = true;
        valid = valid && (payload.name || payload.surname);

        if(!valid) {
            res.status(400).send({
                error: 'Invalid format',
                payload
            });
            return;
        }

        // validation service respone
        const serviceQueryResult = userSrv.patch(id, payload);

        if(!serviceQueryResult.ok) {
            res.status(500).send({error: 'Database error'});
            return;
        }

        // response to client
        res.send(serviceQueryResult);
    };

    update = (req, res) => {
        const id = this.getId(req);

        const payload = req.body;

        // validation before call db service
        let valid = true;
        valid = valid && payload.name;
        valid = valid && payload.surname;

        if(!valid) {
            res.status(400).send({
                error: 'Invalid format',
                payload
            });
            return;
        }

        // validation service respone
        const serviceQueryResult = userSrv.update(id, payload);

        if(!serviceQueryResult.ok) {
            res.status(500).send({error: 'Database error'});
            return;
        }

        // response to client
        res.send(serviceQueryResult);
    };

    delete = (req, res) => {
        const id = this.getId(req);

        // validation service respone
        const serviceQueryResult = userSrv.delete(id);

        if(!serviceQueryResult.ok) {
            res.status(500).send({error: 'Database error'});
            return;
        }

        res.status(204).send(null);
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