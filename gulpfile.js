var gulp = require('gulp'),
    karma = require('karma').server,
    path = require('path'),
    karmaParseConfig = require('karma/lib/config').parseConfig;

function runKarma(configFilePath, options, cb) {
    configFilePath = path.resolve(configFilePath);
    var config = karmaParseConfig(configFilePath, {});
    Object.keys(options).forEach(function (key) {
        config[key] = options[key];
    });
    karma.start(config, function (exitCode) {
        cb();
        process.exit(exitCode);
    });
}

/** single run */
gulp.task('test', function(cb) {
    runKarma('karma.conf.js', {
        autoWatch: false,
        singleRun: true
    }, cb);
});

/** continuous ... using karma to watch (feel free to circumvent that;) */
gulp.task('watch', function(cb) {
    runKarma('karma.conf.js', {
        autoWatch: true,
        singleRun: false
    }, cb);
});