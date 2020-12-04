module.exports = app => {

    // Base URLS
    app.use('/api/courses', require('./courses.routes.js'))
    app.use('/api', require('./auth.routes.js'))
}