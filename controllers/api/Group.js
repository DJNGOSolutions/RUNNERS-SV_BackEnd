const GroupService = require('./../../services/Group');

const GroupController = {};

GroupController.createGroup = async (req, res) => {
    const createdGroup = await GroupService.createGroup(req.body, req.user._id);

    if (!createdGroup.success) {
        return res.status(400).json(createdGroup.content);
    }

    return res.status(201).json(createdGroup.content);
}

module.exports = GroupController;