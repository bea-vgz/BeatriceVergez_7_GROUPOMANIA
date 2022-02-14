<template>
  <div class="window-notif"></div>
</template>

<script>
import { mapState} from 'vuex'
export default {
  name: 'Notifications',
  watch: {
    message (newMessage) {
      if (!newMessage) return
      this.$bvToast.toast(newMessage, {
        title: 'Notifications',
        autoHideDelay: 4000
      })
    }
  },
  computed: {
    ...mapState(['notifications']),
    message () {
      return this.notifications.message
    }
  }
}
</script>