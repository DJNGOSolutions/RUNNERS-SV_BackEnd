const { verifyId } = require('../utils/MongoUtils');
const GroupModel = require('./../models/Group');

const GroupService = {};

GroupService.createGroup = async ({ name, description, photo, accessCode }, userId) => {
    let serviceResponse = {
        success: true,
        content: {
            message: 'New group was created'
        }
    }

    if (!name) {
        serviceResponse = {
            success: false,
            content: {
                error: 'Missing name for the group'
            }
        }

        return serviceResponse;
    }

    if (!accessCode) {
        serviceResponse = {
            success: false,
            content: {
                error: 'Missing accessCode for the group'
            }
        }

        return serviceResponse;
    }

    const admins = [ userId ];
    const members = [ userId ];
    const newGroup = new GroupModel({
        name, 
        description,
        photo,
        admins,
        members,
        accessCode
    });
    
    if (!newGroup) {
        serviceResponse = {
            success: false,
            content: {
                error: 'Something went wrong creating the new group.'
            }
        }

        return serviceResponse;
    }

    const savedGroup = await newGroup.save();
    if (!savedGroup) {
        serviceResponse = {
            success: false,
            content: {
                error: 'Group could not be saved.'
            }
        }
    } else {
        serviceResponse.content = savedGroup;
    }

    return serviceResponse;

}

GroupService.addMember = async (userId, groupId) => {
    let serviceResponse = {
        success: true,
        content: {}
    }

    if (!verifyId(groupId) && !verifyId(groupId)) {
        serviceResponse = {
            success: false,
            content: {
                error: 'Invalid id.'
            }
        }

        return serviceResponse;
    }

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

    console.info(group);
    console.info(group.members);
    group.members.push(userId);
    console.info(group);
    const groupUpdated = await group.save();
    if (!groupUpdated) {
        serviceResponse = {
            success: false,
            content: {
                error: 'Group could not be updated.'
            }
        }
    } else {
        serviceResponse.content = groupUpdated;
    }

    return serviceResponse;
}

GroupService.findGroupById = async (_id) => {
    let serviceResponse = {
        success: true,
        content: {}
    }

    if (!verifyId) {
        serviceResponse = {
            success: false,
            content: {
                error: 'Invalid id.',
            }
        }

        return serviceResponse;
    }

    const group = await GroupModel.findById(_id).exec();
    if (!group) {
        serviceResponse = {
            success: false,
            content: {
                error: 'Group was not found.'
            }
        }
    } else {
        serviceResponse.content = group;
    }

    return serviceResponse;
}

GroupService.findAllGroups = async () => {
    let serviceResponse = {
        success: true,
        content: {}
    }

    try {
        const groups = await GroupModel.find();
        if (!groups) {
            serviceResponse = {
                success: false,
                content: {
                    error: 'No group found.'
                }
            }
        } else {
            serviceResponse.content = groups;
        }

        return serviceResponse;
    } catch(error) {
        throw new Error('Internal Server Error.')
    }
}

module.exports = GroupService;