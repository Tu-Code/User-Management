const express = require('express');
const router = express.Router();

router.post('/users', async (req, res) =>{
   // do something
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