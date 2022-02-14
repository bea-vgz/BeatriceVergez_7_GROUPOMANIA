const { Dislike_post } = require('../models/index');
const { Like_post } = require('../models/index');
const { User } = require('../models/index');
const { Post } = require('../models/index');

// Création d'un like post :
exports.dislikePost = async (req, res, next) => {
  try {
    const existDislike = await Dislike_post.findOne({ 
      where: { UserId: req.user, PostId: req.params.postId } 
    });
    const existLike = await Like_post.findOne({ 
      where: { UserId: req.user, PostId: req.params.postId } 
    });
    if (existDislike && !existLike) {
      await existDislike.destroy()
      .then( async () => {
        const post = await Post.findOne({
          where: { id: req.params.postId },
          include: [
            {
              model: Dislike_post
            },
          ],
        });
      res.status(201).json({ post, dislike : false })
      })
    } else if (!existDislike && !existLike) {
      Dislike_post.create({
        UserId: req.user,
        PostId: req.params.postId,
      })
      .then( async () => {
        const post = await Post.findOne({
          where: { id: req.params.postId },
          include: [
            {
              model: Dislike_post
            },
          ]
        });
        res.status(201).json({ post, dislike: true })
      })
    }
    else {
      res.status(400).json({ msg: "Vous ne pouvez pas disliker ce post. Vous devez d'abord enlever votre vote" });
    }
  }
  catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Récupérer tous les dislikes d'un post
exports.getAllDislikesOnePost = async (req, res, next) => {
  try {
    const allDislikes = await Dislike_post.findAll({ 
      where: { PostId: req.params.postId },
      include: { model: User }
    })
    res.status(200).json({ allDislikes, dislikes: allDislikes.length })
  } catch (error) {
    res.status(400).json({ error })
  }
};

//Récupérer un dislike d'un post d'un user
exports.getDislikeOnOnePost = async (req, res, next) => {
  try {
    const existDislike = await Dislike_post.findOne(
      { where: { PostId: req.params.postId, UserId: req.user },
      include: { model: User }
    })
    res.status(200).json({ dislike: existDislike ? true : false })
  } catch (error) {
    res.status(400).json({ error })
  }
}