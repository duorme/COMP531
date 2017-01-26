window.onLoad = function() {
    var images = ["https://s-media-cache-ak0.pinimg.com/564x/fd/84/66/fd84661e3dda0fd8a3fabb3314fdd94e.jpg",
        "https://s-media-cache-ak0.pinimg.com/564x/7d/86/55/7d8655ef950e000e86aaad863534eba6.jpg",
        "https://s-media-cache-ak0.pinimg.com/564x/2b/4f/f9/2b4ff97e9e84c9940a9b8d7a8ee132ee.jpg",
        "https://s-media-cache-ak0.pinimg.com/564x/22/3f/20/223f207fded855c0109aaa7cd688c00c.jpg",
        "https://s-media-cache-ak0.pinimg.com/564x/29/78/ef/2978ef98b53464e38efc16c5c735995f.jpg"
    ];
    var Cards = document.getElementsByTagName("td");
    var len = images.length;
    clocktimer = []
    list = document.getElementsByTagName("img")

    window.startImage = function(i) {
        if (!clocktimer[i]) {
            clocktimer[i] = setInterval(function() {
                var index = Math.floor(Math.random() * len)
                list[i].src = images[index]
            }, 1000)
        }
    }
    window.stopInterval = function(i) {
        clearInterval(clocktimer[i])
        clocktimer[i] = undefined
    }
    for (var i = 0; i < 4; i++) {
        startImage(i);
    }
    btn = document.getElementsByTagName("input");
    var stop = "Stop"
    var start = "Start"
    var ids = [0, 1, 2, 3]
    window.changeBtn = function(i) {
        console.log(btn[i])
        if (btn[i].value == stop) {
            stopInterval(i)
            btn[i].value = start
        } else if (btn[i].value == start) {
            startImage(i)
            btn[i].value = stop

        }
    }
    ids.forEach(function(elem) {
        btn[elem].onclick = function() { changeBtn(elem) };
    });

}();
