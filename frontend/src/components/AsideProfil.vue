<template>
    <aside class="profil_account bg-white sidebar">
        <div class="sidebar__widget">
          <div class="contanier_presentation bg-white border-b py-8">
            <img v-if="currentUser" :src="currentUser.photoProfil"  class="avatar" alt="Avatar" ref="file" type="file" />
            <img v-else src="//ssl.gstatic.com/accounts/ui/avatar_1x.png"  class="avatar" alt="Avatar" />
            <h1 v-if="currentUser" class="username">{{ currentUser.username }}</h1>
            <p v-if="currentUser"><strong>Membre depuis le :</strong> {{ getDateWithoutTime(user.createdAt) }}</p>
          </div>
          <div class="optionsProfil bg-white">
            <div class="option"> 
              <router-link to="/profil" class="nav_centrale underline"><b-icon icon="person-circle" class="mr-2 mr-lg-2"></b-icon> Mon compte</router-link>
            </div>
            <div class="option">
              <router-link to="/password" class="nav_centrale underline"><b-icon icon="pencil-square" class="mr-2 mr-lg-2"></b-icon> Modifier mot de passe</router-link>
            </div>
            <div class="option">
              <a @click="logout" class="text-decoration-none underline"><b-icon icon="box-arrow-in-left" class="mr-2 mr-lg-2"></b-icon> Me déconnecter </a>
              <confirm-dialogue ref="confirmDialogue"></confirm-dialogue>
            </div>
            <div class="option">
              <a @click="openConfirm" class="nav_centrale delete_user underline"><b-icon icon="trash-fill" class="mr-2 mr-lg-2 delete_icon"></b-icon>Supprimer mon compte</a>
            </div>
          </div>
        </div>
        <ConfirmDialogue
          :reveal="revealConfirm"
          :title="titleModal"
          :action="action"
          @closeConfirm="closeConfirm"
          :userId="user.id"
          :message="message"
        ></ConfirmDialogue>
      </aside>
</template>
<script>
import { mapActions } from 'vuex'
import router from "../router";
import ConfirmDialogue from "../components/ConfirmDialogue.vue"
export default {
    name: 'AsideProfil',
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      }
    },
    data() {
      return {
        user: {},
        revealConfirm: false,
        titleModal: "",
        action: "",
        message:""
      }
    },
    components: {
      ConfirmDialogue
    },
    methods: {
    ...mapActions(['displayNotification']),
      
    logout() {
      this.$store.dispatch('auth/logout')
      .then(() => {
        this.displayNotification("Vous avez été déconnecté !")
        router.push('/');
      })
    },
    openConfirm() {
      this.revealConfirm = true;
      this.titleModal = "Suppression du compte";
      this.message = "Cette action est irréversible. Cela supprimera automatiquement tous vos posts et commentaires.. Êtes-vous sûr de vouloir supprimer votre compte ?";
      this.action = 'deleteUser';
    },
    closeConfirm(e) {
      if(e.target === e.currentTarget) {
        this.revealConfirm = false;
        this.displayNotification("Le compte n'a pas été supprimé !")
      }
    },
    getDateWithoutTime(date) {
      return require("moment")(date).format("DD-MM-YYYY");
    },
  },
}
</script>

<style scoped>
.sidebar__widget {
  position: sticky;
  top: 150px;
  height: 250px;
}
h1 {
  font-size: 30px;
  color : #e22600;
  margin-bottom: 1rem;
}
.avatar {
  width: 85px;
  height: 85px;
  object-fit: cover;
  object-position: center;
  border-radius: 100%;
  margin-bottom: 1rem;
}
.bg-white {
  background-color: #fff;
  border-color: #fff;
}
.profil_account {
    padding: 4rem;
    border-right-width: 1px;
    display: flex;
    flex-direction: column;
    text-align: center;
    border-color: rgba(231, 233, 244);
}
.delete_user {
  color: #e22600
}
.delete_icon {
  color: #e22600;
}
.option {
    display: flex;
    text-align: center;
    align-items: left;
    font-family: 'Barlow', sans-serif;
    font-size: 15px;
    border-radius: 2rem;
    border: solid 0.15rem #fff;
    background-color: #fff;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    width: 100%;
}
a {
    text-decoration: none;
    color:#242424;
    font-size : 1rem;
    font-weight: bold;
    cursor: pointer;
}
a:hover{
    color: #e22600;
    cursor: pointer;
    text-decoration: none;
}
.icon {
  padding-right: 0.7rem;
  color: #9e9e9e
}
.border-b {
  border-bottom: 1px solid #ccc;
  margin-bottom: 1rem;
}
.py-8 {
  padding-bottom: 2rem;
}
.underline {
  position: relative;
}
.underline::before{
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 0;
  height: 2px;
  background-color: #e22600;
  transition: 0.6s cubic-bezier(0.25, 1, 0.5, 1);
}
@media (hover: hover) and (pointer: fine) {
  .underline:hover::before{
    left: 0;
    right: auto;
    width: 100%;
  }
}
@media screen and (min-width: 280px) and (max-width: 896px) {
  .container_account {
    display: flex;
    flex-direction: column;
  }
  .option {
    display: flex;
    justify-content: center;
  }
  .sidebar__widget {
    height: 420px;
  }
}
</style>