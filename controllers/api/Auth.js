const UserService = require('../../services/User');
const { createToken } = require('./../../utils/JWTUtils');

const AuthController = {};

AuthController.register = async(req, res) => {
    const userWasVerified = UserService.verifyRegistrationFields(req.body);
    
    if (!userWasVerified.success) {
        return res.status(400).json(userWasVerified.content);
    }

    try {
        const { username, email } = req.body;
        const userExists = await UserService.findOneUsernameOrEmail(username, email);

        if (userExists.success){
            return res.status(406).json({
                error: "User already exists."
            })
        }

        const userWasRegistrated = await UserService.register(req.body);

        if (!userWasRegistrated.success) {
            return res.status(409).json(userWasRegistrated.content);
        }

        return res.status(201).json(userWasRegistrated.content);
    } catch(error) {
        return res.status(500).json({
            error: "Internal Server Error."
        })
    }
};

AuthController.login = async (req, res) => {
    const UserFieldsValidated = UserService.verifyLoginFields(req.body);

    if (!UserFieldsValidated.success) {
        return res.status(400).json(UserFieldsValidated.content);
    }

    try {
        const { identifier, password } = req.body;
        const userExists = await UserService.findOneUsernameOrEmail(identifier, identifier);
        if(!userExists.success){
            return res.status(404).json(userExists.content);
        }

        const user = userExists.content;

        if(!user.comparePassword(password)){
            return res.status(401).json({
                error: "Wrong password."
            })
        }

        return res.status(200).json({
            token: createToken(user._id)
        })
    } catch(error) {
        return res.status(500).json({
            error: "Internal Server Error."
        })
    }
}

module.exports = AuthController;