'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    ENV_CONFIG: '"dev"',
    //BASE_API: '"http://test16.zhongdianyun.com:2018/"'
    BASE_API: '"http://210.73.61.235:2018/"'

})
