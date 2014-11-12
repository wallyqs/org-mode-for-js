var gulp = require('gulp'),
    karma = require('gulp-karma')({configFile: 'karma.conf.js'});
    path = require('path'),
    glob = require('glob'),
    watch = require('gulp-watch'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    runSequence = require('run-sequence'),
    karmaParseConfig = require('karma/lib/config').parseConfig;

var karmaConf = 'karma.conf.js';

function runKarma(configFilePath, options) {

    karma.start(config, function (exitCode) {
        process.exit(exitCode);
    });
}

gulp.task('test-bundle', function (cb) {
    var testFiles = glob.sync('./tests/**/*.spec.js');  // Bundle all our tests.
    browserify(testFiles, {debug: true})
        .bundle()
        .pipe(source('tests.js'))
        .pipe(gulp.dest('build/').on('finish', cb));
});

gulp.task('karma', function (cb) {
    runKarma(karmaConf, {
        autoWatch: false,
        singleRun: true
    }, cb);
});

/** single run */
gulp.task('test', function (cb) {
    runSequence(
        'test-bundle',
        'karma',
        cb
    );
});

gulp.task('fuck-knows',function (){
    var configFilePath = path.resolve(karmaConf);
    var config = karmaParseConfig(configFilePath, {});
    var options = {
        autoWatch: true,
        singleRun: false
    };
    Object.keys(options).forEach(function (key) {
        config[key] = options[key];
    });
    karma.start(config).then(karma.run);
});

gulp.task('watch', function () {
    var files = './tests/**/*.spec.js';
    runSequence(
        'test-bundle',
        'fuck-knows',
        function (){
            gulp.watch(files, function() {
                karma.run();
            });
        }
    );

    //gulp.src(files)
    //    .pipe(watch(files, function () {
    //        runSequence(
    //            'test-bundle',
    //            'karma',
    //            cb
    //        );
    //    }));
});