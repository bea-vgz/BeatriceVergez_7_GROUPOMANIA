const { Comment } = require('../models/index');
const { User } = require('../models/index');
const { Like_comment } = require('../models/index');
const { Dislike_comment } = require('../models/index');

// Création d'un commentaire :
exports.createComment = async (req, res, next) => {
    try { 
      let comment = await Comment.create({
      ...req.body,
      UserId: req.user,
      PostId: req.params.postId
    })
    comment = await Comment.findOne({
      where: { id: comment.id },
      include: { model: User }
    })
      res.status(201).json({ comment })
    }
    catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

//Modifier un commentaire
exports.modifyComment = (req, res, next) => {
    Comment.findOne({ where: { id: req.params.id, PostId: req.params.postId } })
    .then((comment) => {
        comment.update({ 
            ...req.body 
        })
    .then(() => res.status(200).json({ message: "Commentaire modifié ! "}))
    .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//Supprimer un commentaire
exports.deleteComment = (req, res, next) => {
    Comment.findOne({ where: { id: req.params.id, PostId: req.params.postId } })
    .then((comment) => {
      comment.destroy({ where: { id: req.params.id } })
      .then(() => { res.status(200).json({ message: "Commentaire supprimé !" })})
      .catch((error) => res.status(400).json({ error }));
    })
};

// Afficher/Récupérer un commentaire 
exports.getOneComment = (req, res, next) => {
    Comment.findOne({ where: { id: req.params.id, PostId: req.params.postId },
      include: [
        { 
          model: User 
        },
        { 
          model: Like_comment
        },
        { 
          model: Dislike_comment
        },
      ],
      order: [["createdAt", "ASC"]], 
    })
      .then((comment) => res.status(200).json(comment))
      .catch((error) => res.status(404).json({ error }));
};

// Afficher/Récupérer tous les commentaires
exports.getPostsComments = (req, res, next) => {
  Comment.findAll({ where: { PostId: req.params.postId },
    include: [
      { 
        model: User 
      },
      { 
        model: Like_comment
      },
      { 
        model: Dislike_comment
      },
    ],
    order: [["createdAt", "ASC"]], 
  }) 
    .then(comments => res.status(200).json(comments))
    .catch(error => res.status(400).json({ error }));
};