const express = require('express');
const router = express.Router();
const userService = require('../services/userService')
const userValidation = require('../validations/user')

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
});

//find a user by ID
router.get("/users/:id", async (req, res) => {
    // do something
});

router.put('/users/:id', (req, res) => {
    // do something
});

module.exports = router;