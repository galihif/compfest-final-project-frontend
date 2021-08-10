import axios from 'axios'
import { root } from './Root'

export const GetWithData = (path,data,headers) => {
    const promise = new Promise((resolve, reject) => {
        axios.get(`${root}/${path}/${data}`,{ headers: headers })
            .then((result) => {
                resolve(result.data)
            }, (error) => {
                reject(error)
            })
    })
    return promise
}

export const GetOnly = (path,headers) => {
    const promise = new Promise((resolve, reject) => {
        axios.get(`${root}/${path}`,{ headers: headers })
            .then((result) => {
                resolve(result.data)
            }, (error) => {
                reject(error)
            })
    })
    return promise
}
