export type Response = {
  data: {
    success: string,
  },
  status: number,
  statusText: string,
  headers: {},
  config: {},
  request: {},
}

export type Error = {
  response: {
    data: {},
    status: number,
    headers: {},
  },
  request: {},
  message: string,
  config: {},
}

export type ResponseWrapper = {
  data: {},
  success: string,
  status: number,
  statusMessage: string,
}

export type ErrorWrapper = {
  data: {},
  status: number,
  headers: {},
  request: {},
  message: string,
  config: {},
}

export type HandlerResponseType = {
  statusCode: number,
  message: string,
  body?: string,
}
