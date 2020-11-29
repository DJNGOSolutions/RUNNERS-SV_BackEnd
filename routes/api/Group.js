const express = require('express');
const GroupRouter = express.Router();

const GroupController = require('./../../controllers/api/Group');

GroupRouter.post('/create', GroupController.createGroup);

module.exports = GroupRouter;