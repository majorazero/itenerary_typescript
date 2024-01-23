module.exports = (app) => {    
    const Trip = require("../models/trips");

    app.post("/trips/saveTrip", (req, res) => {
        if (req.body.tripId) {
            Trip.updateOne({ _id: req.body.tripId }, req.body, { upsert: true }).then((data) => {
                data._id = req.body.tripId;
                res.json(data)            
            }).catch(err => {
                res.json(400, {
                    msg: "Something went wrong"
                })
            })
        } else {
            Trip.create(req.body).then((data) => {
                res.json(data)            
            }).catch(err => {
                res.json(400, {
                    msg: "Something went wrong"
                })
            })
        }

    });

    app.post("/trips/getTrip", (req, res) => {
        Trip.findById(req.body.id).then(data => {
            res.json(data);
        }).catch(error => {
            res.status(400).json({message: "Could not find trip"})
        })
    });
}