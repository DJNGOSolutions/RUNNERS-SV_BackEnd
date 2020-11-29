const express = require('express');
const router = express.Router();

const AuthMiddleware= require('./../middlewares/Auth')

const AuthRouter = require('./api/Auth');
const GroupRouter = require('./api/Group');

router.use('/auth', AuthRouter);

router.use(AuthMiddleware.verifyAuth);

router.use('/groups', GroupRouter);

module.exports = router;