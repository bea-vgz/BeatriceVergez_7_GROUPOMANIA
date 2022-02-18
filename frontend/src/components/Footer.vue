<template>
    <footer>
      <!-- Copyright -->
      <div class="footer">
        © 2022 Copyright – Groupomania - 
        <router-link class="mentions" to='/mentions'> Mentions légales </router-link>
      </div>
      <!-- Copyright -->
    </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.footer {
  font-family: 'Barlow', sans-serif;
  border-top: 1px solid #ccc;
  padding: 1rem;
  text-align: center;
  color : #747474;
  background-color:#ffffff
}
.mentions {
  text-decoration: none;
  color: #747474;
  font-weight: bold; 
}
.mentions:hover {
  color: #e22600;
}
</style>