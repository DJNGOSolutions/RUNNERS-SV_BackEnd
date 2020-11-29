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

module.exports = GroupService;