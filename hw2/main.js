window.onLoad = function() {
    var images = ["https://s-media-cache-ak0.pinimg.com/564x/fd/84/66/fd84661e3dda0fd8a3fabb3314fdd94e.jpg",
        "https://s-media-cache-ak0.pinimg.com/564x/7d/86/55/7d8655ef950e000e86aaad863534eba6.jpg",
        "https://s-media-cache-ak0.pinimg.com/564x/2b/4f/f9/2b4ff97e9e84c9940a9b8d7a8ee132ee.jpg",
        "https://s-media-cache-ak0.pinimg.com/564x/22/3f/20/223f207fded855c0109aaa7cd688c00c.jpg"
    ];

    var len = images.length
    var clocktimer = undefined
    console.log("length" + len)
    var changeImage = function() {
        var list = document.getElementsByTagName("img")
        for (var i = 0; i < list.length; i++) {
            var index = Math.floor(Math.random() * len)
            list[i].src = images[index]
        }

    }
    var clocktimer = []
    window.startImage = function(){

        var list = document.getElementsByTagName("img")
        for(var i = 0; i < list.length;i++)
        if(!clocktimer[i]){ 
            clocktimer[i] = setInterval(changeImage, 3000)
        }
        console.log(clocktimer)
    }

    window.stopInterval = function(i) {
        console.log("stop i" + i)
        clearInterval(clocktimer[i])
    }
    window.restart = function(i) {
        clocktimer[i] = setInterval(changeImage, 3000)
    }


    var stop = "Stop"
    var start = "Start"
    var btn = document.getElementById("btn1")
    btn.onclick=function(){
        if (btn.value == stop) {
            stopInterval(1)
            btn.value = start
        } else if (btn.value == start) {
            restart(1)
            btn.value = stop

        }
    }
    
    startImage()

}();
