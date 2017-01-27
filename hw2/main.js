window.onLoad = function() {
    var images = ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg"
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
            }, Math.floor(Math.random() *4000 + 1000) )
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
