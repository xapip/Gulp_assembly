"use strict"

app.plugins.bs.create();

export const server = function() {
  app.plugins.bs.init({
    server: {
      baseDir: `${app.path.distPath}`,
    },
  });
}