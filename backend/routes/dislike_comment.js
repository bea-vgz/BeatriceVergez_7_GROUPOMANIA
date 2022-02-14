const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const dislikeCtrl = require('../controllers/dislike_comment');

router.post ('/:commentId/dislikes', auth, dislikeCtrl.dislikeComment);
router.get ('/:commentId/dislike', auth, dislikeCtrl.getDislikeOnOneComment);
router.get ('/:commentId/dislikes', auth, dislikeCtrl.getAllDislikesOneComment);

module.exports = router;