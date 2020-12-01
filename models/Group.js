const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    photo: {
        type: String,
        default: 'default.png'
    },
    admins: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            rel: "User"
        }]
    },
    members: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            rel: "User"
        }]
    },
    routes: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            rel: "Route"
        }]
    },
    accessCode: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Group", GroupSchema);