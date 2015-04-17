/***
	all implemenations details about tests a non-programmer don't care/understand
**/


export const CONSTANTS_UI = {
	"URL_TO_LOGIN" 				: 'http://localhost:8000/',
	"PATH_TO_USER_INPUT"		: "#user-input",
	"PATH_TO_PASSWORD_INPUT"	: "#password-input",
	"URL_TO_APP" 				: 'http://localhost:8000/client/app.html',
	"ALL_IMAGES" 				: '.photo-item .image'
};

export const TESTS_UI = {

	COUNT_IMAGES : "[].slice.call(document.querySelectorAll('" + CONSTANTS_UI.ALL_IMAGES + "')).length",
	COUNT_IMAGES2 : function (window) {
		//return false;
		var allImages = window.document.querySelectorAll('.photo-item img');
		//2 convert it to a propoer array (for following sugar method "some")
		var allImages = [].slice.call(allImages);
		//3 check for all images to be loaded with the "some" method (image is loaded if it has width)
		console.log("length " + allImages.length);

		return allImages.length;
	},

	ALL_IMAGES_ARE_DOWNLOADED : function () {
		//return false;
		var allImages = window.document.querySelectorAll('.photo-item img');
		//2 convert it to a propoer array (for following sugar method "some")
		var allImages = [].slice.call(allImages);
		//3 check for all images to be loaded with the "some" method (image is loaded if it has width)
		return allImages.some(function(image){return (image.offsetWidth > 0);});
	}

	};
