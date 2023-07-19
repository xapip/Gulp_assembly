"use strict"

import * as nodePath from "path";

const rootPath = nodePath.basename(nodePath.resolve());
const srcPath = './src/';
const distPath = './dist/';

export const path = {
  build: {
    html: `${distPath}`,
    js: `${distPath}script/`,
    css: `${distPath}style/`,
    images: `${distPath}images/`,
    fonts: `${distPath}fonts/`,
  },
  src: {
    html: `${srcPath}*.html`,
    js: `${srcPath}assets/js/app.js`,
    css: `${srcPath}assets/scss/*.scss`,
    images: `${srcPath}assets/images/**/*.{jpg,png,svg,gif,ico,webp,webmanifest,xml,json}`,
    svg: `${srcPath}assets/images/**/*.svg`,
    fonts: `${srcPath}assets/fonts/**/*.{eot,woff,woff2,ttf,svg}`,
  },
  watch: {
    html: `${srcPath}**/*.html`,
    js: `${srcPath}assets/js/**/*.js`,
    css: `${srcPath}assets/scss/**/*.scss`,
    images: `${srcPath}assets/images/**/*.{jpg,png,svg,gif,ico,webp,webmanifest,xml,json}`,
    fonts: `${srcPath}assets/fonts/**/*.{eot,woff,woff2,ttf,svg}`,
  },
  clean: distPath,
  rootPath: rootPath,
  srcPath: srcPath,
  distPath: distPath,
  ftp: '',
}