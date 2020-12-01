const express = require('express');
const router = express.Router();

const AuthMiddleware= require('./../middlewares/Auth')

const AuthRouter = require('./api/Auth');
const GroupRouter = require('./api/Group');
const UserRouter = require('./api/User');
const RouteRouter = require('./api/Route');

router.use('/auth', AuthRouter);

router.use(AuthMiddleware.verifyAuth);

router.use('/users', UserRouter);
router.use('/groups', GroupRouter);
router.use('/routes', RouteRouter);

module.exports = router;