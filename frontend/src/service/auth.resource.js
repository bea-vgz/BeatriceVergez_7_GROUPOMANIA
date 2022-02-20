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
        if (response) {
          return response.data;
        }
      });
    }

    logout() {
      Cookies.remove('userToken_groupomania', { path: '' })
    }

    deleteUser(payload) {
      const id = payload
      return resource.delete(`/users/${id}`, { 
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + Cookies.get('userToken_groupomania'),
        } 
      })
    }

    modifyUser(userId, user) {
      return resource.put(`/users/${userId}`, user, { headers: authHeader() })
      .then(response => {
        return response.data
      });
    }

    modifyPassword(userId, data) {
      return resource.put(`/users/${userId}/password`, data, { headers: authHeader() })
      .then(response => {
        console.log(response)
      });
    }

    getAllUsers(value) {
      return resource.get(`/users?search=${value}`, { headers: authHeader() })
    }

    getOneUser(id){
      return resource.get(`/users/${id}`, { headers: authHeader() })
    }

    getCurrentUser(){
      return resource.get(`/users/me`, { headers: authHeader() })
  }
}

export default new AuthService();
