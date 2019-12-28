window.onload = function () {
	setTimeout(function () {
		$(".widgetIcon").show();

	}, 1000);

}
$(document).on('click', '.widgetIconPic', function (e) {
	$(".widgetIcon").toggle();
	$(".chatBot").toggle();
	// userData();
	welcomeMessage();
	showSpinner();
});
$("#Input_field").keyup(function (event) {
	if (event.keyCode === 13) {
		$("#sendButton").click();
	}
});
// $(".widgetIcon").on('click',function () {
// 	$(".widgetIcon").toggle();
// 	$(".chatBot").toggle();
// });

$(".closeBtn").click(function () {
	$(".chatBot").toggle();
	$(".widgetIcon").toggle();
	$(".chatArea").empty();
});

$(".widgetIcon, .chatBot").draggable({
	drag: function () {
		var offset = $(".widgetIcon").offset();
		var offset = $(".widgetIcon").offset();
		xPos = (offset.left + $(".widgetIcon").width()) > $(window).width() ? $(window).width() - $(".widgetIcon").width() : offset.left;
		yPos = (offset.top + $(".widgetIcon").height()) > $(window).height() ? $(window).height() - $(".widgetIcon").height() : offset.top;

		if (offset.left > 1039)
			xPos = 1000;
		if (offset.top > 255)
			yPos = 150;
		$(".chatBot").css({ top: yPos }).css({ left: xPos });
		// if ((offset.left + $(".chatBot").width()) > ($(window).width() / 2) || (offset.left + $(".chatBot").width()) > ($(window).width() / 2)) {
		// 	console.log(yPos);
		// 	$(".widgetIcon").css({ top: yPos }).css({ right: "5px" });
		// }
		// else {
		// 	$(".widgetIcon").css({ top: yPos }).css({ left: "5px" });
		// }
	}
});

$(document).on("click", ".incidentID", function () {
	var res = this.innerText;
	userData(res);
	sendToBot(res)
});
////////////////////////////////////////////////////////////////////////////////////////////////

$(document).on("click", ".menuChips", function () {
	var text = this.innerText;
	userData(text);
	sendToBot(text)
	$(".menuChips").remove();
});
//
//
// on click of submit button the value will enter this place. the value then will be sent to places.
//
//
// function userData(){
// 	var welcomeMsg = "rpuranka"
// 	sendToBot(welcomeMsg);
// }

function welcomeMessage() {
	var welcomeMsg = "user@123service:rpuranka"
	sendToBot(welcomeMsg);
}



$("#sendButton").on("click", function (e) {
	var text = $(".Input_field").val();
	if (text == "" || $.trim(text) == "") {
		e.preventDefault();
		return false;
	} else {
		userData(text);
		sendToBot(text);
		e.preventDefault();
		showSpinner();
		return false;
	}
})

$("#raiseIncident").on("click", function () {
	var msg = "Raise an Incident";
	userData(msg);
	sendToBot(msg);
})
$("#statusIncident").on("click", function () {
	var msg = "Status of Incident";
	userData(msg);
	sendToBot(msg);
})
//
//
// user data is coming here........
//
//

function userData(val) {
	var userData =
		'<div class="clearfix"></div><div class="userMsgDiv"><span class="userMsg"><p class="userMsgText">' +
		val +
		' </p><img src="pics/user-icon.png" class="userAvatar"></span></div>';

	$(userData)
		.appendTo(".chatArea")
		.show("slow");
	$(".Input_field").val("");
	scrollToBottomOfResults();
}
function scrollToBottomOfResults() {
	var terminalResultsDiv = document.getElementById("chatArea");
	terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
}

//
//
function showSpinner() {

	spinner = '<div class="clearfixspinner"></div><div class="spinner">' +
		'<div class="bounce1"></div>' +
		'<div class="bounce2"></div>' +
		'<div class="bounce3"></div>' +
		'</div>'
	$(spinner).appendTo(".chatArea");
	$('.spinner').show();
	scrollToBottomOfResults();
}
function hideSpinner() {
	$('.spinner').remove();
}

//
//

function sendToBot(userQuery) {
	var userText = {
		// "contexts": [
		// 	"shop"
		// ],
		"lang": "en",
		"query": `${userQuery}`,
		"sessionId": "1"
		// "timezone": "America/New_York"
	};

	$.ajax({
		url: `https://api.dialogflow.com/v1/query?v=20150910`,
		type: "POST",
		headers: {
			'Content-Type': 'application/json',
			"Authorization": "Bearer " + "3fb1ce37152a44999790f271f3a1a740"
		},
		data: JSON.stringify(userText),
		success: function (result) {

			console.log("User Text : ", result.result.fulfillment.messages)
			if (typeof result.result.fulfillment.messages === 'undefined') {
				var msg = "Sorry my energy is down. Can we talk later!"
				welcome_response(msg)
			}
			else {
				botMessage(result.result.fulfillment.messages)
			}
		}
	});
};



// function datatoBot(text){
// 	// var text = $(".Input_field").val();
// 	var userText=[{'userText':text}]
// 	console.log("userText array in datatobot fun : ",userText);
// 	$.ajax({
// 		url: `./app.js`,
// 		type: "POST",
// 		headers: { 'Content-Type': 'application/json' },
// 		data: JSON.stringify(userText),
// 		success: function (result) {

// 			console.log("User Text : ", result)
// 			console.log("this is botMessage", result[0].Response)
// 			botMessage(result[0].Response);
// 		}
// 	});
// }


function botMessage(botReply) {
	hideSpinner();
	// newBotReply = botReply[0].speech;
	// newBotReply1 = JSON.parse(newBotReply)
	// console.log("second : ", newBotReply1.basicResponse)
	if (botReply.length) {
		for (i = 0; i < botReply.length; i++) {
			newBotReply = botReply[i].speech;
			newBotReply1 = JSON.parse(newBotReply)
			if (newBotReply1.WelcomeMessage) {
				welcome_response(newBotReply1.WelcomeMessage)
			}
			else if (newBotReply1.basicResponse) {
				simple_response(newBotReply1.basicResponse)
			}
			else if (newBotReply1.Suggestions) {
				custom_payload(newBotReply1.Suggestions)
			}
			else if (newBotReply1.Carousal) {
				carousel_card(newBotReply1.Carousal)
			}
			else if (newBotReply1.activeCard) {
				showActiveCard(newBotReply1.activeCard)
			}
			else if (newBotReply1.StatusCard) {
				showSelectedCard(newBotReply1.StatusCard)
			}
			else if(newBotReply1.ticketResponse){
				showticket(newBotReply1.ticketResponse)
			}


			// else if()
			else {
				var msg = "Sorry my energy is down. Can we tlak later!"
				welcome_response(msg)
			}
		}
	}
	else {
		var msg = "Sorry my energy is down. Can we tlak later!"
		welcome_response(msg)

	}
}
function welcome_response(botReply) {
	hideSpinner();
	msg = botReply;
	var BotResponse =
		'<div class="clearfix"></div><div class="botMsgDiv"><span class="botMsg"><img src="pics/bot-icon-small.png" class="botAvatar"><p class="botMsgText">' +
		msg +
		'</p></span></div><div class="clearfix2"></div>';
	$(BotResponse)
		.appendTo(".chatArea")
		.hide()
		.fadeIn(500);
	scrollToBottomOfResults();
	return;
}

function simple_response(botReply) {
	setTimeout(function () {
		msg = botReply;
		var BotResponse =
			'<div class="clearfix"></div><div class="botMsgDiv"><span class="botMsg"><img src="pics/bot-icon-small.png" class="botAvatar"><p class="botMsgText">' +
			msg +
			'</p></span></div><div class="clearfix2"></div>';
		$(BotResponse)
			.appendTo(".chatArea")
			.hide()
			.fadeIn(500);
		scrollToBottomOfResults();
	}, 300);
	return;
}


function showticket(botReply) {
	setTimeout(function () {
		str = botReply;
		msg = str.substring(0,10);
		msg1=str.substring(10,(str.length));
		var BotResponse =
			'<div class="clearfix"></div><div class="botMsgDiv"><span class="botMsg"><img src="pics/bot-icon-small.png" class="botAvatar"><p class="botMsgText">' +
			'<span style="font-weight: 600;letter-spacing: 1.3;">'+msg+'</span>'+msg1+'</p></span></div><div class="clearfix2"></div>';
		$(BotResponse)
			.appendTo(".chatArea")
			.hide()
			.fadeIn(500);
		scrollToBottomOfResults();
	}, 300);
	return;
}
function botReplyText(botReply) {
	setTimeout(function () {
		msg = botReply;
		var BotResponse =
			'<div class="botMsgDiv"><img src="pics/bot-icon-small.png" class="botAvatar"><p class="botMsg">' +
			msg +
			'</p><div class="clearfix"></div>';
		$(BotResponse)
			.appendTo(".chatArea")
			.hide()
			.fadeIn(500);
		scrollToBottomOfResults();
	}, 300);
	return;
}


function custom_payload(botReply) {
	setTimeout(function () {
		$(
			'<div class="clearfix"></div>'
		)
			.appendTo(".chatArea")
		for (i = 0; i < botReply.SuggestionsItems.length; i++) {
			$('<div class="menuChips">' + botReply.SuggestionsItems[i] + "</div>").appendTo(
				".chatArea"
			);
		}
		$(
			' <div class="clearfix2"></div>'
		)
			.appendTo(".chatArea")
		scrollToBottomOfResults();
	}, 500);
}
function carousel_card(botReply) {
	setTimeout(function () {
		var cards = addItemstoCard(botReply)
		$(cards)
			.appendTo(".chatArea")
			.show();
		for (i = 0; i < botReply.length; i++) {
			$(".gallery_scroller>div.colored_card:nth-of-type(" + i + ")").fadeIn(3000);

		}
		scrollToBottomOfResults();
		function updateAlignment(event) {
			const alignment = event.target.value;
			for (item of gallery.querySelectorAll('.gallery_scroller > div'))
				item.style.scrollSnapAlign = alignment;
		}
	}, 300);
}
//////////////////////////////////////////////////////

function scrollToNextPage() {
	const gallery = event.target.parentElement;
	const gallery_scroller = gallery.querySelectorAll('.gallery_scroller');
	const gallery_item_size = gallery_scroller[0].querySelector('div').clientWidth;
	gallery_scroller[0].scrollBy(gallery_item_size, 0);
}
//////////////////////////////////////////////////////

function scrollToPrevPage() {
	const gallery = event.target.parentElement;
	const gallery_scroller = gallery.querySelectorAll('.gallery_scroller');
	const gallery_item_size = gallery_scroller[0].querySelector('div').clientWidth;
	gallery_scroller[0].scrollBy(-gallery_item_size, 0);
}
/////////////////////////////////////////////////////////////
// '<div class="cardDetails">'+ '<div class="cardPhoto">'+'<div>'+'Knowledge Article'+'</div>'+'</div>'+'<div class="articleNo">'+'<div class="articlenumbertitle">'+'Article No:'+'</div>'+'<div class="articlenumber">'+cardarticleno+'</div>'+'<div class="centertitle">'+'Service Center:'+'</div>'+'<div class="centername">'+cardservicecenter+'</div>'+'</div>'+'</div>'+'<div class="articleDetails">'+'<div class="articletext">'+cardtitle+'</div>'+'<div class="urlButton" onclick="window.open(' + "'" + cardimgurl + "'" + ')">'+'Know More'+'</div>'+'</div>'
///////////////////////////////////////////////////////////////

// '<div class="container" style="width: 100%;">' +'<div id="myCarousel" class="carousel slide" data-ride="carousel" style="min-height: 120px;height: 135px;border-radius: 5px;">'	+ '<ol class="carousel-indicators" style="bottom: 3px;margin-bottom: 0px;">'+ '<li data-target="#myCarousel" data-slide-to="0" class="active" style="background-color: chocolate;">'+ '</li>'+ '<li data-target="#myCarousel" data-slide-to="1" style="background-color: chocolate;"></li>'	+ '<li data-target="#myCarousel" data-slide-to="2" style="background-color: chocolate;"></li>'	+ '</ol>'+ card+ '</div>'+ '<a class="left carousel-control" href="#myCarousel" data-slide="prev" style="width: 7%;border-radius: 5px;background-image: none;">'+ '<span class="glyphicon glyphicon-chevron-left"></span>'+ '<span class="sr-only">Previous</span>'+ '</a>'+ '<a class="right carousel-control" href="#myCarousel" data-slide="next" style="width: 7%;border-radius: 5px;background-image: none;">'	+ '<span class="glyphicon glyphicon-chevron-right"></span>'	+ '<span class="sr-only">Next</span>'+ '</a>'+ '</div>'+ '</div>';

//////////////////////////////////////////////////////
function addItemstoCard(botReply) {
	var cards = "";
	for (i = 0; i < botReply.CarousalItems.length; i++) {

		cardimgurl = botReply.CarousalItems[i].buttonUrl;
		cardtitle = botReply.CarousalItems[i].title;
		cardarticleno = botReply.CarousalItems[i].article_no;
		cardservicecenter = botReply.CarousalItems[i]["Service Center"];
		userviews = botReply.CarousalItems[i].no_of_views;
		userratings = botReply.CarousalItems[i].user_ratings;
		cardHeader = "Knowledge Article";
		buttonName = "Show More";
		if (i == 0) {
			item = '<div class="item active">' + '<div class="articleNo">' + cardarticleno + ' </div>'+'<div class="viewsUsers" style="position: absolute;top: 21%;font-size: .8vw;padding-left: 6.5%; "><i class="fa fa-eye"></i><span style="padding: 0 2px; padding-right: 7px;">'+userviews+'</span>'+'<span style="padding: 0 2px; display: none;" >|</span><span class="fa fa-star checked"></span><span style="padding-left: 3px;">'+userratings+'</span></div>'+'<div class="articletext">' + cardtitle + '</div>' + ' <div class="ActiveStatusUrlButton"onclick="window.open(' + "'" + cardimgurl + "'" + ')">' + 'Know More' + '</div>' + '</div>';
			cards = cards + item;
		}
		else {
			item = '<div class="item">' + '<div class="articleNo">' + cardarticleno + ' </div>'+'<div class="viewsUsers" style="position: absolute;top: 21%;font-size: .8vw;padding-left: 6.5%;"><i class="fa fa-eye"></i><span style="padding: 0 2px;">'+userviews+'</span>'+'<span style="padding: 0 2px; display: none;" >|</span><span class="fa fa-star checked"></span><span style="padding-left: 3px;">'+userratings+'</span></div>'+'<div class="articletext">' + cardtitle + '</div>' + ' <div class="ActiveStatusUrlButton"onclick="window.open(' + "'" + cardimgurl + "'" + ')">' + 'Know More' + '</div>' + '</div>';
			cards = cards + item;
		}
		// item = '<div class="item">'+ '<div class="articleNo">'+ cardarticleno+ ' </div>'+ '<div class="articletext">'+ cardtitle	+ '</div>'+ ' <div class="urlButton"onclick="window.open(' + "'" + cardimgurl + "'" + ')">'	+ 'Know More'+ '</div>'+'</div>';
		// cards = cards + item;
	}
	var cardContents = '<div class="clearfix"></div><div class="container" style="width: 100%;">' + '<div id="myCarousel" class="carousel slide" data-ride="carousel" style="background-color: #d9ebf5;min-height: 120px;height: 135px;border-radius: 20px 20px 20px 0;box-shadow: 0 1px 3px 2px #00000020;">' + '<ol class="carousel-indicators" style="bottom: 3px;margin-bottom: 0px;">' + '<li data-target="#myCarousel" data-slide-to="0" class="active" style="background-color: #0073af;">' + '</li>' + '<li data-target="#myCarousel" data-slide-to="1" style="background-color: #0073af;"></li>' + '<li data-target="#myCarousel" data-slide-to="2" style="background-color: #0073af;"></li>' + '</ol>' + '<div class="carousel-inner">' + cards + '</div>' + '<a class="left carousel-control" href="#myCarousel" data-slide="prev" style="width: 2%;border-radius: 5px;background-image: none;">' + '<span class="glyphicon glyphicon-chevron-left" style="font-size:medium; color:#000"></span>' + '<span class="sr-only">Previous</span>' + '</a>' + '<a class="right carousel-control" href="#myCarousel" data-slide="next" style="width: 2%;border-radius: 5px;background-image: none;">' + '<span class="glyphicon glyphicon-chevron-right" style="font-size:medium; color:#000"></span>' + '<span class="sr-only">Next</span>' + '</a>' + '</div>' + '</div>';
	return cardContents;
}

function showActiveCard(botReply) {
	setTimeout(function () {
		var cards = showActiveChips(botReply)
		$(cards)
			.appendTo(".chatArea")
			.show();
		for (i = 0; i < botReply.length; i++) {
			$(".gallery_scroller>div.colored_card:nth-of-type(" + i + ")").fadeIn(500);

		}
		scrollToBottomOfResults();
		function updateAlignment(event) {
			const alignment = event.target.value;
			for (item of gallery.querySelectorAll('.gallery_scroller > div'))
				item.style.scrollSnapAlign = alignment;
		}
	}, 500);
}

function showActiveChips(botReply) {
	var cards = "";
	for (i = 0; i < botReply.CarousalItems.length; i++) {
		cardimgurl = botReply.CarousalItems[i].buttonUrl;
		cardtitle = botReply.CarousalItems[i].short_description;
		cardarticleno = botReply.CarousalItems[i].incident_id;
		cardservicecenter = botReply.CarousalItems[i]["Service Center"];
		cardHeader = "Knowledge Article";
		buttonName = "Show More";
		if (i == 0) {
			item = '<div class="item active" style="position: relative;">' + '<div class="incidentID">' + cardarticleno + ' </div>' + '<div class="short_description">' + cardtitle + '</div>' + ' <div class="ActiveStatusUrlButton"onclick="window.open(' + "'" + cardimgurl + "'" + ')">' + 'View Ticket' + '</div>' + '</div>';
			cards = cards + item;
		}
		else {
			item = '<div class="item" style="position: relative;">' + '<div class="incidentID">' + cardarticleno + ' </div>' + '<div class="short_description">' + cardtitle + '</div>' + ' <div class="ActiveStatusUrlButton"onclick="window.open(' + "'" + cardimgurl + "'" + ')">' + 'View Ticket' + '</div>' + '</div>';
			cards = cards + item;
		}
		// item = '<div class="item">'+ '<div class="articleNo">'+ cardarticleno+ ' </div>'+ '<div class="articletext">'+ cardtitle	+ '</div>'+ ' <div class="urlButton"onclick="window.open(' + "'" + cardimgurl + "'" + ')">'	+ 'Know More'+ '</div>'+'</div>';
		// cards = cards + item;
	}
	var cardContents = '<div class="clearfix"></div><div class="container" style="width: 100%;">' + '<div id="myCarousel1" class="carousel slide" data-ride="carousel12" style="background-color:#d9ebf5;min-height: 100px;height: 120px;box-shadow: 0 1px 3px 2px #00000020;">' + '<ol class="carousel-indicators" style="bottom: -17px;">' + '<li data-target="#myCarousel1" data-slide-to="0" class="active" style="background-color: #0073af;">' + '</li>' + '<li data-target="#myCarousel1" data-slide-to="1" style="background-color: #0073af;"></li>' + '<li data-target="#myCarousel1" data-slide-to="2" style="background-color: #0073af;"></li>' + '</ol>' + '<div class="carousel-inner">' + cards + '</div>' + '<a class="left carousel-control" href="#myCarousel1" data-slide="prev" style="width: 2%;border-radius: 5px;background-image: none;">' + '<span class="glyphicon glyphicon-chevron-left" style="font-size:medium; color:#000"></span>' + '<span class="sr-only">Previous</span>' + '</a>' + '<a class="right carousel-control" href="#myCarousel1" data-slide="next" style="width: 2%;border-radius: 5px;background-image: none;">' + '<span class="glyphicon glyphicon-chevron-right" style="font-size:medium; color:#000"></span>' + '<span class="sr-only">Next</span>' + '</a>' + '</div>' + '</div>'+'<div class="clearfix2"></div>';
	return cardContents;
}

function showSelectedCard(botReply) {
	setTimeout(function () {
		var cards = showdefChips(botReply)
		$(cards)
			.appendTo(".chatArea")
			.show();
		for (i = 0; i < botReply.length; i++) {
			$(".gallery_scroller>div.colored_card:nth-of-type(" + i + ")").fadeIn(3000);

		}
		scrollToBottomOfResults();
		function updateAlignment(event) {
			const alignment = event.target.value;
			for (item of gallery.querySelectorAll('.gallery_scroller > div'))
				item.style.scrollSnapAlign = alignment;
		}
	}, 200);
}

function showdefChips(botReply) {
	var cards = "";
	cardarticleno = botReply.CardItems[0].incident_id;
	cardUsername= "Radha Purankar";
	// cardimgurl = botReply.CardItems.buttonUrl;
	cardtitle = botReply.CardItems[0].short_description;
	cardStatus = botReply.CardItems[0].status;
	member = botReply.CardItems[0].assigned_to;
	
	var cardContents = '<div class="clearfix"></div><div class="ticketStatus" style=" width: 90%;background-color: #d9ebf5;margin-right: auto;border-radius: 20px 20px 20px 0;box-shadow: 0 1px 3px 2px #00000020;position: relative;margin-left: auto;">'+'<div class="ticketCard" style="min-height: 120px;height: 130px;border-radius: 5px;"><div class="icdID" style="color: white;padding-top: 1.5%;position: absolute;font-size: .8vw;-ms-transform: translateY(-88%);font-family: Helvetica;border: 1.25px solid transparent;width: 100%;text-align: center;height: 15%;border-radius: 10px 10px 0 0;background-color: #0073af;letter-spacing: .05vw;">'+cardarticleno+'</div>'+ '<div class="userIssue" style="line-height: 1.3;position: absolute;font-size: .8vw;font-family: Helvetica;top: 23%;padding-left: 7.5%;padding-right: 7.5%;">'+cardtitle+'</div>'+ '<div class="tableDiv" style="position: absolute;width: 100%;top: 65%;">'+' <table class="tableStatus" style="font-size: .8vw;font-family: Helvetica;width: 100%;">'+' <tr style="height: 15px;">'+'<td style="text-align: right;font-weight: 600;">Status : </td>'+'<td style="padding-left: 2%;">'+cardStatus+'</td>'+'</tr>'+'<tr>'+'<td style="text-align: right;font-weight: 600;">Assigned To : </td>'+'<td style="padding-left: 2%;">'+member+'</td>'+'</tr>'+'</table>'+'</div>'+' </div>'+'</div>'+'<div class="clearfix2"></div>';
	return cardContents;
}





// '<div class="ticketStatus" style=" width: 90%;background-color: cornsilk;padding-right: 15px;padding-left: 15px;margin-right: auto;border-radius: 5px;position: relative;margin-left: auto;">'+'<div class="ticketCard" style="min-height: 125px;height: 140px;border-radius: 5px;"><div class="icdID" style="position: absolute;font-size: 15px;-ms-transform: translateY(-50%);transform: translateY(39%);font-family: Helvetica;">'+cardarticleno+'</div>'+'<div class="userDet" style="position: absolute;font-size: 14px;transform: translateY(75%);font-family: Helvetica;margin-top: 1%;">' +'<img src="pics/bot-icon-medium.png" style="width: 39px;">'+ '<span>' +cardUsername+'</span>'+'</div>'+  '<div class="userIssue" style=" position: absolute;font-size: 14px;transform: translateY(335%);font-family: Helvetica;margin-top: 2%;">'+cardtitle+'</div>'+ '<div class="tableDiv" style="position: absolute;bottom: 2%;">'+' <table class="tableStatus" style="font-size: 13px;font-family: Helvetica;">'+' <tr>'+'<td style="width: 69.5%;">Status</td>'+'<td>'+cardStatus+'</td>'+'</tr>'+'</table>'+'<table class="tableAssign" style="font-size: 13px;font-family: Helvetica;">'+'<tr>'+'<td style="width: 51%;">Assigned To</td>'+'<td>'+Ritesh Shukla+'</td>'+'</tr>'+'</table>'+'</div>'+' </div>'+'</div>'
