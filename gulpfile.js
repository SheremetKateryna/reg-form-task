var gulp = require('gulp');

var less = require('gulp-less');
var path = require('path');
let cleanCSS = require('gulp-clean-css');
var pug = require('gulp-pug');
var cleanhtml = require('gulp-cleanhtml');

/* CSS */

gulp.task('styles', function () {
  return gulp.src('./dev/style/style.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./dest/style'));
});

gulp.task('minify-css', () => {
  return gulp.src('dest/style/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dest/style'));
});

/* HTML */

gulp.task('pug', function buildHTML() {
  return gulp.src('dev/index.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('dest/'))
});

gulp.task('minify-html', function(){
  return gulp.src('dest/index.html')
    .pipe(cleanhtml())
    .pipe(gulp.dest('./'));
});

/* watch */

gulp.task('watch', function () {
   gulp.watch('dev/bem/*/*.less', gulp.series(['styles']));
   gulp.watch('dev/bem/*.less', gulp.series(['styles']));
   gulp.watch('dev/style/style.less', gulp.series(['styles']));
   gulp.watch('dev/bem/*/*.pug', gulp.series(['pug']));
   gulp.watch('dev/data/*.pug', gulp.series(['pug']));
   gulp.watch('dev/index.pug', gulp.series(['pug']));
   gulp.watch('dest/index.html', gulp.series(['minify-html']));

});


/* default */

gulp.task('default', gulp.series(['styles', 'minify-css','pug', 'minify-html', 'watch']));
