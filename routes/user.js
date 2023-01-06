const express = require('express');
const express = require('express');
const { User } = require('../models/User');
const userService = require('../services/user')
const userValidation = require('../validations/user');
const bcrypt = require('bcryptjs');
const router = express.Router();
const path = require('path');
const cors = require('cors');

router.use(cors());

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'userManagement.html'))
});

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
router.get('/users', async (req, res) => {
    // do something
    const search = req.query.search || '';
    const page = req.query.page || 1;
    const limit = req.query.limit || 20;
  
    try {
        const result = await userService.findAllUsers({search, page, limit});

        res.json({ result });

    } catch (err) {
        console.log(err);
        res.status(500).send("Failed to retrieve users");
    }
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

router.put('/users/:id/update/password', async (req, res) => {
    try {
        const user = await userService.updatePssword(req.params.id, req.body.password);
    
        if (!user) {
          return res.status(400).send("Failed to update user password");
        }
    
        res.json({ user });
    } catch (err) {
        res.status(500).send("Failed to update user password");
    }
});

module.exports = router;