//author: dan baliczek
//date created: 5/27/2017
//last modifies: 5/28/2017
//description: This file contains all of the functions that have to deal with the deck

//each card is an array [suit, card, MinValue, MaxValue]
var shoe = [];
function shuffle(shoeSize){
	//Shuffles entire deck by randomly choosing a card and placing that card in a new deck, until the process is complete
	var deck = makeShoe(shoeSize);
	var limit = deck.length;
	for(i=0;i<limit;i++){
		var rand = parseInt(Math.random()*((limit)-i));
		shoe[i] = deck[rand];
		deck.splice(rand, 1);
	}
}
function makeShoe(shoeSize){
	var deck = [];
	for(h=0; h<shoeSize; h++){ 
		//turn the array of suits into an array of cards
		var tempDeck = makeDeck();
		for(i=0; i<tempDeck.length; i++){ //for each suit in the array
			for (j=0;j<tempDeck[i].length; j++) { //for each card in the suit
				deck[deck.length]=tempDeck[i][j];
			}
		
		}
	}
	return deck;
}
function makeDeck(){
	var tempDeck = [];
	var card = [];
	//make the temp deck, which is an array of suits
	tempDeck[0] = makeSuit("Spades");
	tempDeck[1] = makeSuit("Hearts");
	tempDeck[2] = makeSuit("Clubs");
	tempDeck[3] = makeSuit("Diamonds");
	return tempDeck;
}
function makeSuit(suit){
	var tempSuit = [];
	var card = [];
	for (i=2; i<11; i++){
		card[0] = suit;
		card[1] = i.toString();
		card[2] = i;
		card[3] = i;
		tempSuit[tempSuit.length] = card;
		card = [];
	}
	
	//make cards for faces and aces
	card[0] = suit;
	card[2] = 10;
	card[3] = 10;
	card[1] = "king";
	tempSuit[9] = card;
	
	card = [];
	card[0] = suit;
	card[2] = 10;
	card[3] = 10;
	card[1] = "queen";
	tempSuit[10] = card;
	
	card = [];
	card[0] = suit;
	card[2] = 10;
	card[3] = 10;
	card[1] = "jack";
	tempSuit[11] = card;
		
	card = [];
	card[0] = suit;
	card[1] = "ace";
	card[2] = 1;
	card[3] = 11;
	tempSuit[12] = card;
	return tempSuit;
}
function drawCard(){
	temp = shoe[0];
	shoe.splice(0,1);
	return temp;
}