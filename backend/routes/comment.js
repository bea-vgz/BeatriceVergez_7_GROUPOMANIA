const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const commentCtrl = require('../controllers/comment');
const adminComment = require('../middleware/adminComment');

router.post ('/:postId/comments', auth, commentCtrl.createComment);
router.put ('/:postId/comments/:id', auth, adminComment, commentCtrl.modifyComment);
router.delete ('/:postId/comments/:id', auth, adminComment, commentCtrl.deleteComment);
router.get ('/:postId/comments/:id', auth, commentCtrl.getOneComment);
router.get ('/:postId/comments', auth, commentCtrl.getPostsComments);

module.exports = router;