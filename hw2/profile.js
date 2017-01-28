function validation() {

    console.log("vali")
    var alertInfo = document.getElementById("alertUser");
    alertInfo.innerHTML = "";

    var password = document.getElementById("password").value;
    var confirmation = document.getElementById("confirmation").value
    if (confirmation != password) {
        alertInfo.innerHTML = "The two passwords you typed are not matched";

        return false;
    }
    elements = document.getElementsByClassName("container")
    console.log(elements)
    var submit = true;
    [].forEach.call(elements, function(elem) {
        var input = elem.getElementsByTagName("input")[0];
        var history = elem.getElementsByTagName("span")[0];
        console.log(history.innerHTML)
            console.log(input.value)
        if (input.value != "") {
            console.log(input.pattern)
            console.log(input.value.match(input.pattern))
            console.log(input.value)
            if (input.value.match(input.pattern) == null) {
                alertInfo.innerHTML = "Please follow the correct format"
                submit = false
                return false
            }
        }
    });
    changed = false;
    if (submit) {
        console.log("enter");
        [].forEach.call(elements, function(elem) {
            console.log(elem)
            var input = elem.getElementsByTagName("input")[0];
            var history = elem.getElementsByTagName("span")[0];
            console.log(history.innerHTML)
            console.log(input.value)
            if (input.value != "" && input.value != history.innerHTML) {
                console.log(input.value)
                alertInfo.innerHTML = alertInfo.innerHTML + "\n" + input.id + " has been changed";
                history.innerHTML = input.value;
                input.value = "";
                changed = true;
                console.log(history.innerHTML + "has changed")
            }

        });
        console.log(changed)
        if (!changed) {
            alertInfo.innerHTML = "nothing has been changed";
        }
    }
    alertInfo.style.visibility = "visible"
    return changed;
}
