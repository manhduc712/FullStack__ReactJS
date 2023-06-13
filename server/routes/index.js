const userRouter = require('./user');
const { notFound, erroHandler } = require('../middlewares/erroHandler')
const initRoutes = (app) => {
    app.use('/api/user', userRouter);
    app.use('/api/user', userRouter)
    app.use('/api/user', userRouter)

    app.use(notFound);
    app.use(erroHandler);
}

module.exports = initRoutes;