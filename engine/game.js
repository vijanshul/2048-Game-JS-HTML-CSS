export default class Game {

    constructor(size) {
        this.size = size;
        this.win_trackers = [];
        this.lose_trackers = [];
        this.move_trackers = [];
        // Setup Game
        this.setupNewGame();
    }

    setupNewGame() {
        this.board = new Array(this.size * this.size).fill(0);
        this.addTiles(2);
        this.won = false;
        this.over = false;
        this.score = 0;
        this.gameState = this.getGameState();
    }

    addTiles(num) {
        var t1 = Math.random();
        var t2 = Math.random();
        if (num == 2) { // When initialized or reset
            do {
                var s1 = Math.floor(Math.random()*(this.size*this.size));
                var s2 = Math.floor(Math.ran`dom()*(this.size*this.size));
            } while (this.board[s1] !=0 || t`his.board[s2] != 0 || s1 == s2);
            this.board[s1] = (t1 < 0.9 ? 2 : 4);
            this.board[s2] = (t2 < 0.9 ? 2 : 4);
        } else { // after ever move
            do {
                var s1 = Math.floor(Math.random()*(this.size*this.size));
            } while (this.board[s1] != 0);
            this.board[s1] = (t1 < 0.9 ? 2 : 4);
        }
    }

    loadGame(gameState) {
        this.board = gameState.board;
        this.score = gameState.score;
        this.won = gameState.won;
        this.over = gameState.over;
    }

    move(direction) {
        var did_i_move = false;
        if(this.over == false){
            switch (direction) {
                case 'left':
                    // Left pressed
                        for(var x=0; x<this.size*this.size; x += this.size){
                            for (var i=x+1; i<x+this.size; i++) { // slide left
                                var temp = i;
                                while (temp>x && this.board[temp-1] == 0 && this.board[temp] != 0) {
                                    did_i_move = true;
                                    this.board[temp-1] = this.board[temp];
                                    this.board[temp] = 0;
                                    temp--;
                                }
                            }
                            for (var i=x+1; i< x+this.size; i++) { // combine
                                if (this.board[i] != 0 && (this.board[i] == this.board[i-1])) {
                                    did_i_move = true;
                                    this.board[i-1] = this.board[i-1] * 2;
                                    this.score += this.board[i-1]; // Update the score
                                    this.board[i] = 0;
                                }
                            }
                            for (var i=x+1; i<x + this.size; i++) { //slide again
                                var temp = i;
                                while (temp>x && this.board[temp-1] == 0 && this.board[temp] != 0) {
                                    did_i_move = true;
                                    this.board[temp-1] = this.board[temp];
                                    this.board[temp] = 0;
                                    temp--;
                                }
                            }
              
                        }
                        break;
                case 'right':
                    // Right pressed
                    for (var x=this.size-1; x<this.size*this.size; x += this.size) { 
                        for (var i=x; i>x-this.size; i--) { // slide right
                            var temp = i;
                            while (temp<x && this.board[temp+1] == 0 && this.board[temp] != 0) {
                                did_i_move = true;
                                this.board[temp+1] = this.board[temp];
                                this.board[temp] = 0;
                                temp++;
                            }
                        }
                        for (var i=x-1; i>x-this.size; i--) { // combine
                            if (this.board[i] != 0 && (this.board[i] == this.board[i+1])) {
                                did_i_move = true;
                                this.board[i+1] = this.board[i+1] * 2;
                                this.score += this.board[i+1]; // Update the score
                                this.board[i] = 0;
                            }
                        }
                        for (var i=x; i>x-this.size; i--) { // slide again
                            var temp = i;
                            while (temp<x && this.board[temp+1] == 0 && this.board[temp] != 0) {
                                did_i_move = true;
                                this.board[temp+1] = this.board[temp];
                                this.board[temp] = 0;
                                temp++;
                            }
                        }
                    }
                    break;
                case 'up':
                    // Up pressed
                    for (var x=0; x<this.size; x++) {
                        for (var i=x+this.size; i<= this.size*this.size - this.size + x; i+= this.size) { // slide up
                            var temp = i;
                            while (temp > x && this.board[temp-this.size] == 0 && this.board[temp] != 0) {
                                did_i_move = true;
                                this.board[temp-this.size] = this.board[temp];
                                this.board[temp] = 0;
                                temp = temp - this.size;
                            }
                        }
                        for (var i=x; i<= (this.size*this.size) - this.size + x; i+=this.size) { // combine
                            if (this.board[i] != 0 && (this.board[i-this.size] == this.board[i])) {
                                did_i_move = true;
                                this.board[i-this.size] = this.board[i-this.size] * 2;
                                this.score += this.board[i-this.size]; // Update the score
                                this.board[i] = 0;
                            }
                        }
                        for (var i=x+this.size; i<= (this.size*this.size) - this.size + x; i+= this.size) { // slide again
                            var temp = i;
                            while (temp > x && this.board[temp-this.size] == 0 && this.board[temp] != 0) {
                                did_i_move = true;
                                this.board[temp-this.size] = this.board[temp];
                                this.board[temp] = 0;
                                temp = temp - this.size;
                            }
                        }
                    }
                    break;
                case 'down':
                    // Down pressed
                    for (var x=0; x<this.size; x++) {
                        for (var i=x + (this.size-2)*this.size; i>=x; i -= this.size) { // slide down
                            var temp = i;
                            while (temp <= x+(this.size*this.size-this.size) && this.board[temp+this.size] == 0 && this.board[temp] != 0) {
                                did_i_move = true;
                                this.board[temp+this.size] = this.board[temp];
                                this.board[temp] = 0;
                                temp +=this.size;
                            }
                        }
                        for (var i=x+this.size*this.size-this.size; i>=x; i-=this.size) { // combine
                            if (this.board[i] != 0 && this.board[i+this.size] == this.board[i]) {
                                did_i_move = true;
                                this.board[i+this.size] = this.board[i+this.size] * 2;
                                this.score += this.board[i+this.size]; // Update the score
                                this.board[i] = 0;
                            }
                        }
                        for (var i=x+(this.size-2)*this.size; i>=x; i-= this.size) { // slide again
                            var temp = i;
                            while (temp >= 0 && this.board[temp+this.size] == 0 && this.board[temp] != 0) {
                                did_i_move = true;
                                this.board[temp+this.size] = this.board[temp];
                                this.board[temp] = 0;
                                temp +=this.size;
                            }
                        }
                    }
                    break;
                default:
                    break;
            }
            // Adding extra tile after moving
            if(did_i_move == true) this.addTiles();

            // CHECK WIN/LOSE CONDITIONS
            var canimove = false;
            for(let i=0; i<this.size*this.size - 1; i++){
                if(this.won == false && this.board[i] == 2048){
                    this.won = true;
                    this.gameState.board = this.board;
                    this.gameState.score = this.score;
                    this.gameState.won = this.won;
                    this.gameState.over = this.over;

                    this.win_trackers.forEach(function(e){
                        e(this.getGameState());
                    }, this);  
                }
                if(this.board[i] == 0){
                    canimove = true;
                }
            }
            // check rows
            for (let i=0; i<this.board.length; i+=this.size) {
                var temp = i;
                while (temp < i + this.size-1) {
                    if (this.board[temp] == 0 || this.board[temp+1] == 0 || (this.board[temp] == this.board[temp+1])) {
                        canimove = true;
                    }
                    temp++;
                }
            }
            //check columns:
            for (let i=0; i<this.size; i++) {
                var temp = i;
                while (temp < this.size*this.size - this.size + i) {
                    if (this.board[temp] == 0 || this.board[temp+this.size] == 0 || (this.board[temp] == this.board[temp+this.size])) {
                        canimove = true;
                    }
                    temp = temp+this.size;
                }
            }

            if (this.won == false && canimove == false) {
                this.over = true;
                this.gameState.board = this.board;
                this.gameState.score = this.score;
                this.gameState.won = this.won;
                this.gameState.over = this.over;

                this.lose_trackers.forEach(function(e){
                    e(this.getGameState());
                }, this);            
            }
            // track moves
            this.move_trackers.forEach(function(e){
                e(this.getGameState());
            }, this);

        }
        
        
    }
    onMove(callback) {
        this.move_trackers.push(callback);
    }
    onWin(callback) {
        this.win_trackers.push(callback);
    }
    onLose(callback) {
        this.lose_trackers.push(callback);
    }
    getGameState() {
        var state = {
            board: this.board,
            score: this.score,
            won: this.won,
            over: this.over,
        };
        this.gameState = state;
        return this.gameState;
    }
    toString() {
        let count = 0;
        let s = "";
        this.board.forEach(e => {
            count++;
            s += ("[" + e + "]");
            if (count % this.size == 0) {
                s += "\n";
            } else {
                s+= " ";
            }
        });
        return s;
    }

}
