const gulp    = require ('gulp');
const uglify  = require ('gulp-uglify');
const concat  = require ('gulp-concat');
const babel   = require ('gulp-babel');

const plumber = require ('gulp-plumber');
const reload  = require ('gulp-livereload');

const vendors = require ('./vendors.js');
const sass    = require ('gulp-sass');

//const image   = require('gulp-image');

gulp.task ('html', function ()  {
  gulp.src ('src/*.html')
      .pipe (gulp.dest('build'));
});

//methode 1:
gulp.task ('sass', function ()  {
  return gulp.src ('./src/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src'));
});

//methode 2:

// gulp.task ('sass', function ()  {
//   gulp.src ('src/*.sass')
//       .pipe(sass())
//       .pipe (concat('custom.css'))
//       .pipe (gulp.dest('./src'));
// });

gulp.task ('svg', function ()  {
  gulp.src ('src/*.svg')
      .pipe (gulp.dest('build'));
});

gulp.task ('custom-css', function ()  {
  gulp.src ('src/*.css')
      .pipe (concat('custom.css'))
      .pipe (gulp.dest('build'));
});

gulp.task ('custom-js', function () {
  gulp.src ('src/*.js')
      .pipe (plumber())
      .pipe(babel({
        presets: ['es2015']
      }))
  //gulp.src ('src/assets/*')
     // .pipe(image())
      .pipe (uglify())
      .pipe (concat('custom.js'))
      .pipe (gulp.dest('build'));
      gulp.src('src/assets/*')// ces deux lignes servent à bien prendre en compte les immages dans le jeu
      .pipe(gulp.dest('build/assets'));
});

gulp.task ('vendor', function () {
  gulp.src (vendors.js)
      .pipe (uglify())
      .pipe (concat('vendors.js'))
      .pipe (gulp.dest('build'));
});

gulp.task ('build', ['custom-css', 'custom-js', 'html','sass',]);
gulp.task ('build-all', ['build', 'vendor']);

gulp.task ('watch', ['build'], function () {
  reload.listen();
  gulp.watch('build/**/*').on('change', reload.changed);
  return gulp.watch('src/**/*', ['build']);
});