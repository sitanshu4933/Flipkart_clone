const User = require('../models/user')
const jwt = require('jsonwebtoken')
// Signup Route
module.exports.Signup = (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user, errr) => {
            if (user) {
                return res.status(400).json({
                    message: "User already exist"
                })
            } else {
                const { firstName, lastName, email, password } = req.body
                const _user = new User({
                    firstName,
                    lastName,
                    email,
                    password,
                    userName: Math.random().toString()
                })
                _user.save((err, data) => {
                    if (err) {
                        return res.status(400).json({ message: "Something went wrong" })
                    }
                    else {
                        return res.status(201).json({ message: "User created sucessfully" })
                    }
                })
            }
        })
}
// Signin Route
module.exports.Signin = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((err, user) => {
            if (!user) {
                return res.status(400).json({
                    message: "Invalid emaiid or password"
                })
            }
            if (user) {
                if (user.authenticate(req.body.password)) {
                    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1hr' })
                    const { firstName, lastName, email, role, fullName } = user
                    res.status(200).json({
                        token,
                        user: { firstName, lastName, email, role, fullName }
                    })

                } else {
                    return res.status(400).json({
                        message: "Invalid emailid or password"
                    })
                }
            } else {
                return res.status(400).json({
                    message: "Something went wrong"
                })
            }
        })
}

