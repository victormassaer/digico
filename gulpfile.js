const { src, dest, watch } = require('gulp');
const sass = require("gulp-sass");
sass.compiler = require("sass");

sass2css = function(done){
    return src('./src/sass/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('public/stylesheets/'))
    done();
}

exports.default = function() {
    // You can use a single task
    watch('./src/sass/**/*.scss', sass2css);
  };
