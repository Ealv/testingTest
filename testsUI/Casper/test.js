var height = 1024;
var width = 1680;
var numberOftest = 2;

var CONSTANTS_UI = {
	"URL_TO_LOGIN" 				: 'http://localhost:8000/',
	"USER_INPUT"		: "#user-name",
	"PASSWORD_INPUT"	: "#password",
	"BUTTON_SUBMIT"		: "#login-button",

	"URL_TO_APP" 				: 'http://localhost:8000/client/app.html',
	"ALL_IMAGES" 				: '.photo-item .image'
};

var TESTS_UI = {
	COUNT_IMAGES : "[].slice.call(document.querySelectorAll('" + CONSTANTS_UI.ALL_IMAGES + "')).length",
	COUNT_IMAGES2 : function(){return [].slice.call(document.querySelectorAll(CONSTANTS_UI.ALL_IMAGES)).length;},
	ALL_IMAGES_ARE_DOWNLOADED : function () {
	//return false;
	var allImages = window.document.querySelectorAll('.photo-item img');
	//2 convert it to a propoer array (for following sugar method "some")
	var allImages = [].slice.call(allImages);
	//3 check for all images to be loaded with the "some" method (image is loaded if it has width)
	return allImages.some(function(image){return (image.offsetWidth > 0);});
	}
};

casper.test.begin('Loggin process can be done ', numberOftest, function (test) {
	casper.start(CONSTANTS_UI.URL_TO_LOGIN, function() {
		test.assertEquals(casper.getCurrentUrl(),CONSTANTS_UI.URL_TO_LOGIN,	"url login is ok");
		test.assertExists(CONSTANTS_UI.USER_INPUT, 							"user inupt exist");
		test.assertExists(CONSTANTS_UI.PASSWORD_INPUT, 						"password inupt exist");
		casper.viewport(width, height);
	});
	casper.then(function() {
    	casper.capture('screenshots/login-casper.png');
    	casper.click(CONSTANTS_UI.BUTTON_SUBMIT);
	});
	casper.then(function() {
		casper.fill("form",{user_name:"zombie",password:"hack-da-world"},true);
		casper.then(function() {
			test.assertEquals(casper.getCurrentUrl(),CONSTANTS_UI.URL_TO_LOGIN,	"url login is ok");
		});
	});
	casper.then(function() {
		casper.fill("form",{user_name:"zombie",password:"do-you-need-brain?"},true);
		casper.then(function() {
			test.assertEquals(casper.getCurrentUrl(),CONSTANTS_UI.URL_TO_APP,	"url app is ok");
		});
	});

	casper.open(CONSTANTS_UI.URL_TO_APP, function() {
	});
	casper.then(function() {
		test.assertEquals(casper.getCurrentUrl(),CONSTANTS_UI.URL_TO_APP,	"url app is ok");
		test.assertEquals(casper.getHTML('h1'), 'Hello'				,"content text is 'Hello'");
  		test.assertElementCount(CONSTANTS_UI.ALL_IMAGES, 2,"two images are present");
		casper.viewport(width, height);
		casper.capture('screenshots/app-casper.png');
	});

	casper.run(function() {
		test.done();
		//kill gently the browser
		setTimeout(function(){
			phantom.exit()
		}, 0);
	});
}); 
