<template>
  <div class="Inscription">
  <!-- Signup -->
    <div class="signUp">
    <Signup />
    </div>

  <!-- Footer -->
    <div class="footer">
    <Footer />
    </div>

  <router-view />
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue';
import Signup from '@/components/Signup.vue'
export default {
  name: 'Inscription',
  components: {
    Footer,
    Signup
  }
}
</script>

<style scoped>
.Inscription {
  font-family: 'Barlow', sans-serif;
  margin: auto;
  width: 100%;
  height: 100%;
}
</style>