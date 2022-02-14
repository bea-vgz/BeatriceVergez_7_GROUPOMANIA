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
  
  getOnePost({ commit }) {
    return PostService.getOnePost()
    .then((post) => {
      commit('getOnePost');
      return Promise.resolve(post);
    },
    (error) => {
      commit('getOnePostFailure')
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
    createPostSuccess(state, post) {
      state.posts.unshift(post)
      state.posts = [...state.posts]
    },
    createPostFailure(state) {
      state.createdPost.status = 'Not created'
      state.post = null
    },
    getOnePost(state, post) {
      state.post = post;
      state.message = "Post récupéré !";
    },
    getOnePostFailure(state) {
      state.post = null;
      state.message = "Post non récupéré !";
    },
    deleteSuccess(state) {
      state.post = null
    },
    messageFailure(state, message) {
      state.message = message
    },
    getPostsLikes(state, likes) {
      state.post.likes = likes;
      state.message = "Likes récupérés !";
    },
    getPostsLikesFailure(state) {
      state.likes = null;
      state.message = "Likes non récupérés !";
    },
}

}