const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const dislikeCtrl = require('../controllers/dislike_post');

router.post ('/:postId/dislikes', auth, dislikeCtrl.dislikePost);
router.get ('/:postId/dislikes', auth, dislikeCtrl.getAllDislikesOnePost);
router.get ('/:postId/dislike', auth, dislikeCtrl.getDislikeOnOnePost);

module.exports = router;