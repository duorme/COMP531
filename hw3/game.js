function App(canvas) {


    function tile(id, color) {
        this.id = id
        this.color = color
    }
    this.canvas = canvas;
    // board to draw tiles


    var board = []
    //c: context of canvas
    var c = canvas.getContext("2d");
    var color = ['red', 'blue', 'gray', 'orange']
    var row = 8
    var tileSize = 60
    this.onload = function() {

        //initialize board
        for (var i = 0; i < row; i++) {
            board[i] = []
            for (var j = 0; j < row; j++) {
                board[i].push(undefined)
            }
        }
        for (var i = row - 1; i >= row - 2; i--) {
            for (var j = 0; j < row; j++) {
                board[i][j] = new tile((row - 1) * row + j, color[Math.floor(Math.random() * color.length)])
            }
        }
        repaint(board)


    }
    var repaint = function(board) {
    	for(var i = row - 1; i >= 0; i--){
    		for(var j = 0; j < row; j++){
    			if(board[i][j] != undefined){
    				c.fillStyle = board[i][j].color
    				console.log(i +" " + j +" "+ j * tileSize +" "+  i* tileSize + " ")
    				c.fillRect(j * tileSize, i * tileSize, tileSize, tileSize)
    			}
    		}
    	}

    }


}
window.onload = function() {
    var game = new App(document.querySelector("canvas"))
    console.log(game)
    game.onload()
}
