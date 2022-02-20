const jwt = require('jsonwebtoken'); // pour importer le package jsonwebtoken
require('dotenv').config();
const { User } = require('../models/index');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];  // on sépare le bearer pour ne garder que le token
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET); // on utilise la méthode verify pour décoder le token
    const user = await User.findOne({ where: { id: decodedToken.id } });
    const isAdmin = decodedToken.isAdmin;
    if (!user)  {
      throw new Error({error: 'Authentication error'})
    } else if (req.body.isAdmin && req.body.isAdmin !== isAdmin) {
      return res.status(401).json({error: "User role non valide !"})
    } else {
      req.user = user;
      res.status(200).send(user)
      console.log(user)
      next();
    }
  } catch {
      res.status(401).json({error: "User non trouvé !"});
    }
};