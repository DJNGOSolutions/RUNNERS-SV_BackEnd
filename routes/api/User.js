const express = require('express');
const UserRouter = express.Router();

const UserController = require('./../../controllers/api/User');

UserRouter.patch('/member', UserController.addMemberToGroup);

module.exports = UserRouter;