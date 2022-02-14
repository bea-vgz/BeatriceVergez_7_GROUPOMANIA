<template>
    <div class="menu_toggle">
    <input type="checkbox" id="menu" />
	<label for="menu" class="menu">
		<span class="line-1"></span>
		<span class="line-2"></span>
		<span class="line-3"></span>
		Menu 
	</label>
    <nav class="nav">
    <div class="top">
    <UserSearch />
    </div>
	<ul>
	<li><router-link to="/home" aria-label="Fil d'actualité" class="nav_centrale text-decoration-none"><b-icon icon="house-door" class="mr-2 mr-lg-2"></b-icon>ACCUEIL</router-link></li>
	<li><router-link to="/profil"><b-icon icon="person-circle" class="mr-2 mr-lg-2"></b-icon>Mon compte</router-link></li>
    <li><a @click="logout" class="text-decoration-none"><b-icon icon="box-arrow-in-left" class="mr-2 mr-lg-2"></b-icon> Me déconnecter </a></li>
	</ul>
    </nav>
    </div>
</template>
<script>
import UserSearch from "../components/UserSearch.vue"
import { mapActions } from 'vuex'
import router from "../router";
export default {
  name:'MenuBurger',
  components: {
      UserSearch
  },
  methods: {
  ...mapActions(['displayNotification']),
    async logout() {
      this.$store.dispatch('auth/logout');
      this.displayNotification('Vous avez été déconnecté.')
      router.push('/');
    },
  }
}
</script>
<style lang="scss" scoped>
$base-duration: 500ms;
// Breakpoints
$sm: new-breakpoint(min-width 320px);
$med: new-breakpoint(min-width 768px);
$lg: new-breakpoint(min-width 1024px);
*, *:before, *:after {
	box-sizing: border-box;
	outline: none;
}
.menu {
	position: fixed;
	top: 25px;
	left: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	width: 50px;
	height: 50px;
	background-color: transparent;
	border-radius: 50%;
	transition: transform 250ms ease;
	cursor: pointer;
	color: transparent;
	z-index: 200;
	
	span {
		position: relative;
		display: block;
		width: 50%;
		height: 2px;
		background-color: #e22600;
		float: left;
		transform-origin: center center;
		transition: transform 250ms ease;
		z-index: 200;
		
		&:nth-of-type(1) {
			transform: translateY(-5px);
		}
		
		&:nth-of-type(3) {
			transform: translateY(5px);
		}
	}
}
#menu {
	display: none;
	
	&:checked ~ .menu {
		background-color: transparent;
		transform: rotate(360deg);
		transition: transform 250ms ease;
		color: transparent;
		
		span {
			background-color: white;
			transition: transform 250ms ease;
			
			&:nth-of-type(1) {
				transform: translateY(1px) rotate(45deg);
			}
			
			&:nth-of-type(2) {
				display: none;
			}
			
			&:nth-of-type(3) {
				transform: translateY(-1px) rotate(-45deg);
			}
		}
	}
	
	&:checked ~ .nav {
		left: 0px;
		transition: left $base-duration ease;
	}
	
	&:checked ~ main {
		transform: translateX(250px);
		transition: transform $base-duration ease;
	}
}
.nav {
	position: fixed;
	top: 0;
	left: -300px;
	width: 300px;
	height: 100%;
	margin: 0;
	padding: 0;
	background-color: #242424f5;
	transition: left $base-duration ease;
	z-index: 0;
	
	ul {
		position: relative;
		list-style-type: none;
		margin: -200px 0;
		padding: 0;
		
		li {
			position: relative;
			display: block;
			border-bottom: 1px solid rgba(white,1);
			
			a {
				position: relative;
				display: block;
				margin: 0;
				padding: 15px 20px;
				color: white;
				font-size: 14px;
				font-weight: bold;
				text-decoration: none;
				text-transform: uppercase;
				
				&:before {
					position: absolute;
					content: '';
					top: 0;
					left: 0;
					width: 0;
					height: 100%;
					transition: width 250ms ease;
					z-index: -1;
				}
				
				&:hover {
					color: #444;
					cursor: pointer;
					
					&:before {
						width: 100%;
						height: 100%;
						background-color: rgba(white,1);
						transition: width 250ms ease;
					}
				}
			}
		}
	}
.top {
  padding: 85px 15px 10px;
  width: 100%;
}
}
</style>