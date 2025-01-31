const express = require('express');
const userRoutes = require('./user.route');


const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

router.use('/users', userRoutes); // Apply the IP filter middleware to /users route


module.exports = router;
