<template>
  <div class="container-profil">
    <Header />
    <div v-if="user">
      <b-row class="justify-content-center align-items-center flex-column">
        <b-col cols="12" lg="6" class="align-items-center">
          <div class="infoUser bg-white">
            <div class="text-center userInfo">
              <img :src="user.photoProfil" alt="Photo de profil de l'user" class="avatarProfil">
              <h1>{{ user.username }}</h1>
              <p><strong>Membre depuis le :</strong> {{ getDateWithoutTime(user.createdAt) }}</p>
              <p><strong>Email : </strong>{{ user.email }}</p>
              <p><strong>Biographie :</strong>{{ user.bio }}</p>
              <AdminDeleteUser
                v-if="currentUser.isAdmin"
                :user="user"
              />
            </div>
          </div>
        </b-col>
      </b-row>
      <div class="line mb-3"></div>
      <b-row class="row justify-content-center align-items-center flex-column">
        <b-col cols="12" lg="6" class="align-items-center">
          <div class="posts" v-if="user.Posts.length > 0 ">
            <h2 class="text-center posts-title"><strong> • SES POSTS • </strong></h2>
            <AllPosts :userId="this.$route.params.userId" />
          </div>
          <p v-else class="text-center"><strong>Ce membre n'a encore publié aucun post 😉</strong></p>
        </b-col>
      </b-row>
      <!-- Footer -->
      <Footer />
    </div>
  </div>
</template>

<script>
import AllPosts from "../components/AllPosts.vue";
import AuthService from '../service/auth.resource'
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import AdminDeleteUser from "../components/AdminDeleteUser.vue"
export default {
  name: 'ProfilUser',
  components: {
    Header,
    Footer,
    AllPosts,
    AdminDeleteUser
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  watch: {
    $route (to, from) {
      console.log(from, to)
      window.location.reload()
    }
  },
  data () {
    return {
      userId:'',
      user: '',
      post: '',
      posts: []
    }
  },
  async mounted () {
    this.getOneUser()
  },
  methods: {
    getOneUser() {
      AuthService.getOneUser(this.$route.params.userId)
        .then((res) => {
          this.user = res.data
        })
    },
    getDateWithoutTime(date) {
      return require("moment")(date).format("DD-MM-YYYY");
    },
  },
}
</script>

<style lang="scss">
.container-profil {
  background: #F2F2F2;
}
h2 {
  margin-bottom: 2rem;
  margin-top: 1rem;
  font-size: 1.6rem;
  font-weight: 600;
}
h1 {
  font-size: 30px;
  margin-bottom: 1rem;
}
.infoUser {
  padding: 3.5rem;
  height: auto;
  border-radius: 1.25rem;
  box-shadow: 0 0 16px #0000002e;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 6rem;
  margin-bottom: 3rem;
}
.avatarProfil {
  width: 85px;
  height: 85px;
  object-fit: cover;
  object-position: center;
  border-radius: 100%;
  margin-bottom: 1rem;
}
.line {
  display: block;
  width: 100%;
  height: 1px;
  margin-top: 0.8rem;
  margin-bottom: O.8rem;
  background-color: rgba(192, 192, 192, 0.5);
}
.user-name {
  font-size: 20px;
  font-weight: bold;
}
.posts-title {
  letter-spacing: 1px;
}
@media screen and (min-width: 280px) and (max-width: 767px) {
  .user-name {
    font-size: 16px;
  }
  .div-user-profile-picture {
    width: 95px;
    height: 95px;
  }
  .profile-main-picture {
    height: 95px;
  }
}
</style>