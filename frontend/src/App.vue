<template>
  <div id="app">
    <Notifications />
    <router-view />
  </div>
</template>

<script>
import Notifications from '../src/components/Notifications'
export default {
  name: 'App',
  components: {
    Notifications
  }
}
</script>

<style lang="scss">
#app {
  @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&display=swap');
  font-family: "Barlow", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
