<template>
  <div class="fixed inset-0 transition-opacity">
    <EditButton
      customClass="post-button"
      classCollapse="post-btn-collapsed"
      :editingPost="true"
      :isCreator="post.UserId == currentUser.userId"
      :isAdmin="currentUser.isAdmin"
      @onDelete="openConfirm"
      :elementId="post.id"
      modifyText="Modifier le post"
      deleteText="Supprimer le post"
    >
    <b-modal
      :id="`modal-${post.id}`"
      title="Modifier la publication"
      ok-title="Enregistrer"
      ok-variant="light"
      @ok="updatePost"
      ok-only
    >
    <b-form>
      <PostFormulaire
        :image="post.image"
        @onFileSelected="onFileSelected"
        v-model="post.content"
      />
    </b-form>
    </b-modal>
    </EditButton>
    <ConfirmDialogue
      :reveal="revealConfirm"
      :title="titleModal"
      :action="action"
      @closeConfirm="closeConfirm"
      :post="post"
      :message="message"
    ></ConfirmDialogue>
  </div>
</template>

<script>
import PostService from "../service/post.resource";
import { mapActions } from 'vuex'
import PostFormulaire from '../components/PostFormulaire.vue'
import EditButton from '../components/EditButton.vue'
import ConfirmDialogue from "../components/ConfirmDialogue.vue"
export default {
  name: 'ModifyPost',
  components: {
    PostFormulaire,
    EditButton,
    ConfirmDialogue
  },
  props: ['post'],
  data () {
    return {
      image: '',
      file: '',
      revealConfirm: false,
      titleModal: "",
      action: "",
      message:""
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    this.image = this.post.image
  },
  methods: {
    ...mapActions(['displayNotification']),
    toggleActions () {
      this.areActionsVisible = !this.areActionsVisible
    },
    onFileSelected(file) {
      this.image = file;
    },
    updatePost(){
      const post = new FormData();
      post.append('image', this.image);
      post.append('content', this.post.content);
      PostService.modifyPost(this.post.id, post)
      .then(() => {
        this.$store.dispatch('post/AllPostsStore')
        this.displayNotification('Post modifié !')
      })
    },
    
    openConfirm() {
      this.revealConfirm = true;
      this.titleModal = "Suppression du post";
      this.message = "Cette action est irréversible. Êtes-vous sûr de vouloir supprimer votre post ?";
      this.action = 'deletePost';
    },
    closeConfirm(e) {
      if(e.target === e.currentTarget) {
        this.revealConfirm = false;
        this.displayNotification("Le post n'a pas été supprimé !")
      }
    },
  }
}
</script>

<style lang="scss">
.modal-body {
  padding: 1rem 1rem 0 1rem;
}
.modal-title {
  color: #747474;
}
.btn-light {
  border: none;
  color: #747474;
  font-weight: 500;
  display: block;
  width: 100%;
  margin: 0 1rem 1rem 1rem;
}
.modal-content {
  font-family: "Barlow", sans-serif;
  border: none;
  box-shadow: 0px 1px 5px 4px rgba(204, 204, 204, 0.2);
}
.modal-backdrop {
  background-color: rgba(108, 117, 125, 0.2);
}
</style>