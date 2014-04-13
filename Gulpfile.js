var jshint = require('gulp-jshint');
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('default', ['lint'], function() {

});

gulp.task('lint', function() {
  gulp.src(['./api/**/*.js', 'server.js', './lib/**/*.js', './test/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('develop', function () {
  nodemon({ script: 'server.js', ext: 'html js', ignore: ['ignored.js'] })
    .on('change', ['lint'])
    .on('restart', function () {
      console.log('restarted!');
    });
});
