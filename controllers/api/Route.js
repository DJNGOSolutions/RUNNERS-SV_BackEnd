const RouteService = require('./../../services/Route');

const RouteController = {};

RouteController.createNewRoute = async(req, res) => {
    const routeValidated = RouteService.validateFields(req.body);
    if (!routeValidated.success) {
        return res.status(400).json(routeValidated.content);
    }
    try {
        const routeCreated = await RouteService.createRoute(req.body);
        if (!routeCreated.success) {
            return res.status(409).json(routeCreated.content);
        }
    
        return res.status(200).json(routeCreated.content);
    } catch(error) {
        return res.status(500).json({
            error: 'Internal Server Error.'
        })
    }
}

module.exports = RouteController;