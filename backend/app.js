const express = require('express'); // importation du paquet express
const app = express(); // Création de l'application express
const bodyParser = require('body-parser'); // importation du paquet body-parser
const path = require('path');
const helmet = require("helmet");
require('dotenv').config();

//Import des routers créés
const userRoutes = require('./routes/user'); // On importe la route dédiée aux utilisateurs
const postRoutes = require('./routes/post'); // On importe la route dédiée aux posts
const commentRoutes = require('./routes/comment'); // On importe la route dédiée aux comments
const likePostRoutes = require('./routes/like_post'); // On importe la route dédiée aux likes des posts
const dislikePostRoutes = require('./routes/dislike_post'); // On importe la route dédiée aux dislikes des posts
const likeCommentRoutes = require('./routes/like_comment'); // On importe la route dédiée aux likes des commentaires
const dislikeCommentRoutes = require('./routes/dislike_comment'); // On importe la route dédiée aux likes des commentaires

//db
const { sequelize } = require('./models/index');

// CORS - Cross Origin Resource Sharing (mesure de sécurité pour empêcher l'utilisation de ressources par des origines non-autorisées.)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
    
app.use(express.json());
app.use(helmet());
app.use('/images', express.static(path.join(__dirname, 'images'))); //middleware pour la Gestion de la ressource image de façon statique
    
// chemins enregistrement des routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/posts', commentRoutes);
app.use('/api/posts', likePostRoutes);
app.use('/api/posts', dislikePostRoutes);
app.use('/api/comments', likeCommentRoutes);
app.use('/api/comments', dislikeCommentRoutes);

// Connexion à la db
async function dbConnect() {
  try {
    await sequelize.authenticate();
    console.log('Connexion réussie !');
  } catch (error) {
    console.error('Impossible de se connecter', error);
  }
}
dbConnect();
    
// Exportation application - donne l'accès depuis les autres fichiers et notamment le serveur Node afin qu'il retourne l'application
module.exports = app;