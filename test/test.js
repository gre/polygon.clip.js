var assert = require('assert');
var Polygon = require('../clip');
var Vec2 = require('vec2');

var subject = Polygon([
  Vec2(0, 0),
  Vec2(100, 0),
  Vec2(100, 100),
  Vec2(0, 100),
  Vec2(0, 0)
]);

var clip = Polygon([
  Vec2(90, 90),
  Vec2(110, 90),
  Vec2(110, 110),
  Vec2(90, 110),
  Vec2(90, 90)
]);

var clip2 = Polygon([
  Vec2(95, 95),
  Vec2(95, 105),
  Vec2(85, 105),
  Vec2(85, 95),
  Vec2(95, 95)
]);

describe('Polygon#clip', function() {
  it('should diff the two polys and return the remainder of the subject', function() {
    var difference = subject.clip(clip, 'difference')[0];
    assert.deepEqual(difference.points[0].toArray(), [100, 90]);
    assert.deepEqual(difference.points[1].toArray(), [100, 0]);
    assert.deepEqual(difference.points[2].toArray(), [0, 0]);
    assert.deepEqual(difference.points[3].toArray(), [0, 100]);
    assert.deepEqual(difference.points[4].toArray(), [90, 100]);
    assert.deepEqual(difference.points[5].toArray(), [90, 90]);
  });

  it('should find and return the union of the two polygons', function() {
    var union = subject.clip(clip, 'union')[0];
    assert.deepEqual(union.points[0].toArray(), [100, 90]);
    assert.deepEqual(union.points[1].toArray(), [100, 100]);
    assert.deepEqual(union.points[2].toArray(), [90, 100]);
    assert.deepEqual(union.points[3].toArray(), [90, 90]);
  });
  
  it('should be able to reuse polygons', function() {
    var union = subject.clip(clip, 'union')[0];
    var union2 = union.clip(clip2, 'union')[0];
    assert.deepEqual(union.points[0].toArray(), [95, 100]);
    assert.deepEqual(union.points[1].toArray(), [100, 100]);
    assert.deepEqual(union.points[2].toArray(), [100, 100]);
    assert.deepEqual(union.points[3].toArray(), [90, 90]);
  });
});