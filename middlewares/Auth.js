const { verifyToken } = require('./../utils/JWTUtils');
const { verifyId } = require('./../utils/MongoUtils');
const UserService = require('./../services/User');

const middleware = {};

middleware.verifyAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    
    if (!authorization) {
        return res.status(403).json({
            error: 'Authorization is required.'
        });
    }

    const [prefix, token] = authorization.split(' ');
    if (prefix !== 'Bearer') {
        return res.status(400).json({
            error: 'Incorrect prefix.'
        });
    }

    const tokenObject = verifyToken(token);
    if (!tokenObject) {
        return res.status(401).json({
            error: 'Invalid token.'
        })
    }

    const userId = tokenObject._id;
    if (!verifyId(userId)) {
        return res.status(400).json({
            error: 'Error in ID.'
        });
    }

    const userExists = await UserService.findOneById(userId);
    if (!userExists) {
        return res.status(404).json(userExists.content);
    }

    req.user = userExists.content;

    next();
}

module.exports = middleware;