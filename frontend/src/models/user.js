// modèle de données
export default class User {
    constructor(photoProfil, username, email, password, bio, isAdmin) {
      this.photoProfil = photoProfil;
      this.username = username; 
      this.bio = bio;
      this.email = email;
      this.password = password;
      this.isAdmin = isAdmin
    }
  }