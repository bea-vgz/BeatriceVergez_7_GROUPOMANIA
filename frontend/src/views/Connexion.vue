<template>
  <div class="Connexion">
  <!-- Home -->
    <div class="login">
    <Login />
    </div>

  <!-- Footer -->
    <div class="footer">
    <Footer />
    </div>

  <router-view />
  </div>
</template>

<script>
// @ is an alias to /src
import Footer from '@/components/Footer.vue';
import Login from '@/components/Login.vue'
export default {
  name: 'Connexion',
  components: {
    Footer,
    Login
  }
}
</script>

<style scoped>
.Connexion {
  font-family: 'Barlow', sans-serif;
  margin: auto;
  width: 100%;
  height: 100%;
}
</style>