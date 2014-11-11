var gulp = require('gulp'),
    watch = require('gulp-watch'),
    karmaServer = require('karma').server,
    karma = require('gulp-karma');

gulp.task('test', function (done) {
    karmaServer.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done);
});

gulp.task('watch', function () {
    gulp.src( ['gulpfile.js', 'tests/**/*.spec']).pipe(karma({
        configFile: __dirname + '/karma.conf.js',
        action: 'watch'
    }))
});