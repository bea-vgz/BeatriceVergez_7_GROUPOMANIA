import AuthService from '../service/auth.resource';

  export const auth = {
    namespaced: true,
    state: {
      statut: '',
      user: {},
      userInfos: {
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
          commit('loginFailure');
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
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error.response.data);
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
          commit ('deleteFailure')
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
        commit('getUsersFailure')
        return Promise.reject(error)
      })
    },

    getOneUser({ commit }) {
      return AuthService.getOneUser()
      .then((user) => {
        commit('getUser');
        return Promise.resolve(user);
      },
      (error) => {
        commit('getUserFailure')
        return Promise.reject(error)
      })
    },
  },

  mutations: {
    loginSuccess(state, user) {
      state.user = user;
    },
    loginFailure(state) {
      state.user = null;
    },
    logout(state) {
      state.user = null;
    },
    registerSuccess(state, user) {
      state.user = user;
    },
    registerFailure(state) {
      state.user = null;
    },
    deleteSuccess(state) {
      state.user = null
    },
    deleteFailure(state, message) {
      state.message = message
    },
    updateSuccess(state, user) {
      state.user = user;
      state.message = "Profil modifié !";
    },
    getUsers(state, users) {
      state.users = users;
      state.message = "Users récupérés !";
    },
    getUsersFailure(state) {
      state.users = null;
      state.message = "Users non récupérés !";
    },
    getUser(state, user) {
      state.user = user;
      state.message = "User récupéré !";
    },
    getUserFailure(state) {
      state.user = null;
      state.message = "User non récupéré !";
    },
  },

  getters : {
    user: (state) => {
      return state.user
    }
  },
}
