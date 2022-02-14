<template>
  <div>
    <div class="container_comments">
      <div>
        <router-link :to="{ name: 'Profil' }" >
          <div class="UserAvatar">
            <img :src="currentUser.photoProfil" alt="Photo de profil de l'user" class="commentUserPhoto">
          </div>
        </router-link>
      </div>
      <form class="w-100" @submit="createComment">
        <div>
          <input
            :id="`comment-area-${post.id}`"
            v-model="content"
            @keydown.enter.exact.prevent
            @keyup.enter.exact="createComment"
            @keydown.enter.shift.exact="newline"
            class="comment-area border-0"
            placeholder="Écrivez un commentaire ici..."
            aria-label="Écrire un commentaire"
          >
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import CommentService from '../service/comment.resource'
import { mapActions } from 'vuex'
export default {
  name: 'CommentFormulaire',
  data () {
    return {
      content: ''
    };
  },
  props: ['post'],
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    ...mapActions(['displayNotification']),
    createComment(){
      const postId = this.post.id;
      const { comment } = CommentService.createComment(
      { content: this.content }, postId )
        .then(() => {
          this.content = ''
          this.$emit('commentCreated', comment)
          this.displayNotification('Commentaire créé !')
        })
    },
    newline () {
      this.content= `${this.content}\n`
    },
  }
};
</script>
<style scoped>
.container_comments {
  display: flex;
  margin-top: 0.3rem;
}
.form_comment {
  width: 100%;
}
.comment-area {
  background-color: #F2F2F2;
  width: 95%;
  height: 35px;
  border: none;
  padding-left: 0.8rem;
  border-radius: 2rem;
}
.container_user {
  margin-right: 0.5rem;
  height: 45px;
}
.avatar {
  width: 35px;
  height: 35px;
  object-fit: cover;
  object-position: center;
  border-radius: 100%;
}
</style>