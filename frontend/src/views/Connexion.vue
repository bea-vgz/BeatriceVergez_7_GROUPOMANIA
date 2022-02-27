<template>
  <div class="Connexion">
  <!-- Home -->
    <div class="login">
      <Login />
    </div>
  </div>
</template>

<script>
import Login from '../components/Login.vue'
export default {
  name: 'Connexion',
  components: {
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