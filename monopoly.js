


var board, player;


board = [{
  "name": "GO",
  "type": "go"
}, {
  "name": "The Burvale",
  "price": 1,
  "colour": "Brown",
  "type": "property"
}, {
  "name": "Fast Kebabs",
  "price": 1,
  "colour": "Brown",
  "type": "property"
}, {
  "name": "The Grand Tofu",
  "price": 2,
  "colour": "Red",
  "type": "property"
}, {
  "name": "Lanzhou Beef Noodle",
  "price": 2,
  "colour": "Red",
  "type": "property"
}, {
  "name": "Betty's Burgers",
  "price": 3,
  "colour": "Green",
  "type": "property"
}, {
  "name": "YOMG",
  "price": 3,
  "colour": "Green",
  "type": "property"
}, {
  "name": "Gami Chicken",
  "price": 4,
  "colour": "Blue",
  "type": "property"
}, {
  "name": "Massizim",
  "price": 4,
  "colour": "Blue",
  "type": "property"
}];

/*--------------------This is the player object which has all the below propeties on the basis of the given question---------------------------*/

player = [{
  "name": "Peter",
  "position": 0,
  "balance": 16,
  "owns": []
}, {
  "name": "Billy",
  "position": 0,
  "balance": 16,
  "owns": []
}, {
  "name": "Charlotte",
  "position": 0,
  "balance": 16,
  "owns": []
}, {
  "name": "Sweedel",
  "position": 0,
  "balance": 16,
  "owns": []
}];


  var linestring;
  console.log("\n");

/*-------------------print board is only to print current status of the board  -----------------------------*/ 
function print_board(board , player){
      for (var i = 0 ; i < board.length ; i++) {
        linestring = i.toString() + " " + board[i]["name"] + ":";
        for(var j = 0 ; j < player.length ; j++){
          
          if(player[j]["position"] == i){
          
          linestring += player[j].name + " "
    
          }
        }
      console.log(linestring);
      }
}
  

/*---------------------Below function is just to check the status of the player depending on the balance and position each occupies-----------------*/
function print_player_status(player){
  for(var k = 0 ; k < player.length ; k++){
    console.log((k+1) + " "+ player[k].name + " is at position "+ player[k].position + " Has money " + player[k].balance + " Owns Properties "+ player[k].owns.toString())
   }
}


/*-------------------check owner function is to check the ownership of the spot based on the spots each has--------------------------*/
function check_owner(player, spot){
  for(var l = 0 ; l < player.length ; l++){
    if(player[l].owns.includes(spot)){
    

        return l;
    }
   }
   
}
 
/*---------------------------------below bankrupt function is to check if any player is bankrupt or not depending on the balance each has--------------*/
function bankrupt(player){
  
  for(var l = 0 ; l < player.length ; l++){
    if(player[l].balance <= 0){
        console.log(player[l].name + " is bankrupt");
        return l;
    }
   }
}



/*----------------------- To update the price on properties of matching color on the board ie; the price gets increased by 1---------------------------*/
function updatePrice(board,player){
 
    for (var i = 0, _pj_a = player.length; i < _pj_a; i += 1) {
      if (player[i]["owns"].includes(1) && player[i]["owns"].includes(2)){
        board[1]["price"] = 2;
        board[2]["price"] = 2;
      }
  
      if (player[i]["owns"].includes(3) && player[i]["owns"].includes(4)) {
        board[3]["price"] = 4;
        board[4]["price"] = 4;
      }
  
      if (player[i]["owns"].includes(5) && player[i]["owns"].includes(6)) {
        board[5]["price"] = 6;
        board[6]["price"] = 6;
      }
  
      if (player[i]["owns"].includes(7) && player[i]["owns"].includes(8)) {
        board[7]["price"] = 8;
        board[8]["price"] = 8;
      }
    }
}

/*------------------------- function roll is to update properties of board and each player on every dice roll---------------------*/
function roll(board, player, playerindex, dice) {
    var newlocation, owner;
    newlocation = player[playerindex]["position"] + dice;
  
    if (newlocation >= 9) {
      newlocation -= 9;
      player[playerindex]["balance"] += 1;
    }
  
    player[playerindex]["position"] = newlocation;
  
    if (newlocation !== 0) {
      owner = check_owner(player, newlocation);
      
      if (owner == null) {
        if (player[playerindex]["balance"] > board[newlocation]["price"]) {
          player[playerindex]["balance"] -= board[newlocation]["price"];
          player[playerindex]["owns"].push(newlocation);
        }
      } else {
        if (player[playerindex]["balance"] > board[newlocation]["price"]) {
          player[playerindex]["balance"] -= board[newlocation]["price"];
          player[owner]["balance"] += board[newlocation]["price"];
        } else {
          player[playerindex]["balance"] = 0;
        }
      }
    }
}
var board, player, rolls;
  
  //rolls = [1, 3, 1, 1, 1, 2, 4, 2, 6, 3, 5, 2, 2, 2, 4, 4, 6, 1, 4, 2, 6, 2, 1, 5, 4, 5, 6, 5, 6, 3, 6, 4, 4, 3, 5, 6, 2, 1, 6, 5, 1, 1, 6, 4, 5, 2, 2, 3, 5, 6];
  rolls = [5, 2, 2, 1, 4, 1, 2, 1, 3, 1, 4, 3, 5, 2, 3, 1, 3, 1, 1, 3, 4, 2, 1, 3, 2, 3, 5, 5, 3, 2, 4, 5, 2, 6, 5, 4, 3, 6, 2, 5, 5, 3, 2, 6, 5, 2, 6, 2, 6, 4, 5, 5, 6, 1, 6, 6, 2, 6, 4, 1, 1, 2, 6, 6, 6, 2, 1, 4, 6, 3, 5, 4, 1, 4, 2, 1, 5, 5, 2, 3, 3, 3, 4, 1, 2, 4, 5, 4, 5, 2, 2, 2, 2, 6, 1, 5, 3, 6, 3, 2];
  
  var bankruptcy = false;
  var turnstotal = Math.floor(rolls.length/4); // converts the turns into an integer and total number of turns each player has.//

/*---------------------------it is the loop to run on each dice rolling and on basis of this price and bankruptcy status is updated-----------------------------*/
for (var turn = 0; turn < turnstotal || rolls.length>0; turn++) {
    console.log("\nNext 4 Rolls " + rolls.slice(0, 4).toString());
  
    for (var dice = 0 ; dice < 4 && rolls.length>0; dice++) {
     roll(board, player, dice, rolls.shift(0));
      if (bankrupt(player) == null) {
         updatePrice(board, player);
       } else {
        bankruptcy = true;
        break;
      }
}
  
    print_board(board, player);
    print_player_status(player);
  
    if (bankruptcy) {
      break;
    }

}

function winnerOfTheGame(){
  for(var p = 0 ; p < player.length ; p++){
    
    if(player[p].balance > 16){
        console.log("Winner of the game is " + " " + player[p].name + " who has " + player[p].balance + " dollars balance and" + " owns Properties "+ player[p].owns.toString());
        return p;
    }
   }
}
winnerOfTheGame();