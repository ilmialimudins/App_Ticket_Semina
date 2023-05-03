const express = require('express');
const router = express();
const { create } = require('./controller');

const upload = require('../../../midlleware/multer');

router.post('/images', upload.single('avatar'), create);

module.exports = router;
