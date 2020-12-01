const Crypto = require("crypto");

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstNames: {
        type: String,
        required: true
    },
    lastNames: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    hashedPassword: {
        type: String,
        required: true,
        default: ""
    },
    photo: String,
    token: {
        type: String,
        default: ""
    },
    groups: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            rel: 'Group'
        }]
    }
}, {
    timestamps: true
});

UserSchema
    .virtual("password")
    .set(function(password){
        this.hashedPassword = Crypto.createHmac("sha256", password).digest("hex");
    });

UserSchema.methods = {
    comparePassword: function (password) {
        return (Crypto.createHmac("sha256", password).digest("hex") === this.hashedPassword);
    }
}

module.exports = mongoose.model("User", UserSchema);