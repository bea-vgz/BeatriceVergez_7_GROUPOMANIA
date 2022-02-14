<template>
    <div v-if="reveal" class="modal-box confirm-box text-align-center" @click="closeConfirm">
        <div class="modal-content">
            <header class="title">
                <h2>{{ title ? title : "" }}</h2>
                <i class="fas fa-times" @click="closeConfirm"></i>
            </header>
            <main>
                <p>{{ message ? message : "" }}</p>
            </main>
            <footer>
                <a aria-role="button" class="cancel" @click="closeConfirm">Annuler</a>
                <a aria-role="button" class="confirm" @click="confirm">Confirmer</a>
            </footer>
        </div>
    </div>
</template>

<script>
import router from "../router";
import { mapActions } from 'vuex';
import AuthService from "../service/auth.resource"
export default {
    name: "ConfirmDialogue",
    props: [
        'reveal',
        'title',
        'message',
        'action',
        'post',
        'userId'
    ],
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      }
    },
    methods: {
        ...mapActions(['displayNotification']),

        closeConfirm(event) {
            this.$emit('closeConfirm', event);
        },
        confirm() {
            if(this.action == "deleteUser") {
                let payload = this.$store.state.auth.user.userId
                this.$store.dispatch("auth/deleteUser", payload)
                .then(() => {
                    this.displayNotification('Compte supprimé avec succès!')
                    router.push('/');
                },
                error => {
                    console.log(error);
                });
            }
            else if(this.action == "deletePost") {
                const postId = this.post.id
                this.$store.dispatch("post/deletePost", postId)
                .then(() => {
                    this.$store.dispatch('post/AllPostsStore')
                    this.displayNotification('Post supprimé avec succès!')
                },
                error => {
                    console.log(error);
                });
            }
            else if(this.action == "deleteAccountUser") {
                AuthService.deleteUser(`${this.userId}`)
                .then(() => {
                    this.currentUser.isAdmin
                    this.displayNotification('Compte supprimé avec succès!')
                    router.push('/home');
                },
                error => {
                    console.log(error);
                });
            }
        }
    }
}
</script>
<style scoped>
.modal-box {
    background-color: rgba(0, 0, 0, 0.568);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    z-index: 2;
}

.modal-box .modal-content {
    background: #fff;
    border-radius: 2rem;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.247);
    max-width: 480px;
    margin-left: auto;
    margin-right: auto;
    padding: 2rem;
}

.modal-box .modal-content .title {
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0, 0, 0, .08);
    padding: 0 20px;
    position: sticky;
    top: 0;
    z-index: 10;
    background-color: #fff;
}

.modal-box .modal-content .title h2 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 1rem;
    text-align: center;
}

.modal-box .modal-content .title i {
    font-size: 25px;
    color: rgba(0, 0, 0, .5);
    cursor: pointer;
}

.modal-box .modal-content .user {
    display: flex;
    align-items: center;
    padding: 20px;
}

.modal-box .modal-content .user img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 20px;
}

.modal-box.confirm-box main p {
    margin: 20px;
}

.modal-box.confirm-box footer {
    padding: 16px 100px;
    border-top: 1px solid rgba(0, 0, 0, .08);
    display: flex;
    justify-content: flex-end;
}

.modal-box.confirm-box footer a {
    padding: 4px 15px;
    border: 2px solid;
    border-radius: 35px;
    color: #fff;
    box-sizing: border-box;
    cursor: pointer;
    transition: .3s ease;
}

.modal-box.confirm-box footer a:not(:last-child) {
    margin-right: 10px;
}

.modal-box.confirm-box footer a.cancel {
    border-color: crimson;
    background-color: crimson;
}

.modal-box.confirm-box footer a.confirm {
    border-color: #038a03;
    background-color: #038a03;
}

.modal-box.confirm-box footer a.cancel:hover {
    background: none;
    text-decoration: none;
    color: crimson;
}

.modal-box.confirm-box footer a.confirm:hover {
    background: none;
    text-decoration: none;
    color: #038a03;
}
</style>