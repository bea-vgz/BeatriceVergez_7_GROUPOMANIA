import resource from './resource'
import authHeader from './auth.header'

class PostService {

    createPost(post) {
        return resource.post('/posts', post, { headers: authHeader() })
        .then(response => {
            localStorage.setItem('post', JSON.stringify(post));
            console.log(response)
        });
    }

    getOnePost(id){
        return resource.get(`/posts/${id}`, { headers: authHeader() })
    }

    getAllPosts(userIdParams){
        return resource.get(`/posts?${userIdParams}`, { headers: authHeader() })
    }

    deletePost(id) {
        return resource.delete(`/posts/${id}`, { headers: authHeader() })
        .then(() => localStorage.removeItem('post'))
    }

    modifyPost(postId, post) {
        return resource.put(`/posts/${postId}`, post, { headers: authHeader() })
        .then(response => {
            localStorage.setItem('post', JSON.stringify(response));
            console.log(response)
        });
    }
}

export default new PostService(); 