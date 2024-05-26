const {Schema, model} = require('mongoose')

const articleSchema = new Schema({
    name: {
        required: true,
        type: String,
        minLength: 1
    },
    price: {
        required: true,
        type: String,
        minLength: 1
    },
    amount: {
        required: true,
        type: String,
        minLength: 1
    }
})

articleSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Article = model('Article', articleSchema)

module.exports = Article