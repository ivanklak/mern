const {Router} = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const User = require('../modules/User');
const router = Router();

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Wrong email').isEmail(),
        check('password', 'min. 6 symbols').isLength({min: 6})
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'wrong register data '
            })
        }
        const {email, password} = req.body; // from frontend

        const candidate = await User.findOne({email})

        if (candidate) {
            return res.status(400).json({message: "User already exists"})
        }

        //hashed Password
        const hashedPawword = await bcrypt.hash(password, 12)

        // create new user
        const user = new User({email, password: hashedPawword})

        await user.save()

        res.status(201).json({message: 'User is created'})

    } catch (err) {
        res.status(500).json({message: 'Something went wrong'})
    }
})

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Enter correct email').normalizeEmail().isEmail(),
        check('password', 'Enter your email').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'wrong login data '
                })
            }

            const {email, password} = req.body

            const user = await User.findOne({email})

            if (!user) {
                return res.status(400).json({message: 'User is not found'})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({message: 'wrong password, try again'})
            }

            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )

            res.json({token, userId: user.id})

        } catch (err) {
            res.status(500).json({message: 'Something went wrong'})
        }
})

module.exports = router;