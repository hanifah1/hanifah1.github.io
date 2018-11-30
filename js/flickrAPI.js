//global variables
var jsonArray = [];

//Load flickr gallery
var httpRequest = new XMLHttpRequest();
httpRequest.open('GET', 'https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=66b821bf75ec005c7140b0f3358f0427&gallery_id=66911286-72157692049980335&per_page=10&format=json&nojsoncallback=1', true);

httpRequest.onload = function() {
	//check status of API request
	if (httpRequest.status >= 200 && httpRequest.status < 400) {

		//loads/stores retrieved data from API
		var resp = JSON.parse(httpRequest.responseText);
		console.log(resp);
		var output = '';

		//loop through JSON data
		for(var i in resp.photos.photo){

			//assigned variables to data pulled from arrays
			var farm = resp.photos.photo[i].farm;
			var server = resp.photos.photo[i].server;
			var id = resp.photos.photo[i].id;
			var secret = resp.photos.photo[i].secret;

			//Output formatting: https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
			//height/width adjusted for thumbnails
			//creation of modal for each image in gallery where <a> tag displays thumbnail & full image is displayed in the body of the modal
			output = '<a href="#openModal"><img src="https://farm' + farm + '.staticflickr.com/' + server + '/' + id + '_' + secret + '.jpg"\
			height="225" width="300"/></a>\
			<div id="openModal" class="modalDialog">\
			<div id= "modalContent">\
			<a href="#close" title="Close" class="close">X</a>\
			<img id="displayImg" class="responsive" src="">\
			</div>\
			</div>'

			//pushes HTML outputs to array
			jsonArray.push(output);

		}//ends for loop

		//sets first page and amount of photos per page
		var current_page = 1;
		var records_per_page = 10;

		//adds funtionality to previous page button, this has no functionality if on page one
		function prevPage()
		{
			if (current_page > 1) {
				current_page--;
				changePage(current_page);
			}
		}

		//adds funtionality to next page button, this has no functionality if on last page
		function nextPage()
		{
			if (current_page < numPages()) {
				current_page++;
				changePage(current_page);
			}
		}

		function changePage(page)
		{
			var btn_next = document.getElementById("btn_next");
			var btn_prev = document.getElementById("btn_prev");
			var gallery = document.getElementById("gallery");
			var page_span = document.getElementById("page");

			//clears images from previous page load when page is changed
			gallery.innerHTML = "";

			//for loop writes the intended array elements into the HTML tag
			for (var i = (page-1) * records_per_page; i < (page * records_per_page) && i < jsonArray.length; i++) {
				gallery.innerHTML += jsonArray[i];
			}

			//displays the current page in relation to the total number of pages
			page_span.innerHTML = page + "/" + numPages();

			//prevents previous button from showing if user is on page 1
			if (page == 1) {
				btn_prev.style.visibility = "hidden";
			} else {
				btn_prev.style.visibility = "visible";
			}

			//prevents next button from showing if user is on last
			if (page == numPages()) {
				btn_next.style.visibility = "hidden";
			} else {
				btn_next.style.visibility = "visible";
			}

			//This part needs to be converted to vanilla JS
			//add event listener to assign src attribute from thumbnail to display in modal
			for (let j = 0; j < jsonArray.length; j++) {
				$('img').on('click',function()
				{

					var imgSrc =$(this).attr('src');
					$('#displayImg').attr('src', imgSrc);
					$('#openModal').modal('show');
				});
			}//ends for loop
		}

		//calculates the nmuber of pages using the amount of items in array and the intended amount of items per page
		function numPages()
		{
			return Math.ceil(jsonArray.length / records_per_page);
		}

		//loads data for page one when application is opened
		if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
    		changePage(1);
  		} 

		//makes functions global instead of local
		window['nextPage'] = nextPage;
		window['prevPage'] = prevPage;
	}
};

httpRequest.send();
