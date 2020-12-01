const { verifyId } = require('../utils/MongoUtils');
const UserModel = require('./../models/User');
const GroupModel = require('./../models/Group');

const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,32})");
const emailRegex = new RegExp("^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$");

const UserService = {};

UserService.verifyRegistrationFields = ({ firstNames, lastNames, username, email, password, photo }) => {
    let serviceResponse = {
        success: true,
        content: {}
    };

    if (!firstNames || !lastNames || !username || !email || !password) {
        serviceResponse = {
            success: false,
            content: {
                error: "Required fields are empty."
            }
        }

        return serviceResponse;
    }

    if (!emailRegex.test(email)) {
        serviceResponse = {
            success: false,
            content: {
                error: "Wrong email format."
            }
        }

        return serviceResponse;
    }

    if (!passwordRegex.test(password)) {
        serviceResponse = {
            success: false,
            content: {
                error: "Wrong password format."
            }
        }

        return serviceResponse;
    }

    return serviceResponse;

}

UserService.verifyLoginFields = ({ identifier, password }) => {
    let serviceResponse = {
        success: true,
        content: {}
    }

    if (!identifier || !password) {
        serviceResponse = {
            success: false,
            content: {
                error: "Missing required field."
            }
        }

        return serviceResponse;
    }

    return serviceResponse
}

UserService.findOneUsernameOrEmail = async(username, email) => {
    serviceResponse = {
        success: true,
        content: {}
    }

    try {
        const userFound = await UserModel.findOne({
            $or: [{ username: username }, { email: email }]
        }).exec();
        if (!userFound) {
            serviceResponse = {
                success: false,
                content: {
                    error: "User was not found."
                }
            }
        } else {
            serviceResponse.content = userFound;
        }
    
        return serviceResponse;
    } catch (error) {
        throw error;
    }
}

UserService.register = async({ firstNames, lastNames, username, email, password, photo }) => {
    let serviceResponse = {
        success: true,
        content: {
            message: "User was registrated successfully."
        }
    }

    try {
        const newUser = new UserModel({
            firstNames,
            lastNames,
            username,
            email,
            password,
            photo
        });
        const newUserWasRegistrated = await newUser.save();
        if (!newUserWasRegistrated) {
            serviceResponse = {
                success: false,
                content: {
                    error: "User could not be registrated."
                }
            }
        } else {
            serviceResponse.content = newUserWasRegistrated;
        }

        return serviceResponse;
    } catch(error) {
        throw error;
    }
}

UserService.findOneById = async (_id) => {
    let serviceResponse = {
        success: true,
        content: {}
    }

    try {
        const user = await UserModel.findById(_id)
            .select('-hashedPassword')
            .exec();

        if (!user) {
            serviceResponse = {
                success: false,
                content: {
                    error: 'User not found.'
                }
            }
        } else {
            serviceResponse.content = user;
        }

        return serviceResponse;
    } catch(error) {
        throw error;
    }
}

UserService.joinGroup = async (userId, groupId, accessCode) => {
    let serviceResponse = {
        success: true,
        content: {}
    }

    if (!verifyId(userId) && !verifyId(groupId)) {
        serviceResponse = {
            success: false,
            content: 'Invalid id for user or group.'
        }
        
        return serviceResponse;
    }

    if (!accessCode) {
        serviceResponse = {
            success: false,
            content: 'Missing access code.'
        }
        
        return serviceResponse;
    }

    try {
        const user = await UserModel.findOne({ _id: userId });
        if (!user) {
            serviceResponse = {
                success: false,
                content: {
                    error: 'No user found.'
                }
            }

            return serviceResponse;
        }
        const group = await GroupModel.findOne({ _id: groupId });
        if(!group) {
            serviceResponse = {
                success: false,
                content: {
                    error: 'No group found.'
                }
            }
            
            return serviceResponse;
        }

        if(!(group.accessCode === accessCode)){
            serviceResponse = {
                success: false,
                content: {
                    error: 'Given access code does not match with group access code.'
                }
            }
            
            return serviceResponse;
        }

        user.groups.push(groupId);
        const userUpdated = await user.save();
        if (!userUpdated) {
            serviceResponse = {
                success: false,
                content: {
                    error: 'User could not be updated.'
                }
            }
        } else {
            serviceResponse.content = userUpdated;
        }
        
        return serviceResponse;
    } catch(error) {
        throw new Error('Internal Server Error.')
    }
}

// TODO: All user's group 

module.exports = UserService;