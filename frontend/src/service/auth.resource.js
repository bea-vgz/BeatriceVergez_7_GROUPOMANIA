import resource from './resource'
import Cookies from 'js-cookie'
import authHeader from './auth.header'

export function userIsLogged() {
  return !!Cookies.get('userToken_groupomania');
}

class AuthService {

    signup(user) {
      return resource.post('/users/signup', {
        username: user.username,
        email: user.email + '@groupomania.com',
        password: user.password,
        bio: user.bio,
        photoProfil: user.photoProfil,
        isAdmin: 0,
      })
    }

    login(user) {
      return resource.post('/users/login', {
        email: user.email + '@groupomania.com',
        password: user.password,
      })
      .then(response => {
        return response.data;
      });
    }

    logout() {
      Cookies.remove('userToken_groupomania')
    }

    deleteUser(payload) {
      const id = payload
      return resource.delete(`/users/${id}`, { headers: authHeader() })
    }

    modifyUser(id, user) {
      return resource.put(`/users/${id}`, user, { headers: authHeader() })
      .then(response => {
        return response.data
      })
    }

    modifyPassword(id, user) {
      return resource.put(`/users/${id}/password`, user, { headers: authHeader() })
      .then(response => {
        return response.data
      })
    }

    getAllUsers(value) {
      return resource.get(`/users?search=${value}`, { headers: authHeader() })
    }

    getOneUser(id){
      return resource.get(`/users/${id}`, { headers: authHeader() })
      .then(response => { 
        return response.data 
      })
    }

    getCurrentUser(){
      return resource.get(`/users/me`, { headers: authHeader() })
      .then(response => { 
        return response.data 
      })
    }
}

export default new AuthService();
