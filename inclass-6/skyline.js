'use strict'

var createApp = function(canvas) {
    var position = []
    var c = canvas.getContext("2d");
    var floor = canvas.height / 2
    var grad = c.createLinearGradient(0, floor, 0, canvas.height)
    // position of building
    function pos(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.blgWidth = width;
    this.blgHeight = height;
    this.color = color
}

    function drawCanvas() {
        // Create the ground

        grad.addColorStop(0, "green")
        grad.addColorStop(1, "black")
        c.fillStyle = grad
        c.fillRect(0, floor, canvas.width, canvas.height)

    }

    // common size for windows
    var windowSpacing = 2,
        floorSpacing = 3
    var windowHeight = 5,
        windowWidth = 3
        // object for bulding's position

    // colors of buildings
    var blgColors = ['red', 'blue', 'gray', 'orange']
        // array to store building's position


    //build a building add position to pos[]
    var addBuilding = function() {

            var x0 = Math.random() * canvas.width
            var blgWidth = (windowWidth + windowSpacing) * Math.floor(Math.random() * 10)
            var blgHeight = Math.random() * canvas.height / 2
            var color = blgColors[Math.floor(Math.random() * blgColors.length)];

            position.push(new pos(x0, floor - blgHeight, blgWidth, blgHeight, color));



        }
        // draw all buldings
    var drawBuilding = function(position) {
        position.forEach(function(elem) {
            var color = elem.color
            var blgHeight = elem.blgHeight;
            var blgWidth = elem.blgWidth;
            var x0 = elem.x;
            var y = elem.y;

            c.fillStyle = color
            c.fillRect(x0, y, blgWidth, blgHeight)
            c.fillStyle = "yellow"
            for (var y = floor - floorSpacing; y > floor - blgHeight + windowHeight; y -= floorSpacing + windowHeight) {
                for (var x = windowSpacing; x < blgWidth - windowWidth; x += windowSpacing + windowWidth) {
                    var draw = Math.random();
                    if (draw > 0.5) {
                        c.fillRect(x0 + x, y - windowHeight, windowWidth, windowHeight)
                    }
                }
            }
        });

    }
    var clocktimer = undefined
        // main 
    var build = function() {
        addBuilding();
        if (!clocktimer) {
            clocktimer = setInterval(function() {
                repaint()
            }, 100)
        }
        canvas.addEventListener("click", function(event) {
            var rect = canvas.getBoundingClientRect();
            console.log("event clientX" + event.clientX + "  event clientY" + event.clientY)
            console.log("rect" +rect.left + rect.top)
            var x = event.clientX - rect.left;
            var y = event.clientY - rect.top;
            console.log("mouse" + x + " " + y)
            position.forEach(function(elem) {
                console.log("house" + elem.x + "" + elem.y)
                if (x >= elem.x && x <= elem.x + elem.blgWidth && y >  elem.y && y < (canvas.height / 2)) {
                    elem.blgHeight = elem.blgHeight - 10 >= 0 ? elem.blgHeight + 5 : 0
                    elem.y -=5
                }

            });
        }, false)

    }

    // repaint whole canvas
    var repaint = function() {
        c.clearRect(0, 0, canvas.width, canvas.height);
        drawCanvas();
        drawSun();
        drawBuilding(position);
        drawCar()
    }

    var carX = 0

    function drawCar() {
        carX = carX % canvas.width;
        var img = document.getElementById("car")
        c.drawImage(img, carX, floor - img.height + 10);
        carX += 2;

    }

    var sunX = 30,
        sunY = 30,
        flg = 1;

    function drawSun() {
        var radious = 20;
        if ((sunX + radious) % canvas.width == 0) {
            sunX = radious;
        }
        if ((sunY - radious) % (canvas.height / 8) == 0) {
            flg *= -1
        }
        c.beginPath();
        c.arc(sunX, sunY, radious, 0, 2 * Math.PI);
        c.fillStyle = "yellow"
        c.fill()
        sunX += 10;
        sunY += flg * 10;
    }
    //return buildings

    return {
        build: build // object for buildings: position
    }

}


var canvas;


window.onload = function() {


    var app = new createApp(document.querySelector("canvas"))
    document.getElementById("build").onclick = app.build


}
