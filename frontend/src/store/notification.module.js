export default {
    state: {
      message: ''
    },
    mutations: {
      addNotifications (state, message) {
        state.message = message
      },
      removeNotifications (state) {
        state.message = ''
      }
    },
    actions: {
      displayNotification ({ commit }, message) {
        commit('addNotifications', message)
        setTimeout(() => commit('removeNotifications'), 3000)
      }
    }
  }