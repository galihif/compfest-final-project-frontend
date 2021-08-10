import axios from 'axios'
import { root } from './Root'

const Post = (path, body,headers) => {
    const promise = new Promise((resolve, reject) => {
        axios.post(`${root}/${path}`, body, {headers:headers})
            .then((result) => {
                resolve(result.data)
            }, (error) => {
                reject(error)
            })
    })
    return promise
}

export default Post;