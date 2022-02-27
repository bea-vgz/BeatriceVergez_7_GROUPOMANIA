<template>
  <div>
    <div @submit="createPost" >
      <PostFormulaire
        @onFileSelected="onFileSelected"
        v-model="content"
        :onFormSubmit="didSubmitForm"
        :isCreating="true"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import PostFormulaire from '../components/PostFormulaire'
export default {
  name: 'CreatePost',
  components: {
    PostFormulaire
  },
  data () {
    return {
      content: '',
      image: '',
      file: '',
      didSubmitForm: false,
    }
  },
  methods: {
    ...mapActions(['displayNotification']),

    onFileSelected(file) {
      this.image = file
    },

    createPost(event) {
      const post = new FormData();
      post.append('image', this.image);
      post.append('content', this.content);
      this.$store.dispatch("post/createPost", post)
      .then(() => {
        this.$store.dispatch('post/AllPostsStore')
        this.displayNotification('Post créé !')
        this.resetForm(event)
      })
    },

    resetForm(event) {
      event.target.reset()
      this.content = ''
      this.image = ''
      this.didSubmitForm = !this.didSubmitForm
    },
  }
}
</script>

<style lang="scss">
</style>