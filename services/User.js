const User = require('./../models/User');
const UserModel = require('./../models/User');

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

            return serviceResponse;
        }

        return serviceResponse;
    } catch(error) {
        throw error;
    }
}

module.exports = UserService;