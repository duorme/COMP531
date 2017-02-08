window.onload = function() {
    var btn = document.getElementById("button");
    var move = function(e) {
        var w = 600,
            h = 600;
        newW = Math.floor(Math.random() * w);
        newH = Math.floor(Math.random() * h)
        console.log(btn.style.left)
        btn.style.postion = "absolute";
        btn.style.left = newW + "px";
        btn.style.top = newH + "px";
    }
    btn.addEventListener("mouseover", move)

    document.body.onkeydown = function(e) { 
        if (e.shiftKey) {
            btn.removeEventListener("mouseover", move)

        }

    }
    document.body.onkeyup = function(e) {
        console.log("key up" + e.keyCode) //why use e.keyShif is wrong
        if (e.keyCode==16) {
            if(btn.value == "Click me"){
            	btn.addEventListener("mouseover", move)
            }
        }
    }
    var clickme = "Click Me!";
    var play= "Play Again"
    btn.onclick = function(e) {       
        if (btn.value == clickme) {
        	btn.value = play;
            document.getElementById("hidden").style.visibility = "visible"
            btn.rem
            btn.removeEventListener("mouseover", move)
            
        }
        else if (btn.value == play) {
            document.getElementById("hidden").style.visibility = "hidden"
            btn.value = clickme
            btn.addEventListener("mouseover", move)
        }
    }
}


