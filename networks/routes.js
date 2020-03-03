const express = require('express')
const user = require('../components/user/network')
const auth = require('../components/auth/controller')

const routes = function (server) {
    server.use('/login', user)
}

module.exports = routes