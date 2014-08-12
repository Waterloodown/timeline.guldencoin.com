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
	var iconCommunity = '<span class="icon-users"></span> ';
	var iconNewStuff = '<span class="icon-brightness-medium"></span> ';
	var iconNewStuffOfficial = '<span class="icon-star"></span> ';
	var iconTODO = ''; // use this when there's no good icon yet

	// events is an array containing all important guldencoin events
	// an event item has the following fields:
	// contents		string			mandatory		the text displayed in the timeline (can contain simple html)
	// start		date string		mandatory		the date this event occured
	// title		string 			optional		longer title, displayed when event is selected. When this field is not set, the value of `contents` is used.
	// text			string 			optional		a text that is displayed when the event is selected (can contain html)
	// image		string 			optional		url of an image, will be displayed when the event is selected
	// className	string 			optional		one of the following classes: 'official', 'merchant', 'todo', 'make', 'more', 'classes'
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
			text: 'The guldencoin team works with Litebit and Litepaid.',
		},
		{
			content: iconCommunity+'Guldencoinforum online',
			start: '2014-04-11',
			text: 'A well-known community member started a forum with english and dutch sections.',
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
			text: 'A new desktop wallet was released. Most importantly: OpenSSL Hearbleed fix.',
		},
		{
			content: iconFood+'Subway Leeuwarden',
			start: '2014-04-25',
			text: 'Subway Leeuwarden started accepting the Guldencoin.',
			image: '/img/posters/payatsubwaynl.png',
		},
		{
			content: iconMilestone+'Android wallet available',
			start: '2014-04-26',
			text: 'The Android wallet was released.',
		},
		{
			content: iconExchange+'Bleutrade exchange',
			start: '2014-04-30',
			title: 'Added on Bluetrade Exchange',
			text: 'Guldencoin was added to <a href="https://bleutrade.com/">Bleutrade</a>. ',
		},
		{
			content: iconFood+'Subway Assen',
			start: '2014-05-02',
			title: 'Pay with NLG at Subway Assen',
			image: '/img/posters/payatsubwaynl.png',
		},
		{
			content: iconOnlineMerchant+'New online merchants',
			start: '2014-05-02',
			text: 'http://www.speelkaartenmaken.nl/, http://www.memoryspelmaken.nl/, http://www.sportboekmaken.nl/'
		},
		{
			content: iconFood+'Subway Kampen',
			start: '2014-05-06',
			title: 'Pay with NLG at Subway Kampen',
			image: '/img/posters/payatsubwaynl.png',
		},
		{
			content: iconNewStuff+'Guldencoin marketplace guldenbeurs.nl',
			start: '2014-05-09',
			title: 'A guldencoin marketplace called <a href="http://guldenbeurs.nl/" >guldenbeurs.nl</a> opened it\'s doors online.',
		},
		{
			content: iconOnlineMerchant+'Uncommon',
			start: '2014-05-12',
			title: 'New merchant Uncommon',
			text: 'Uncommon released a <a href="http://www.unco.nl/157/wij-accepteren-de-guldencoin/">blog post</a> stating they are now also accepting Guldencoin.'
		},
		{
			content: iconFood+'De Prins, Amsterdam',
			start: '2014-05-14',
			title: 'Pay with Guldencoin video at De Prins',
			text: 'Guldencoin is accepted at \'De Prins\', a cafe located at the Amsterdam city center.',
			image: '/img/posters/guldencoinatprins.png',
		},
		{
			content: iconWalletUpdate+'New wallet',
			start: '2014-05-16',
		},
		{
			content: iconExchange+'Coinnext',
			start: '2014-05-19',
			title: 'Added to coinnext exchange',
			text: 'Gudencoin has been <a href="https://coinnext.com/trade/NLG/BTC" >added</a> to the coinnext exchange.',
		},
		{
			content: iconNewStuff+'betalenmetguldencoin.nl',
			start: '2014-05-20',
			text: 'Easy way to find places were you can pay with nlg http://www.betalenmetguldencoin.nl/',
		},
		{
			content: iconNewStuffOfficial+'docs.guldencoin.com released',
			start: '2014-05-26',
			text: 'The <a href="https://docs.guldencoin.com" >docs.guldencoin.com</a> website contains (mostly technical) documentation about the coin and tools arround it.',
		},
		{
			content: iconWalletUpdate+'Android Wallet v1.6',
			start: '2014-06-02',
			title: 'Version 1.6 of Android Wallet Released',
		},
		{
			content: iconNewStuff+'Guldencoin Wikipedia page online',
			start: '2014-06-03',
			text: 'The Guldencoin community created a <a href="http://nl.wikipedia.org/wiki/Guldencoin"> wikipedia page</a>',
		},
		{
			content: iconExchange+'Swisscex',
			start: '2014-06-04',
			title: 'Added to swisscex excange',
			text: 'The Guldencoin was added to the <a href="https://www.swisscex.com/market" >swisscex</a> exchange.'
		},
		{
			content: iconGame+'World Cup 2014',
			start: '2014-06-11',
			title: 'Bet on World Cup 2014 matches with Guldencoin',
			text: 'A website called \'nlgcup.com\' was launched and allowed anyone to bet on the outcome of World Cup 2014 matches.',
		},
		{
			content: iconNewStuff+'Community news website guldencoinweb.nl',
			start: '2014-06-14',
			title: 'Guldencoin Community News website released',
			text: '<a href="http://www.guldencoinweb.nl/">Guldencoinweb.nl</a> was launched. The website offers articles and information about the Guldencoin.',
		},
		{
			content: iconNewStuff+'Guldencoin fauc.et',
			start: '2014-06-17',
			title: 'New Guldencoin faucet was launched',
			text: '<a href="http://fauc.at/Index/Guldencoin">fauc.et</a> now provides free Guldencoin for anyone starting with Guldencoin',
		},
		{
			content: iconNewStuff+'Added to whattomine.com',
			start: '2014-06-19',
			title: 'Guldencoin added to whattomine.com',
			text: 'This site calculates which coins are profitable to mine',
		},
		{
			content: iconNewStuff+'gratisguldencoin.nl',
			start: '2014-06-20',
			title: 'A new site was launched: gratisguldencoin.nl',
			text: '<a href="http://gratisguldencoin.nl" >The site</a> is meant to be an advertisement and summary to explain to dutch citizen how to claim coins and info links',
		},
		{
			content: iconDeal+'bitstraat.nl',
			start: '2014-06-21',
			text: '<a href="http://www.bitstraat.nl" >Bitstraat.nl</a> offers hardware solutions for merchants, which will make accepting Guldencoin easy and convenient.',
			image: '/img/posters/guldencoinbitstraat.jpg',
		},
		{
			content: iconOnlineMerchant+'bitscoinshop.com.br',
			start: '2014-06-23',
			text: '<a href="http://bitscoinshop.com.br/en/" >bitscoinshop.com.br</a> is the first international merchant to accept Guldencoin.',
		},
		{
			content: iconNewStuffOfficial+'seeds.guldencoin.com',
			start: '2014-06-27',
			text: '<a href="https://seeds.guldencoin.com/#/dashboard">seeds.guldencoin.com</a> provides information about the seeds and the network.',
		},
		{
			content: iconMilestone+'New website guldencoin.com',
			start: '2014-06-30',
			text: 'The new <a href="https://guldencoin.com">guldencoin.com</a> website was launched.'
		},
		{
			content: iconCommunity+'Eurocoins with Guldencoin stickers',
			start: '2014-07-03',
			text: 'The Guldencoin community released the first eurocoins with Guldencoin advertisement stickers on them.',
		},
		{
			content: iconNewStuffOfficial+'Guldensign webdeveloper tool released',
			start: '2014-07-06',
			text: 'The <a href="https://docs.guldencoin.com/guldensign/" >guldensign</a> was released. A html/css supplement that adds the Guldencoin sign to any website.',
		},
		{
			content: iconNewStuffOfficial+'nlgcdn.com',
			start: '2014-07-06',
			text: 'The guldencoin cdn was released. Although not really a CDN at launch time, it\'s meant as a location where very commonly used resources are located to increase loading times of Guldencoin related websites. <a href="https://docs.guldencoin.com/services/cdn/">More info.</a>',
		},
		{
			content: iconVideo+'Interview at \'De week van Bitcoin\'',
			start: '2014-07-10',
			text: 'Interview by Paul Buitink and Wilbert Geers with Rijk Plasman about NLG.<br/><a href="http://debitcoin.org/de-week-van-bitcoin-35-de-terugkeer-van-de-gulden-met-efl-en-guldencoin/" >Original article at debitcoin.org.</a>',
			youtube: '0hJYvUo8ghQ',
		},
		{
			content: iconMilestone+'nlgCup.com closed after World Cup ended',
			start: '2014-07-13',
			text: 'The <a href="http://nlgcup.com" >nlgcup site</a> ran a very successful betting game on the World Cup 2014. The site closed after the final payouts were made.',
		},
		{
			content: iconNewStuffOfficial+'Guldenpay',
			start: '2014-07-16',
			text: 'Guldenpay is released along with Hardware(Optional) for making payments with Guldencoin exceptionally easy for offline merchants.',
			image: '/img/posters/Guldenpay-webapp.jpg',
		},
		{
			content: iconArticle+'Interview at AT5',
			start: '2014-07-20',
			text: 'Interview with AT5 media about Guldenpay and cafetaria De Prins in Amsterdam using Guldenpay for NLG purchases.<br/> Listen to the interview on the <a href="http://www.at5.nl/artikelen/131523/patatje-sate-betalen-met-de-guldencoin" >AT5 website</a>.',
		},
		{
			content: iconMilestone+'Guldencoin Website redesign',
			start: '2014-07-24',
			text: 'The Guldencoin website got major improvements again.',
		},
		{
			content: iconArticle+'Interview with \'De Rijdende Reporter\'',
			start: '2014-07-25',
			text: 'Rijk Plasman did an interview with \'De Rijdende Reporter\'.<br/><a href="http://www.rtvnh.nl/programma-extra/12/0/De%20Rijdende%20Reporter" >Listen back here</a>.',
		},
		{
			content: iconNewStuff+'New blockchain explorer guldentrader.nl',
			start: '2014-07-28',
			text: 'A new blockchain explorer was launched. <a href="http://www.guldencointrader.nl/" >guldencointrader.nl</a>',
		},
		{
			content: iconArticle+'Article in \'DE ZAAK\'',
			start: '2014-07-31',
			title: 'Article in DE ZAAK',
			text: 'DE ZAAK is which a well know business site in the Netherlands. Read the article <a href="http://www.dezaak.nl/guldencoin-mobiel-betalen-met-virtuele-nl-munt-6798973.html" >here</a>.',
		},
		{
			content: iconOfflineMerchant+'LaserCity in South-Holland now accepts Guldencoin.',
			start: '2014-08-04',
			title: 'LaserCity in South-Holland now accepts Guldencoin.',
			image: '/img/posters/guldencoinlasercity.jpg',
		},
		{
			content: iconOnlineMerchant+'Online bookstore 1boek.nl',
			start: '2014-08-06',
			title: 'First online bookstore to accept NLG.',
			image: '/img/posters/guldencoin1boek.jpg',
		},
		{
			content: iconOnlineMerchant+'Sliceweb',
			start: '2014-08-06',
			text: 'Sliceweb is the first SEO company to accept Guldencoin.',
			image: '/img/posters/guldencoinsliceweb.png',
		},
		{
			content: iconMilestone+'Crowdfunding for iOS wallet started',
			start: '2014-08-07',
		},
		{
			content: iconMilestone+"Crowdfunding reached 70% within the first 12 hours",
			start: '2014-08-08',
		},
		{
			content: iconOnlineMerchant+'BalkonBBQ.com',
			start: '2014-08-09', // actually the 8th, but moved to make everything readable..
			image: '/img/posters/guldencoinbalkonbbq.jpg',
		},
		{
			content: iconOnlineMerchant+'nerf-kopen.com, LittlePeopleSpeelgoed.com and more',
			start: '2014-08-09', // actually the 8th, but moved to make everything readable..
			text: 'A group of websites started accepting Guldencoin:<br/><a href="http://www.Alarmpistoolkopen.nl" >Alarmpistoolkopen.nl</a><br/><a href="http://www.Nerf-kopen.com" >Nerf-kopen.com</a><br/><a href="http://www.Spiongadgets.nl" >Spiongadgets.nl</a><br/><a href="http://www.LittlePeopleSpeelgoed.com" >LittlePeopleSpeelgoed.com</a>',
			image: '/img/posters/littlepeoplespeelgoed.jpg',
		},
		{
			content: iconMilestone+'Guldencoin Timeline (this site) launched!',
			start: '2014-08-14',
			text: 'This website was launched. Did you know it was launched on the creators\' birthday? Now let\'s have some cake!',
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
	// styling via className's ? of gewoon een aantal variabelen maken e.g. iconOfficial, iconWalletUpdate, met daarin een icomoon icoontje.
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
		$scope.$apply();
	});
});