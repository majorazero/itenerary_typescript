const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WaypointSchema = new Schema({
    location: {
        lat: Number,
        lng: Number,
    },
    data: Object,
});
const tripSchema = new Schema({
    name: {
        type: String,
        unique: false,
    },
    days: {
        type: [[WaypointSchema]]
    },
    hotel: Object,
    startDate: String,
    endDate: String,
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;