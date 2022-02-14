const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth')
const postCtrl = require('../controllers/post');
const adminPost = require('../middleware/adminPost');

router.post('/', auth, multer, postCtrl.createPost);
router.put('/:id', auth, adminPost, multer, postCtrl.modifyPost);
router.delete('/:id', auth, adminPost, postCtrl.deletePost);
router.get('/:id', auth, postCtrl.getOnePost);
router.get('/', auth, postCtrl.getAllPosts);

module.exports = router;