const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
    name: {
        type: String,
        required: true,
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
    description: String,
    photo: {
        type: String,
        default: 'default.png'
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Group", GroupSchema);