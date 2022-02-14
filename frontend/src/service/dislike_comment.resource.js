import resource from './resource'
import authHeader from './auth.header'

class DislikeCommentService {

    getAllDislikesOneComment(commentId) {
        return resource.get(`comments/${commentId}/dislikes`, { headers: authHeader() })
    }

    dislikeComment(commentId, dislike) {
        return resource.post(`comments/${commentId}/dislikes`, dislike,
            { headers: authHeader() }
        )
    }

    getDislikeOnOneComment(commentId) {
        return resource.get(`comments/${commentId}/dislike`, { headers: authHeader() })
    }
}
export default new DislikeCommentService();