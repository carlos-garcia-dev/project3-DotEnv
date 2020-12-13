module.exports = app => {

    // Base URLS
    app.use('/api/publications', require('./publication.routes'))
    // app.use('/api/commentaries', require('./commentary.routes'))
    app.use('/api/auth', require('./auth.routes'))
}