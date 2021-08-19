import axios from 'axios'
import { root } from './Root'

// const Put = (path, data) => {
//     const promise = new Promise((resolve, reject) => {
//         axios.put(`${root}/${path}/${data.id}`, data)
//             .then((result) => {
//                 resolve(result.data)
//             }, (error) => {
//                 reject(error)
//             })
//     })
//     return promise
// }

const Put = (path, body, headers) => {
    const promise = new Promise((resolve, reject) => {
        axios.put(`${root}/${path}/`, body, { headers: headers })
            .then((result) => {
                resolve(result)
            }, (error) => {
                reject(error)
            })
    })
    return promise
}

export default Put;
