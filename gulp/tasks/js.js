"use strict"

import uglify from "gulp-uglify";
import webpack from "webpack-stream";

export const js = function() {
  return app.gulp.src(app.path.src.js, {base: `${app.path.srcPath}assets/js/`}, {since: app.gulp.lastRun('js')}, {sourcemaps: app.isDev})
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title:    "JS Error",
        message:  "Error: <%= error.message %>"
      })
    ))
    .pipe(app.plugins.newer(`${app.path.build.js}app.min.js`))
    .pipe(webpack({
      mode: app.isBuild ? 'production' : 'development',
      output: {
        filename: 'app.min.js',
      }
    }))
    .pipe(app.plugins.debug({title: 'js:'}))
    .pipe(app.gulp.dest(app.path.build.js))
    .pipe(app.plugins.bs.stream())
}