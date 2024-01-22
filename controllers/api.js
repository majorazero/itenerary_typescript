module.exports = (app) => {    
    app.post("/api/getYelpResults", async (req, res) => {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${process.env.YELP_BEARER_KEY}`,
            }
        }
        const { term, location, longitude, latitude } = req.body;
        let query = `term=${term}&limit=4`;
        
        if (location) {
            query += `&location=${location}`;
        } else {
            query += `&longitude=${longitude}&latitude=${latitude}`;
        }

        const response = await fetch(`https://api.yelp.com/v3/businesses/search?${query}`, options)
        const result = await response.json();

        res.json({
            data: result
        });
    })
}