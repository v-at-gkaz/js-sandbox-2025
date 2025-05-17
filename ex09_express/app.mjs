import createError from "http-errors";
import express from "express";
import path from "node:path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import testRouter from "./routes/test.mjs";
import usersRouter from "./routes/users.mjs";

import UserController from "./controllers/UserController.mjs";

const userController = new UserController();

const app = express();

const __dirname = import.meta.dirname;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/test', testRouter);
app.use('/users', usersRouter);

app.get('/user', userController.getData);
app.get('/user/:id', userController.getData);
app.post('/user', userController.create);
app.put('/user', userController.update);
app.put('/user/:id', userController.update);
app.patch('/user', userController.patch);
app.patch('/user/:id', userController.patch);
app.delete('/user', userController.delete);
app.delete('/user/:id', userController.delete);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

export default app;
