[![npm](https://img.shields.io/npm/v/gulp-interactive.svg)](https://www.npmjs.com/package/gulp-interactive)
[![Build Status](https://travis-ci.org/mxl/gulp-interactive.svg?branch=master)](https://travis-ci.org/mxl/gulp-interactive)
[![David](https://img.shields.io/david/mxl/gulp-interactive.svg)](https://david-dm.org/mxl/gulp-interactive)

# gulp-interactive
Gulp interactive prompt.

## Install

```bash
$ npm install --save-dev gulp-interactive
```

## Usage

### gulpfile.js
```js
var gulp = require('gulp')
var interactive = require('gulp-interactive')

interactive();

gulp.task('build', function(cb) {
  cb();
});

```

### Shell

Launch interactive prompt:

```bash
$ gulp prompt
[01:37:56] Using gulpfile ~/gulp-interactive-example/gulpfile.js
[01:37:56] Starting 'prompt'...
? Enter gulp task name:
```

Then enter task name:

```bash
? Enter gulp task name: build
[01:38:05] Finished 'prompt' after 9 s
[01:38:05] Starting 'build'...
[01:39:05] Finished 'build' after 15 μs
[01:39:05] Starting 'prompt'...
? Enter gulp task name:
```

Enter `:q` to exit prompt.
```bash
? Enter gulp task name: :q
[01:39:09] Finished 'prompt' after 4 s
```

## API

### interactive(options)

#### options

Type: `Object`

##### repeatOnEnter

Type: `boolean`<br>
Default: `false`

Repeat last executed task by simply pressing Enter.

##### taskName

Type: `string`<br>
Default: `prompt`

Gulp task name that starts interactive prompt.

## License

See the [LICENSE](https://github.com/mxl/gulp-interactive/blob/master/LICENSE) file for details.