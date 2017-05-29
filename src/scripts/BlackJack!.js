//author: dan baliczek
//date created: 5/27/2017
//last modifies: 5/28/2017
//description: This file contains all of the functions that will control the game

var bet = 0;
var bank = 500;
var dealerCards = [];
var playerCards = [];


function deal() {
	playerCards[ 0 ] = drawCard();
	playerCards[ 1 ] = drawCard();
	dealerCards[ 0 ] = drawCard();
	dealerCards[ 1 ] = drawCard();
	for ( i = 0; i < 2; i++ ) {
		document.getElementById( "player-cards" ).innerHTML += "<img src='src/img/" + playerCards[ i ][ 1 ].toString().toLowerCase() + "-" + playerCards[ i ][ 0 ] + ".png' />";
		document.getElementById( "dealer-cards" ).innerHTML += "<img src='src/img/" + dealerCards[ i ][ 1 ].toString().toLowerCase() + "-" + dealerCards[ i ][ 0 ] + ".png' />";
	}
	document.getElementById("player-cards").setAttribute("title", count(playerCards));
}

function hit() {
	var i = playerCards.length;
	playerCards[i] = drawCard();

	document.getElementById( "player-cards" ).innerHTML += "<img src='src/img/" + playerCards[ i ][ 1 ].toString().toLowerCase() + "-" + playerCards[ i ][ 0 ] + ".png' />";
	//wait .25 seconds for image to render
	window.setTimeout(function afterHit(){
		if(count(playerCards) == 21){
			stand();
		}
		else if(checkBust(count(playerCards))){
			alert("BUST!");
			clear();
		}
	}, 150);
	document.getElementById("player-cards").setAttribute("title", count(playerCards));
}
function doubleDown() {

}

function split() {

}

function stand() {
	dealerAI();
}
//If aces are present, returns highest value
function count( cardArray ) {
	//Check if aces are present
	var aces = 0;
	var amount = 0;
	for (i=0; i<cardArray.length; i++){
		if(cardArray[i][1] == "ace"){
			aces++;
		}
	}
	if (aces==0){
		for(i=0; i<cardArray.length; i++){
			amount += cardArray[i][2];
		}
		return amount;
	}
	else{
		for(i=0; i<cardArray.length; i++){
			amount += cardArray[i][3];
		}
		if(amount > 21){
			//add card value of not aces
			amount = 0;
			for(j=0; j<cardArray.length;j++){
				if (cardArray[j][1] != "ace"){
					amount += cardArray[j][2];
				}
			}
			//add aces, break when under 21
			for(j=0; j<cardArray.length;j++){
				if (cardArray[j][1] == "ace"){
					amount += 1;
					if (amount < 22){
						return amount;
					}
				}
			}
			return amount;
		}
		else {
			return amount;
		}
	}
}
//if bust, return true
function checkBust(amount){
	if (amount > 21){
		return true;
	}
	else{
		return false;
	}
}
function checkWin() {
	if(count(playerCards) > count(dealerCards)){
		alert("You win!");
		bank+=bet*2;
		bet = 0;
		clear();
	} else if(count(playerCards) < count(dealerCards)){
		alert("Dealer wins.");
		bet = 0;
		clear();
	} else {
		alert("Push.");
		bank += bet;
		bet = 0;
		clear();
	}
}


function runBet() {
	if ( bet > 0 ) {
		document.getElementById( 'bet' ).style.display = "none";
		document.getElementById( "controls" ).style.display = "inline-block";
		deal();
	} else {
		alert( "You can't bet zero dollars" );
	}
}

function increaseBet() {
	if ( bank > 0 ) {
		bet += 5;
		bank -= 5;
		document.getElementById( "bank" ).innerHTML = bank;
		document.getElementById( "betting" ).innerHTML = bet;
	} else {
		alert( "You lack the funds to bet" );
	}
}

function decreaseBet() {
	if ( bet > 0 ) {
		bet -= 5;
		bank += 5;
		document.getElementById( "bank" ).innerHTML = bank;
		document.getElementById( "betting" ).innerHTML = bet;
	} else {
		alert( "You can't bet less than zero!" );
	}
}

function clear(){
	document.getElementById( "bank" ).innerHTML = bank;
	document.getElementById( 'bet' ).style.display = "inline-block";
	document.getElementById( "controls" ).style.display = "none";
	document.getElementById( "player-cards" ).innerHTML = "";
	document.getElementById( "dealer-cards" ).innerHTML = "";
	document.getElementById( "betting" ).innerHTML = bet;
	playerCards.length = 0;
	dealerCards.length = 0;
}


function dealerAI() {
	while (count(dealerCards) < 16){
		afterAIHit();
	}
	window.setTimeout(checkWin,200);
}
function afterAIHit(){
	window.setTimeout(dealerHit,200);
	}
function dealerHit() {
	var i = dealerCards.length;
	dealerCards[ i ] = drawCard();

	document.getElementById( "dealer-cards" ).innerHTML += "<img src='src/img/" + dealerCards[ i ][ 1 ].toString().toLowerCase() + "-" + dealerCards[ i ][ 0 ] + ".png' />";
	window.setTimeout(function afterAIHitTwo(){
		checkBust();
	}, 1000);
}
