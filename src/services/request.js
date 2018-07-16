// @flow
import Axios from 'axios'

export class Request {
  static async get(url: string, params: {} = {}, headers: {} = {}) {
    try {
      return await Axios.get(url, {
        params: {
          ...params,
        },
        ...headers,
      })
    } catch (e) {
      return e
    }
  }
  static async post(url: string, data: {} = {}, headers: {} = {}) {
    try {
      return await Axios.post(url, {
        data: {
          ...data,
        },
        ...headers,
      })
    } catch (e) {
      return e
    }
  }
}
