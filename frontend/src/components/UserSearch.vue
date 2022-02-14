<template>
  <div>
    <div
      :class="`search-bar ${visible ? '' : 'd-none'} d-lg-block`"
    >
      <div class="search-bar__content input-group d-flex align-items-center">
        <span class="search-btn input-group-append bg-transparent border-0 p-0">
          <b-icon icon="search" class="mr-2"></b-icon>
        </span>
        <input
          class="search-text border-0 bg-transparent"
          type="text"
          v-model="search"
          placeholder="Rechercher un collègue..."
          ref="searchInput"
          aria-label="Chercher un collègue"
        />
      </div>
    </div>
    <div
      v-if="users.length"
      class="users-list card border-0 position-fixed"
    >
      <div v-for="user in users" :key="user.username">
        <router-link :to="{ name: 'ProfilUser', params: { userId: user.id }}">
          <div class="d-flex align-items-center">
            <div class="d-flex text-center">
              <div class="profil-user d-flex align-items-center">
                <img :src="user.photoProfil" alt="Photo de profil de l'user" class="profil-img">
                <p>{{ user.username }}</p>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'UserSearch',
  data() {
    return {
      search: '',
      users: [],
      user:'',
      visible: false
    }
  },
  methods: {
    triggerInput () {
      this.visible = true
      this.$refs.searchInput.click()
    }
  },
  watch: {
    async search(value) {
      if (value.length < 2) {
        this.users = []
        return
      }
      const res = await this.$store.dispatch('auth/getAllUsers', value)
      this.users = res.data
    }
  },
}
</script>

<style lang="scss">
.search {
  display: flex;
}
.search-bar {
  border-bottom: 1px solid #ccc;
  top: 25px;
  left: 150px;
  z-index: 2;
  .input-group {
    flex-wrap: nowrap;
  }
  &__content {
    padding: 10px 18px;
    .search-text {
      border: none;
      width: 210px;
      &:focus {
        outline: none;
      }
    }
  }
}
.search-btn {
  color: #747474;
}
.users-list {
  background: white;
  width: 200px;
  padding: 1rem;
  padding-bottom: 0.2rem;
  z-index: 1;
  top: 70px;
  box-shadow: 0px 1px 5px 4px rgba(204, 204, 204, 0.2);
  transform: translateX(-60%);
  transform: translateY(30%);
}
.profil-user {
  display: flex;
  justify-content: left;
  align-items: center;
  padding-bottom: 1rem;
}
.profil-img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  object-position: center;
  border-radius: 100%;
  margin-right: 0.6rem;
}
@media screen and (min-width: 280px) and (max-width: 769px) {
  .search-bar {
    border-bottom: 1px solid #FFF;
    margin: 0 10px 15px 15px;
    &__content {
      padding: 5px 13px;
      color: #FFF;
      .search-text {
        width: 100%;
        color:#FFF
      }
    }
  }
  .search-btn {
    color: #FFF;
  }
  .users-list {
    top: 110px;
    left: 15px;
    background: white;
    box-shadow: 0rem 0.2rem 0.5rem rgba(0, 0, 0, 0.08) !important;
  }
  .search-bar {
    display: block !important;
  }
}
@media screen and (min-width: 769px) and (max-width: 992px) {
  .search-bar {
    display: block !important;
  }
}
</style>