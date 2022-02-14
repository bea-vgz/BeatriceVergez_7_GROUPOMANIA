import resource from './resource'
import authHeader from './auth.header'

class DislikePostService {

    getAllDislikesOnePost(postId) {
        return resource.get(`posts/${postId}/dislikes`, { headers: authHeader() })
    }

    dislikePost(postId, dislike) {
        return resource.post(`posts/${postId}/dislikes`, dislike,
            { headers: authHeader() }
        )
    }

    getDislikeOnOnePost(postId) {
        return resource.get(`posts/${postId}/dislike`, { headers: authHeader() })
    }
}
export default new DislikePostService();