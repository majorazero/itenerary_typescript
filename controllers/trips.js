module.exports = (app) => {    
    const Trip = require("../models/trips");

    app.post("/trips/saveTrip", (req, res) => {
        console.log(req.body, "!!")
        Trip.create(req.body).then((data) => {
            res.json({
                data: data
            })            
        }).catch(err => {
            res.json(400, {
                msg: "Something went wrong"
            })
        })

    });

    app.post("/trips/getTrip", (req, res) => {
        Trip.findById(req.body.id).then(data => {
            res.json(data);
        }).catch(error => {
            res.json(400, {
                msg: "Couldn't find what you're looking for."
            })
        })
    });
}