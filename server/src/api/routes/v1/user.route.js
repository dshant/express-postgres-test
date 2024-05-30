const express = require('express');
const controller = require('../../controller/user.controller');

const router = express.Router();

/**
 * Load user when API with userId route parameter is hit
 */
router.param('userId', controller.load);

router
    .route('/')
    .get(controller.list)
    .post(controller.create);

router
    .route('/:userId')
    .get(controller.get)
    .patch(controller.update)
    .delete(controller.remove);


module.exports = router;
