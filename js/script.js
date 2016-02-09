// Serach Bar Handler
$(function () {
	var searchField = $('#query');
	var icon = $('#search-btn');

	// Focus Event Handler
	$(searchField).on('focus', function() {
		$(this).animate( {
			width: '100%'
		}, 400);  // width and speed of focus option
		$(icon).animate( {
			right: '10px'
		}, 400);  // margin and speed of focus option
	});

	// Blur Event Handler
	$(searchField).on('blur', function() {
		if(searchField.val() == '') {
			$(searchField).animate({
				width: '45%'
			}, 400, function(){});
			$(icon).animate({
				right: '360px'
			}, 400, function(){});
		}
	});

	$('#search-form').submit(function(e) {
		e.preventDefault(); // Prevents default so the form doesn't actually submit
	});
})


function search() {
	// Clear Results
	$('#results').html('');
	$('#buttons').html('');

	// Get Form Input
	q = $('#query').val();

	// Run GET Request on API; there are many different ways you can do this with jQuery
	$.get(
		"https://www.googleapis.com/youtube/v3/search", {
			part: 'snippet, id',
			q: q,
			type: 'video',
			key: 'AIzaSyCpyw9rPLmLX6r-fXdbBdsm6by_INA9SbQ'}, 
			function(data) {
				var nextPageToken = data.nextPageToken;
				var prevPageToken = data.prevPageToken;

				// Looping through items and logging data
				console.log(data); 

				$.each(data.items, function(i, item) {
					// Custom function for getting output
					var output = getOutput(item); // All h3 tags and videos

					// Display Results
					$('#results').append(output);
				});

				var buttons = getButtons(prevPageToken, nextPageToken)

					// Display buttons
					$("#buttons").append(buttons);
				}
		);

}

// Next Page Function
function nextPage() {

	var token = $('#next-button').data('token'); // How to grab tokens from btnoutput
	var q = $('#next-button').data('token'); // How to grab query from btnoutput
	// Clear Results
	$('#results').html('');
	$('#buttons').html('');

	// Get Form Input
	q = $('#query').val();

	// Run GET Request on API; there are many different ways you can do this with jQuery
	$.get(
		"https://www.googleapis.com/youtube/v3/search", {
			part: 'snippet, id',
			q: q,
			pageToken: token,
			type: 'video',
			key: 'AIzaSyCpyw9rPLmLX6r-fXdbBdsm6by_INA9SbQ'}, 
			function(data) {
				var nextPageToken = data.nextPageToken;
				var prevPageToken = data.prevPageToken;

				// Looping through items and logging data
				console.log(data); 

				$.each(data.items, function(i, item) {
					// Custom function for getting output
					var output = getOutput(item); // All h3 tags and videos

					// Display Results
					$('#results').append(output);
				});

				var buttons = getButtons(prevPageToken, nextPageToken)

					// Display buttons
					$("#buttons").append(buttons);
				}

		);
}


// Previous Page Function
function prevPage() {

	var token = $('#prev-button').data('token'); // How to grab tokens from btnoutput
	var q = $('#prev-button').data('token'); // How to grab query from btnoutput
	// Clear Results
	$('#results').html('');
	$('#buttons').html('');

	// Get Form Input
	q = $('#query').val();

	// Run GET Request on API; there are many different ways you can do this with jQuery
	$.get(
		"https://www.googleapis.com/youtube/v3/search", {
			part: 'snippet, id',
			q: q,
			pageToken: token,
			type: 'video',
			key: 'AIzaSyCpyw9rPLmLX6r-fXdbBdsm6by_INA9SbQ'}, 
			function(data) {
				var nextPageToken = data.nextPageToken;
				var prevPageToken = data.prevPageToken;

				// Looping through items and logging data
				console.log(data); 

				$.each(data.items, function(i, item) {
					// Custom function for getting output
					var output = getOutput(item); // All h3 tags and videos

					// Display Results
					$('#results').append(output);
				});

				var buttons = getButtons(prevPageToken, nextPageToken)

					// Display buttons
					$("#buttons").append(buttons);
				}

		);
}


// Build Output
function getOutput(item) {
	var videoId = item.id.videoId;
	var title = item.snippet.title;
	var description = item.snippet.description;
	var thumb = item.snippet.thumbnails.high.url;
	var channelTitle = item.snippet.channelTitle;
	var videoDate = item.snippet.publishedAt;

	// Build Output String
	var output = '<li>' +
	'<div class="list-left">' +
	'<img src="'+thumb+'">' +
	'</div>' +
	'<div class="list-right">' +
	'<h3><a class="fancybox fancybox.iframe" href="http://www.youtube.com/embed/'+videoId+'">'+title+'</a></h3>' +
	'<small>By <span class="cTitle">'+channelTitle+'</span> on '+videoDate+'</small>' +
	'<p>'+description+'</p>' +
	'</div>' +
	'</li>' +
	'<div class="clearfix"></div>' +
	'';
	
	return output;
}

// Build Buttons

function getButtons(prevPageToken, nextPageToken){
	if(!prevPageToken){
		var btnoutput = '<div class="button-container">'+'<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"' +
		'onclick="nextPage();">Next Page</button></div>';
	} else {
		var btnoutput = '<div class="button-container">'+
		'<button id="prev-button" class="paging-button" data-token="'+prevPageToken+'" data-query="'+q+'"' +
		'onclick="prevPage();">Prev Page</button>' +
		'<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"' +
		'onclick="nextPage();">Next Page</button></div>';
	}
	
	return btnoutput;
}