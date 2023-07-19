"use strict"

import panini from "panini";
import webpHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from 'gulp-version-number';


export const html = function() {
  panini.refresh();
  return app.gulp.src(app.path.src.html, {base: app.path.srcPath}, {since: app.gulp.lastRun('html')})
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'HTML',
        message: 'Error: <%= error.message %>'
      })
    ))
    .pipe(app.plugins.newer(`${app.path.build.html}*.html`))
    .pipe(panini({
      root: app.path.srcPath,
      layouts: `${app.path.srcPath}layouts/`,
      partials: `${app.path.srcPath}partials/`,
      helpers: `${app.path.srcPath}helpers/`,
      data: `${app.path.srcPath}data/`,
    }))
    .pipe(app.plugins.replace(/\.+\/assets\//g, './'))
    .pipe(app.plugins.if(app.isBuild, webpHtmlNosvg()))
    .pipe(app.plugins.if(app.isBuild, versionNumber({
      'value': '%DT%',
      'append': {
        'key': '_v',
        'cover': 0,
        'to': ['css', 'js',],
      },
      'output': {
        'file': 'gulp/version.json',
      }
    })))
    .pipe(app.plugins.debug({title: 'html:'}))
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.bs.stream())
}