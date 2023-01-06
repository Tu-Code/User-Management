const express = require('express');
const router = express.Router();
const userService = require('../services/user')
const userValidation = require('../validations/user')
const { User } = require('../models/User');
const bcrypt = require('bcryptjs');

router.post('/users', async (req, res) =>{
    const { error } = userValidation.validate(req.body);
    if (error) return res.status(422).send(error.details[0].message)

    try{
        const user = await userService.create(req.body)
       
        if (!user) {
            return res.status(400).send("user already exists");
        }
        
        const plainUser = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        };
  
        res.status(201).send(plainUser);

    } catch (err) {
        res.status(500).send("Failed to store user");
    }
});

// GET /users?search=john&page=2&limit=10
router.get('/users', (req, res) => {
    // do something
    const search = req.query.search || '';
    const page = req.query.page || 1;
    const limit = req.query.limit || 20;
  
    User.find({
      $or: [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ]
    })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec((err, users) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.json({ users });
      });
});

//find a user by ID
router.get("/users/:id", async (req, res) => {
    // do something
    try {
        const user = await userService.findOneById(req.params.id);
    
        if (!user) {
          return res.status(404).send("User not found");
        }
    
        res.json({ user });
    } catch (err) {
        res.status(500).send("Failed to retrieve user");
    }
});

router.put('/users/:id', (req, res) => {
    User.findOne({ _id: req.params.id }).then(user => {
        // Check if current password is correct
        bcrypt.compare(req.body.currentPassword, user.password)
        .then(isMatch => {
            if(isMatch) {
                // If current password is correct, update password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(req.body.newPassword, salt, (err, hash) => {
                        user.password = hash;
                        user.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                    });
                });
            } else {
                return res.status(400).json({ password: 'Current password is incorrect' });
            }
        });
    });
});

module.exports = router;