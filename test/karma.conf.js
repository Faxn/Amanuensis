module.exports = function(config){
    config.set({
    basePath : '..',

files : [
	//lib
    {pattern: 'public/lib/angular.js', included: true},
    {pattern: 'test/lib/**/*.js', included: true},
    {pattern: 'node_modules/requirejs/require.js', included: true},
    //code
    {pattern: 'public/js/**/*.js', included: true},
    //tests
    {pattern: 'test/*Provider.js', included: true},
    {pattern: 'test/*Spec.js', included: true},
    //{pattern: 'node_modules/**/*.js', included: false},
],

    exclude : [
      
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

	//reporters: ['progress'],

    browsers : ['PhantomJS'],

    plugins : [
            
            //'karma-chrome-launcher',
            'karma-phantomjs-launcher',
            //'karma-firefox-launcher',
            'karma-jasmine'
            
            ],
            
    logLevel :config.LOG_DEBUG,

})}
