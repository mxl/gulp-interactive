var interactive = require('./');
var gulp = require('gulp');
var assert = require('assert');
// gulp.task('test', function (cb) {
//   cb();
// });
// interactive();
// gulp.start('prompt');
//
describe('interactive', function () {
  var stdin;

  beforeEach(function () {
    stdin = require('mock-stdin').stdin();
  });

  it('launches interactive prompt and executes task', function (done) {
    var taskName = 'test';
    gulp.task(taskName, function (cb) {
      cb();
      done();
    });
    var state = interactive();
    gulp.start(state.taskName);
    stdin.send(taskName + '\n');
  });

  it('launches interactive prompt with custom task name and executes task', function (done) {
    var taskName = 'test';
    gulp.task(taskName, function (cb) {
      cb();
      done();
    });
    var promptTaskName = 'prompt2';
    var state = interactive({ taskName: promptTaskName });
    assert.equal(promptTaskName, state.taskName);
    gulp.start(promptTaskName);
    stdin.send(taskName + '\n');
  });

  it('launches previously executed task on enter', function (done) {
    var taskName = 'test';
    var secondRun = false;
    gulp.task(taskName, function (cb) {
      cb();
      if (secondRun) {
        done();
      } else {
        secondRun = true;
        stdin.send('');
      }
    });
    var state = interactive({ repeatOnEnter: true });
    gulp.start(state.taskName);
    stdin.send(taskName + '\n');
  });
});