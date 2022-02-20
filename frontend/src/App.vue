<template>
  <div id="app">
    <Notifications />
    <router-view />
  </div>
</template>

<script>
import { userIsLogged } from "../src/service/auth.resource";
import Notifications from '../src/components/Notifications';
import router from "../src/router";
export default {
  name: 'App',
  components: {
    Notifications
  },
  setup() {
    if (!userIsLogged()) {
      return router.push("/");
    }
    else {
      return router.push("/home");
    }
  },
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
