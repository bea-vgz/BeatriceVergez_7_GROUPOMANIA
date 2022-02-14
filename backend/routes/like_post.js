const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const likeCtrl = require('../controllers/like_post');

router.post ('/:postId/likes', auth, likeCtrl.likePost);
router.get ('/:postId/likes', auth, likeCtrl.getAllLikesOnePost);
router.get ('/:postId/like', auth, likeCtrl.getLikeOnOnePost);

module.exports = router;