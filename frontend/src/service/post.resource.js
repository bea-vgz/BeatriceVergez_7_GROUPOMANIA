import resource from './resource'
import authHeader from './auth.header'

class PostService {

    createPost(post) {
        return resource.post('/posts', post, { headers: authHeader() })
        .then(response => {
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
    }

    modifyPost(postId, post) {
        return resource.put(`/posts/${postId}`, post, { headers: authHeader() })
        .then(response => {
            return response.post
        })
    }
}

export default new PostService(); 