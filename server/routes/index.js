module.exports = app => {

    app.use('/api/publications', require('./publication.routes'))
    app.use('/api/commentaries', require('./commentary.routes'))
    app.use('/api/auth', require('./auth.routes'))
    app.use('/api/files', require('./file.routes'))
    app.use('/api/user', require('./user.routes'))
}