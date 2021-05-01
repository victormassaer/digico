const gulp = require("gulp");
const { src, dest, watch } = require("gulp");
const sass = require("gulp-sass");
const nodemon = require("gulp-nodemon");
sass.compiler = require("sass");

sass2css = function (done) {
  return src("./src/sass/app.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(dest("public/stylesheets/"));
  done();
};

exports.default = function () {
  // You can use a single task
  watch("./src/sass/**/*.scss", sass2css);
  //   watch(nodemon);
  nodemon({
    script: "node ./bin/www",
    ext: "js html",
    env: { NODE_ENV: "development" },
  });
};
