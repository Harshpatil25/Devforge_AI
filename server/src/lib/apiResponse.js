export class ApiError extends Error {
  constructor(message, statusCode = 500) {
    super(message)
    this.statusCode = statusCode
  }
}

export function sendSuccess(res, data, statusCode = 200) {
  return res.status(statusCode).json({ success: true, data })
}

export function sendError(res, message, statusCode = 400) {
  return res.status(statusCode).json({ success: false, message })
}
