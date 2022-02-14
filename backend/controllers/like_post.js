const { Like_post } = require('../models/index');
const { Dislike_post } = require('../models/index');
const { User } = require('../models/index');
const { Post } = require('../models/index');
const { Sequelize } = require("sequelize");

// Création d'un like post :
exports.likePost = async (req, res, next) => {
  try {
    const existLike = await Like_post.findOne({ 
      where: { UserId: req.user, PostId: req.params.postId } 
    });
    const existDislike = await Dislike_post.findOne({ 
      where: { UserId: req.user, PostId: req.params.postId } 
    });
    if (existLike && !existDislike) {
      await existLike.destroy()
      .then( async() => {
        const post = await Post.findOne({
          where: { id: req.params.postId },
          include: [
            {
              model: Like_post
            },
          ],
        });
      res.status(201).json({ post, like : false })
      })
    } else if(!existLike && !existDislike) {
      Like_post.create({
        UserId: req.user,
        PostId: req.params.postId,
      })
      .then( async() => {
        const post = await Post.findOne({
          where: { id: req.params.postId },
          include: [
            {
              model: Like_post
            },
          ]
        });
        res.status(201).json({ post, like: true})
      })
    }
    else {
      res.status(400).json({ msg: "Vous ne pouvez pas aimer ce post. Vous devez d'abord enlever votre vote" });
    }
  }
  catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Récupérer tous les likes d'un post
exports.getAllLikesOnePost = async (req, res, next) => {
  try {
    const allLikes = await Like_post.findAll({ 
      where: { PostId: req.params.postId },
      include: { model: User }
    })
  res.status(200).json({ allLikes, likes: allLikes.length })
  } catch (error) {
    res.status(400).json({ error })
  }
};

//Récupérer un like d'un post d'un user
exports.getLikeOnOnePost = async (req, res, next) => {
  try {
    const existLike = await Like_post.findOne(
      { where: { PostId: req.params.postId, UserId: req.user },
      include: { model: User }
    })
    res.status(200).json({ like: existLike ? true : false })
  } catch (error) {
    res.status(400).json({ error })
  }
}