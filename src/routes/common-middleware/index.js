const jwt = require('jsonwebtoken')

// JWT token middleware
module.exports.requirelogin = (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) return res.status(400).json({ message: "Authorization required" })
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) return res.status(401).json({ message: "Session expired ,Please login again " })
        req.user = payload
    })
    next();
}

module.exports.adminMiddleware = (req, res, next) => {
    if (req.user.role !== "admin") return res.status(400).json({ message: "Accesss denied" })
    next()
}
module.exports.userMiddleware = (req, res, next) => {
    if (req.user.role !== "user") return res.status(400).json({ message: "Accesss denied" })
    next()
}