<template>
  <transition name="modal-fade">
    <div class="fixed inset-0 transition-opacity">
      <form @submit.prevent="update" class="modifyProfil" v-if="currentUser">
        <div class="bg-white"></div>
          <div class="img">
            <img :src="file || currentUser.photoProfil" alt="Avatar" ref="file" type="file">
          </div>
          <b-form>
            <button
              class="btn-change btn-block w-50 mx-auto mb-3 mt-3 d-flex align-items-center justify-content-center"
              @click="triggerInput"
              type="button"
              aria-label="Changer ma photo de profil"
            >
              <svg
                style="width:24px;height:24px;margin-bottom:5px"
                viewBox="0 0 24 24"
              >
                <path
                  fill="rgb(239, 42, 16)"
                  d="M15.5,9C16.2,9 16.79,8.76 17.27,8.27C17.76,7.79 18,7.2 18,6.5C18,5.83 17.76,5.23 17.27,4.73C16.79,4.23 16.2,4 15.5,4C14.83,4 14.23,4.23 13.73,4.73C13.23,5.23 13,5.83 13,6.5C13,7.2 13.23,7.79 13.73,8.27C14.23,8.76 14.83,9 15.5,9M19.31,8.91L22.41,12L21,13.41L17.86,10.31C17.08,10.78 16.28,11 15.47,11C14.22,11 13.16,10.58 12.3,9.7C11.45,8.83 11,7.77 11,6.5C11,5.27 11.45,4.2 12.33,3.33C13.2,2.45 14.27,2 15.5,2C16.77,2 17.83,2.45 18.7,3.33C19.58,4.2 20,5.27 20,6.5C20,7.33 19.78,8.13 19.31,8.91M16.5,18H5.5L8.25,14.5L10.22,16.83L12.94,13.31L16.5,18M18,13L20,15V20C20,20.55 19.81,21 19.41,21.4C19,21.79 18.53,22 18,22H4C3.45,22 3,21.79 2.6,21.4C2.21,21 2,20.55 2,20V6C2,5.47 2.21,5 2.6,4.59C3,4.19 3.45,4 4,4H9.5C9.2,4.64 9.03,5.31 9,6H4V20H18V13Z"
                />
              </svg>
              <span class="button-text ml-2 d-none d-md-block">
                Changer ma photo
              </span>
            </button>
            <div class="d-flex align-items-center">
              <b-col sm="10">
                <input
                  ref="fileUpload"
                  class="d-none"
                  type="file"
                  aria-label="image"
                  @change="onFileChange"
                />
              </b-col>
            </div>
            <div class="d-flex align-items-center">
              <b-col sm="2" class="d-none d-lg-block p-0">
                <label for="username"><strong> Pseudo </strong></label>
              </b-col>
              <b-col sm="10">
                <b-form-input
                  id="username"
                  type="text"
                  placeholder="Pseudo"
                  v-model="currentUser.username"
                  class="text-dark mb-2 pl-lg-3"
                ></b-form-input>
              </b-col>
            </div>
            <div class="d-flex align-items-center">
              <b-col sm="2" class="d-none d-lg-block p-0">
                <label for="bio"><strong> Biographie </strong></label>
              </b-col>
              <b-col sm="10">
                <b-form-input
                  id="bio"
                  type="text"
                  placeholder="Biographie"
                  v-model="currentUser.bio"
                  class="mb-2 pl-lg-3"
                ></b-form-input>
              </b-col>
            </div>
            <div v-if="currentUser.isAdmin" class="d-flex align-items-center">
              <b-col sm="2" class="d-none d-lg-block p-0">
                <label for="admin"><strong>  Statut </strong></label>
              </b-col>
              <b-col sm="10">
                <b-form-input
                  id="admin"
                  type="text"
                  placeholder="Admin"
                  class="mb-2 pl-lg-3"
                  disabled
                ></b-form-input>
              </b-col>
            </div>
          </b-form>
          <button
            type="submit"
            class="save-btn d-lg-block" 
            aria-label="Enregistrer"
          >
            Enregistrer
          </button>
          <button type="button" aria-label="fermer" @click="close" class="d-lg-block button_close">
            <b-icon icon="x-square-fill" class="mr-lg-2 modif_icon"></b-icon> 
            <span> Fermer </span>
          </button>
      </form>
    </div>
  </transition>
</template>

<script>
import { mapActions } from 'vuex'
import AuthService from "../service/auth.resource";
import router from "../router";
export default {
  name: "ModifyProfil",
  data() {
    return {
      image: null,
      file: null,
      user:'',
      users:[],
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    ...mapActions(['displayNotification']),

    update(){
      let user;
      if(this.image && this.image != "") {
        user = new FormData();
        user.append('image', this.image);
        user.append('username', this.currentUser.username);
        user.append('bio', this.currentUser.bio);
      }
      else {
        user = {
          username: this.currentUser.username,
          bio: this.currentUser.bio
        }
      }
      const userId = this.currentUser.userId
      AuthService.modifyUser(userId, user)
        .then(() => {
          this.currentUser.userId
          this.displayNotification('User modifié !')
          router.push('/home');
        })
        .catch(error => {
          this.errorMessage = error.message;
          console.error("Il y a une erreur", error);
        })
    },

    onFileChange(event) {
      this.currentUser.photoProfil = URL.createObjectURL(event.target.files[0])
      this.image = event.target.files[0]
    },
    triggerInput () {
      this.$refs.fileUpload.click()
    },
    close() {
      this.$emit("close");
    },
  },
}
</script>

<style lang="scss">
.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.modifyProfil .bg-white {
  height: 150px;
}
.modifyProfil .img {
  display: block;
  margin: -125px auto 0;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  cursor: pointer;
}
.modifyProfil .img img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.modifyProfil .img input {
  display: none;
}
.modifyProfil .img .indication {
  position: absolute;
  bottom: -70px;
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background: rgba(0, 0, 0, 0.7);
  font-size: 20px;
  transition: .4s ease;
}
.modifyProfil .img:hover .indication {
  bottom: 0;
}
.modifyProfil .inputs {
  padding: 20px;
}
.btn-change {
  border: none;
  background: none;
}
.btn-change:hover {
  background:#F2F2F2;
}
.button_close {
  border: none;
  background: none;
  display: block;
  margin-right: auto;
  margin-left: auto;
}
.button_close:hover {
  color: #e22600;
  border: none
}
.save-btn {
  background-color: #ff2600e5;
  color: white;
  border-radius: 1rem;
  border: none;
  margin-bottom: 1rem;
  margin-top: 1rem;
  margin-right: auto;
  margin-left: auto;
  padding: 0.375rem 0.75rem;
  font-weight: bold;
  cursor: pointer;
}
.save-btn:hover,
.save-btn:focus,
.save-btn:active {
  background-color: #e22600;
  color: white;
  outline: none;
}
.save {
  color: #fff;
}
.card-body {
  padding-bottom: 0;
}
.row {
  margin-left: 0;
  margin-right: 0;
}
@media screen and (min-width: 280px) and (max-width: 769px) {
  .create-button {
    width: 100% !important;
  }
  .div-main-picture {
    width: 75px;
    height: 75px;
  }
  .profile-main-picture {
    height: 75px;
  }
  .shadow {
    box-shadow: 0rem 0.2rem 0.5rem rgba(0, 0, 0, 0.08) !important;
  }
}
</style>