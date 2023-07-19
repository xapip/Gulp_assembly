"use strict"

import dartSass from "sass";
import gulpSASS from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import cssbeautify from "gulp-cssbeautify";
import stripCssComments from "gulp-strip-css-comments";
import cssnano from "gulp-cssnano";
import webpcss from "gulp-webpcss";
import groupCssMediaQueries from "gulp-group-css-media-queries";

const sass = gulpSASS(dartSass);

export const css = function() {
  return app.gulp.src(app.path.src.css, {base: `${app.path.srcPath}assets/scss/`}, {since: app.gulp.lastRun('css')}, {sourcemaps: app.isDev})
  .pipe(app.plugins.plumber(
    app.plugins.notify.onError({
      title:    "SCSS Error",
      message:  "Error: <%= error.message %>"
    })
    ))
    .pipe(app.plugins.newer(`${app.path.build.css}*.css`))
    .pipe(sass({
      includePaths: './node_modules/'
    }))
    .pipe(
      app.plugins.if(app.isBuild, groupCssMediaQueries()))
    .pipe(
      app.plugins.if(app.isBuild, webpcss({
      webpClass: '.webp',
      noWebpClass: '.no-webp',
    })))
    .pipe(app.plugins.if(app.isBuild, autoprefixer({
      grid: true,
      overrideBrowserlist: ['last 3 versions'],
      cascade: true,
    })))
    .pipe(app.plugins.if(app.isBuild, cssbeautify()))
    .pipe(app.plugins.debug({title: 'css:'}))
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(cssnano({
      zindex: false,
      discardComments: {
          removeAll: true
      }
    }))
    .pipe(app.plugins.if(app.isBuild, stripCssComments()))
    .pipe(app.plugins.rename({
      suffix: ".min",
      extname: ".css"
    }))
    .pipe(app.plugins.debug({title: 'css-min:'}))
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.bs.stream())
}

// export const cssWatch = function() {
// return app.gulp.src(app.path.src.css, {base: `${app.path.srcPath}assets/scss/`}, {since: app.gulp.lastRun('css')})
//     .pipe(app.plugins.plumber({
//       errorHandler : function(err) {
//         app.plugins.notify.onError({
//             title:    "SCSS Error",
//             message:  "Error: <%= error.message %>"
//         })(err);
//         this.emit('end');
//       }
//     }))
//     .pipe(sass({
//       includePaths: './node_modules/'
//     }))
//     .pipe(app.plugins.rename({
//       suffix: ".min",
//       extname: ".css"
//     }))
//     .pipe(app.gulp.dest(app.path.build.css))
//     .pipe(app.plugins.bs.stream())
// })