const {
    User
} = require("../models/User");

module.exports.pagination = () => {
    const search = req.query.search || '';
    const page = req.query.page || 1;
    const limit = req.query.limit || 20;

    User.find({
        $or: [{
            firstName: {
                $regex: search,
                $options: 'i'
            }
        },
        {
            lastName: {
                $regex: search,
                $options: 'i'
            }
        },
        {
            email: {
                $regex: search,
                $options: 'i'
            }
        }
        ]
    })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec((err, users) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json({
                users
            });
        });
}