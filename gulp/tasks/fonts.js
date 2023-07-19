"use strict"

export const fonts = function() {
  return app.gulp.src(app.path.src.fonts, {since: app.gulp.lastRun('fonts')})
    .pipe(app.plugins.newer(app.path.build.fonts))
    .pipe(app.plugins.debug({title: 'fonts:'}))
    .pipe(app.gulp.dest(app.path.build.fonts))
    .pipe(app.plugins.bs.stream())
};