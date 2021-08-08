import axios from 'axios'
import { endpoint } from './Endpoint'

const Post = (path, data,headers) => {
    const promise = new Promise((resolve, reject) => {
        axios.post(`${endpoint}/${path}`, data, {headers:headers})
            .then((result) => {
                resolve(result.data)
            }, (error) => {
                reject(error)
            })
    })
    return promise
}

export default Post;