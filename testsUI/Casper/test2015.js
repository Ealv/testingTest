"use strict";

var height = 1024;
var width = 1680;

var numberOftest = 2;

//import {server} from '../../server/server.js';

var CONSTANTS_UI = {
	URL_TO_LOGIN: "http://localhost:8000/",
	USER_INPUT: "#user-input",
	PASSWORD_INPUT: "#password-input",
	BUTTON_SUBMIT: "#login-button",

	URL_TO_APP: "http://localhost:8000/client/app.html",
	ALL_IMAGES: ".photo-item .image"
};

var TESTS_UI = {
	COUNT_IMAGES: "[].slice.call(document.querySelectorAll('" + CONSTANTS_UI.ALL_IMAGES + "')).length",
	ALL_IMAGES_ARE_DOWNLOADED: function ALL_IMAGES_ARE_DOWNLOADED() {
		//return false;
		var allImages = window.document.querySelectorAll(".photo-item img");
		//2 convert it to a propoer array (for following sugar method "some")
		var allImages = [].slice.call(allImages);
		//3 check for all images to be loaded with the "some" method (image is loaded if it has width)
		return allImages.some(function (image) {
			return image.offsetWidth > 0;
		});
	}
};

casper.test.begin("Loggin process can be done ", numberOftest, function (test) {
	casper.start(CONSTANTS_UI.URL_TO_LOGIN, function () {
		/*casper.evaluate(function(){
  	var style = document.createElement('style');
  	var text = document.createTextNode('body { background: #fff;}');
  	style.setAttribute('type', 'text/css');
  	style.appendChild(text);
  	document.head.insertBefore(style, document.head.firstChild);
  });
  */

		test.assertEquals(casper.getCurrentUrl(), CONSTANTS_UI.URL_TO_LOGIN, "url login is ok");
		//wait until backbone+marionette do thieir job on page
		casper.waitForSelector(CONSTANTS_UI.USER_INPUT, function () {
			//test.assertExists('#user-input', "user inupt exist");
			// test.assertExists('#password-input', "password inupt exist");

			//change the viewport size for screenshot
			//nb screen shot via capser.capture is on then(function()) because we have to wait
			casper.viewport(width, height);
		});
	});
	casper.then(function () {
		//capture the while page
		casper.capture("screenshots/login-casper.png");
		//capture only the application logo
		//  casper.captureSelector('screenshots/app-logo.png', '#app-logo');

		// Click on the login button
		casper.click(CONSTANTS_UI.BUTTON_SUBMIT);
	});
	casper.then(function () {
		console.log("i capture marionette ");
		casper.waitForSelector("#sidebar-layout", function () {
			test.assertEquals(true, true, "home is loaded");

			casper.evaluate(initializePage);
			casper.capture("screenshots/marionette.png");
			casper.back();
		});
	});

	casper.run(function () {
		test.done();
		//kill gently the browser
		setTimeout(function () {
			phantom.exit();
		}, 0);
	});
});

