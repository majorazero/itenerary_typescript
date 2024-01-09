module.exports = (app) => {
    app.post("/api/getYelpResults", (req, res) => {
        console.log(req.body, "DEBUG")
        res.json({
            data: "YO"
        });
    })
}