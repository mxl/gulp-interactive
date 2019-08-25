const
  assert = require('assert'),
  interactive = require('./'),
  gulp = require('gulp');

describe('interactive', function () {
  let stdin;

  beforeEach(function () {
    stdin = require('mock-stdin').stdin();
  });

  it('launches interactive prompt and executes task', function (done) {
    const taskName = 'test';
    gulp.task(taskName, function (cb) {
      cb();
      done();
    });
    const state = interactive();
    gulp.start(state.taskName);
    stdin.send([taskName, '']);
  });

  it('launches interactive prompt with custom task name and executes task', function (done) {
    const taskName = 'test';
    gulp.task(taskName, function (cb) {
      cb();
      done();
    });
    const promptTaskName = 'prompt2';
    const state = interactive({ taskName: promptTaskName });
    assert.equal(promptTaskName, state.taskName);
    gulp.start(promptTaskName);
    stdin.send([taskName]);
  });

  it('launches previously executed task on enter', function (done) {
    const taskName = 'test';
    let secondRun = false;
    gulp.task(taskName, function (cb) {
      cb();
      if (secondRun) {
        done();
      } else {
        secondRun = true;
      }
    });
    const state = interactive({ repeatOnEnter: true });
    gulp.start(state.taskName);
    stdin.send([taskName, '']);
  });

  it('handles errors', function (done) {
    const taskName = 'test';
    let secondRun = false;
    gulp.task(taskName, function (cb) {
      if (secondRun) {
        cb();
        done();
      } else {
        secondRun = true;
        throw new Error();
      }
    });
    const state = interactive({
    });
    gulp.start(state.taskName);
    stdin.send([taskName, taskName]);
  })
});