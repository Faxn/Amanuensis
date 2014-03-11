module.exports = function(config){
    config.set({
    basePath : '.',

    files : [
      'static/lib/angular.js',
      //'static/lib/angular-route.js',
      'static/lib/angular-ui-router.js',
      'test/lib/*.js',
      'static/js/app.js',
      'static/js/*.js',
      'test/*.js',
    ],

    exclude : [
      
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Firefox'],

    plugins : [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
            ],
/*
    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }
*/
})}
