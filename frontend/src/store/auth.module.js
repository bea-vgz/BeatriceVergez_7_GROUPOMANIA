import AuthService from '../service/auth.resource';

export const auth = {
  namespaced: true,
  state: {
    statut: '',
    user: {
      id:'',
      username: '',
      email: '',
      bio: '',
      photoProfil: '',
      isAdmin: '',
    },
    users:[],
    token: null,
    isAdmin: false,
  },
  actions: {
    login({ commit }, user) {
      return AuthService.login(user)
      .then(user => {
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          commit('messageFailure');
          return Promise.reject(error);
        }
      );
    },
    
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },

    signup({ commit }, user) {
      return AuthService.signup(user)
      .then(response => {
          commit('registerSuccess');
          return Promise.resolve(response);
        },
        error => {
          commit('messageFailure');
          return Promise.reject(error.response);
        }
      );
    },

    deleteUser({commit}, id) {
      return AuthService.deleteUser(id)
      .then((response) => {
          commit ('deleteSuccess')
          return Promise.resolve(response);
        },
        (error) => {
          commit ('messageFailure')
          return Promise.reject(error)
        }
      )
    },
    
    getAllUsers({ commit }, value) {
      return AuthService.getAllUsers(value)
      .then((users) => {
        commit('getUsers');
        return Promise.resolve(users);
      },
      (error) => {
        commit('messageFailure')
        return Promise.reject(error)
      })
    },
  },

  mutations: {
    loginSuccess(state, user) {
      state.user = user;
    },
    logout(state) {
      state.user = null;
    },
    registerSuccess(state, user) {
      state.user = user;
    },
    deleteSuccess(state) {
      state.user = null
    },
    getUsers(state, users) {
      state.users = users;
      state.message = "Users récupérés !";
    },
    messageFailure(state, message) {
      state.message = message
    }
  }
}