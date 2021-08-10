import axios from 'axios'
import { root } from './Root'

const Put = (path, data) => {
    const promise = new Promise((resolve, reject) => {
        axios.put(`${root}/${path}/${data.id}`, data)
            .then((result) => {
                resolve(result.data)
            }, (error) => {
                reject(error)
            })
    })
    return promise
}

export default Put;
