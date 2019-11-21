//TODO: turn this into a basic single client connect 4 game
    //To be displayed on the vue_index page.

//This minigame was made with heavy reference to the tic tac toe game designed in class.
var vm = new Vue({
    el: "#app", //Element in the HTML we are hooking up with
    data: {
        gameB: [
            [0,0,0,0,0], //0 is unplayed, 1 is X, -1 is O
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0]
        ],
        isRedTurn: true     //Always start with red
    }, //instance variables
    methods: {
        cellClicked: function(r, c) {
            console.log("A cell got clicked on, row = " + r + ", col = " + c);
            if (this.gameB[r][c] != 0)
                return;     //Do nothing as they can't replace an already played piece

            var p = this.isRedTurn ? 1 : -1;    //1 for red, -1 for blue.
            this.gameB[r].splice(c,1,p);    //place the piece.  (NEED TO USE SPLICE FOR REACTIVITY in AN ARRAY!)
            this.isRedTurn = !this.isRedTurn;   //change turn
       },
        clearTheBoard: function() {
            this.board = [
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0]
            ];
        }
    }, 

    //Need to make the method for computing a winner
    computed: {
        getWinner: function() {
            
            
            
            
            for(let i = 0; i < 5; i++) {
                for(let j = 0; j < 5; j++) {
                    if (this.board[i][j] == 0) return null; //no winner yet
                }
            } 
    
            return 0; //must be a tie
        }
    }
});