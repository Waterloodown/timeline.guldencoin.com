var timeline = angular.module('timeline', ['adaptive.youtube']);

timeline.controller('MainCtrl', function ($scope, $sce) {

	var iconArticle = '<span class="icon-newspaper"></span> ';
	var iconVideo = '<span class="icon-camera"></span> ';
	var iconGame = '<span class="icon-pacman"></span> ';
	var iconExchange = '<span class="icon-library"></span> ';
	var iconOnlineMerchant = '<span class="icon-cart"></span> ';
	var iconOfflineMerchant = '<span class="icon-cart2"></span> ';
	var iconFood = '<span class="icon-food"></span> ';
	var iconLaunch = '<span class="icon-rocket"></span> ';
	var iconDeal = '<span class="icon-briefcase"></span> ';
	var iconWalletUpdate = '<span class="icon-upload"></span> ';
	var iconMilestone = '<span class="icon-flag"></span> ';
	var iconCommunity = '[X]'; // TODO
	var iconTODO = ''; // use this when there's no good icon yet

	// events is an array containing all important guldencoin events
	// an event item has the following fields:
	// contents		string			mandatory		the text displayed in the timeline (can contain simple html)
	// start		date string		mandatory		the date this event occured
	// title 		string 			optional		longer title, displayed when event is selected. When this field is not set, the value of `contents` is used.
	// text 		string 			optional		a text that is displayed when the event is selected (can contain html)
	// image 		string 			optional		url of an image, will be displayed when the event is selected
	// className 	string 			optional		one of the following classes: 'official', 'merchant', 'todo', 'make', 'more', 'classes'
	var events = [
		{
			content: iconLaunch+'Launch',
			start: '2014-04-04',
			title: 'The return of the Gulden',
			text: 'It\'s back!<br/>Stukje tekst over de lancering van Guldencoin. (TODO)',
			image: 'http://www.ixperience.nl/wp-content/uploads/2014/05/Guldencoin.png',
		},
		{
			content: iconExchange+'Added to Bittrex',
			start: '2014-04-05',
			title: 'Guldencoin got added to Bittrex',
		},
		{
			content: iconDeal+'Partnership with Litebit and Litepaid',
			start: '2014-04-08',
			text: 'Stukje tekst over het event, met linkjes naar artikel op nieuwssite, artikel op guldencoin.com en/of betreffende webshop of exchange of etc. (TODO)',
		},
		{
			content: iconCommunity+'Guldencoinforum online',
			start: '2014-04-11',
			text: 'Stukje tekst over het event, met linkjes naar artikel op nieuwssite, artikel op guldencoin.com en/of betreffende webshop of exchange of etc. (TODO)',
		},
		{
			content: iconOnlineMerchant+'biteweb.nl',
			start: '2014-04-14',
			text: 'A new online merchant started accepting Guldencoin: https://www.biteweb.nl/',
		},
		{
			content: iconVideo+'Promotional video launched',
			start: '2014-04-18',
			text: 'A video was made<br/>TODO: more information',
			youtube: 'criatJSIqdE',
		},
		{
			content: iconWalletUpdate+'New wallet OpenSSL Heartbleed fix',
			start: '2014-04-20',
			text: 'Stukje tekst over het event, met linkjes naar artikel op nieuwssite, artikel op guldencoin.com en/of betreffende webshop of exchange of etc. (TODO)',
		},
		{
			content: iconFood+'Subway Leeuwarden',
			start: '2014-04-25',
			text: 'Stukje tekst over het event, met linkjes naar artikel op nieuwssite, artikel op guldencoin.com en/of betreffende webshop of exchange of etc. (TODO)',
		},
		{
			content: iconMilestone+'Android wallet available',
			start: '2014-04-26',
			text: 'Stukje tekst over het event, met linkjes naar artikel op nieuwssite, artikel op guldencoin.com en/of betreffende webshop of exchange of etc. (TODO)',
		},
		{
			content: iconExchange+'Bleutrade exchange',
			start: '2014-04-30',
			title: 'Added on Bluetrade Exchange',
			text: 'Guldencoin was added to Bleutrade: https://bleutrade.com/',
		}
	];

	// fix id's on events
	var i = 1;
	events.forEach(function(ev) {
		ev.id = i;
		i++;
	});

	// TODO:
	// embed video in plaats van (of boven) image (properties 'youtube' en 'vimeo')
	// guldencoin kleuren
	// image iets kleiner, text iets groter
	// text onder image bij kleine schermen
	// styling via className's ? of gewoon een aantal variabelen maken e.g. iconOfficial, iconUpdate, met daarin een icomoon icoontje.
	// styling voor 'new merchant', zodat er alleen de naam van een bedrijf in hoeft te staan
	// styling voor 'official announcement'
	// styling voor 'wallet update'
		

	$scope.event = {};
	$scope.updateEvent = function(ev) {
		console.dir(ev);
		angular.copy(ev, $scope.event);

		// default image when there is no image
		if(angular.isUndefined($scope.event.image) && angular.isUndefined($scope.event.youtube)) {
			$scope.event.image = 'https://guldencoin.com/wp-content/themes/gulden/images/cover.png';
		}

		// set title if it's not set (use content)
		if(angular.isUndefined($scope.event.title)) {
			$scope.event.title = $scope.event.content;
		}

		// sce clearings
		$scope.event.title = $sce.trustAsHtml($scope.event.title);
		$scope.event.text = $sce.trustAsHtml($scope.event.text);

		$scope.$apply();
	}
	$scope.updateEvent(events[0]);

	console.dir(events);

	// create a dataset with items
	// we specify the type of the fields `start` and `end` here to be strings
	// containing an ISO date. The fields will be outputted as ISO dates
	// automatically getting data from the DataSet via items.get().
	var visDataSet = new vis.DataSet({
		type: {
			start: 'ISODate',
			end: 'ISODate'
		}
	});

	// add items to the DataSet
	visDataSet.add(events);

	var container = document.getElementById('visTimeline');
	var options = {
		min: '2014-03-15',
		start: '2014-04-01',
		end: '2014-06-01',
		orientation: 'top',
		maxHeight: '500px',
		zoomMin: 50*24*60*60*1000, // 1.5 month
		zoomMax: 6*31*24*60*60*1000, // 4 months

		// FIX: align left doesn't render properly, line doesn't line-out with box
		// align: 'left',

		showCurrentTime: true
	};

	var visTimeline = new vis.Timeline(container, visDataSet, options);
	window.viss = visTimeline;
	visTimeline.setSelection([1]);
	var selectedId = 1;
	visTimeline.on('select', function (properties) {
		// deny unselect
		if(properties.items.length == 0) {
			visTimeline.setSelection([selectedId]);
			return;
		}

		// get selected id
		selectedId = properties.items[0];
		
		// when multiple selection occurs, select last id.
		if(properties.items.length > 1) {
			selectedId = properties.items[properties.items.length-1];
			visTimeline.setSelection([selectedId]);
		}

		var item = visDataSet.get(selectedId);
		$scope.updateEvent(item);
	});
});