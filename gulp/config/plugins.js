"use strict"


import replace from "gulp-replace";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import rename from "gulp-rename";
import bs from "browser-sync";
import newer from "gulp-newer";
import debug from "gulp-debug";
import gulpIf from "gulp-if";
import {deleteAsync as del} from 'del';


export const plugins = {
  del: del,
  replace: replace,
  plumber: plumber,
  notify: notify,
  bs: bs,
  rename: rename,
  newer: newer,
  debug: debug,
  if: gulpIf,
}