import axios from "axios"

export default class Api {
    static get = async (url, headers) => {
        return new Promise((resolve, reject) => {
            axios.get(url, headers)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error)
                })
                .finally(() => { })
        })
    }
    static post = async (url, data, headers) => {
        return new Promise((resolve, reject) => {
            axios.post(url, data, headers)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error)
                })
                .finally(() => { })
        })
    }
    static put = async (url, data, headers) => {
        return new Promise((resolve, reject) => {
            axios.put(url, data, headers)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error)
                })
                .finally(() => { })
        })
    }
}