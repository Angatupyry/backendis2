module.exports = {
    api: {
        port: process.env.API_PORT || 3000,
        algoritm: process.env.BEP_ALG || 'HS512',
        secret: process.env.BEP_SECRET || '!laclave!',
        corsOptions: {
            methods: ['HEAD', 'OPTIONS', 'GET', 'POST', 'PUT', 'DELETE'],
            credentials: true,
            maxAge: 3600,
            preflightContinue: false,
          }
    }
    }