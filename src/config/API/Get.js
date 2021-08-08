import axios from 'axios'
import { endpoint } from './Endpoint'

const Get = (path,data,headers) => {
    const promise = new Promise((resolve, reject) => {
        axios.get(`${endpoint}/${path}`, { headers: headers })
            .then((result) => {
                resolve(result.data)
            }, (error) => {
                reject(error)
            })
    })
    return promise
}

export default Get;