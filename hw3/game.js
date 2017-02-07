function App(canvas) {


    function tile(id, color, x, y) {
        this.id = id
        this.color = color
        this.x = x
        this.y = y
    }
    this.canvas = canvas;
    // board to draw tiles


    var board = []
    var numberOfTiles = 0
        //c: context of canvas
    var miss = 0
    var c = canvas.getContext("2d");
    var color = ['red', 'blue', 'gray', 'orange']
    var row = 8
    var tileSize = 60
    var time = 0
    var score=0
    var initialize = function() {
        //initialize board
        for (var i = 0; i < row; i++) {
            board[i] = []
            for (var j = 0; j < row; j++) {
                board[i].push(undefined)
            }
        }
        for (var i = row - 1; i >= row - 2; i--) {
            for (var j = 0; j < row; j++) {
                board[i][j] = new tile(i * row + j, color[Math.floor(Math.random() * color.length)], j * tileSize, i * tileSize)
            }
        }

        repaint(board)

    }
    var onload = function() {
        initialize()
        canvas.addEventListener("click", function(event) {
            search(event)
        })
        Repaint = setInterval(function() {
            repaint()
        }, 250);
        generateInterval = setInterval(function() {
            generateBlocks()
        }, 2000)
        timeInterval = setInterval(function() {
            time++
            var first = Math.floor(time / 60)
            var second = time % 60
            if (first < 10) {
                if (second < 10) {
                    document.getElementById("time").innerHTML = "Time: " + "0" + first + ":" + "0" + second
                } else {
                    document.getElementById("time").innerHTML = "Time: " + "0" + first + ":" + second
                }
            } else {
                if (second < 10) {
                    document.getElementById("time").innerHTML = "Time: " + first + ":" + "0" + second
                } else {
                    document.getElementById("time").innerHTML = "Time: " + first + ":" + second
                }
            }

        }, 1000)
    }





    var i = 1 // repaint tiles on the canvas
    var repaint = function() {
        c.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = row - 1; i >= 0; i--) {
            for (var j = 0; j < row; j++) {
                if (board[i][j] != undefined) {

                    c.fillStyle = board[i][j].color
                    c.fillRect(board[i][j].x, board[i][j].y, tileSize, tileSize)
                }
            }
        }
    }

    // position of blocks with the same color
    function position(start, count) {
        this.start = start
        this.count = count
    }
    // search tile with the same color by DFS, if count is larger than 3, delete them from board,record 
    // these position for updating board.
    var search = function(event) {
        // find the clicked block
        var rect = canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        var m = -1,
            n = -1,
            color = undefined
        for (var i = 0; i < row; i++) {
            var entry = board[i]
            if (entry != undefined) {
                for (var j = 0; j < row; j++) {
                    var elem = entry[j]
                    if (elem != undefined && x >= elem.x && x <= (elem.x + tileSize) && y >= elem.y && y <= (elem.y + tileSize)) {
                        m = i
                        n = j
                        color = elem.color
                    }
                }

            }

        }

        if (m != -1 && n != -1) {

            //DFS to search
            var pos = {}
            var visited = {}
            var res = DFS(board, m, n, row, pos, color, visited)
            if (res.count >= 2) {
                //first to make them undefined
                numberOfTiles += res.count
                document.getElementById("count").innerHTML = "Number of Tiles: " + numberOfTiles
                var position = res.res
                for (key in position) {
                    var entry = position[key]
                    var start = entry.start
                    var count = entry.count
                    for (var j = key, i = start; i > start - count; i--) {
                        board[i][j] = undefined
                    }
                }
                // Update current position
                var position = res.res
                for (key in position) {
                    var entry = position[key]
                    var start = entry.start
                    var count = entry.count
                    for (var j = key, i = start, m = start - count; m >= 0 && m < row && i >= 0 && i < row && board[m][j] != undefined; i--, m--) {
                        board[m][j].y += count * tileSize
                        var temp = board[i][j]
                        board[i][j] = board[m][j]
                        board[m][j] = temp
                    }
                }
            } else {
                miss += res.count
                document.getElementById("miss").innerHTML = "Number of Wrong Click: " + miss
            }
            score = numberOfTiles - miss
            document.getElementById("Score").innerHTML="Score: "+score



        }


    }
    var setCookie = function(time, score, days) {
        var d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie ="Time="+time;
        document.cookie="Score="+score
        

        console.log("set"+document.cookie)
    }
    var getCookie = function(cname) {
       var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
    }

    var generateBlocks = function() {
        for (var j = 0; j < row; j++) {
            if (board[0][j] != undefined) {
                clearInterval(generateInterval)
                generateInterval = undefined
                clearInterval(Repaint)
                clearInterval(timeInterval)
                Repaint = undefined
                timeInterval = undefined
                var bestTime = getCookie("Time")
                var bestScore = getCookie("Score")
                console.log("best"+bestTime)
                console.log("bestScore"+bestScore)
                if (bestTime == "" || bestScore == "") {
                    setCookie(time, score,7)
                    document.getElementById("score").innerHTML = "Congratulations! You break the record!"
                    document.getElementById("bestScore").innerHTML = "Best: Time" + time + "  " + "best Score: " + score

                } else {
                    if (bestScore < score || bestScore == score && time < bestTime) {
                        setCookie(time, score,7)
                        document.getElementById("score").innerHTML = "Congratulations! You break the record!"
                        document.getElementById("bestScore").innerHTML = "Best: Time" + time + "  " + "best Score: " + score
                    } else {
                        document.getElementById("score").innerHTML = "Time: " + time + "Score: " + score
                        document.getElementById("bestScore").innerHTML = "Best: Time" + bestTime + "Best Score" + bestScore
                    }
                }


                break
            }
        }
        if (generateInterval != undefined) {
            for (var i = 0; i < row; i++) {
                for (var j = 0; j < row; j++) {
                    if (board[i][j] != undefined) {
                        board[i][j].y -= tileSize
                        board[i - 1][j] = board[i][j]
                    }
                }
            }
            for (var j = 0; j < row; j++) {
                board[row - 1][j] = new tile((row - 1) * row + j, color[Math.floor(Math.random() * color.length)], j * tileSize, (row - 1) * tileSize)
            }
        }


    }

    var DFS = function(board, m, n, row, res, color, visited) {
        var count = 1
        if (!(n in res)) {
            res[n] = new position(m, 1)
        } else {
            res[n].start = (m > res[n].start) ? m : res[n].start
            res[n].count += 1
        }
        visited[m * row + n] = true

        if (m + 1 < row && !visited.hasOwnProperty((m + 1) * row + n) && board[m + 1][n] != undefined && board[m + 1][n].color === color) {
            count += DFS(board, m + 1, n, row, res, color, visited).count
        }
        if (m - 1 >= 0 && !visited.hasOwnProperty((m - 1) * row + n) && board[m - 1][n] != undefined && board[m - 1][n].color === color) {
            count += DFS(board, m - 1, n, row, res, color, visited).count
        }
        if (n + 1 < row && !visited.hasOwnProperty(m * row + n + 1) && board[m][n + 1] != undefined && board[m][n + 1].color === color) {
            count += DFS(board, m, n + 1, row, res, color, visited).count
        }
        if (n - 1 >= 0 && !visited.hasOwnProperty(m * row + n - 1) && board[m][n - 1] != undefined && board[m][n - 1].color === color) {
            count += DFS(board, m, n - 1, row, res, color, visited).count
        }
        return {
            count,
            res

        }
    }


    return {
        onload: onload
    }


}
window.onload = function() {
    var game = new App(document.querySelector("canvas"))
    game.onload()

}
