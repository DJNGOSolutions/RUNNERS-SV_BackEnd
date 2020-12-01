const express = require('express');
const UserRouter = express.Router();

const UserController = require('./../../controllers/api/User');

UserRouter.patch('/member', UserController.addMemberToGroup);
UserRouter.get('/groups', UserController.findAllGroupsOfUser);

module.exports = UserRouter;