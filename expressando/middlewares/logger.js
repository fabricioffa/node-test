exports.logger = (req, res, next) => {
    console.log('Logging...');
    next();
}

