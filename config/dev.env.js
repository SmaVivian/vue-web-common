'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"/admin"',
  // BASE_API: '"https://easy-mock.com/mock/5c3c2ce0de22053ce38a84de/vivi"',  // 在线easymock服务
  BASE_API: '"http://127.0.0.1:7300/mock/5ee208cee2271b0ed0dfda4e/vivi"',   // 本地easymock服务
})
