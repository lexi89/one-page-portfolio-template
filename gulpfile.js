var gulp = require("gulp");
var bs = require("browser-sync");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var imagemin = require("gulp-imagemin");
var htmlmin = require("gulp-htmlmin");
var cssmin = require("gulp-cssnano");
var useref = require("gulp-useref");
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
  // reload browser on any css, js, or html change
  gulp.watch(["./src/js/*.js", "./src/css/*.css", "./src*.html"], bs.reload);
});




// Compile sass
gulp.task("sass", function(){
  return gulp
    .src("./src/css/main.scss")
    .pipe(sass({
      includePaths: ['./src/bower_components/foundation-sites/scss'],
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

// minify js
gulp.task("jsmin", function(){
  return gulp.src("./src/index.html")
  .pipe(useref())
  .pipe(gulpIf("*.js", uglify()))
  .pipe(gulp.dest("dist"))
});

// minify html
// gulp.task("htmlmin", function(){
//   return gulp.src("./src*.html")
//   .pipe(htmlmin({collapseWhitespace:true}))
//   .pipe(gulp.dest("dist"));
// })

// minify images
gulp.task("imagemin", function(){
  gulp.src("./src/assets/images/*.jpg")
  .pipe(imagemin())
  .pipe(gulp.dest("./dist/assets/images"))
});

// minify css
gulp.task("cssmin", function(){
  return gulp.src("./src/index.html")
  .pipe(useref())
  .pipe(gulpIf("*.css", cssmin()))
  .pipe(gulp.dest("./dist"));
});

gulp.task("build", ["imagemin", "cssmin", "jsmin"])

// run public files without browser reload
gulp.task("production", function(){
  bs.init({
    notify: false,
    server: {
      baseDir: "./dist"
    }
  });
});

// run dev files from /src with browser reload
// gulp.task("serve", ["serve"]);
