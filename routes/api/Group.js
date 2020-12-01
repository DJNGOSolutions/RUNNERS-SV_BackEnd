const express = require('express');
const GroupRouter = express.Router();

const GroupController = require('./../../controllers/api/Group');

GroupRouter.post('/create', GroupController.createGroup);
GroupRouter.get('/', GroupController.getAllGroups);
GroupRouter.get('/routes/:_id', GroupController.findGroupRoutes);

module.exports = GroupRouter;