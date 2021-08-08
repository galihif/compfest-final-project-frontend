import axios from 'axios'
import { endpoint } from './Endpoint'

const Put = (path, data) => {
    const promise = new Promise((resolve, reject) => {
        axios.put(`${endpoint}/${path}/${data.id}`, data)
            .then((result) => {
                resolve(result.data)
            }, (error) => {
                reject(error)
            })
    })
    return promise
}

export default Put;
