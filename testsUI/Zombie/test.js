process.env.NODE_ENV	= 'test';
var Browser				= require('zombie');
var assert				= require("chai").assert;
var http				= require("http");

import {server} from '../../server/server.js';
import {CONSTANTS_UI} from '../guicontext.js';
import {TESTS_UI} from '../guicontext.js';

Browser.localhost(CONSTANTS_UI.URL_TO_LOGIN, 8000);
const browser = new Browser({ site: CONSTANTS_UI.URL_TO_LOGIN });
//browser.debug();

describe('test Zombie login UI', function() {
	it('should start with a login page ',function(done){
		browser.visit(CONSTANTS_UI.URL_TO_LOGIN, function() {
			assert.equal(browser.url, CONSTANTS_UI.URL_TO_LOGIN,"url login is ok ");
			done();
		});
	});

	it('should refuse wrong login ',function(done){
		browser.fill(CONSTANTS_UI.PATH_TO_USER_INPUT, "zombie")
		.fill(CONSTANTS_UI.PATH_TO_PASSWORD_INPUT, "hack-da-world");
		browser.pressButton("#login-button", function() {
			assert.equal(browser.url, CONSTANTS_UI.URL_TO_LOGIN,"url login is ok ");
			done();
		});
	});

	it('should accept good login ',function(done){
		browser.fill(CONSTANTS_UI.PATH_TO_USER_INPUT, "zombie").fill(CONSTANTS_UI.PATH_TO_PASSWORD_INPUT, "do-you-need-brain?");
		browser.pressButton("#login-button", function() {
			assert.equal(browser.url, CONSTANTS_UI.URL_TO_APP,"url login is ok ");
			assert.equal(true,true);
			done();
		});
	});
});

describe('test Zombie app with tricky check on web page UI', function() {
	it('should say hello, on a beautifull page with two images',function(done){
		browser.visit(CONSTANTS_UI.URL_TO_APP, function() {
			assert.equal(browser.url, CONSTANTS_UI.URL_TO_APP			,"url app is ok ");
			assert.equal(browser.text('h1'), 'Hello'					,"content text is 'Hello'");
			browser.assert.evaluate(TESTS_UI.COUNT_IMAGES,2				,"two images are present");
			browser.assert.element("#page-link"							,"a click button to another page ?");
			//browser.wait(TESTS_UI.COUNT_IMAGES2, function() {console.log("this is ok fo rocunt  ");})
			//browser.clickLink("#page-link", function(){console.log("link clicked ")});
			done();
		});
	});
});


