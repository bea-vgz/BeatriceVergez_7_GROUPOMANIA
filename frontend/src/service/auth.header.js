import Cookies from 'js-cookie'

export default function authHeader() {
    const userToken_groupomania = Cookies.get('userToken_groupomania')
    if (userToken_groupomania) {
       return {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + `${userToken_groupomania}`
        }
    } else {
        return {};
    }
}



