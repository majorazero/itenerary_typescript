const { yelpBearerKey } = require("../global/global");

module.exports = (app) => {    
    app.post("/api/getYelpResults", async (req, res) => {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${yelpBearerKey}`,
            }
        }
        const response = await fetch(`https://api.yelp.com/v3/businesses/search?term=hotels&limit=4&location=${req.body.location}`, options)
        const result = await response.json();

        res.json({
            data: result
        });
    })
}