module.exports = function(config){
    config.set({
    basePath : '..',

files : [
	//lib
    {pattern: 'public/lib/angular.js', included: true},
    {pattern: 'test/lib/**/*.js', included: true},
    {pattern: 'node_modules/requirejs/require.js', included: true},
    //code
    {pattern: 'public/js/amanuensis/*.js', included: true},
    {pattern: 'public/js/app.js', included: true},
    {pattern: 'public/js/models.js', included: true},
    //tests
    {pattern: 'test/*Provider.js', included: true},
    {pattern: 'test/*Spec.js', included: true},
],

    exclude : [
      
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['PhantomJS'],

    plugins : [
            'karma-phantomjs-launcher',
            'karma-jasmine'
            ],
            
    logLevel :config.LOG_DEBUG,

})}
