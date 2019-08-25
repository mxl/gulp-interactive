const inquirer = require('inquirer');

module.exports = function (options) {
  options = options || {};
  const gulp = options.gulp || require('gulp');
  const repeatOnEnter = options.repeatOnEnter || false;
  const taskName = options.taskName || 'prompt';

  const state = {
    repeatOnEnter: repeatOnEnter,
    taskName: taskName
  };

  function startPrompt() {
    gulp.start(taskName);
  }

  gulp.on('task_not_found', function (err) {
    console.log('Task \'' + err.task + '\' is not in your gulpfile');
    startPrompt();
  });

  gulp.task(taskName, function (cb) {
    let promptedTask;

    inquirer.prompt([{type: 'input', name: 'task', 'message': 'Enter gulp task name:'}])
      .then(function (answers) {
        promptedTask = answers.task || (repeatOnEnter ? promptedTask : null) || taskName;
        if (promptedTask !== ':q') {
          gulp.start(promptedTask, function (err) {
            cb();
            startPrompt();
            if (err) {
              if (typeof options.onError === 'function') {
                options.onError(err);
              } else {
                console.error(err);
              }
            }
          });
        } else {
          cb();
        }
      });
  });

  return state;
};
