<template>
  <div>

    <Header />
    <div class="container_home">

    <div class="wrapper">
      <div class="wrapper__text text-align">
      <h1 class="text text_hello">Hello,</h1>
    </div>
    <div class="wrapper__text text-align">
      <h1 class="text text--highlight animate-delay-3">Bienvenue sur votre fil d'actualité <br /></h1>
    </div>
    <div  v-if="currentUser" class="wrapper__text text-align">
      <h1 class="text text--highlight animate-delay-6">{{ currentUser.username }} ! 😁</h1>
    </div>
    </div>
    
    <CreatePost />
    
    <b-row class="row justify-content-center align-items-center flex-column">
      <b-col cols="12" lg="6" class="align-items-center">
        <AllPosts />
      </b-col>
    </b-row>
    </div>
 <!-- Footer -->
  <Footer />
  </div>
</template>

<script>
import Footer from '../components/Footer.vue';
import Header from '../components/Header.vue';
import CreatePost from '../components/CreatePost.vue';
import AllPosts from '../components/AllPosts.vue';
export default {
  name: 'HomePage',
  data() {
		return {
      posts: [],
		};
	},
  components: {
    Header,
    Footer,
    CreatePost,
    AllPosts,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
}
</script>

<style lang="scss" scoped>
.container_home {
  font-family: 'Barlow', sans-serif;
  background-color: #F2F2F2;
  max-width: 100%;
  width: 100%;
  padding-bottom: 132px;
  padding-top: 100px;
  display: flex;
  flex-direction: column;
}
h1 {
  max-width: 100%;
  width: auto;
  margin-left: auto;
  margin-right: auto;
}
.text-align {
  text-align:center;
  margin-left: 1rem;
  margin-right: 1rem;
}

body {
  position: relative;
}
.wrapper {
  margin-top: 4rem;
  transform: translateY(-50%);
  &__text {
    display: block;
    line-height: 1.3;
    overflow: hidden;
  }
}
.text {
  margin: 0;
  animation: animate 0.6s cubic-bezier(0.2, 0.6, 0.2, 1);
  animation-fill-mode: backwards;
}
.animate-delay-3 {
  animation-delay: 0.3s;
}
.animate-delay-6 {
  animation-delay: 0.6s;
}
.text_hello {
  font-weight: bolder;
  color: #e22600;
}

@keyframes animate {
  0% {
    opacity: 0;
    transform: translateY(30vh);
  }

  100% {
    opacity: 1;
    transform: translateY(0%);
  }
}
</style>