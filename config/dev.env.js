'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"/admin"',
  BASE_API: '"https://easy-mock.com/mock/5c3c2ce0de22053ce38a84de/vivi"',
})
