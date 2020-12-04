const cors = require('cors')

const whitelist = [process.env.DOMAIN_LOCAL]

const corsOptions = {
    origin: (origin, cb) => {
        const originIsWhitelisted = whitelist.includes(origin)
        cb(null, originIsWhitelisted)
    }
}


module.exports = app => app.use(cors(corsOptions))