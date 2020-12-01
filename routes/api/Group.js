const express = require('express');
const GroupRouter = express.Router();

const GroupController = require('./../../controllers/api/Group');

GroupRouter.post('/create', GroupController.createGroup);
GroupRouter.get('/', GroupController.getAllGroups);

module.exports = GroupRouter;