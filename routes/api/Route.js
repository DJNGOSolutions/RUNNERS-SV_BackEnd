const express = require('express');
const routeRouter = express.Router();

const RouteController = require('./../../controllers/api/Route');

routeRouter.post('/create', RouteController.createNewRoute);

module.exports = routeRouter;