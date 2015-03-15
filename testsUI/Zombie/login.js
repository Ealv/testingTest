process.env.NODE_ENV = 'test';
//var app = require('../../server');
// use zombie.js as headless browser
var Browser = require('zombie');
//var Browser = require('phantom');
var assert = require('assert');

describe('login zombie page', function() {

        it('should ',function(done){
        Browser.localhost('http://localhost/', 8000);
        var browser = Browser.create();
        browser.visit('http://localhost:8000/', function() {                
                //console.log("body " + browser.body);
				//console.log("url  " + browser.url);
				assert.equal(browser.url, 'http://localhost:8000/');
                assert.equal(browser.text('h1'), 'Hello');
                done();
        });
        
});
});