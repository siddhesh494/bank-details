export interface ResponseParams {
  messageCode: {
    statusCode: string,
    status: number,
    message: string
  }
  success: boolean
  message?: string
  data?: {} | string
}


export interface ResponseOutput {
  statusCode: string,
  status: number,
  message: string
  data?: {} | string
}