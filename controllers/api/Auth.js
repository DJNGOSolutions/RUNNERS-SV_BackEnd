const UserService = require('../../services/User')

const AuthController = {};

AuthController.register = async(req, res) => {
    const userWasVerified = UserService.verifyRegistrationFields(req.body);
    
    if (!userWasVerified.success) {
        return res.status(400).json(userWasVerified.content);
    }

    try {
        const userExists = await UserService.findOneUsernameOrEmail(req.body);

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

module.exports = AuthController;