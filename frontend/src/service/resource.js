// Configuration d'axios pour faciliter les requêtes du back
import axios from 'axios'

class resource {
    constructor() {
        return axios.create({
          baseURL: "http://localhost:3020/api",
        })
    }
}
export default new resource;