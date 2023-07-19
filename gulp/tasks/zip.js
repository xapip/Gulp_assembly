'use strict'

import gulpZip from "gulp-zip";

export const zip = function() {
  app.plugins.del(`./${app.path.rootPath}.zip`)
  return app.gulp.src(`${app.path.distPath}/**/*.*`, {})
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title:    "zip Error",
        message:  "Error: <%= error.message %>"
      })
    ))
    .pipe(gulpZip(`${app.path.rootPath}.zip`))
    .pipe(app.gulp.dest('./'))
}