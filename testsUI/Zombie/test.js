process.env.NODE_ENV	= 'test';
var Browser				= require('zombie');
var assert				= require("chai").assert;

import {server} from '../../server/server.js';
import {CONSTANTS_UI} from '../guicontext.js';
import {TESTS_UI} from '../guicontext.js';

const browser = new Browser({ site: CONSTANTS_UI.URL_TO_LOGIN });
//browser.debug();

describe('test Zombie login UI', function() {
	it('start with a login page ',function(done){
		browser.visit(CONSTANTS_UI.URL_TO_LOGIN, function() {
			assert.equal(browser.url, CONSTANTS_UI.URL_TO_LOGIN			,"url login is ok ");
			done();
		});
	});

	it('refuse wrong login ',function(done){
		browser
			.fill(CONSTANTS_UI.USER_INPUT, "zombie")
			.fill(CONSTANTS_UI.PASSWORD_INPUT, "hack-da-world")
			.pressButton(CONSTANTS_UI.BUTTON_SUBMIT, function() {
				assert.equal(browser.url, CONSTANTS_UI.URL_TO_LOGIN		,"redirect to login is ok ");
				done();
		});
	});

	it('accept good login ',function(done){
		browser
			.fill(CONSTANTS_UI.USER_INPUT, "zombie")
			.fill(CONSTANTS_UI.PASSWORD_INPUT, "do-you-need-brain?")
			.pressButton(CONSTANTS_UI.BUTTON_SUBMIT, function() {
				assert.equal(browser.url, CONSTANTS_UI.URL_TO_APP		,"redirect to app is ok ");
				done();
		});
	});
});

describe('test Zombie app with tricky check on web page UI', function() {
	it('say hello, on a beautifull page with two images',function(done){
		browser
			.visit(CONSTANTS_UI.URL_TO_APP, function() {
				assert.equal(browser.url, CONSTANTS_UI.URL_TO_APP		,"url app is ok ");
				assert.equal(browser.text('h1'), 'Hello'				,"content text is 'Hello'");
				browser.assert.evaluate(TESTS_UI.COUNT_IMAGES,2			,"two images are present");
				done();
		});
	});
});