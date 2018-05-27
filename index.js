module.exports = function (options) {
  options = options || {};
  var gulp = options.gulp || require('gulp');
  var repeatOnEnter = options.repeatOnEnter || false;
  var taskName = options.taskName || 'prompt';

  var state = {
    repeatOnEnter: repeatOnEnter,
    taskName: taskName
  };

  gulp.task(taskName, function (cb) {
    var promptedTask;

    function startPrompt() {
      promptedTask = undefined;
      gulp.start(taskName);
    }

    function onTaskEnd(event) {
      setTimeout(function () {
        if (event && promptedTask && event.task === promptedTask) {
          state.lastPromptedTask = promptedTask;
          gulp.removeListener('task_stop', onTaskEnd);
          gulp.removeListener('task_err', onTaskEnd);
          gulp.removeListener('task_not_found', onTaskEnd);
          startPrompt();
        }
      });
    }

    gulp.on('task_stop', onTaskEnd);
    gulp.on('task_err', onTaskEnd);
    gulp.removeAllListeners('task_not_found');
    gulp.on('task_not_found', function (err) {
      console.log('Task \'' + err.task + '\' is not in your gulpfile');
      onTaskEnd(err);
    });

    var inquirer = require('inquirer');
    inquirer.prompt([{ type: 'input', name: 'task', 'message': 'Enter gulp task name:' }])
      .then(function (answers) {
        promptedTask = answers.task;
        if (repeatOnEnter) {
          promptedTask = promptedTask || state.lastPromptedTask;
        }
        promptedTask = promptedTask || taskName;
        cb();
        if (promptedTask !== ':q') {
          gulp.start(promptedTask);
        }
      });
  });

  return state;
};
