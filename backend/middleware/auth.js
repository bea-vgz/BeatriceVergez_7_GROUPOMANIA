const jwt = require('jsonwebtoken'); // pour importer le package jsonwebtoken
require('dotenv').config();

module.exports = (req, res, next) => {
   try {
      const token = req.headers.authorization.split(' ')[1];  // on sépare le bearer pour ne garder que le token
      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET); // on utilise la méthode verify pour décoder le token
      const userId = decodedToken.userId; // on extrait l'id utilisateur du token
      const isAdmin = decodedToken.isAdmin;
      if (req.body.userId && req.body.userId !== userId) {
          throw 'User ID non valide';
      } else if (req.body.isAdmin && req.body.isAdmin !== isAdmin) {
        console.log(isAdmin)
        return res.status(401).json({error: "User role non valide !"})
      } else {
        req.user = userId;
        next();
      }
  } catch {
    res.status(401).json({error:error});
    }
};