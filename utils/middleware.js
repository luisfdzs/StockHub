const {info} = require('./logger')

const requestLogger = (request, response, next) => {
    const {method, url, body} = request
    const bodyLength = request.headers['content-length']
    const log = bodyLength === undefined || bodyLength === '0'
        ? `Detected new request: ${method} ${url}`
        : `Detected new request: ${method} ${url} ${body}`
    info(log)
    next()
}

const notFound = (request, response) => {
    const console = `Response 404 - Not Found 😞 ${request.url} not exists`
    const html = `<html><head><title>404 - Not Found</title><style>body{font-family:Arial,sans-serif;text-align:center;color:#333;}h1{font-size:50px;margin-top:20%;}p{font-size:20px;}</style></head><body><h1>404 - Not Found 😞</h1><p>The resource you are looking for does not exist.</p><p>Please check the URL or go back to the homepage.</p></body></html>
    `
    response.status(404).send(html)
    info(console)
}

const handleError = (error, request, response, next) => {
    const { name, message } = error
    switch (name) {
        case 'CastError':            
            info(`Response with 400 - Bad Request 🚫`)
            return response.status(400).send(`<html><head><title>400 - Bad Request</title><style>body{font-family:Arial,sans-serif;text-align:center;color:#333;}h1{font-size:50px;margin-top:20%;}p{font-size:20px;}</style></head><body><h1>400 - Bad Request 🚫</h1><p>There was an error with your request:</p><p>${message}</p><p>Please check your input and try again.</p></body></html>`)
        case 'ValidationError':
            info(`Response with 400 - Validation Error ⚠️`)
            return response.status(400).send(`<html><head><title>400 - Validation Error</title><style>body{font-family:Arial,sans-serif;text-align:center;color:#333;}h1{font-size:50px;margin-top:20%;}p{font-size:20px;}</style></head><body><h1>400 - Validation Error ⚠️</h1><p>There was an error with the data you submitted:</p><p>${message}</p><p>Please check your input and try again.</p></body></html>`);
        default:
            info(`Response with 500 - Internal Server Error 😵`)
            return response.status(500).send(`<html><head><title>500 - Internal Server Error</title><style>body{font-family:Arial,sans-serif;text-align:center;color:#333;}h1{font-size:50px;margin-top:20%;}p{font-size:20px;}</style></head><body><h1>500 - Internal Server Error 😵</h1><p>Something went wrong on our end.</p><p>Please try again later or contact support if the issue persists.</p></body></html>
            `)
    }
}

module.exports = {requestLogger, notFound, handleError}