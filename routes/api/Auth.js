const express = require('express');
const AuthRouter = express.Router();

const AuthController = require('./../../controllers/api/Auth');

AuthRouter.post("/signup", AuthController.register);
AuthRouter.post("/signin", AuthController.login);

module.exports = AuthRouter;