'use strict'

import { configFTP } from "../config/ftp.js";
import vinylFTP from "vinyl-ftp";
import util from "gulp-util";

export const ftp = function() {
  configFTP.log = util.log;
  const ftpConnect = vinylFTP.create(configFTP);
  return app.gulp.src(`${app.path.distPath}**/*.*`)
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title:    "ftp Error",
        message:  "Error: <%= error.message %>"
      })
    ))
    .pipe(ftpConnect.dest(`/${app.path.ftp}/${app.path.rootPath}`))
}