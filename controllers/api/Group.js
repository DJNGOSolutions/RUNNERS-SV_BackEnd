const GroupService = require('./../../services/Group');

const GroupController = {};

GroupController.createGroup = async (req, res) => {
    const createdGroup = await GroupService.createGroup(req.body, req.user._id);

    if (!createdGroup.success) {
        return res.status(400).json(createdGroup.content);
    }

    return res.status(201).json(createdGroup.content);
}

GroupController.getAllGroups = async (req, res) => {
    const groups = await GroupService.findAllGroups();

    if (!groups.content) {
        return res.status(404).json(groups.content);
    }

    return res.status(200).json(groups.content);
}

GroupController.findGroupRoutes = async (req, res) => {
    const routes = await GroupService.findGroupRoutes(req.params._id);

    if (!routes.success) {
        return res.status(404).json(routes.content);
    }

    return res.status(200).json(routes.content);
}

module.exports = GroupController;