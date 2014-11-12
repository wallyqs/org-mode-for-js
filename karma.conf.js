module.exports = function (karma) {
    karma.set({
        files: [
            'node_modules/es5-shim/es5-shim.js',
            'org-mode.js',
            'build/tests.js'
            //{pattern: 'tests/**/*.spec.js', watched: true, included: false, served: false}
        ],
        exclude: [],
        frameworks: ['mocha', 'chai'],
        plugins: [
            'karma-mocha',
            'karma-chai',
            'karma-phantomjs-launcher'
        ],
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