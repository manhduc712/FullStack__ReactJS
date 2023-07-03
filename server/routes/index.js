const userRouter = require('./user');
const { notFound, erroHandler } = require('../middlewares/erroHandler')
const initRoutes = (app) => {
    app.use('/api/user', userRouter)
    .use('/api/user', userRouter)
    .use('/api/user', userRouter)
    .use(notFound)
    .use(erroHandler);
}

module.exports = initRoutes;