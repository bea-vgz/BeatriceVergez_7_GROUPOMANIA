import resource from './resource'
import authHeader from './auth.header'

class LikeCommentService {

    getAllLikesOneComment(commentId) {
        return resource.get(`comments/${commentId}/likes`, { headers: authHeader() })
    }

    likeComment(commentId, like) {
        return resource.post(`comments/${commentId}/likes`, like,
            { headers: authHeader() }
        )
    }

    getLikeOnOneComment(commentId) {
        return resource.get(`comments/${commentId}/like`, { headers: authHeader() })
    }
}
export default new LikeCommentService();