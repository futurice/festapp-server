var jshint = require('gulp-jshint');
var gulp = require('gulp');

gulp.task('default', ['lint'], function() {

});

gulp.task('lint', function() {
  gulp.src(['./lib/*.js', 'server.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
