import resource from './resource'
import authHeader from './auth.header'

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
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
    }

    logout() {
      localStorage.removeItem('user')
    }

    deleteUser(payload) {
      const id = payload
      return resource.delete(`/users/${id}`, { headers: authHeader() })
    }

    modifyUser(userId, user) {
      return resource.put(`/users/${userId}`, user, { headers: authHeader() })
      .then(response => {
        console.log(response)
      });
    }

    modifyPassword(userId, data) {
      return resource.put(`/users/${userId}/password`, data, { headers: authHeader() })
      .then(response => {
        console.log(response)
      });
    }

    getAllUsers(value) {
      return resource.get(`/users?search=${value}`, { headers: authHeader() });
    }

    getOneUser(id){
      return resource.get(`/users/${id}`, { headers: authHeader() })
    }
}

export default new AuthService();
