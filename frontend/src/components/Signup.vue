<template>

<div id="signupUser">

    <section class="container_intro">

      <div class="identity">
        <img src="../assets/groupomania_logo.png" alt="Groupomania"/>
        <h1>Bienvenue sur votre réseau social !</h1>
        <p>- Inscrivez-vous et échangez avec vos collègues 🤓 🖥️ -</p>
      </div>

    </section>
    <form class="formulaire" @submit.prevent="signup">
        <h2>S'inscrire</h2>
    <!-- Username input -->
        <label for="username"> 👤 Pseudo * : </label>
        <input type="text" id="username" v-model="user.username" placeholder="Pseudo" required="required">

    <!-- Email input -->
        <label for="email"> 📧  Email * : </label>
        <div class="d-flex">
          <input type="text" name="email" id="email" v-model="user.email" autocomplete="email" placeholder="Email (pseudo)" required="required" >
          <span class="input-group-text">@groupomania.com</span>
        </div>
    <!-- Password input -->
        <label for="password"> 🔒  Mot de passe * : 
          <button type="button" class="buttonEyes" @click="show = !show" >
            <font-awesome-icon icon="eye" alt="mot de passe visible" class="eyes text-color" v-show="show" />
            <font-awesome-icon icon="eye-slash" alt="mot de passe invisible" class="eyes text-color" v-show="!show" />
          </button>
        </label>
        <input id="password" name="password" v-model="user.password" placeholder="Mot de passe" required="required" :type="show ? 'text' : 'password'"/>

    <!-- Bio input -->
        <label for="bio"> 💬  Biographie : </label>
        <input type="bio" id="bio" v-model="user.bio" placeholder="Quelques mots sur vous : âge, message, poste...">

        <p class="champs"><strong>Les champs indiqués par une * sont obligatoires</strong></p>
        
        <button class="buttonInsc" type="submit" value="Submit">
            <strong>S'inscrire</strong>
        </button>
        
        <button type="submit" value="Submit" class="buttonCompte" >
            <router-link style="text-decoration: none; color: inherit;" to="/"> Déjà un compte ? </router-link>
        </button>

    </form>
  </div>
</template>

<script>
import router from "../router";
import User from '../models/user'
import { mapActions } from 'vuex'
export default {
    name: 'Signup',
    components: {
    },
    data () {
        return {
          user: new User('', '', '', '', '', ''),
          show: false
        }
    },
    computed: {
      loggedIn() {
        return this.$store.state.auth.status.loggedIn;
      }
    },
    methods: {
    ...mapActions(['displayNotification']),
    signup() {
      this.$store.dispatch('auth/signup', this.user)
      .then(data => {
        this.message = data.message;
        this.displayNotification("Création du compte réussi ! Il ne reste plus qu'à vous connecter pour continuer !")
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
    },
  },
};
</script>

<style scoped>
#signupUser {
  display: flex;
  justify-content: space-around;
  text-align: center;
  align-items: center;
  font-family: 'Barlow', sans-serif;
  background-color: #F2F2F2;
  max-width: 100%;
  width: 100%;
  padding-bottom: 80px;
  padding-top: 80px;
}
#photoProfil {
  text-align: center;
}
label {
  text-align: left;
  margin-top: 0.6rem;
  margin-left: 0.5rem;
  font-size: 0.9rem;
}
h1{
  font-size: 2rem;
  font-weight: 600;
  margin-top : -0.5rem;
}
h2 {
  font-size: 1.6rem;
  font-weight: 600;
  margin-top : 1rem;
  margin-bottom: 1rem
}
.champs {
  font-size: 0.8rem;
  color: #e22600;
  text-align: left;
  margin-left: 0.5rem;
}
.formulaire {
  font-family: 'Barlow', sans-serif;
  padding: 1.5rem;
  border-radius: 1rem;
  display: flex;
  max-width: 100%;
  width: 40%;
  margin-right: 7rem;
  flex-direction: column;
  justify-content: center;
  background-color: #ffffff;
  box-shadow: 0 0 16px #0000002e;
}
.identity img {
  max-width: 100%;
  width: 55%;
  margin: 0;
}
input {
  font-family: 'Barlow', sans-serif;
  padding: 0.8rem;
  border: solid 2px #F2F2F2;
  border-radius: 1rem;
  margin: 0.3rem;
  max-width: 100%;
  width: 100%;
}
.buttonInsc {
  font-family: 'Barlow', sans-serif;
  padding: 0.5rem;
  border-radius: 1rem;
  border: solid 0.15rem #e22600;
  background-color: #e22600;
  color: #fff;
  margin-top: 1rem;
  display: block;
  width: 40%;
  margin-left: auto;
  margin-right: auto;
}
.buttonInsc:hover {
  background-color: #fff;
  border: solid 0.15rem #e22600;
  color: #e22600;
  cursor: pointer;
  font-weight: bold;
}
.buttonCompte {
  font-family: 'Barlow', sans-serif;
  font-weight: 600;
  padding: 0.5rem;
  color: #242424;
  margin: 0.5rem;
  border: none;
  background: none;
  text-decoration: none;
}
.buttonCompte:hover {
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer
}
.buttonEyes {
  background: none;
  border: none;
  cursor: pointer;
  color: #e22600;
  padding: 0.3rem;
  border-radius: 100%;
  margin-left: 0.7rem;
}
@media screen and (min-width: 280px) and (max-width: 769px) {
  #signupUser {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    padding-top: 33px;
  }
  .container_intro {
    margin-bottom: 3rem;
  }
  .identity {
    padding: 2rem;
  }
  .formulaire {
    margin: 0rem;
    width: 90%;
  }
  .identity img {
    width: 90%;
    margin: 0;
  }
}

@media screen and (min-width: 780px) and (max-width: 1180px) {
  #signupUser {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    padding-top: 33px;
  }
  .container_intro {
    margin-bottom: 3rem;
  }
  .identity {
    padding: 2rem;
  }
  .formulaire {
    margin: 0rem;
    width: 90%;
  }
  .identity img {
    width: 90%;
    margin: 0;
  }
}
</style>