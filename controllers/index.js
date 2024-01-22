module.exports = (app) => {
    require('./api')(app);
    require('./trips')(app);
};