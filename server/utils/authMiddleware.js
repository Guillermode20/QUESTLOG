// piece of middlware to prevent unauthorized access to routes

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ success: false, message: 'Unauthorized' });
}

module.exports = { isAuthenticated };