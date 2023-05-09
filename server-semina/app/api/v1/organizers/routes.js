const express = require('express');

const router = express();
const {
  createCMSOragnizer,
  createCMSUser,
  getCMSUser,
} = require('../organizers/controller');

router.post('/users', createCMSUser);

router.get('/users', getCMSUser);

router.post('/organizer', createCMSOragnizer);

module.exports = router;
