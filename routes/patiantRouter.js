const express = require('express');
const patiantController = require('./../controllers/patiantController');
const router =express.Router();


router
    .route('/')
    .get(patiantController.getAllPatiant)
    .post(patiantController.createPatiant);

router
    .route('/:id')
    .get(patiantController.getPatiant)
    .patch(patiantController.updatePatiant)
    .delete(patiantController.deletePatiant);


module.exports = router;