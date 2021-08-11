import axios from 'axios'
import { root } from './Root'


const Delete = (path, data) => {
    const promise = new Promise((resolve, reject) => {
        axios.delete(`${root}/${path}/${data}`)
            .then((result) => {
                resolve(result.data)
            }, (error) => {
                reject(error)
            })
    })
    return promise
}

export default Delete;
