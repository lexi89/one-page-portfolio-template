var gulp = require("gulp");
var bs = require("browser-sync");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var imagemin = require("gulp-imagemin");
var htmlmin = require("gulp-htmlmin");
var cssmin = require("gulp-cssnano");
var jscat = require("gulp-useref");
var uglify = require("gulp-uglify");
var gulpIf = require("gulp-if");
var autoprefixerOptions = {
  browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3']
}

gulp.task("serve", function(){
  bs.init({
    notify: false,
    server: {
      baseDir: "./src"
    }
  });
  // watch sass files & run compile
  gulp.watch("./src/css/main.scss", ["sass"]);
  // watch html, css, and js files
  gulp.watch(["./src/js/*.js", "./src/css/*.css", "./src*.html"], bs.reload);
});

// Compile sass
gulp.task("sass", function(){
  return gulp
    .src("./src/css/main.scss")
    .pipe(sass({
      includePaths: ['./bower_components/foundation-sites/scss'],
      style: "compressed",
      errLogToConsole: false,
      onError: function(err){
        return notify().write(err);
      }
    }).on("error", sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest("./src/css"))
    .pipe(bs.stream());
});

gulp.task("jsmin", function(){
  return gulp.src("./src/index.html")
  .pipe(jscat())
  .pipe(gulpIf("*.js", uglify()))
  .pipe(gulp.dest("dist"))
});

gulp.task("htmlmin", function(){
  return gulp.src("./src*.html")
  .pipe(htmlmin({collapseWhitespace:true}))
  .pipe(gulp.dest("dist"));
})


gulp.task("imagemin", function(){
  gulp.src("./src/assets/images/*.jpg")
  .pipe(imagemin())
  .pipe(gulp.dest("./dist/assets/images"))
});

gulp.task("cssmin", function(){
  return gulp.src("./src/css/main.css")
  .pipe(cssmin())
  .pipe(gulp.dest("./dist/css"));
});

gulp.task("default", ["serve"]);
