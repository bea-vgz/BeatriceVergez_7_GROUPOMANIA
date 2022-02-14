<template>
  <div v-if="post.Comments">
    <button
      v-if="post.Comments.length > 0 && !allCommentsDisplayed"
      @click="AllPostsComments"
      class="display-comments"
      aria-label="Afficher les commentaires"
    >
      <span>{{ post.Comments.length }} commentaire(s)</span>
    </button>
    <div class="comment mb-2 text-left" v-for="comment in comments" :key="comment.id">
      <Comment
        @commentDeleted="AllPostsComments"
        :comment="comment"
        :post="post"
      />
    </div>

    <CommentFormulaire 
      @commentCreated="AllPostsComments"
      :post="post" 
    />
  </div>
</template>

<script>
import CommentFormulaire from '../components/CommentFormulaire.vue'
import Comment from '../components/Comment.vue'
import CommentService from '../service/comment.resource'
export default {
  name: 'AllComments',
  components: {
    CommentFormulaire,
    Comment
  },
  props: ['post'],
  data () {
    return {
      comments: [],
      allCommentsDisplayed : false
    }
  },
  methods: {
    AllPostsComments() {
      const postId = this.post.id;
      CommentService.getPostsComments(postId)
      .then((res) => (
        this.comments = res.data,
        this.allCommentsDisplayed = true ))
    },
    getDateWithoutTime(date) {
      return require("moment")(date).format("DD-MM-YYYY HH:mm");
    },
  },
}
</script>
<style lang="scss">
.display-comments {
  color: #747474;
  background-color: transparent;
  border: none;
  font-weight: 600;
  padding: 1rem 1rem;
  &:hover {
    cursor: pointer;
    color: #e22600
  }
  &:focus {
    background: none;
    outline: none;
  }
}
.underline{
  position: relative;
}
.underline::before{
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 0;
  height: 2px;
  background-color: #e22600;
  transition: width 0.6s cubic-bezier(0.25, 1, 0.5, 1);
}
@media (hover: hover) and (pointer: fine) {
  .underline:hover::before{
    left: 0;
    right: auto;
    width: 100%;
  }
}
</style>