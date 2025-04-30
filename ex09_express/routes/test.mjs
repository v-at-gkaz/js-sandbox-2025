import express from "express";

const testRouter = express.Router();

/* GET home page. */
testRouter.get('/', (req, res, next) => {
    res.render('test', {title: 'Express'});
});

export default testRouter;
