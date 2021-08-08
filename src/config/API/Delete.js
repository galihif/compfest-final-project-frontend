import axios from 'axios'
import {endpoint} from './Endpoint'

const Delete = (path, data) => {
    const promise = new Promise((resolve, reject) => {
        axios.delete(`${endpoint}/${path}/${data}`)
            .then((result) => {
                resolve(result.data)
            }, (error) => {
                reject(error)
            })
    })
    return promise
}

export default Delete;
