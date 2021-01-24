const { check, validationResult } = require('express-validator')

module.exports.validateSignupRequest = [
    check('firstName')
        .notEmpty()
        .withMessage('Invalid value'),
    check('lastName')
        .notEmpty()
        .withMessage('Invalid value'),
    check('email')
        .isEmail()
        .withMessage('Invalid email'),
    check('password')
        .isLength({ min: 5 })
        .withMessage('password must be at least 5 chars long')]

module.exports.validateSigninRequest = [
    check('email')
        .isEmail()
        .withMessage('Invalid email'),
]

module.exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req)
    console.log(errors)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()[0].msg });
    }
    next();
}