<template>
  <div>
    <div class="buttons-likeDislike d-flex">
      <button
        v-b-modal="`modal-likes-${comment.id}`"
        @click="getAllLikes"
        v-if="likesCount > 0"
        class="like-btn d-flex align-items-center my-2 text-left"
        aria-label="Afficher les likes"
      >
      <div
        class="svg-container-like d-flex justify-content-center align-items-center"
      >
        <svg style="width:10px;height:10px" viewBox="0 0 24 24">
          <path
            fill="#fff"
            d="M23,10C23,8.89 22.1,8 21,8H14.68L15.64,3.43C15.66,3.33 15.67,3.22 15.67,3.11C15.67,2.7 15.5,2.32 15.23,2.05L14.17,1L7.59,7.58C7.22,7.95 7,8.45 7,9V19A2,2 0 0,0 9,21H18C18.83,21 19.54,20.5 19.84,19.78L22.86,12.73C22.95,12.5 23,12.26 23,12V10M1,21H5V9H1V21Z"
          />
        </svg>
      </div>
      <span class="likes-number ml-1">{{ likesCount }} </span>
      </button>
      <button
        v-b-modal="`modal-dislikes-${comment.id}`"
        @click="getAllDislikes"
        v-if="dislikesCount > 0"
        class="like-btn d-flex align-items-center my-2 text-left"
        aria-label="Afficher les likes"
      >
      <div
        class="svg-container-dislike d-flex justify-content-center align-items-center"
      >
        <svg style="width:10px;height:10px" viewBox="0 0 24 24">
          <path
            fill="#fff"
            d="M19,15H23V3H19M15,3H6C5.17,3 4.46,3.5 4.16,4.22L1.14,11.27C1.05,11.5 1,11.74 1,12V14A2,2 0 0,0 3,16H9.31L8.36,20.57C8.34,20.67 8.33,20.77 8.33,20.88C8.33,21.3 8.5,21.67 8.77,21.94L9.83,23L16.41,16.41C16.78,16.05 17,15.55 17,15V5C17,3.89 16.1,3 15,3Z"
          />
        </svg>
      </div>
      <span class="likes-number ml-1">{{ dislikesCount }}</span>
      </button>
    </div>

    <b-modal v-if="likesCount" :id="`modal-likes-${comment.id}`" :title="`${likesCount} personne(s) aime(nt) ce commentaire`">
      <div v-for="like_comment in likes" :key="like_comment.id">
        <router-link
          :to="{ name: 'ProfilUser', params: { userId: like_comment.UserId } }"
          ><div class="d-flex align-items-center">
            <div class="d-flex UserAvatar">
              <router-link :to="{ name: 'ProfilUser', params: { userId: like_comment.UserId } }">
                <img :src="like_comment.User.photoProfil" alt="Photo de profil de l'user" class="commentUserPhoto">
              </router-link>
            </div>
            <p>{{ like_comment.User.username }} </p>
          </div></router-link
        >
      </div>
      <div slot="modal-footer"></div>
    </b-modal>
    <b-modal v-if="dislikesCount" :id="`modal-dislikes-${comment.id}`" :title="`${dislikesCount} personne(s) n'aime(nt) pas ce commentaire`">
      <div v-for="dislike_comment in dislikes" :key="dislike_comment.id">
        <router-link
          :to="{ name: 'ProfilUser', params: { userId: dislike_comment.UserId } }"
          ><div class="d-flex align-items-center">
            <div class="d-flex UserAvatar">
              <router-link :to="{ name: 'ProfilUser', params: { userId: dislike_comment.UserId } }">
                <img :src="dislike_comment.User.photoProfil" alt="Photo de profil de l'user" class="commentUserPhoto">
              </router-link>
            </div>
            <p>{{ dislike_comment.User.username }} </p>
          </div>
        </router-link>
      </div>
      <div slot="modal-footer"></div>
    </b-modal>
  </div>
</template>

<script>
import DislikeCommentService from '../service/dislike_comment.resource'
import LikeCommentService from '../service/like_comment.resource'
export default {
  name: 'AllLikesComment',
  props: ['comment', 'likesCount', 'dislikesCount'],
  data () {
    return {
      likes: [],
      dislikes: []
    }
  },
  methods: {
    getAllLikes() {
      const commentId = this.comment.id;
      LikeCommentService.getAllLikesOneComment(commentId)
      .then((res) => (
        this.likes = res.data.allLikes
      ))
    },

    getAllDislikes() {
      const commentId = this.comment.id;
      DislikeCommentService.getAllDislikesOneComment(commentId)
      .then((res) => (
        this.dislikes = res.data.allDislikes
      ))
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: #212529;
  &:hover,
  &:visited {
    color: #212529;
    text-decoration: underline;
    font-weight:600;
  }
}
.like-btn {
  background-color: transparent;
  border: none;
  &:focus {
    outline: none;
  }
}
.modal-body {
  padding: 1rem 1rem 0 1rem;
}
.modal-title {
  color: #747474;
  font-size: 16px;
}
.modal-content {
  border: none;
  box-shadow: 0px 1px 5px 4px rgba(204, 204, 204, 0.2);
}
.modal-backdrop {
  background-color: rgba(69, 76, 82, 0.2);
}
.modal-footer {
  padding: 0;
  border-top: none;
}
.likes-number {
  font-size: 12px;
  font-weight: 700;
  color: #747474
}
.UserAvatar {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}
.infoPostUser {
  padding-left: 1.5rem;
}
.commentUserPhoto {
  width: 50px;
  height: 50px;
  object-fit: cover;
  object-position: center;
  border-radius: 100%;
}
.svg-container-like {
  border-radius: 100%;
  background-color: #0e60d3;
  width: 18px;
  height: 18px;
}
.svg-container-dislike {
  border-radius: 100%;
  background-color: #e22600;
  width: 18px;
  height: 18px;
}
.buttons-likeDislike{
  display: flex;
  justify-content: center;
}
.svg-container {
  border-radius: 100%;
  background-color: rgb(32, 120, 244);
  width: 18px;
  height: 18px;
}
.div-like-picture {
  width: 30px;
  height: 30px;
  margin-bottom: 1rem;
  margin-right: 0.7rem;
}
.like-profile-picture {
  height: 30px;
}
@media screen and (min-width: 280px) and (max-width: 767px) {
  .modal-title {
    font-size: 14px;
  }
  .likes-number {
    font-size: 12px;
    font-weight: 700;
    color: #747474
  }
}
</style>