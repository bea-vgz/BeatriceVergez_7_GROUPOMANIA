<template>
  <div>
    <div class="option justify-content-center">
      <a @click="openConfirm" class="delete_user underline"><b-icon icon="trash-fill" class="mr-2 mr-lg-3 delete_icon"></b-icon>Supprimer ce compte utilisateur</a>
    </div>
    <ConfirmDialogue
      :reveal="revealConfirm"
      :title="titleModal"
      :action="action"
      @closeConfirm="closeConfirm"
      :userId="user.id"
      :message="message"
    ></ConfirmDialogue>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ConfirmDialogue from '@/components/ConfirmDialogue.vue';
export default {
  name: 'AdminDeleteUser',
  data() {
    return {
      revealConfirm: false,
      titleModal: "",
      action: "",
      message:""
    }
  },
  components: {
    ConfirmDialogue
  },
  props: ['user'],
  methods: {
    ...mapActions(['displayNotification']),

    openConfirm() {
      this.revealConfirm = true;
      this.titleModal = "Suppression du compte";
      this.message = "Cette action est irréversible. Cela supprimera automatiquement tous les posts et commentaires.. Êtes-vous sûr de vouloir supprimer ce compte ?";
      this.action = "deleteAccountUser"
    },
    closeConfirm(e) {
      if(e.target === e.currentTarget) {
        this.revealConfirm = false;
        this.displayNotification("Le compte n'a pas été supprimé !")
      }
    },
  }
}
</script>

<style scoped>
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
  transition: 0.6s cubic-bezier(0.25, 1, 0.5, 1);
}
.delete_user {
  color: #e22600
}
.option {
  display: flex;
  text-align: center;
  font-family: 'Barlow', sans-serif;
  font-size: 15px;
  padding: 0.5rem;
  width: 100%;
}
a{
  text-decoration: none;
  color:#242424;
  font-size : 1rem;
  font-weight: bold;
    cursor: pointer;
}
a:hover{
  color: #e22600;
  cursor: pointer;
  text-decoration: none;
}
.icon {
  padding-right: 0.7rem;
  color: #9e9e9e
}
@media (hover: hover) and (pointer: fine) {
  .underline:hover::before{
    left: 0;
    right: auto;
    width: 100%;
  }
}
</style>