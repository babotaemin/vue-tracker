const { User } = require('../models');

module.exports = {
    async register (req, res) {
        try {
            const user = await User.craete(req.body);
            res.send(user.toJSON());
        } catch (err) {
            res.status(400).send({
                error: 'this email account is already in use.'
            });
        }
    }
};
