<template>
  <div id="nav" class="border_nav bg-white sticky-top" >
    <div class="navigation">
      <div class="nav_logo">
        <img class="logo" src="../assets/icon_groupomania.png" @click="scrollToTop" alt="Groupomania"/>
        <img class="logo-groupo" src="../assets/logo_groupo.png" @click="scrollToTop" alt="Groupomania"/>
        <div class="userSearch">
          <UserSearch />
        </div>
      </div>
        <div class="accessPosts">
          <router-link to="/home" aria-label="Fil d'actualité" class="nav_centrale text-decoration-none"><b-icon icon="house-door" class="mr-2 mr-lg-2"></b-icon>ACCUEIL</router-link>
        </div>

        <div class="notifUser">
          <div class="menu-item" @click="isOpen = !isOpen" >
            <button class="accessUser">
              <img v-if="currentUser" :src="currentUser.photoProfil"  class="avatar icone" alt="Avatar" ref="file" type="file"/>
              <img v-else src="//ssl.gstatic.com/accounts/ui/avatar_1x.png"  class="avatar icone" alt="Avatar"/>
              <span v-if="currentUser" class="username">
                <strong style="text-transform: uppercase"> {{ currentUser.username }} </strong>
              </span>
            </button>
            <transition name="fade" apear>
              <div class="sub-menu" v-if="isOpen">
                <div class="menu-item">
                  <router-link to="/profil"><b-icon icon="person-circle" class="mr-2 mr-lg-2"></b-icon>Mon compte</router-link>
                </div>
                <div class="menu-item">
                  <a @click="logout" class="text-decoration-none"><b-icon icon="box-arrow-in-left" class="mr-2 mr-lg-2"></b-icon> Me déconnecter </a>
                </div>
              </div>
            </transition>
          </div>
        </div>
    </div>
    <MenuBurger />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import router from "../router";
import MenuBurger from "../components/MenuBurger.vue"
import UserSearch from '../components/UserSearch';
export default {
  
  name: 'Header',
  data() {
    return {
      userSearch: null,
      isOpen: false,
      image:'',
    }
  },
  components: {
    UserSearch,
    MenuBurger
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  methods: {
    ...mapActions(['displayNotification']),
    async logout() {
      this.$store.dispatch('auth/logout');
      this.displayNotification('Vous avez été déconnecté.')
      router.push('/');
    },
    scrollToTop() {
      window.scrollTo({
        top:0,
        left:0,
        behavior: 'smooth'
      });
    }
  }
}
</script>

<style scoped>
header {
  margin: 0;
}
#nav {
  width: 100%;
}
nav .menu-item, .sub-menu {
  background-color: #fff;
  width: max-content;
  position: absolute;
  padding: 1.5rem;
  transform: translateX(-30%);
}
.fade-enter-active,
.fade-leave-active {
  transition: all .2s ease-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.sub-menu {
  cursor: pointer;
}
.menu-item {
  padding: 0.7rem;
  margin-right: 2rem;
  color:#242424;
}
.navigation {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  background-color: #fff,
}
#nav a {
  font-weight: bold;
  color: #242424;
  text-decoration: none;
}
#nav a:hover {
  cursor: pointer;
  color: #e22600;
}
.nav_centrale {
  padding: 2rem;
}
.text-decoration-none {
  text-decoration: none;
}
.logo {
  display: block;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  width: 85%;
  cursor: pointer;
}
.logo-groupo {
  display: none;
  cursor: pointer;
}
.profil_icon {
  padding-right: 0.5rem;
}
.notifUser, .nav_logo {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.bell_notif {
  background: #e4e4e4;
  padding: 0.8rem;
  border-radius: 100%;
  width: 1rem;
  height: 1rem;
}
.border_nav {
  box-shadow: 0 8px 8px 0 rgba(95, 99, 122, 0.123);
  border-width: 0;
  z-index: 1;
  box-sizing: border-box;
}
button {
  padding: 0.2rem;
  border-radius: 2rem;
  border: solid 0.15rem #e22600;
  background-color: #e22600;
}
.accessUser{
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 1rem;
  color: #fff;
}
.profil, .deconnexion {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 1rem;
}
.username {
  text-decoration: none;
  font-weight: bolder;
  color: #FFF
}
.avatar {
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
  padding: 0.5rem;
  object-fit: cover;
  object-position: center;
  margin-right: 0.3rem;
}
.menu_toggle {
  display: none;
}
@media screen and (min-width: 280px) and (max-width: 769px) {
/* menu toggle */
  .menu_toggle {
    display: contents;
  }
  .notifUser, .accessPosts {
    display: none;
  }
  .logo {
    display: none;
  }
  .navigation {
    width: 100%;
    height: 5rem;
  }
  .logo-groupo {
    display: block;
    width: 45%;
    float: right;
    padding: 1rem;
  }
  .userSearch {
    display: none;
  }
}
</style>