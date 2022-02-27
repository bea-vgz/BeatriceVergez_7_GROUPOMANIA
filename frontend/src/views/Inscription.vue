<template>
  <div class="Inscription">
  <!-- Signup -->
    <div class="signUp">
      <Signup />
    </div>
  </div>
</template>

<script>
import Signup from '@/components/Signup.vue'
export default {
  name: 'Inscription',
  components: {
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