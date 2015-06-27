/*!
 * thunk2promise <https://github.com/tunnckoCore/thunk2promise>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var test = require('assertit')
var thunk2promise = require('./index')

function thunk (a, b) {
  return function (cb) {
    if (a === b) {
      return cb(new Error('a === b'))
    }
    cb(null, a, b, 3)
  }
}

test('thunk2promise:', function () {
  test('should throw error to catch if not thunk given', function (done) {
    thunk2promise(1234).catch(function (err) {
      test.ifError(!err)
      test.equal(err.message, 'thunk2promise expect `fn` be function')
      done()
    })
  })
  test('should convert thunk to promise', function (done) {
    thunk2promise(thunk(1, 2)).then(function (res) {
      test.equal(res.length, 3)
      test.deepEqual(res, [1, 2, 3])
      done()
    })
  })
  test('should pass error from thunk to promise .catch', function (done) {
    thunk2promise(thunk(333, 333)).catch(function (err) {
      test.ifError(!err)
      test.equal(err.message, 'a === b')
      done()
    })
  })
})
