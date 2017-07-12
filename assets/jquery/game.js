$(document).ready(function(){
	var objFighter = new Object();  //figther object
	var objDefender= new Object();  //defender object
	var fighterSelected = false;
	var defenderSelected = false;
	var continueGame = true;
	var defenderCount = 0;
	var startingAttackPower;
	var gameOver = false;

	//Selecte a fighter
	$('li.chooseFighter').on('click', function(){
		var randomMin; 
		var randomMax;

		//reset the text of the h6 elment of class .attacker
		$(".attacker").text("");

		if(!fighterSelected){ //do only if a figher has not yet been chosen
			
			//assign the chosen fighters values to the objFighter object
			objFighter.name = $(this).children("h5.fighterName").text(); //fighter name
			objFighter.healthPoints = $(this).attr("data-healthPoints"); //figher health points

			randomMin = Math.floor(Math.random() * (15- 5 + 1)) + 5; //random min number between 5 and 15

			if(objFighter.healthPoints < 150){

				randomMax = Math.floor(Math.random() * (75- 16 + 1)) + 16; //random max number between 16 and 75
			}else{
				
				randomMax = Math.floor(Math.random() * (30- 16 + 1)) + 16; //random max number between 16 and 30
			}

			//make the Attach Power random for each new game
			//when the fighter is chosen. Get randome numbers between min and max.
			var randomAttackPower = Math.floor(Math.random() * (randomMax - randomMin + 1)) + randomMin;
			

			//make the Attach Power random for each new game
			//when the fighter is chosen. Get randome numbers between 10 and 30.
			//var randomAttackPower = Math.floor(Math.random() * (30 - 10 + 1)) + 10;
			console.log("randomAttackPower" + randomAttackPower);
			
			
			fighterSelected = true;

			//assign the fighters random attach power
			objFighter.attackPower = randomAttackPower;
			
			 //The starting attack power of the chosen fighter
			 //Use in the attack button logic to increment the attack power
			startingAttackPower = 0;  //reset for each new figher
			startingAttackPower = objFighter.attackPower; 

			console.log(objFighter);
			
			//clone the fighters not chosen and append to the "Enemies Available to Attack" 
			//section. The remove the character from the "Choose Your Character" section.			
			$("li.chooseFighter").each(function() {
				//this referes to the li elements with a class of chooseFighter
				if($(this).children("h5.fighterName").text() != objFighter.name){	
					//Clone the ul li element of class chooseFighter and append it to the
					//ul of id 	defenders			
					$(this).clone(true).appendTo("ul#defenders");
					
					//remove the ul li element
					$(this).remove();
					
					defenderCount++; //increment the number of defenders

					//add a new class named chooseDefender and remove class chooseFighter
					// $("ul#defenders li.chooseFighter").removeClass('chooseFighter').addClass('chooseDefender');		
					$("ul#defenders li.chooseFighter").removeClass('chooseFighter').addClass('chooseDefender');		
					
					//because the li.chooseDefender elements were cloned from lichooseFighter data elememts
					//the fade action of the .hover event still causes the cloned li.chooseDefender elements
					//to be faded. The opacity of the li.chooseDefender elements leeds to be reset			
					$("ul#defenders li.chooseDefender").fadeTo(0,1);
				}

				
				$("#h2_chooseFighter").text("Fighter Chosen");
			});
		}	
	});

	//Select a defender
	$(document).on('click', ".defender_choice ul li", function (){
		$(".attacker").text("");
		if(!defenderSelected){ //do only if a defender has not yet been chosen
			var randomMin;
			var randomMax;

			//assign the chosen defender values to the objDefender object
			objDefender.name = $(this).children("h5.fighterName").text(); //defender name
			objDefender.healthPoints = $(this).attr("data-healthPoints"); //defender healt points

			//make the CounterAttackPower random for each new game
			//when the defender is chosen. Get randome numbers between min and max.				
			randomMin = Math.floor(Math.random() * (15- 5 + 1)) + 5; //random min number between 5 and 15

			if(objDefender.healthPoints < 150){
				randomMax = Math.floor(Math.random() * (50- 16 + 1)) + 16; //random max number between 16 and 50
			}else{
				randomMax = Math.floor(Math.random() * (25- 16 + 1)) + 16; //random max number between 5 and 25
			}

			var randomCounterAttackPower = Math.floor(Math.random() * (randomMax - randomMin + 1)) + randomMin;
			
			defenderSelected = true;

			//assign the randomCounterAttackPower			
			objDefender.counterAttackPower = randomCounterAttackPower;

			console.log(objDefender);

			//reset the opacity of the unchosen sibling li elements of class chooseDefender
			$(this).siblings().fadeTo(0,1);


			
			//clone the fighters not chosen and append to the "Enemies Available to Attack" 
			//section. Then remove the character from the "Choose Your Character" section.			
			$("li.chooseDefender").each(function() {

				//this referes to the li elements with a class of chooseFighter
				if($(this).children("h5.fighterName").text() === objDefender.name){
					$(this).clone(true).appendTo("ul#defender");
					$(this).remove();

					
					//add a new class named chooseDefender and remove class chooseFighter
					$("ul#defender li.chooseDefender").addClass('chosenDefender').removeClass('chooseDefender');	
					$("ul#defender li.chosenDefender h5").each(function(){
						if($(this).hasClass("fighterHealthPoints")){			
							$(this).addClass("defenderHealthPoints").removeClass("fighterHealthPoints");
						}
					//reset the opacity of the li elements of the ul elemen with id of defenders
					$(this).siblings().fadeTo(0,1);
					});					
				} 
			});

			if(defenderCount === 1){
				$(this).parent().remove();
				$(".defender_choice").css("height","0px");
				$("h2#enemies_Avaible_h2").text("");
			}

		}	
	});

	$(".newGame_button").on('click', function(){		 
   		location.reload(); //just reload the page
	});

	$(".attack_button").on('click', function(){	
		if(fighterSelected && defenderSelected){
			
	   		if(continueGame){
	   			$(".attacker").text("You attacked " + objDefender.name + " for " + objFighter.attackPower + " damage.")
				$(".defender").text(objDefender.name + " attacked you back for " + objDefender.counterAttackPower + " damage.")

	   			objDefender.healthPoints -= objFighter.attackPower;
	   			objFighter.healthPoints -= objDefender.counterAttackPower
	   			objFighter.attackPower += startingAttackPower;  //stattingAttackPower global variable
				console.log("objDefender.healthPoints " + objDefender.healthPoints);
				console.log("attackPower " + objFighter.attackPower);

				$(".chooseFighter h5.fighterHealthPoints").text(objFighter.healthPoints);
				$(".chosenDefender h5.defenderHealthPoints").text(objDefender.healthPoints);

				

				if(defenderCount > 0){
					if(objFighter.healthPoints <= 0){

						$(".attacker").css({"font-size":"35px"}).text("You have been DEFEATED!");
						$(".defender").text("");
						continueGame = false;
						gameOver = true;

						if(objFighter.healthPoints <= 0 & objDefender.healthPoints <= 0){
							$(".attacker").css({"font-size":"35px"}).html("TIE! Both Fighter and Defender fell!");
							$(".defender").text("");
							$("button.newGame_button").css("visibility", "visible");
							$("button.attack_button").remove();
							gameOver = true;
							
						}

						$("button.newGame_button").css("visibility", "visible");
						$("button.attack_button").remove();

					}else if(objDefender.healthPoints <= 0 && objFighter.healthPoints > 0){
						$(".chosenDefender").remove();
						$(".attacker").text("You defeated " + objDefender.name );
						$(".defender").text("");
						gameOver = true;
						defenderSelected = false; //set defenderSelected to false
						defenderCount--; //deincrement defenderCount by 1
						

						if(defenderCount === 0 && objFighter.healthPoints >= 0){
							$(".attacker").css({"font-size":"35px"}).text("You WIN!");
							// $(".attacker").text("You WIN!");
							$("button.newGame_button").css("visibility", "visible");
							$("button.attack_button").remove();	
							gameOver = true;													
						}

					}else if(defenderCount === 0 && objFighter.healthPoints <= 0){
						
						$(".attacker").css({"font-size":"25px"}).text("TIE! Both Fighter and Defender fell!");
						$(".defender").text("");
						$("button.newGame_button").css("visibility", "visible");	
						$("button.attack_button").remove();	
						gameOver = true;			
					}
				}
	   		}
	   		console.log("defenderCount" + defenderCount);
	   	}else if(!fighterSelected && !defenderSelected){
	   		$(".attacker").text("You must choose a fighter and defender first!");
	   	}else if(fighterSelected && !defenderSelected){
	   		$(".attacker").text("No defender selected. Please select a defender");
	   	}


	});

	//Opacity Focus
	$("li.chooseFighter").hover(function() {
		$(this).siblings().stop().fadeTo(400,0.4);
	}, function() {
		$(this).siblings().stop().fadeTo(400,1);
	});
	
});