<template>
  <div>
    <div v-if="!post">
      <Error404 />
    </div>
    <div class="card-post">
      <div class="user">
        <div class="UserAvatar" v-if="post.User">
          <router-link :to="{ name: 'ProfilUser', params: { userId: post.UserId } }">
            <img :src="post.User.photoProfil" alt="Photo de profil de l'user" class="postUserPhoto">
          </router-link>
          <div class="infoPostUser">
            <p class="font-weight-bold mb-0" alt="Pseudo de l'user">{{ post.User.username }}</p>
            <p class="date">Post créé le : {{ getDateWithoutTime(post.createdAt) }}</p>
          </div>
        </div>
        <ModifyPost :post="post" />
        <div class="card-text">
          <p class="contentPost"> {{ post.content }}</p>
        </div>
        <div class="post my-1 mb-lg-4">
          <img v-b-modal="`modal-photo-${post.id}`" :src="`${post.image}`" alt="image" class="img">
          <b-modal
            :id="`modal-photo-${post.id}`"
            size="xl"
            class="modal-photo fade bd-example-modal-xl"
            header-class="header-style"
          >
          <div slot="modal-title">
            <img class="logoGroupo" src="../assets/icon_groupomania.png" alt="Groupomania"/>
          </div>
          <div class="align-items-center justify-content-center">
            <img class="modal-photo-img" :src="post.image" alt="image" />
          </div>
          <div slot="modal-footer"></div>
        </b-modal>
      </div>
      </div>
      <div class="button-dis-like d-flex" v-if="post.Like_posts && post.Dislike_posts">
        <AllLikesPost 
          :post="post" 
          :likesCount="post.Like_posts.length"
          :dislikesCount="post.Dislike_posts.length"
        />
      </div>

      <div class="line"></div>

      <div class="footer d-flex">
        <button
          @click="likeOrNotPost"
          class="react-btn footer-btn "
          aria-label="Liker ou disliker"
        >
          <svg
            v-if="likeThisPost"
            style="width:24px;height:24px"
            viewBox="0 0 24 24"
          >
            <path
              fill="rgb(14, 96, 211)"
              d="M23,10C23,8.89 22.1,8 21,8H14.68L15.64,3.43C15.66,3.33 15.67,3.22 15.67,3.11C15.67,2.7 15.5,2.32 15.23,2.05L14.17,1L7.59,7.58C7.22,7.95 7,8.45 7,9V19A2,2 0 0,0 9,21H18C18.83,21 19.54,20.5 19.84,19.78L22.86,12.73C22.95,12.5 23,12.26 23,12V10M1,21H5V9H1V21Z"
            />
          </svg>
          <svg v-else style="width:24px;height:24px" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M5,9V21H1V9H5M9,21A2,2 0 0,1 7,19V9C7,8.45 7.22,7.95 7.59,7.59L14.17,1L15.23,2.06C15.5,2.33 15.67,2.7 15.67,3.11L15.64,3.43L14.69,8H21C22.11,8 23,8.9 23,10V12C23,12.26 22.95,12.5 22.86,12.73L19.84,19.78C19.54,20.5 18.83,21 18,21H9M9,19H18.03L21,12V10H12.21L13.34,4.68L9,9.03V19Z"
            />
          </svg>

          <span :class="`ml-2 ${likeThisPost ? 'blue' : ''}`">J'aime</span>
        </button>
        <button
          @click="DislikeOrNotPost"
          class="react-btn footer-btn "
          aria-label="Disliker"
        >
          <svg
            v-if="dislikeThisPost"
            style="width:24px;height:24px"
            viewBox="0 0 24 24"
          >
            <path
              fill="rgb(226, 38, 0)"
              d="M19,15H23V3H19M15,3H6C5.17,3 4.46,3.5 4.16,4.22L1.14,11.27C1.05,11.5 1,11.74 1,12V14A2,2 0 0,0 3,16H9.31L8.36,20.57C8.34,20.67 8.33,20.77 8.33,20.88C8.33,21.3 8.5,21.67 8.77,21.94L9.83,23L16.41,16.41C16.78,16.05 17,15.55 17,15V5C17,3.89 16.1,3 15,3Z"
            />
          </svg>
          <svg v-else style="width:24px;height:24px" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M19,15V3H23V15H19M15,3A2,2 0 0,1 17,5V15C17,15.55 16.78,16.05 16.41,16.41L9.83,23L8.77,21.94C8.5,21.67 8.33,21.3 8.33,20.88L8.36,20.57L9.31,16H3C1.89,16 1,15.1 1,14V12C1,11.74 1.05,11.5 1.14,11.27L4.16,4.22C4.46,3.5 5.17,3 6,3H15M15,5H5.97L3,12V14H11.78L10.65,19.32L15,14.97V5Z"
            />
          </svg>

          <span :class="`ml-2 ${dislikeThisPost ? 'red' : ''}`">Je n'aime pas</span>
        </button>
        <button
          class="react-btn footer-btn "
          @click="focusInput(post)"
          aria-label="Commenter"
        >
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9M10,16V19.08L13.08,16H20V4H4V16H10Z"
            />
          </svg>
          <span class="ml-2">Commenter</span>
        </button>
      </div>
      <div class="line mb-3"></div>
      <AllComments :post="post" />
    </div>
  </div>
</template>

<script>
import Error404 from '../components/Error404.vue';
import LikePostService from "../service/like_post.resource";
import DislikePostService from "../service/dislike_post.resource";
import AllComments from "../components/AllComments.vue";
import AllLikesPost from "./AllLikesPost.vue";
import ModifyPost from '../components/ModifyPost.vue';
export default {
  data() {
    return {
      comments: [],
      comment: {},
      likeThisPost: false,
      dislikeThisPost: false,
      likesCount: '',
      dislikesCount:''
    };
  },
  props: ['post'],
  components: {
    AllComments,
    AllLikesPost,
    ModifyPost,
    Error404
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    this.getLikeOnOnePost()
    this.getDislikeOnOnePost()
  },
  methods: {
    getDateWithoutTime(date) {
      return require("moment")(date).format("DD-MM-YYYY HH:mm");
    },
    async likeOrNotPost() {
      const postId = this.post.id;
      const res = await LikePostService.likePost(postId)
      if (res.data.like !== this.likeThisPost) {
        this.post.Like_posts.length += res.data.like ? 1 : -1
      }
      this.likeThisPost = res.data.like
    },

    async DislikeOrNotPost() {
      const postId = this.post.id;
      const res = await DislikePostService.dislikePost(postId)
        if (res.data.dislike !== this.dislikeThisPost) {
        this.post.Dislike_posts.length += res.data.dislike ? 1 : -1
      }
      this.dislikeThisPost = res.data.dislike
    },

    getLikeOnOnePost() {
    const postId = this.post.id;
      LikePostService.getLikeOnOnePost(postId)
      .then((res) => (
        this.likeThisPost = res.data.like
      ))
    },
    getDislikeOnOnePost() {
    const postId = this.post.id;
      DislikePostService.getDislikeOnOnePost(postId)
      .then((res) => (
        this.dislikeThisPost = res.data.dislike
      ))
    },
    focusInput() {
      document.getElementById(`comment-area-${this.post.id}`).focus()
    },
  },
};
</script>
<style scoped>
.card-post {
  padding: 2rem;
  border-radius: 1.25rem;
  box-shadow: 0 0 6px #0000002e;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 100%;
  margin-bottom: 3rem;
}
.img {
  max-width: 100%;
  width: 100%;
  height: 350px;
  object-fit: cover;
  object-position: center;
  cursor: zoom-in;
}
.line {
  display: block;
  width: 100%;
  height: 1px;
  margin-top: 0.8rem;
  margin-bottom: O.8rem;
  background-color: rgba(192, 192, 192, 0.5);
}
.blue {
  color: #0e60d3;
}
.red {
  color: #e22600;
}
.container_button {
  display: flex;
  justify-content: center;
  justify-items: center;
  text-align: center;
}
.accessUser {
  float: right;
}
.accessUser:hover {
  background: none;
  color: #e22600
}
.UserAvatar {
  display: flex;
  align-items: center;
}
.infoPostUser {
  padding-left: 1.5rem;
}
.postUserPhoto {
  width: 50px;
  height: 50px;
  object-fit: cover;
  object-position: center;
  border-radius: 100%;
}
a:hover {
  color:#e22600;
  cursor: pointer;
}
.contentPost {
  margin-top: 1rem;
  margin-bottom: 1rem
}
.date {
  font-size: 0.8rem;
  font-style: italic;
  color: #242424;
}
.react-btn {
  background: white;
  border: none;
  margin-top: 1rem;
  color: #747474;
  border-radius: 0.25rem;
  font-weight: bold;
  padding: 0.375rem 0.75rem;
}
.react-btn:focus {
  border: none !important;
  outline: none !important;
}
.react-btn:hover {
  color: #747474 !important;
  background-color: rgba(108, 117, 125, 0.1) !important;
}
.opacity1 div img {
	opacity: 1;
	-webkit-transition: .3s ease-in-out;
	transition: .3s ease-in-out;
}
.opacity1 div:hover img {
	opacity: .5;
}
.img_container{
  display:grid;
}
.img_container>*{
  grid-area:1/1/-1/-1; 
  /* raccourci pour grid-row et grid-column */
}
.a-txt{
  display:flex;
  justify-content:center;
  align-items:center;
  color:#000;
  background:#ffffff8f;
  opacity: 0;
  transition:opacity .8s;
  font-weight: 700;
}
.a-txt:hover{
  opacity: 1;
  cursor: pointer;
}
a{
  text-decoration: none;
}
.logoGroupo {
  width: 50px;
}
.modal-photo-img {
  width: 100%;
  height: 500px;
  object-fit: cover;
  object-position: center;
}
</style>