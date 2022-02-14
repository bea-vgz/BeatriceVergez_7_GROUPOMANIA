<template>
  <div class="profil">
    <Header/>
    <div class="container_account">
      <AsideProfil />
      <div class="info-password justify-content-center align-items-center flex-column">
        <b-col cols="12" lg="12" class="align-items-center">
          <div class="infoUser bg-white">
            <h1><strong>Mot de passe</strong></h1>
            <div class="card">
            <div>
              <label for="password"> 🔒  Mot de passe actuel : </label>
              <div class="inputPassword">
                <input v-if="currentUser" v-model="currentUser.password" placeholder="Mot de passe actuel" class="form-row_input" id="password" type='password' />
              </div>
            </div>
            <div>
              <label for="newPassword"> 🔒  Nouveau mot de passe : </label>
              <div class="inputPassword">
                <input v-model="newPassword" class="form-row_input" id="newPassword" placeholder="Votre nouveau mot de passe" :type="show ? 'text' : 'password'" />
                <button type="button" class="buttonEyes" @click="show = !show" >
                  <font-awesome-icon icon="eye" alt="mot de passe visible" class="eyes text-color" v-show="show" />
                  <font-awesome-icon icon="eye-slash" alt="mot de passe invisible" class="eyes text-color" v-show="!show" />
                </button>
              </div>
            </div>
            <div>
              <label for="confirmPassword">🔒  Confirmer le mot de passe : </label>
              <div class="inputPassword">
                <input v-model="confirmPassword" class="form-row_input" id="confirmPassword" placeholder="Confirmez votre nouveau mot de passe" :type="show ? 'text' : 'password'" />
                <button type="button" class="buttonEyes" @click="show = !show" >
                  <font-awesome-icon icon="eye" alt="mot de passe visible" class="eyes text-color" v-show="show" />
                  <font-awesome-icon icon="eye-slash" alt="mot de passe invisible" class="eyes text-color" v-show="!show" />
                </button>
              </div>
            </div>
            <button class="buttonSave save-btn d-lg-block"  aria-label="Sauvegarder" type="submit" @click="modifyPassword()">
              <router-link to="/profil" class="save">Sauvegarder</router-link>
            </button>
            <div v-if="message">
              {{ message }}
            </div>
          </div>
          </div>
        </b-col>
      </div>
    </div>
    <!-- Footer -->
    <div class="footer">
        <Footer />
    </div>
  <router-view />
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import router from "../router";
  import Header from '@/components/Header'
  import Footer from '@/components/Footer'
  import AuthService from "../service/auth.resource"
  import AsideProfil from "../components/AsideProfil.vue"
  export default {
    name: 'ModifyPassword',
    components: {
      Header,
      Footer,
      AsideProfil
    },
    props: ['user'],
    data () {
      return {
        newPassword: '',
        confirmPassword:'',
        show: false,
        message:''
      }
    },
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      }
    },
    methods: {
      ...mapActions(['displayNotification']),
      modifyPassword() {
        if (this.newPassword === this.confirmPassword) {
          const password = {
            password: this.newPassword,
          }
          const userId = this.currentUser.userId
          AuthService.modifyPassword(userId, password)
          .then(() => {
            this.currentUser.userId
            this.displayNotification('Mot de passe modifié avec succès !')
            router.push('/home');
          })
        }
        else {
          console.log(this.message = "Le mot de passe n'a pas pu être mis à jour")
          alert("Oups, une erreur est survenue")
        }
      },
  },
}
</script>

<style scoped>
.container_account {
  display: flex;
  max-width: 100%;
  width: 100%;
}
h1 {
  font-size: 30px;
  color : #e22600;
  margin-bottom: 1rem;
}
.profil {
  background-color: #F2F2F2;
  display: flex;
  flex-direction: column;
}
.bg-white {
  background-color: #fff;
  border-color: rgba(231, 233, 244);
}
.info-password{
  margin-left: auto;
  margin-right: auto;
}
.infoUser {
  padding: 3.5rem;
  max-width: 100%;
  width: 100%;
  height: auto;
  border-radius: 1.25rem;
  box-shadow: 0 0 16px #0000002e;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 6rem;
  margin-bottom: 6rem;
  width: 40rem;
}
.card {
  border: none
}
input {
  font-family: 'Barlow', sans-serif;
  border: solid 2px #F2F2F2;
  border-radius: 1rem;
  margin-bottom: 1rem;
  padding-left: 0.8rem;
  line-height: inherit;
  color: inherit;
  height: 2rem;
  width: 80%;
  text-align: left;
}
a {
  text-decoration: none;
  color:#242424;
  font-size : 1rem;
  font-weight: bold;
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
.save-btn {
  background-color: #ff2600e5;
  color: white;
  border-radius: 1rem;
  border: none;
  margin-top: 1rem;
  margin-right: auto;
  margin-left: auto;
  padding: 0.375rem 0.75rem;
  font-weight: bold;
  cursor: pointer;
}
.save-btn:hover,
.save-btn:focus,
.save-btn:active {
  background-color: #e22600;
  color: white;
  outline: none;
}
.save {
  color: #fff;
}
.buttonEyes {
  background: none;
  border: none;
  cursor: pointer;
  color: #e22600;
}
@media screen and (min-width: 280px) and (max-width: 769px) {
  .container_account {
    display: flex;
    flex-direction: column;
  }
  .infoUser {
    margin-top: 3rem;
    margin-bottom: 3rem;
    text-align: center;
    width: auto;
  }
  .option {
    display: flex;
    justify-content: center;
  }
  .card {
    text-align: left;
  }
}
</style>