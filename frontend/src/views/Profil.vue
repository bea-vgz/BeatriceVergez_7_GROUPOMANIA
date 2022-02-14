<template>
  <div>
    <Header />
    <div class="profil">
    <div class="container_account">
      <AsideProfil />
      <div class="info-profil justify-content-center align-items-center flex-column">
        <b-col cols="12" lg="12" class="align-items-center">
          <div class="infoUser bg-white">
            <h1><strong>Mon profil</strong> </h1>
            <div class="userInfo">
              <p v-if="currentUser"><strong>Pseudo : </strong>{{ currentUser.username }}</p>
              <p v-if="currentUser"><strong>Email : </strong>{{ currentUser.email }}</p>
              <p v-if="currentUser"><strong>Biographie :</strong>{{ currentUser.bio }}</p>
              <p v-if="currentUser"><strong>Identifiant :</strong> {{ currentUser.userId }}</p>
              <div v-if="currentUser.isAdmin"><p for="admin"><strong>Statut :</strong>Admin</p></div>      
            </div>
            <div class="line mb-3"></div>
            <a title="Modifier mon profil" @click="displayModal" class="icone">
              <b-icon icon="pencil-fill" class="mr-2 mr-lg-2 modif_icon"></b-icon> 
              Modifier mon profil
            </a>
            <modify-profil v-show="modifyProfil" @close="closeModal" />
          </div>
        </b-col>
        <b-col col-lg="12" class="align-items-center">
          <AllPosts :userId="currentUser.userId" />
        </b-col>
      </div>
    </div>
  <!-- Footer -->
    <Footer />
    </div>
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import modifyProfil from '@/components/ModifyProfil.vue';
import AllPosts from "../components/AllPosts.vue";
import { mapActions } from 'vuex';
import AsideProfil from "../components/AsideProfil.vue"
export default {
  name: "Profil",
  components: {
    Header,
    Footer,
    modifyProfil,
    AllPosts,
    AsideProfil
  },
  data() {
    return {
      modifyProfil: false,
      image:'',
      user:'',
      posts: [],
      post: ''
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    ...mapActions(['displayNotification']),

    displayModal() {
      this.modifyProfil = true;
    },
    closeModal() {
      this.modifyProfil = false;
    },
  },
}
</script>

<style scoped>
.container_account {
  display: flex;
  max-width: 100%;
}
h1 {
  font-size: 30px;
  color : #e22600;
  margin-bottom: 1rem;
}
h2 {
  margin-bottom: 2rem;
  margin-top: 1rem;
  font-size: 1.6rem;
  font-weight: 600;
}
.profil {
  background-color: #F2F2F2;
  display: flex;
  flex-direction: column;
}
.info-profil{
  margin-left: auto;
  margin-right: auto;
}
.bg-white {
  background-color: #fff;
  border-color: #fff;
}
.posts {
  margin-left: auto;
  margin-right: auto;
}
.infoUser {
  padding: 3.5rem;
  max-width: 100%;
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
.userInfo {
  margin-top: 1rem;
}
.line {
  display: block;
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin-top: 1.2rem;
  margin-bottom: 1.2rem;
}
.modif_icon {
  color: #e22600;
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
.icone {
  color: #e22600;
}
.posts-title {
  letter-spacing: 1px;
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
}
@media screen and (min-width: 769px) and (max-width: 896px) {
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
}
</style>