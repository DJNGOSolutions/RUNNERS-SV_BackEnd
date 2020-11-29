const UserService = require('./../../services/User');
const GroupService = require('./../../services/Group');

const UserController = {};

UserController.addMemberToGroup = async (req, res) => {
    const { userId, groupId, accessCode } = req.body;

    const memberJoinedToGroup = await UserService.joinGroup(userId, groupId, accessCode);
    if (!memberJoinedToGroup.success) {
        return res.status(400).json(memberJoinedToGroup.content);
    }

    const memberAddedToGroup = await GroupService.addMember(userId, groupId);
    if (!memberAddedToGroup.success) {
        return res.status(400).json(memberAddedToGroup.content)
    }

    const user = memberJoinedToGroup.content;
    const group = memberAddedToGroup.content;
    const newMessage = {
        user,
        group
    }
    return res.status(200).json(newMessage);
}

module.exports = UserController;