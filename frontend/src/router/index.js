import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
Vue.use(VueRouter)
Vue.use(VueResource)

const routes = [
  // Route login
  {
    path: '/',
    name: 'Connexion',
    component: () => import("../views/Connexion.vue"),
    meta: { title: 'Groupomania - Connexion' }
  },
  // Route signup
  {
    path: '/signup',
    name: 'Inscription',
    component: () => import("../views/Inscription.vue"),
    meta: { title: 'Groupomania - Inscription' }
  },
  // Route Wall / Home
  {
    path: '/home',
    name: 'Home',
    component: () => import("../views/Home.vue"),
    meta: { title: 'Groupomania' }
  },
  // Route Profil user 
  {
    path: "/profil",
    name: "Profil",
    component: () => import("../views/Profil.vue"),
    meta: { title:'Groupomania - Mon compte' }
  },
  // Route password user 
  {
    path: "/password",
    name: "Password",
    component: () => import("../components/ModifyPassword.vue"),
    meta: { title:'Groupomania - Modification Password' }
  },
  // Route User profil 
  {
    path: '/profil/:userId',
    name: 'ProfilUser',
    component: () => import('../views/ProfilUser.vue'),
    meta: { title:'Groupomania - Profil collègue' }
  },
  // Route Mentions légales
  {
    path: '/mentions',
    name: 'MentionsLégales',
    component: () => import('../views/MentionsLégales.vue'),
    meta: { title:'Groupomania - mentions légales' }
  },
] 

const router = new VueRouter({
  routes,
  scrollBehavior() { // Scroll vers le haut de la page 
    return {x: 0, y: 0}
  }
})

// Permet de mettre à jour le titre (les meta) en fonction du routeur
router.afterEach((to, from) => {
  console.log(from, to);
  document.title = to.meta.title;
});

export default router
