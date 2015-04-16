process.env.NODE_ENV = 'test';
var Browser = require('zombie');
var assert = require("chai").assert;

import {TESTS_UI} from '../guicontext.js';

describe('test Zombie testing UI', function() {
	Browser.localhost('http://localhost/', 8000);
	const browser = new Browser();
	it('should say hello, on a beautifull page with two images',function(done){

		browser.debug();
		browser.visit('http://localhost:8000/', function() {
			assert.equal(browser.url, 'http://localhost:8000/'			,"url is ok ");
			assert.equal(browser.text('h1'), 'Hello'					,"content text is 'Hello'");
			browser.assert.evaluate(TESTS_UI.COUNT_IMAGES,2				,"two images are present");
			browser.assert.element("#page-link"							,"a click button to another page ?");

			//browser.wait(TESTS_UI.COUNT_IMAGES2, function() {console.log("this is ok fo rocunt  ");})
			browser.clickLink("#page-link", function(){console.log("link clicked ")});
			done();
		});
	});
});