import express from "express";

const usersRouter = express.Router();

/* GET users listing. */
usersRouter.get('/', (req, res, next) => {
    res.send('respond with a resource');
});

usersRouter.post('/create', (req, res, next) => {
    res.send('post detected!');
});

export default usersRouter;
