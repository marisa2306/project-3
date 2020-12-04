module.exports = app => {

    // Base URLS
    app.use('/api/courses', require('./courses.routes.js'))
}