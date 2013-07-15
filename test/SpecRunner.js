require.config({
    baseUrl: '../app/scripts/',
    urlArgs: 'cb=' + Math.random(),

    paths: {
        jquery: '../bower_components/jquery/jquery',
        spec: '../../test/spec'
    }
});

/* require test suite */
require([
    'jquery',
    'spec/testSuite'
],
function( $, testSuite ) {

    'use strict';

    /* on dom ready require all specs and run */
    $( function() {
        require(testSuite.specs, function() {

            if (window.mochaPhantomJS) {
                mochaPhantomJS.run();
            }
            else {
                mocha.run();
            }
            
        });
    });
});
  