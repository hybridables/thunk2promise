/*!
 * thunk2promise <https://github.com/tunnckoCore/thunk2promise>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var Bluebird = require('bluebird')
var manageArguments = require('manage-arguments')

module.exports = function thunk2promise (fn, ctx) {
  ctx = ctx || this || {}
  return new Bluebird(function (resolve, reject) {
    if (typeof fn !== 'function') {
      return reject(new TypeError('thunk2promise expect `fn` be function'))
    }
    fn.call(ctx, function (err) {
      if (err) {
        return reject(err)
      }
      var args = manageArguments(arguments).slice(1)
      resolve(args)
    })
  })
}
