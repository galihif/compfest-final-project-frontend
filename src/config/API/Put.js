import axios from 'axios'
import { root } from './Root'

const Put = (path, headers) => {
    const promise = new Promise((resolve, reject) => {
        axios.put(`${root}/${path}/`, {headers:headers})
            .then((result) => {
                resolve(result)
            }, (error) => {
                reject(error)
            })
    })
    return promise
}

export default Put;
