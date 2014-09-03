var timeline = angular.module('timeline', ['adaptive.youtube']);

timeline.controller('MainCtrl', function ($scope, $sce, $location) {

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
	// icon			string			mandatory		icon html (as defined in the vars above)
	// shortTitle	string			mandatory		the text displayed in the timeline (can contain simple html)
	// start		date string		mandatory		the date this event occured
	// title		string 			optional		longer title, displayed when event is selected. When this field is not set, the value of `contents` is used.
	// text			string 			optional		a text that is displayed when the event is selected (can contain html)
	// image		string 			optional		url of an image, will be displayed when the event is selected
	// className	string 			optional		one of the following classes: 'official', 'merchant', 'todo', 'make', 'more', 'classes'
	var events = [
		{
			icon: iconLaunch,
			shortTitle: 'Launch',
			start: '2014-04-04',
			title: 'The return of the Guilder',
			text: 'It\'s back!',
			image: '/img/posters/guldencoin-launch.png',
		},
		{
			icon: iconExchange,
			shortTitle: 'Added to Bittrex',
			title: 'Guldencoin got added to Bittrex',
			start: '2014-04-05',
		},
		{
			icon: iconDeal,
			shortTitle: 'Partnership with Litebit and Litepaid',
			start: '2014-04-08',
			text: 'The guldencoin team works with Litebit and Litepaid.',
		},
		{
			icon: iconCommunity,
			shortTitle: 'Guldencoinforum online',
			start: '2014-04-11',
			text: 'A well-known community member started a forum with english and dutch sections.',
		},
		{
			icon: iconOnlineMerchant,
			shortTitle: 'biteweb.nl',
			start: '2014-04-14',
			text: 'A new online merchant started accepting Guldencoin: https://www.biteweb.nl/',
		},
		{
			icon: iconVideo,
			shortTitle: 'Promotional video launched',
			start: '2014-04-18',
			text: '', // TODO
			youtube: 'criatJSIqdE',
		},
		{
			icon: iconWalletUpdate,
			shortTitle: 'New wallet OpenSSL Heartbleed fix',
			start: '2014-04-20',
			text: 'A new desktop wallet was released. Most importantly: OpenSSL Hearbleed fix.',
		},
		{
			icon: iconFood,
			shortTitle: 'Subway Leeuwarden',
			start: '2014-04-25',
			text: 'Subway Leeuwarden started accepting the Guldencoin.',
			image: '/img/posters/payatsubwaynl.png',
		},
		{
			icon: iconMilestone,
			shortTitle: 'Android wallet available',
			start: '2014-04-26',
			text: 'The Android wallet was released.',
		},
		{
			icon: iconExchange,
			shortTitle: 'Bleutrade exchange',
			title: 'Added on Bluetrade Exchange',
			start: '2014-04-30',
			text: 'Guldencoin was added to <a href="https://bleutrade.com/">Bleutrade</a>. ',
		},
		{
			icon: iconFood,
			shortTitle: 'Subway Assen',
			title: 'Pay with NLG at Subway Assen',
			start: '2014-05-02',
			image: '/img/posters/payatsubwaynl.png',
		},
		{
			icon: iconOnlineMerchant,
			shortTitle: 'New online merchants',
			start: '2014-05-02',
			text: 'http://www.speelkaartenmaken.nl/, http://www.memoryspelmaken.nl/, http://www.sportboekmaken.nl/'
		},
		{
			icon: iconFood,
			shortTitle: 'Subway Kampen',
			title: 'Pay with NLG at Subway Kampen',
			start: '2014-05-06',
			image: '/img/posters/payatsubwaynl.png',
		},
		{
			icon: iconNewStuff,
			shortTitle: 'Guldencoin marketplace guldenbeurs.nl',
			start: '2014-05-09',
			title: 'A guldencoin marketplace called <a href="http://guldenbeurs.nl/" >guldenbeurs.nl</a> opened it\'s doors online.',
		},
		{
			icon: iconOnlineMerchant,
			shortTitle: 'Uncommon',
			title: 'New merchant Uncommon',
			start: '2014-05-12',
			text: 'Uncommon released a <a href="http://www.unco.nl/157/wij-accepteren-de-guldencoin/">blog post</a> stating they are now also accepting Guldencoin.'
		},
		{
			icon: iconFood,
			shortTitle: 'De Prins, Amsterdam',
			title: 'Pay with Guldencoin video at De Prins',
			start: '2014-05-14',
			text: 'Guldencoin is accepted at \'De Prins\', a cafe located at the Amsterdam city center.',
			image: '/img/posters/guldencoinatprins.png',
		},
		{
			icon: iconWalletUpdate,
			shortTitle: 'New wallet',
			start: '2014-05-16',
		},
		{
			icon: iconExchange,
			shortTitle: 'Coinnext',
			title: 'Added to coinnext exchange',
			start: '2014-05-19',
			text: 'Gudencoin has been <a href="https://coinnext.com/trade/NLG/BTC" >added</a> to the coinnext exchange.',
		},
		{
			icon: iconNewStuff,
			shortTitle: 'betalenmetguldencoin.nl',
			start: '2014-05-20',
			text: '<a href="http://www.betalenmetguldencoin.nl/">betalenmetguldencoin.nl</a> provides an easy way to find places were you can pay with Guldencoin.',
		},
		{
			icon: iconNewStuffOfficial,
			shortTitle: 'docs.guldencoin.com released',
			start: '2014-05-26',
			text: 'The <a href="https://docs.guldencoin.com" >docs.guldencoin.com</a> website contains (mostly technical) documentation about the coin and tools arround it.',
		},
		{
			icon: iconWalletUpdate,
			shortTitle: 'Android Wallet v1.6',
			title: 'Version 1.6 of Android Wallet Released',
			start: '2014-06-02',
		},
		{
			icon: iconNewStuff,
			shortTitle: 'Guldencoin Wikipedia page online',
			start: '2014-06-03',
			text: 'The Guldencoin community created a <a href="http://nl.wikipedia.org/wiki/Guldencoin"> wikipedia page</a>',
		},
		{
			icon: iconExchange,
			shortTitle: 'Swisscex',
			title: 'Added to swisscex excange',
			start: '2014-06-04',
			text: 'The Guldencoin was added to the <a href="https://www.swisscex.com/market" >swisscex</a> exchange.'
		},
		{
			icon: iconGame,
			shortTitle: 'World Cup 2014',
			title: 'Bet on World Cup 2014 matches with Guldencoin',
			start: '2014-06-11',
			text: 'A website called \'nlgcup.com\' was launched and allowed anyone to bet on the outcome of World Cup 2014 matches.',
		},
		{
			icon: iconNewStuff,
			shortTitle: 'Community news website guldencoinweb.nl',
			title: 'Guldencoin Community News website released',
			start: '2014-06-14',
			text: '<a href="http://www.guldencoinweb.nl/">Guldencoinweb.nl</a> was launched. The website offers articles and information about the Guldencoin.',
		},
		{
			icon: iconNewStuff,
			shortTitle: 'Guldencoin fauc.et',
			title: 'New Guldencoin faucet was launched',
			start: '2014-06-17',
			text: '<a href="http://fauc.at/Index/Guldencoin">fauc.et</a> now provides free Guldencoin for anyone starting with Guldencoin',
		},
		{
			icon: iconNewStuff,
			shortTitle: 'Added to whattomine.com',
			title: 'Guldencoin added to whattomine.com',
			start: '2014-06-19',
			text: 'This site calculates which coins are profitable to mine',
		},
		{
			icon: iconNewStuff,
			shortTitle: 'gratisguldencoin.nl',
			title: 'A new site was launched: gratisguldencoin.nl',
			start: '2014-06-20',
			text: '<a href="http://gratisguldencoin.nl" >The site</a> is meant to be an advertisement and summary to explain to dutch citizen how to claim coins and info links',
		},
		{
			icon: iconDeal,
			shortTitle: 'bitstraat.nl',
			start: '2014-06-21',
			text: '<a href="http://www.bitstraat.nl" >Bitstraat.nl</a> offers hardware solutions for merchants, which will make accepting Guldencoin easy and convenient.',
			image: '/img/posters/guldencoinbitstraat.jpg',
		},
		{
			icon: iconOnlineMerchant,
			shortTitle: 'bitscoinshop.com.br',
			start: '2014-06-23',
			text: '<a href="http://bitscoinshop.com.br/en/" >bitscoinshop.com.br</a> is the first international merchant to accept Guldencoin.',
		},
		{
			icon: iconNewStuffOfficial,
			shortTitle: 'seeds.guldencoin.com',
			start: '2014-06-27',
			text: '<a href="https://seeds.guldencoin.com/#/dashboard">seeds.guldencoin.com</a> provides information about the seeds and the network.',
		},
		{
			icon: iconMilestone,
			shortTitle: 'New website guldencoin.com',
			start: '2014-06-30',
			text: 'The new <a href="https://guldencoin.com">guldencoin.com</a> website was launched.'
		},
		{
			icon: iconCommunity,
			shortTitle: 'Eurocoins with Guldencoin stickers',
			start: '2014-07-03',
			text: 'The Guldencoin community released the first eurocoins with Guldencoin advertisement stickers on them.',
		},
		{
			icon: iconNewStuffOfficial,
			shortTitle: 'Guldensign webdeveloper tool released',
			start: '2014-07-06',
			text: 'The <a href="https://docs.guldencoin.com/guldensign/" >guldensign</a> was released. A html/css supplement that adds the Guldencoin sign to any website.',
		},
		{
			icon: iconNewStuffOfficial,
			shortTitle: 'nlgcdn.com',
			start: '2014-07-06',
			text: 'The guldencoin cdn was released. Although not really a CDN at launch time, it\'s meant as a location where very commonly used resources are located to increase loading times of Guldencoin related websites. <a href="https://docs.guldencoin.com/services/cdn/">More info.</a>',
		},
		{
			icon: iconVideo,
			shortTitle: 'Interview at \'De week van Bitcoin\'',
			start: '2014-07-10',
			text: 'Interview by Paul Buitink and Wilbert Geers with Rijk Plasman about NLG.<br/><a href="http://debitcoin.org/de-week-van-bitcoin-35-de-terugkeer-van-de-gulden-met-efl-en-guldencoin/" >Original article at debitcoin.org.</a>',
			youtube: '0hJYvUo8ghQ',
		},
		{
			icon: iconMilestone,
			shortTitle: 'nlgCup.com closed after World Cup ended',
			start: '2014-07-13',
			text: 'The <a href="http://nlgcup.com" >nlgcup site</a> ran a very successful betting game on the World Cup 2014. The site closed after the final payouts were made.',
		},
		{
			icon: iconNewStuffOfficial,
			shortTitle: 'Guldenpay',
			start: '2014-07-16',
			text: 'Guldenpay is released along with Hardware(Optional) for making payments with Guldencoin exceptionally easy for offline merchants.',
			image: '/img/posters/guldenpay-webapp.jpg',
		},
		{
			icon: iconArticle,
			shortTitle: 'Interview at AT5',
			start: '2014-07-20',
			text: 'Interview with AT5 media about Guldenpay and cafetaria De Prins in Amsterdam using Guldenpay for NLG purchases.<br/> Listen to the interview on the <a href="http://www.at5.nl/artikelen/131523/patatje-sate-betalen-met-de-guldencoin" >AT5 website</a>.',
		},
		{
			icon: iconNewStuffOfficial,
			shortTitle: 'Guldenpay',
			start: '2014-07-22',
			text: 'Guldenpay is released along with Hardware(Optional) for making payments with Guldencoin exceptionally easy for offline merchants.',
		},
		{
			icon: iconMilestone,
			shortTitle: 'Project Gulden website launched',
			start: '2014-07-23',
			text: 'The <a href="http://www.projectgulden.nl" >Project Gulden</a> new website to inform the public about Guldencoin, more updates to come!',
		},
		{
			icon: iconArticle,
			shortTitle: 'Interview with \'De Rijdende Reporter\'',
			start: '2014-07-25',
			text: 'Rijk Plasman did an interview with \'De Rijdende Reporter\'.<br/><a href="http://www.rtvnh.nl/programma-extra/12/0/De%20Rijdende%20Reporter" >Listen back here</a>.',
		},
		{
			icon: iconNewStuff,
			shortTitle: 'New blockchain explorer guldentrader.nl',
			start: '2014-07-28',
			text: 'A new blockchain explorer was launched. <a href="http://www.guldencointrader.nl/" >guldencointrader.nl</a>',
		},
		{
			icon: iconArticle,
			shortTitle: 'Article in \'DE ZAAK\'',
			title: 'Article in DE ZAAK',
			start: '2014-07-31',
			text: 'DE ZAAK is which a well know business site in the Netherlands. Read the article <a href="http://www.dezaak.nl/guldencoin-mobiel-betalen-met-virtuele-nl-munt-6798973.html" >here</a>.',
		},
		{
			icon: iconOfflineMerchant,
			shortTitle: 'LaserCity in South-Holland now accepts Guldencoin.',
			start: '2014-08-04',
			title: 'LaserCity in South-Holland now accepts Guldencoin.',
			image: '/img/posters/guldencoinlasercity.jpg',
		},
		{
			icon: iconOnlineMerchant,
			shortTitle: 'Online bookstore 1boek.nl',
			title: 'First online bookstore to accept NLG.',
			start: '2014-08-06',
			image: '/img/posters/guldencoin1boek.jpg',
		},
		{
			icon: iconOnlineMerchant,
			shortTitle: 'Sliceweb',
			start: '2014-08-06',
			text: 'Sliceweb is the first SEO company to accept Guldencoin.',
			image: '/img/posters/guldencoinsliceweb.png',
		},
		{
			icon: iconMilestone,
			shortTitle: 'Crowdfunding for iOS wallet started',
			start: '2014-08-07',
		},
		{
			icon: iconMilestone,
			shortTitle: "Crowdfunding reached 70% within the first 12 hours",
			start: '2014-08-08',
		},
		{
			icon: iconOnlineMerchant,
			shortTitle: 'BalkonBBQ.com',
			start: '2014-08-09', // actually the 8th, but moved to make everything readable..
			image: '/img/posters/guldencoinbalkonbbq.jpg',
		},
		{
			icon: iconOnlineMerchant,
			shortTitle: 'nerf-kopen.com, LittlePeopleSpeelgoed.com and more',
			start: '2014-08-09', // actually the 8th, but moved to make everything readable..
			text: 'A group of websites started accepting Guldencoin:<br/><a href="http://www.Alarmpistoolkopen.nl" >Alarmpistoolkopen.nl</a><br/><a href="http://www.Nerf-kopen.com" >Nerf-kopen.com</a><br/><a href="http://www.Spiongadgets.nl" >Spiongadgets.nl</a><br/><a href="http://www.LittlePeopleSpeelgoed.com" >LittlePeopleSpeelgoed.com</a>',
			image: '/img/posters/littlepeoplespeelgoed.jpg',
		},
		{
			icon: iconMilestone,
			shortTitle: 'Guldencoin Timeline (this site) launched!',
			start: '2014-08-14',
			text: 'This website was launched. Let\'s have some cake!',
		},
		{
			icon: iconOnlineMerchant,
			shortTitle: 'Sitting Bags',
			start: '2014-08-15',
			text: '<a href="http://www.sittingbags.nl" >SittingBags.nl</a> now accepts Guldencoin.',
			image: '/img/posters/sittingbags.jpg',
		},
		{
			icon: iconOnlineMerchant,
			shortTitle: 'Epic Media',
			start: '2014-08-17',
			text: '<a href="http://www.epicmedia.nl/">EpicMedia.nl</a> now accepts Guldencoin.',
			image: '/img/posters/EpicMedia.jpg',
		},
		{
			icon: iconMilestone,
			shortTitle: 'Wallet v1.2 released',
			title: 'Wallet version 1.2.0 released.',
			start: '2014-08-18',
			text: 'Wallet version 1.2 is released.<br/>Most important changes:<br/><ul><li>Improved layout (Guldencoin branding, colors, icons)</li><li>Add checkpoint</li><li>Fix testnet folder name</li></ul>',
			image: '/img/posters/guldencoin1-2-0.png',
		},
		{
			icon: iconOnlineMerchant,
			shortTitle: 'Bytesized-hosting',
			title: 'Bytesized-hosting started accepting Guldencoin',
			start: '2014-08-19',
			text: '<a href="https://bytesized-hosting.com/" >Bytesized-hosting</a> started accepting Guldencoin. They provide VPS hosting.',
			image: '/img/posters/Bytesized.jpg',
		},
		{
			icon: iconMilestone,
			shortTitle: "Crowdfunding for iOS Wallet completed",
			start: '2014-08-20',
		},
		{
			icon: iconOnlineMerchant,
			shortTitle: 'Bitgoud',
			title: 'Bitgoud started accepting Guldencoin',
			start: '2014-08-20',
			text: '<a href="http://www.bitgoud.nl/" >Bitgoud</a> started accepting Guldencoin. Sells Gold and Silver.',
			image: '/img/posters/BitGoud.jpg',
		},
		{
			icon: iconOnlineMerchant,
			shortTitle: 'Retro Voetbalshirts',
			title: 'Retro Voetbalshirts started accepting Guldencoin',
			start: '2014-08-21',
			text: '<a href="http://www.retrovoetbalshirts.nl/" >Retro Voetbalshirts</a> now accepting Guldencoin. Sells Country and club football shirts.',
			image: '/img/posters/retrovoetbalshirts.jpg',
		},
		{
			icon: iconOnlineMerchant,
			shortTitle: 'Online Media Koffer',
			title: 'Online Media Koffer started accepting Guldencoin',
			start: '2014-08-22',
			text: '<a href="http://www.onlinemediakoffer.nl/" >Online Media Koffer</a> now accepts Guldencoin.',
			image: '/img/posters/onlinemediakoffer.jpg',
		},
		{
			icon: iconOnlineMerchant,
			shortTitle: 'Jays Jerky and Goodies',
			title: 'Jays Jerky and Goodies (Premium Natural Jerky) started accepting Guldencoin',
			start: '2014-08-23',
			text: '<a href="http://jaysjerkyandgoodies.auctivacommerce.com/" >Jays Jerky and Goodies</a> now accepts Guldencoin.',
			image: '/img/posters/jaysjerkyandgoodies.jpg',
		},
		{
			icon: iconOnlineMerchant,
			shortTitle: 'Voor de kleine prinses',
			title: 'Voor de kleine prinses started accepting Guldencoin',
			start: '2014-08-25',
			text: '<a href="http://www.voordekleineprinses.nl/" >Voor de kleine prinses</a> now accepts Guldencoin.',
			image: '/img/posters/voordekleineprinses.jpg',
		},
		{
			icon: iconNewStuff,
			shortTitle: 'Guldencoin QR Code Generator',
			start: '2014-08-26',
			text: 'A Guldencoin QR Code Generator site was launched. <a href="http://www.guldencoinqrcode.nl/" >guldencoinqrcode.nl</a>',
		},
		{
			icon: iconOnlineMerchant,
			shortTitle: 'Entranz',
			title: 'Entranz online ticketpayments started accepting Guldencoin',
			start: '2014-08-27',
			text: '<a href="https://entranz.nl/" >Entranz online ticketpayments</a> now accepts Guldencoin.',
			image: '/img/posters/Entranz.jpg',
		},
		{
			icon: iconOnlineMerchant,
			shortTitle: 'Reclame Materialen',
			title: 'Reclame Materialen (1st B2B Shop) started accepting Guldencoin',
			start: '2014-08-27',
			text: '<a href="http://reclamematerialen.com/" >Reclame Materialen</a> now accepts Guldencoin.',
			image: '/img/posters/reclamematerialen.jpg',
		},
		{
			icon: iconOfflineMerchant,
			shortTitle: 'Coffee Central',
			title: 'Coffee Central - 1st Coffee Shop started accepting Guldencoin',
			start: '2014-08-28',
			text: '<a href="http://www.coffee-central.nl/" >Coffee Central</a> now accepts Guldencoin.',
			image: '/img/posters/CoffeeCentral.jpg',
		},
		{
			icon: iconMilestone,
			shortTitle: 'Guldenwallet website for iOS launched!',
			start: '2014-08-29',
			title: 'The Guldenwallet website <a href="http://guldenwallet.com/" >guldenwallet.com</a> released for iOS preparation',
			image: '/img/posters/Guldenwallet.jpg',
		},
		{
			icon: iconOnlineMerchant,
			shortTitle: 'Bitsms Launched',
			title: 'Send Anonymous SMS with Bitsms using Guldencoin',
			start: '2014-08-30',
			text: '<a href="http://www.bitsms.nl/" >Bitsms.nl</a> accepts Guldencoin.',
			text: '<a href="http://www.bitsms.eu/" >Bitsms.eu</a> accepts Guldencoin.',
			image: '/img/posters/bitsms.jpg',
		},
		{
			icon: iconOnlineMerchant,
			shortTitle: 'CryptoCards',
			title: ' CryptoCards.nl started accepting Guldencoin',
			start: '2014-08-31',
			text: '<a href="http://CryptoCards.nl/" >CryptoCards.nl</a> now accepts Guldencoin.',
			image: '/img/posters/Cryptocards.jpg',
		},
		{
			icon: iconExchange,
			shortTitle: 'Cryptorush.in Adds Guldencoin',
			title: 'Cryptorush.in Adds Guldencoin to Beta',
			start: '2014-09-01',
			text: '<a href="https://cryptorush.in/" >Cryptorush.in</a> adds Guldencoin and will use fees from exchange towards development of Guldencoin.',
		},
		{
			icon: iconOnlineMerchant,
			shortTitle: ' Bubbelvoetbal',
			title: ' Bubbelvoetbal started accepting Guldencoin',
			start: '2014-09-02',
			text: '<a href="http://www.bubbelvoetbalboz.nl/" >Bubbelvoetbal</a> now accepts Guldencoin.',
			image: '/img/posters/BubbelvoetbalBoZ.jpg',
		},
		{
			icon: iconOnlineMerchant,
			shortTitle: 'Wijnpakhuis',
			title: 'Wijnpakhuis the first wine and champagne store started accepting Guldencoin',
			start: '2014-09-02',
			text: '<a href="http://wijnpakhuis.nl/" >Wijnpakhuis.nl</a> now accepts Guldencoin.',
			image: '/img/posters/Wijnpakhuis.nl.jpg',
		},
		{
			icon: iconNewStuff,
			shortTitle: 'Make a Guldencoin paper wallet',
			start: '2014-09-02',
			text: 'Make a Guldencoin paper wallet. <a href="http://walletgenerator.net/?currency=Guldencoin/" >walletgenerator.net</a>',
		},
		{
			icon: iconOnlineMerchant,
			shortTitle: 'Leergadgets and Houtgadgets',
			title: 'Leergadgets and Houtgadgets both started accepting Guldencoin',
			start: '2014-09-03',
			text: '<a href="http://www.leergadgets.nl/" >Leergadgets.nl</a> now accepts Guldencoin.',
			text: '<a href="http://www.houtgadgets.nl/" >Houtgadgets.nl</a> now accepts Guldencoin.',
			image: '/img/posters/Houtgadgetsleergadgets.jpg',
		},
		{
			icon: iconOnlineMerchant,
			shortTitle: 'Onderwijsgadgets',
			title: 'Onderwijsgadgets first online store for kids accepts Guldencoin',
			start: '2014-09-03',
			text: '<a href="http://www.onderwijsgadgets.nl/" >Onderwijsgadgets.nl</a> now accepts Guldencoin.',
			image: '/img/posters/Oonderwijsgadgets.jpg',
		}
	];

	// fix id's on events
	events.forEach(function(ev, i) {
		// set id
		ev.id = i+1;

		// set item field content (displayed on timeline)
		ev.content = ev.icon + ev.shortTitle;
	});
		

	$scope.event = {};
	$scope.updateEvent = function(ev) {
		console.dir(ev);
		angular.copy(ev, $scope.event);

		// set title if it's not set (use content)
		if(angular.isUndefined($scope.event.title)) {
			$scope.event.title = $scope.event.shortTitle;
		}

		// sce clearings
		$scope.event.title = $sce.trustAsHtml($scope.event.title);
		$scope.event.text = $sce.trustAsHtml($scope.event.text);
		$scope.event.icon = $sce.trustAsHtml($scope.event.icon);

		
	}
	//  else {
	// 	$scope.updateEvent(events[0]);
	// }

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

	// create new vis timeline
	var visTimeline = new vis.Timeline(container, visDataSet, options);
	
	// set selectedId
	var selectedId = 1;
	if(parseInt($location.search()['id']) % 1 === 0){
		selectedId = parseInt($location.search()['id']);
	}

	// set selection
	visTimeline.setSelection([selectedId]);

	// load init item
	$scope.updateEvent(events[selectedId-1]);

	// handle event when selection changes
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

		// update search
		$location.search('id', selectedId);

		// update page
		var item = visDataSet.get(selectedId);
		$scope.updateEvent(item);
		$scope.$apply();
	});
});
