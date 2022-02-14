import resource from './resource'
import authHeader from './auth.header'

class CommentService {

    createComment(comment, postId) {
        return resource.post(`/posts/${postId}/comments`, 
        {
            content: comment.content
        },
        { headers: authHeader() }
        )
        .then(response => {
            console.log(response)
        });
    }

    getPostsComments(postId){
        return resource.get(`/posts/${postId}/comments`, { headers: authHeader() })
    }

    deleteComment(postId, id) {
        return resource.delete(`/posts/${postId}/comments/${id}`, { headers: authHeader() })
        .then(() => localStorage.removeItem('comment'))
    }

    modifyComment(postId, id, comment) {
        return resource.put(`/posts/${postId}/comments/${id}`, comment, { headers: authHeader() })
        .then(response => {
          localStorage.setItem('comment', JSON.stringify(response.data));
          return response.data;
        });
    }
}
export default new CommentService();