var project = require('./')
var test = require('tape')

var mat4 = require('gl-mat4')
var vec3 = require('gl-vec3')

// Needs some more tests!
test('project 3D point into 2D window space', function (t) {
  var viewport = [0, 0, 128, 256]

  var proj = mat4.create()
  var view = mat4.create()
  var position = [0, 0, -3]
  var direction = [0, 0, -1]
  var up = [0, 1, 0]
  var center = [0, 0, 0]

  mat4.perspective(proj, Math.PI / 4, viewport[2] / viewport[3], 0.01, 100)

  // build view matrix
  vec3.add(center, position, direction)
  mat4.lookAt(view, position, center, up)

  var combined = mat4.multiply([], proj, view)

  var point3d = [0, 0, 5]
  var out = project([], point3d, viewport, combined)
  t.equal(out[0], viewport[2] / 2, 'x position')
  t.equal(out[1], viewport[3] / 2, 'y position')
  t.end()
})
