import PostService from '../service/post.resource'

export const post = {
  namespaced: true,
  state: {
    errorMessage: '',
    createdPost: { status: '' },
    modifyPost: { status: '' },
    deletedPost: { status: '' },
    post: {},
    like: {},
    likes: [],
    comments: [],
    comment: {},
    posts: [],
  },

  actions: {
    AllPostsStore ({ dispatch, commit }, params = {}) {
      commit('reset_store')
      dispatch('getAllPosts', params)
    },

    getAllPosts({ state, commit }, params = {}) {
      let userIdParams = ''
      if (params.userId) {
        userIdParams = `&userId=${params.userId}`
      }
      return PostService.getAllPosts(userIdParams)
      .then(response => {
          commit('all_posts', state.posts.concat(response.data))
      })
      .catch(() => {
        commit('messageFailure', 'Problème de connexion')
      })
    },

    createPost({ commit }, post) {
      return new Promise((resolve, reject) => {
        PostService.createPost(post)
        .then(response => {
          commit('createPostSuccess', post)
          resolve(response);
        })
        .catch(function(error) {
          commit('messageFailure')
          reject(error);
        });
      })
    },
  
    getOnePost({ commit }, post) {
      return PostService.getOnePost(post)
      .then((response) => {
        commit('getOnePost', response.data);
        return Promise.resolve(response);
      },
      (error) => {
        commit('messageFailure')
        return Promise.reject(error)
      })
    },

    deletePost({commit}, postId) {
      return new Promise((resolve, reject) => {
        PostService.deletePost(postId)
        .then(response => {
          commit('deleteSuccess', postId)
          resolve(response);
        })
        .catch(function(error) {
          commit('messageFailure')
          reject(error);
        });
      })
    },
  },
  mutations: {
    all_posts (state, post) {
      state.posts = post
    },
    reset_store (state) {
      state.posts = []
    },
    createPostSuccess(state, post, posts) {
      state.post = post
      state.posts = posts
    },
    getOnePost(state, post) {
      state.post = post;
      state.message = "Post récupéré !";
    },
    deleteSuccess(state, postId) {
      state.posts = state.posts.filter(post => post.id !== postId)
    },
    messageFailure(state, message) {
      state.message = message
    }
  }
}