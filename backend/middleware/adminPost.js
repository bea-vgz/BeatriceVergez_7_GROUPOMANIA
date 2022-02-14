const jwt = require('jsonwebtoken');
const { Post } = require('../models/index.js');

module.exports = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];  // on sépare le bearer pour ne garder que le token
      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET); // on utilise la méthode verify pour décoder le token
      const userId = decodedToken.userId;
      const isAdmin = decodedToken.isAdmin;

        // On vérifie que le userId du token correspond au userId du post */
        Post.findOne({ where: { id : req.params.id } })
          .then(post => {
            if ((post.UserId !== userId) && (isAdmin !== true)) {
              res.status(403).json({ message: "Requête non authentifiée" });
            } 
            else {
              next();
            };
          }
    )} catch {
      res.status(401).json({error:error});
  }
};