"use strict"

import gulp from 'gulp';

import {path} from './gulp/config/path.js';
import {plugins} from './gulp/config/plugins.js';

global.app = {
  isBuild: process.argv.includes('--build'),
  isDev: !process.argv.includes('--build'),
  gulp: gulp,
  path: path,
  plugins: plugins,
}

function lazyRequireTask(taskName, path, options) {
  gulp.task(taskName, async function() {
    let module = await import(path);
    return module[taskName]();
  })
}

lazyRequireTask('clean', './gulp/tasks/del.js', '');

lazyRequireTask('server', './gulp/tasks/server.js', '');

lazyRequireTask('html', './gulp/tasks/html.js', '');

lazyRequireTask('css', './gulp/tasks/css.js', '');

lazyRequireTask('js', './gulp/tasks/js.js', '');

lazyRequireTask('images', './gulp/tasks/images.js', '');

lazyRequireTask('fonts', './gulp/tasks/fonts.js', '');

lazyRequireTask('zip', './gulp/tasks/zip.js');

lazyRequireTask('ftp', './gulp/tasks/ftp.js');


gulp.task('watch', function() {
  gulp.watch(path.watch.html, gulp.series('html'));
  gulp.watch(path.watch.css, gulp.series('css'));
  gulp.watch(path.watch.js, gulp.series('js'));
  gulp.watch(path.watch.images, gulp.series('images'));
  gulp.watch(path.watch.fonts, gulp.series('fonts'));
})


gulp.task('build', gulp.series('clean', gulp.parallel('html', 'css', 'js', 'images', 'fonts')));

gulp.task('default', gulp.series('build', gulp.parallel('watch', 'server')));

gulp.task('buildZip', gulp.series('zip'));
gulp.task('deployFTP', gulp.series('ftp'));