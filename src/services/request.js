// @flow
import Axios from 'axios'

export class Request {
  constructor(url, limit = 20) {
    this.url = url
    this.limit = limit
  }

  initialState = () => ({
    id: null,
    offset: 0,
    limit: this.limit,
    total: null,
    done: false,
  })

  state = this.initialState()

  updatePagination = ({ id, nextOffset, limit, total, done }) => {
    this.state = {
      id,
      offset: nextOffset,
      limit,
      total,
      done,
    }
  }

  paginationComposer = fn => async (params, headers) => {
    const id = JSON.stringify(params)
    const isNewRequest = this.state.id !== id
    if (isNewRequest) {
      this.state = this.initialState()
    }
    if (this.state.id === null || this.state.done === false) {
      const response = await fn(
        this.url,
        {
          ...params,
          offset: this.state.offset,
          limit: this.state.limit,
        },
        headers,
      )
      const { items, ...rest } = response.data
      this.updatePagination({ id, ...rest })
      return {
        items,
        isNewRequest,
        isDone: false,
      }
    } else {
      return {
        isDone: true,
      }
    }
  }

  paginatedGet = this.paginationComposer(this.constructor.get)

  static async get(url, params: {} = {}, headers: {} = {}) {
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

  static async post(url: string, data: {} = {}) {
    try {
      return await Axios.post(url, data)
    } catch (e) {
      return e
    }
  }

  static async delete(url: string, data: {} = {}) {
    try {
      return await Axios.delete(url, { data })
    } catch (e) {
      return e
    }
  }
}
