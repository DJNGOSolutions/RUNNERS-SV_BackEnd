const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RouteSchema = new Schema({
    name: String,
    startingPoint: {
        type: String,
        required: true
    },
    finishingPoint: {
        type: String,
        required: true
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        rel: 'Group'
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Route', RouteSchema);