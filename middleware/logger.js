const logger = (req, res, next) => {
    console.log(`${Date()}:${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
};
module.exports = logger;