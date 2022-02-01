const {Router} = require('express');
const config = require('config');
const shortid = require('shortid');
const Link = require('../modules/Link');
const auth = require('../middleware/auth.middleware');
const router = Router();

router.post('/generate', auth, async (req, res) => {
    try {
        //make link shorter
        const baseUrl = config.get('baseUrl');
        const {from} = req.body;

        const code = shortid.generate();

        //check the link in DB
        const existing = await Link.findOne({from});

        if (existing) {
            return res.json({link: existing})
        }

        //create new link
        const to = baseUrl + '/t/' + code;

        const link = new Link({code, to, from, owner: req.user.userId});

        //save the link
        await link.save();

        res.status(201).json({link});

    } catch (err) {
        res.status(500).json({message: 'Something went wrong'})
    }
});

router.get('/', auth, async (req, res) => {
    try {
        //find links by userId
        const links = await Link.find({owner: req.user.userId}) //userId from JWT
        res.json(links);
    } catch (err) {
        res.status(500).json({message: 'Something went wrong'})
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const link = await Link.findById(req.params.id)
        res.json(link);
    } catch (err) {
        res.status(500).json({message: 'Something went wrong'})
    }
});

module.exports = router;