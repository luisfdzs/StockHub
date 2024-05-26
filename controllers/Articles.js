// Dependencies
const articlesRouter = require('express').Router()
const Article = require('../models/Article')
const {info} = require('../utils/logger')

// Endpoints
articlesRouter.get('/', (request, response) => {
    Article
        .find({})
        .then(articles => {
            response.json(articles)
            info(`Response with the total information (${articles.length} articles)`)
        })
})
articlesRouter.get('/:id', (request, response, next) => {
    const {id} = request.params
    Article
        .findById(id)
        .then(article => {
            info(`Response with the article specified ${article}`)
            response.json(article)
        })
        .catch(error => next(error))
})
articlesRouter.post('/', (request, response, next) => {
    const {name, price, amount} = request.body
    const newArticle = new Article({name: name, price: price, amount: amount})
    newArticle
        .save()
        .then(savedArticle => {
            info(`Response with the new Article created: ${savedArticle}`)
            response.json(savedArticle)
        })
        .catch(error => next(error))
})
articlesRouter.put('/:id', (request, response, next) => {
    const {id} = request.params
    const {name, price, amount} = reponse.body
    const changes = {name: name, price: price, amount: amount}
    Article
        .findByIdAndUpdate(id, changes, {new: true, runValidators: true})
        .then(updatedArticle => {            
            info(`Response with the new Article updated: ${updatedArticle}`)
            response.json(updatedArticle)
        })
        .catch(error => next(error))
})
articlesRouter.delete('/:id', (request, response, next) => {
    const {id} = request.params
    Article
        .findByIdAndDelete(id)
        .then((article) => {            
            info(`Response with status 200: article ${article} deleted successfully`)
            response.status(200).json({success: `Ok. article ${article} deleted successfully`})
        })
        .catch(error => next(error))
})
module.exports = articlesRouter