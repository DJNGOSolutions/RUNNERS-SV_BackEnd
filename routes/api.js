const express = require('express');
const router = express.Router();

const AuthMiddleware= require('./../middlewares/Auth')

const AuthRouter = require("./api/Auth");

router.use("/auth", AuthRouter);

router.use(AuthMiddleware.verifyAuth);

module.exports = router;