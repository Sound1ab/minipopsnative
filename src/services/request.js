// @flow
import Axios from 'axios'
import {
  Response,
  Error,
  ResponseWrapper,
  ErrorWrapper,
} from '../types/services'

export class Request {
  static createMessage(status: number): string {
    let message = ''
    switch (status) {
      case 200:
        message = 'All done. Request successfully executed'
        break
      case 201:
        message = 'Data successfully created'
        break
      case 400:
        message = 'Bad Request'
        break
      case 401:
        message = 'Need auth'
        break
      case 404:
        message = 'Not found'
        break
      case 503:
        message = 'Service Unavailable'
        break
      default:
        message = 'Something wrong. Client default error message'
        break
    }
    return message
  }
  static responseWrapper(
    data: {},
    success: string,
    status: number,
  ): ResponseWrapper {
    return {
      data,
      success,
      status,
      statusMessage: this.createMessage(status),
    }
  }
  static errorWrapper(error: Error): ErrorWrapper {
    let errorResponse: ErrorWrapper = {
      data: {},
      status: 0,
      headers: {},
      request: {},
      message: '',
      config: {},
    }
    if (error.response) {
      const { data, status, headers } = error.response
      errorResponse = {
        ...errorResponse,
        data,
        status,
        headers,
      }
    } else if (error.request) {
      errorResponse = {
        ...errorResponse,
        request: error.request,
      }
    } else {
      errorResponse = {
        ...errorResponse,
        message: error.message,
      }
    }
    return {
      ...errorResponse,
      config: error.config,
    }
  }
  static async get(url: string, params: {} = {}, headers: {} = {}) {
    try {
      const response: Response = await Axios.get(url, {
        params: {
          ...params,
        },
        ...headers,
      })
      return this.responseWrapper(
        response.data,
        response.data.success,
        response.status,
      )
    } catch (e) {
      return this.errorWrapper(e)
    }
  }
  static async post(url: string, data: {} = {}, headers: {} = {}) {
    try {
      const response: Response = await Axios.post(url, {
        data: {
          ...data,
        },
        ...headers,
      })
      return this.responseWrapper(
        response.data,
        response.data.success,
        response.status,
      )
    } catch (e) {
      return this.errorWrapper(e)
    }
  }
}
