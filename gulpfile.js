var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var gutil = require('gulp-util');
var pkg = require('./package.json');
var uglify = require('gulp-uglify');
var pump = require('pump');
var concat = require('gulp-concat');
var htmlmin = require('gulp-htmlmin');
var cssnano = require('gulp-cssnano');
var gulpCopy = require('gulp-copy');
var flatten = require('gulp-flatten');
// Copy third party libraries from /node_modules into /vendor
gulp.task('vendor', function() {

  // Bootstrap
  gulp.src([
      './node_modules/bootstrap/dist/**/*',
      '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
      '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
    ])
    .pipe(gulp.dest('./vendor/bootstrap'))

  // jQuery
  gulp.src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js'
    ])
    .pipe(gulp.dest('./vendor/jquery'))

})

// Default task
gulp.task('default', ['vendor']);

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

// Dev task
gulp.task('dev', ['browserSync'], function() {
  gulp.watch('./css/*.css', browserSync.reload);
  gulp.watch('./*.html', browserSync.reload);

  
  gulp.watch('./js/*.js', browserSync.reload);

  gulp.watch('./assets/js/*.js', browserSync.reload);
  gulp.watch('./assets/csss/*.css', browserSync.reload);
});



 
gulp.task('compressHtml',function()
{
  return gulp.src('index.html')
  .pipe(htmlmin({collapseWhitespace: true,removeComments: true}))
  .pipe(gulp.dest('dist'));

});
 
gulp.task('compressCSS',function()
{
  gulp.src(['./css/*.css','vendor/bootstrap/css/bootstrap.min.css'])
  .pipe(concat('all.css'))
  .pipe(cssnano(  {"discardComments": {"removeAll": true}}))
  .pipe(gulp.dest('dist')
);
});

//compress
gulp.task('compressJS', function () {

  
        //js unificados
        gulp.src(['assets/js/main.js','assets/js/jquery.cycleText.min.js','js/main.js','assets/js/table.js'])
      
        .pipe(uglify())
        .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/assets/js/'));
        //js tal cual

   
        

        gulp.src(['vendor/jquery/jquery.min.js','vendor/bootstrap/js/bootstrap.bundle.min.js'])
        .pipe(gulp.dest('dist/assets/js'));


});
 


//compressAll
gulp.task('compress', function () {

  //js
  gulp.start('compressJS');
  //css
  gulp.start('compressCSS');
  //HTML
  gulp.start('compressHtml');


  gulp.src(['assets/img/*.png'])
  .pipe(gulpCopy('dist/'));

  gulp.src(['images/*'])
  .pipe(gulpCopy('dist/'));


  gulp.src('favicon.ico')
  .pipe(gulpCopy('dist/'));

  gulp.src('api.php')
  .pipe(gulp.dest('dist/'));

});

