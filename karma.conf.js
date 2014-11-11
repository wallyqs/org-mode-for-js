module.exports = function (karma) {
    karma.set({
        files: [
            'org-mode.js',
            'tests/**/*.spec.js'
        ],
        exclude: [],
        frameworks: ['mocha', 'chai'],
        plugins: ['karma-mocha',
            'karma-chai',
            'karma-phantomjs-launcher'],
        reporters: 'dots',
        port: 9018,
        runnerPort: 9100,
        urlRoot: '/',
        autoWatch: false,
        browsers: [
            'PhantomJS'
        ],
        logLevel: karma.LOG_ERROR
    });
};