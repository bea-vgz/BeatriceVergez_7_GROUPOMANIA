const { Dislike_comment } = require('../models/index');
const { Like_comment } = require('../models/index');
const { User } = require('../models/index');
const { Comment } = require('../models/index');

// Création d'un like comment :
exports.dislikeComment = async (req, res, next) => {
  try {
    const existDislike = await Dislike_comment.findOne({ 
      where: { UserId: req.user, CommentId: req.params.commentId } 
    });
    const existLike = await Like_comment.findOne({ 
      where: { UserId: req.user, CommentId: req.params.commentId } 
    });
    if (existDislike && !existLike) {
      await existDislike.destroy()
      .then( async () => {
        const comment = await Comment.findOne({
          where: { id: req.params.commentId },
          include: [
            {
              model: Dislike_comment
            },
          ],
        });
      res.status(201).json({ comment, dislike : false })
      })
    } else if (!existDislike && !existLike) {
      Dislike_comment.create({
        UserId: req.user,
        CommentId: req.params.commentId,
      })
      .then( async () => {
        const comment = await Comment.findOne({
          where: { id: req.params.commentId },
          include: [
            {
              model: Dislike_comment
            },
          ]
        });
        res.status(201).json({ comment, dislike: true })
      })
    }
    else {
      res.status(400).json({ msg: "Vous ne pouvez pas disliker ce commentaire. Vous devez d'abord enlever votre vote" });
    }
  }
  catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Récupérer tous les dislikes d'un comment
exports.getAllDislikesOneComment = async (req, res, next) => {
  try {
    const allDislikes = await Dislike_comment.findAll({ 
      where: { CommentId: req.params.commentId },
      include: { model: User }
    })
    res.status(200).json({ allDislikes, dislikes: allDislikes.length })
  } catch (error) {
    res.status(400).json({ error })
  }
};

//Récupérer un dislikes d'un commentaire
exports.getDislikeOnOneComment = async (req, res, next) => {
  try {
    const existDislike = await Dislike_comment.findOne(
      { where: { CommentId: req.params.commentId },
      include: { model: User }
    })
    res.status(200).json({ dislike: existDislike ? true : false })
  } catch (error) {
    res.status(400).json({ error })
  }
};