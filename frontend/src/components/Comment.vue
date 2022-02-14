<template>
  <div class="comment">
    <div class="d-flex">
      <div class="UserAvatar" v-if="comment.User">
        <router-link :to="{ name: 'ProfilUser', params: { userId: comment.UserId } }" >
          <img :src="comment.User.photoProfil" alt="Photo de profil de l'user" class="commentUserPhoto">
        </router-link>
      </div>
      <div class="comment-box" v-if="comment.User">
        <router-link :to="{ name: 'ProfilUser', params: { userId: comment.UserId } }">
          <p class="comment-username">
            {{ comment.User.username }}
          </p>
        </router-link>
        <input
          v-if="isEditing"
          ref="inputContent"
          v-model="comment.content"
          @keydown.enter.exact.prevent
          @keyup.enter.exact="modifyComment"
          @keydown.enter.shift.exact="newline"
          type="text"
          class="input-content border-0 my-2"
          aria-label="Modifier le commentaire"
        />
        <p v-else class="mb-0">{{ comment.content }}</p>
      </div>
      <div class="position-relative">
        <EditButton
          customClass="comment-button"
          classCollapse="comment-btn-collapsed"
          :isCreator="comment.UserId == currentUser.userId"
          :isAdmin="currentUser.isAdmin"
          @clickedEditButton="startEditing"
          @onDelete="deleteComment"
          modifyText="Modifier"
          deleteText="Supprimer"
        />
      </div>
    </div>
    <div class="footer-comment d-flex">
      <p class="comment-date">
        {{ getDateWithoutTime(comment.updatedAt) }}
      </p>
      <div class="d-flex justify-content-around">
        <div class="button-dis-like d-flex" v-if="comment.Like_comments">
            <AllLikesComment
            :post="post"
            :comment="comment" 
            :likesCount="comment.Like_comments.length"
            />
          </div>
        <button
          @click="likeOrNotComment"
          class="react-btn"
          aria-label="Liker ou disliker"
        >
          <div v-if="likeThisComment">
            <path
              fill="rgb(14, 96, 211)"
            />
          </div>
          <div v-else>
            <path
              fill="currentColor"
            />
          </div>

          <span :class="`like-comment ${likeThisComment ? 'blue' : ''}`"> J'aime</span>
        </button>
        <div class="button-dis-like d-flex" v-if="comment.Dislike_comments">
          <AllLikesComment
          :post="post"
          :comment="comment" 
          :dislikesCount="comment.Dislike_comments.length"
          />
        </div>
        <button
          @click="dislikeOrNotComment"
          class="react-btn footer-btn "
          aria-label="Disliker"
        >
          <div v-if="dislikeThisComment">
            <path
              fill="rgb(226, 38, 0)"
            />
          </div>
          <div v-else>
            <path
              fill="currentColor"
            />
          </div>
          <span :class="`dislike-comment ${dislikeThisComment ? 'red' : ''}`">Je n'aime pas</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import DislikeCommentService from "../service/dislike_comment.resource";
import LikeCommentService from "../service/like_comment.resource";
import { mapActions } from 'vuex'
import CommentService from "../service/comment.resource";
import EditButton from '../components/EditButton.vue';
import AllLikesComment from '../components/AllLikesComment.vue'
export default {
  name: 'Comment',
  props: ['post', 'comment'],
  components: {
    EditButton,
    AllLikesComment
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
   data () {
    return {
      isEditing: false,
      likeThisComment: false,
      dislikeThisComment: false,
      likesCount: '',
      dislikesCount:''
    }
  },
  mounted() {
    this.getLikeOnOneComment()
    this.getDislikeOnOneComment()
  },
  methods: {
     ...mapActions(['displayNotification']),
    getDateWithoutTime(date) {
      return require("moment")(date).format("DD-MM-YYYY HH:mm");
    },
    startEditing() {
      this.isEditing = true
    },
    newline () {
      this.comment.content = `${this.comment.content}\n`
    },
    deleteComment() {
        const comment = this.comment.id
        const postId = this.post.id;
        CommentService.deleteComment(postId, comment)
        .then(() => {
          this.$emit('commentDeleted', this.comment)
          this.displayNotification('Commentaire supprimé !')
        },
        error => {
          console.log(error);
        });
    },
    modifyComment() {
      const postId = this.post.id;
      const comment = this.comment.id
      CommentService.modifyComment(postId, comment,
        { content: this.comment.content })
      .then(() => {
        this.comment.updatedAt = comment.updatedAt
        this.isEditing = false
        this.displayNotification('Commentaire modifié !')
      },
      error => {
        console.log(error);
      });
    },


    async likeOrNotComment() {
      const commentId = this.comment.id;
      const res = await LikeCommentService.likeComment(commentId)
      if (res.data.like !== this.likeThisComment) {
        this.comment.Like_comments.length += res.data.like ? 1 : -1
      }
      this.likeThisComment = res.data.like
    },

    async dislikeOrNotComment() {
      const commentId = this.comment.id;
      const res = await DislikeCommentService.dislikeComment(commentId)
      if (res.data.dislike !== this.dislikeThisComment) {
        this.comment.Dislike_comments.length += res.data.dislike ? 1 : -1
      }
      this.dislikeThisComment = res.data.dislike
    },

    getLikeOnOneComment(){
    const commentId = this.comment.id;
      LikeCommentService.getLikeOnOneComment(commentId)
      .then((res) => (
        this.likeThisComment = res.data.like
      ))
    },
    getDislikeOnOneComment(){
    const commentId = this.comment.id;
      DislikeCommentService.getDislikeOnOneComment(commentId)
      .then((res) => (
        this.dislikeThisComment = res.data.dislike
      ))
    }
  }
}
</script>

<style lang="scss">
.comment {
  margin-top: 0.5rem;
}
.comment-button {
  position: static !important;
}
.input-content:focus {
  border-radius: 0.25rem;
  outline: none;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
} 
.comment-date {
  margin-left: 45px;
  margin-right: 1rem;
  font-size: 0.7rem;
  color: #747474;
  margin-top: 0.4rem;
}
.comment-box {
  background-color: #F2F2F2;
  padding: 0.75rem;
  border-radius: 0.25rem;
  margin-bottom: 0;
  width: 100%;
}
.comments {
  background-color: #F2F2F2;
  border-radius: 1.5rem;
  padding-left: 0.6rem;
  padding-right: 1rem;
  align-self: flex-start;
  margin-top: 0.3rem;
}
.commentaire {
  font-size: 0.8rem;
}
.UserAvatar {
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
}
.comment-username {
  font-weight: 600;
  color:#000000
}
a {
  text-decoration: none;
}
.commentUserPhoto {
  width: 35px;
  height: 35px;
  object-fit: cover;
  object-position: center;
  border-radius: 100%;
}
.d-flex {
  display: flex;
  align-self: flex-start;
}
.react-btn {
  background: white;
  border: none;
  color: #747474;
  border-radius: 0.25rem;
  font-weight: bold;
}
.react-btn:focus {
  border: none !important;
  outline: none !important;
}
.react-btn:hover {
    color: #747474 !important;
}
.blue {
  color: rgb(10, 91, 204);
}
.red {
  color: rgb(196, 33, 12);
}
.footer-comment {
  display: flex;
}
.like-comment, .dislike-comment {
  font-size: 0.7rem;
}
@media screen and (min-width: 280px) and (max-width: 769px) {
  .comment-date {
  margin-left: 40px;
  margin-right: 0.5rem;
  font-size: 0.6rem;
  }
  .react-btn {
    padding: none;
  }
}
</style>