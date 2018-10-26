// @flow
import Axios from 'axios'
import { client } from '../services'

export class Request {
  constructor(url = '', gql = '', limit = 20) {
    this.url = url
    this.gql = gql
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
        this.url || this.gql,
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
  paginatedQuery = this.paginationComposer(this.constructor.query)

  static async get(url, params: {} = {}, headers: {} = {}) {
    try {
      return await Axios.get(url, {
        params: {
          ...params,
        },
        ...headers,
      })
    } catch (e) {
      throw e
    }
  }

  static async post(url: string, data: {} = {}) {
    try {
      return await Axios.post(url, data)
    } catch (e) {
      throw e
    }
  }

  static async delete(url: string, data: {} = {}) {
    try {
      return await Axios.delete(url, { data })
    } catch (e) {
      throw e
    }
  }

  static async query(query, variables) {
    let response
    try {
      const { data } = await client.query({
        query,
        variables,
      })
      response = data
    } catch (error) {
      throw error
    }
    return response
  }

  static async mutate(mutation, variables) {
    let response
    try {
      const { data } = await client.mutate({
        mutation,
        variables,
      })
      response = data
    } catch (error) {
      throw error
    }
    return response
  }
}
