"use strict"

import webp from 'gulp-webp';
import imagemin from "gulp-imagemin";

export const images = function() {
  return app.gulp.src(app.path.src.images, {base: `${app.path.srcPath}assets/images/`}, {since: app.gulp.lastRun('images')})
    .pipe(app.plugins.newer(app.path.build.images))
    .pipe(
      app.plugins.if(app.isBuild, webp()))
    .pipe(app.plugins.debug({title: 'img:'}))
    .pipe(
      app.plugins.if(app.isBuild, app.gulp.dest(app.path.build.images)))
    .pipe(
      app.plugins.if(app.isBuild, app.gulp.src(app.path.src.images)))
    .pipe(
      app.plugins.if(app.isBuild, app.plugins.newer(app.path.build.images)))
    .pipe(app.plugins.if(app.isBuild, imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      interlaced: true,
      optimizationLevel: 3,
    })))
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.gulp.src(app.path.src.svg))
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.plugins.bs.stream())
}