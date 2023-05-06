const express = require('express');
const router = express();
const { find, index, create, update, destroy } = require('./controller');

// router.get('/events', (req, res) => {
//   res.status(200).json({
//     message: 'Halaman Events',
//   });
// });

router.get('/events', index);
router.get('/events/:id', find);
router.put('/events/:id', update);
router.delete('/events/:id', destroy);
router.post('/events', create);

module.exports = router;
