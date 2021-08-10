import axios from 'axios'
import { root } from './Root'

export const GetWithData = (path, data, headers) => {
    const promise = new Promise((resolve, reject) => {
        axios.get(`${root}/${path}/${data}/`, { headers: headers })
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
