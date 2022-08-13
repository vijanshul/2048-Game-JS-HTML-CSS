import Game from "./engine/game.js";
let initialize = false;

export const setup = function(game) {
    for (let i = 0; i < game.board.length; i++) {
        document.getElementById(i.toString(10)).innerHTML = game.board[i];
        if (game.board[i] == 0) {
            $(`#${i.toString(10)}`).css("visibility", "hidden");
        } else {
            $(`#${i.toString(10)}`).css("visibility", "visible");
            $(`#${i.toString(10)}`).css("background", "#d4af37");
            $(`#${i.toString(10)}`).css("color", "black");
            $(`#${i.toString(10)}`).css("font-size", "2vw");
        }
    }
}

export const keys = function(k, board) {
    switch (k) {
        case '&':
            board.move('up');
            break;
        case '(':
            board.move('down');
            break;
        case '%':
            board.move('left');
            break;
        case '\'':
            board.move('right');
            break;
    }

}

export const newGame = function(game) {
    document.getElementById("score").innerHTML = "Your score: " + game.score;
    if (initialize == false) {
        initialize = true;
        $('#reset').on("click", function() {
            game.setupsetupNewGame();
            document.getElementById("end").innerHTML = "";
            newGame(game);
        });
        $(document).keydown(function(e) {
            var s = String.fromCharCode(e.which);
            keys(s, game);
            update(game);
        });
    }
    setup(game);

};

export const update = function(game) {
    setup(game);
    document.getElementById("score").innerHTML = "Your score: " + game.score;
    if (game.over == true) {
        document.getElementById("end").innerHTML = "You Lost! Score: " + game.score + ". Press Reset Game";
    }
    if (game.won == true) {
        document.getElementById("end").innerHTML = "Congrats! You can keep going :)";

    }
}

$(document).ready(function() {
    let game = new Game(4);
    newGame(game);
});