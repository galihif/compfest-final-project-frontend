import axios from 'axios'
import { root } from './Root'


const Delete = (path, headers) => {
    const promise = new Promise((resolve, reject) => {
        axios.delete(`${root}/${path}`, {headers:headers})
            .then((result) => {
                resolve(result.data)
            }, (error) => {
                reject(error)
            })
    })
    return promise
}

export default Delete;
