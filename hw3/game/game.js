function App(canvas) {

    //tile class, save the color,position and whether it contains img
    function tile(id, color, x, y, src = "") {
        this.id = id
        this.color = color
        this.x = x
        this.y = y
        this.src = src
    }
    this.canvas = canvas;
    // board to draw tiles


    var board = []
    var numberOfTiles = 0
        //c: context of canvas
    var miss = 0
    var c = canvas.getContext("2d");

    var color = ['#FF4500', '#FFFF00', '#00BFFF', '#9932CC']
    var row = 8//block length
    var tileSize = 60
    var time = 0
    var score = 0
    var showDiamond = 0// whether the board has diamond, diamond only show once a time
    var counter = 10
    var FindDiamond = false// whether click the diamond
    var generateInterval = undefined
    var timeInterval = undefined
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
    //Start the game. initialze the board,add event lisener to the canvas and start to count and repaint.
    var onload = function() {
        initialize()
        canvas.addEventListener("click", function(event) {
            search(event)
        })
        startAllInterval()
        Repaint = setInterval(function() {
            repaint()
        }, 250);


    }

    var i = 1 
    // repaint tiles on the canvas
    var repaint = function() {
        c.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = row - 1; i >= 0; i--) {
            for (var j = 0; j < row; j++) {
                if (board[i][j] != undefined) {
                    c.fillStyle = board[i][j].color
                    c.fillRect(board[i][j].x, board[i][j].y, tileSize, tileSize)
                    if (board[i][j].src != "") {
                        c.drawImage(board[i][j].src, j * tileSize, i * tileSize);
                    }
                }
            }
        }
        c.strokeStyle = 'black';
        c.strokeRect(0, 0, 480, 480);
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

            //DFS to search
        if (m != -1 && n != -1) {

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
                if (FindDiamond == true) {
                    showDiamond -= 1
                    Freeze()
                    FindDiamond = false
                    
                }
            } else {
                FindDiamond=false
                miss += res.count
                document.getElementById("miss").innerHTML = "Number of Wrong Click: " + miss
            }
            score = numberOfTiles - miss
            document.getElementById("Score").innerHTML = "Score: " + score



        }


    }
    // use cookie to save results
    var setCookie = function(time, score, days) {
        var d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = "Time=" + time;
        document.cookie = "Score=" + score


    }
    // get result from cookie
    var getCookie = function(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
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
    // generate blocks at the bottom line, also generate diamond
    // if tiles has reached the top, stop the game by stop repaint, time counting and generate blocks.
    //then output the result, if it break the rule, update cookies
    var generateBlocks = function() {
        for (var j = 0; j < row; j++) {
            if (board[0][j] != undefined) {
                clearAllInterval()
                clearInterval(Repaint)
                Repaint = undefined
                var bestTime = getCookie("Time")
                var bestScore = getCookie("Score")
                if (bestTime == "" || bestScore == "") {
                    setCookie(time, score, 7)
                    document.getElementById("score").innerHTML = "Congratulations! You break the record!"
                    document.getElementById("bestScore").innerHTML = "Best: Time " + time + "  " + " seconds, Best Score: " + score

                } else {
                    if (bestScore < score || bestScore == score && time < bestTime) {
                        setCookie(time, score, 7)
                        document.getElementById("score").innerHTML = "Congratulations! You break the record!"
                        document.getElementById("bestScore").innerHTML = "Best: Time " + time + " seconds,   " + " Best Score: " + score
                    } else {
                        document.getElementById("score").innerHTML = "Your Time: " + time + " seconds, Your Score: " + score
                        document.getElementById("bestScore").innerHTML = "Best: Time" + bestTime + " seconds, Best Score" + bestScore
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
            if (time % 10 > Math.floor(Math.random() * 10) && showDiamond < 1) {
                createDiamond()
            }

        }


    }
    // if diamond is clicked, stop generating tiles and counting time. But repaint interval is always needed.
    var clearAllInterval = function() {
        if (generateInterval != undefined) {
            clearInterval(generateInterval)
            generateInterval = undefined
        }
        if (timeInterval != undefined) {
            clearInterval(timeInterval)
            timeInterval = undefined
        }
    }
    // If diamond is cliked,stop interval and start counting interval.
    var Freeze = function() {
        counter = 10
        countdownTimer = undefined // be explicit
        clearAllInterval()
        countdownTimer = setInterval(countDown, 1000);
    }
    // Freeze the game by count time.
    var countDown = function() {
        // be defensive!
        if (counter == 0) {
            // we should really clear the other timers too!
            clearInterval(countdownTimer)
            countdownTimer = undefined // being defensive
            resetCountdown()
            document.getElementById("counter").innerHTML = ""

        } else {
            document.getElementById("counter").innerHTML = "Tiles can stop increasing " + counter--+" seconds";
        }
        // post-increment means we update innerHTML then
        // reduce the value by one.
    }

    var resetCountdown = function() {
        startAllInterval();
    }
    // start all interval and process the time into minites.
    var startAllInterval = function() {
        if (generateInterval == undefined) {
            generateInterval = setInterval(function() {
                generateBlocks()
            }, 2000)
        }
        if (timeInterval == undefined) {
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
    }
// DFS to search all tiles with the same color from the first clicked tile
    var DFS = function(board, m, n, row, res, color, visited) {
        var count = 1
        if (!(n in res)) {
            res[n] = new position(m, 1)
        } else {
            res[n].start = (m > res[n].start) ? m : res[n].start
            res[n].count += 1
        }
        visited[m * row + n] = true
        if (board[m][n].src != "") {
            FindDiamond = true
            board[m][n].src = ""
        }

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
// randomly select a non-undefined tile to add an image to it.
    var createDiamond = function() {
        var Myimg = document.getElementById("img")
        var i = 0,
            j = 0
        while (board[i] == undefined || board[i][j] == undefined) {
            i = Math.floor(Math.random() * row) - 1
            j = Math.floor(Math.random() * row) - 1
        }

        board[i][j].src = Myimg
        showDiamond += 1

    }


    return {
        onload: onload
    }


}
// start the game.
window.onload = function() {
    var game = new App(document.querySelector("canvas"))
    game.onload()


}
