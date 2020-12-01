const { verifyId } = require('../utils/MongoUtils');
const RouteModel = require('./../models/Route');
const GroupModel = require('./../models/Group');

const RouteService = {};

RouteService.validateFields = ({ name, startingPoint, finishingPoint, groupId }) => {
    let serviceResponse = {
        success: true,
        content: {
            message: 'All fields correct.'
        }
    }

    if (!name || !startingPoint || !finishingPoint || !groupId) {
        serviceResponse = {
            success: false,
            content: {
                error: 'Missing required fields.'
            }
        }

        return serviceResponse;
    }

    if (!verifyId(groupId)) {
        serviceResponse = {
            success: false,
            content: {
                error: 'Invalid id.'
            }
        }
    }

    return serviceResponse;
}

RouteService.createRoute = async ({ name, startingPoint, finishingPoint, groupId }) => {
    let serviceResponse = {
        success: true,
        content: {}
    }

    try {
        const route = new RouteModel({
            name,
            startingPoint,
            finishingPoint,
        });

        route.groups = groupId;
        const group = await GroupModel.findOne({ _id: groupId });
        if (!group) {
            serviceResponse = {
                success: false,
                content: {
                    error: 'Group not found.'
                }
            }

            return serviceResponse;
        }

        const routeSaved = await route.save(route);

        if (!routeSaved) {
            serviceResponse = {
                success: false,
                content: {
                    error: 'User could not be saved.'
                }
            }

            return serviceResponse;
        } else {
            serviceResponse.content = routeSaved;
        }

        group.routes.push(routeSaved._id);

        const groupSaved = await route.save(group);

        if (!groupSaved) {
            serviceResponse = {
                success: false,
                content: {
                    error: 'Group could not be saved.'
                }
            }
        }

        return serviceResponse;
    } catch (error) {
        throw new Error('Internal Server Error.')
    }
}

module.exports = RouteService;