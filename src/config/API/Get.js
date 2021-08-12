import axios from 'axios'
import { root } from './Root'

export const GetWithId = (path, id, headers) => {
    const promise = new Promise((resolve, reject) => {
        axios.get(`${root}/${path}/${id}/`, { headers: headers })
            .then((result) => {
                resolve(result)
            }, (error) => {
                reject(error)
            })
    })
    return promise
}

export const GetHeadersOnly = (path, headers) => {
    const promise = new Promise((resolve, reject) => {
        axios.get(`${root}/${path}/`, { headers: headers })
            .then((result) => {
                resolve(result)
            }, (error) => {
                reject(error)
            })
    })
    return promise
}
