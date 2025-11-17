// block(); // Disabled to allow DevTools
function block() {
    document.addEventListener("contextmenu", (event) => {
        event.preventDefault();
    });

    document.onkeydown = function (e) {
        e = e || window.event;//Get event
        if (!e.ctrlKey) return;
        var code = e.which || e.keyCode;//Get key code
        switch (code) {
            case 83://Block Ctrl+S
            case 87://Block Ctrl+W -- Not work in Chrome and new Firefox
                e.preventDefault();
                e.stopPropagation();
                break;
        }
    };
    document.onmousedown = click;
    function click() {
        if ((event.button == 2)) {
            //alert("For Security Reason, Right Click and Save are disabled for this Web Application. Sorry For Inconvinience!!!");
        }
    }

    // Source Inspection
    document.onkeydown = (e) => {
        if (event.keyCode == 123) {
            return false;
        }
        if (e.ctrlKey && e.keyCode == 'E'.charCodeAt(0)) {
            return false;
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
            return false;
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
            return false;
        }
        if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
            return false;
        }
        if (e.ctrlKey && e.keyCode == 'S'.charCodeAt(0)) {
            return false;
        }
        if (e.ctrlKey && e.keyCode == 'H'.charCodeAt(0)) {
            return false;
        }
        if (e.ctrlKey && e.keyCode == 'A'.charCodeAt(0)) {
            return false;
        }
        if (e.ctrlKey && e.keyCode == 'F'.charCodeAt(0)) {
            return false;
        }
        if (e.ctrlKey && e.keyCode == 'E'.charCodeAt(0)) {
            return false;
        }
    };
}

keypress();
function keypress() {
    var button = document.getElementById("do-login");
    var txt = document.getElementById("floatingPassword");
    txt.addEventListener("keyup", function (event) {
        if (event.keyCode == 13) {
            button.click();
        }
    });
}

document.body.hidden = true;
checklicense();
function checklicense() {
    var uname = localStorage.getItem("username");
    var count = 0;
    httpgetpost(2, "*$|999|" + uname);

    var interval = setInterval(function () {

        if (count == 1) {

            if (res == "0|ACK") {
                alert("You do not have License to Run this Software. Purchase License !!!");
                clearInterval(interval);
                window.close();
            }
            else {
                document.body.hidden = false;
                clearInterval(interval);
            }
        }
        else {
            count++;
        }
    }, 500);
}

var res = '';
function httpgetpost(method, data) {
    var serverurl = "http://94.136.189.105:7000";
    res = '';
    var mtd = "";
    const xhr = new XMLHttpRequest();

    mtd = "POST";

    xhr.open(mtd, serverurl, true);

    xhr.onload = function () {
        if (xhr.status == 200) {
            res = xhr.response;
        } else {
            console.error('Error:', xhr.statusText);
        }
    };
    xhr.onerror = function () {
        console.error('Network Error: ' + xhr.status);
    };
    xhr.send(data);
}

var username = '';
function login() {
    var count = 0;
    username = document.getElementById('floatingInput').value;
    var pwd = document.getElementById('floatingPassword').value;

    if (username == "" || username == " ") {
        alert("Username cannot be empty !!! Please Enter Correct Username to Proceed.");
        return;
    }
    else if (pwd == "" || pwd == " ") {
        alert("Password cannot be empty !!! Please Enter Correct Password to Login.");
        return;
    }
    else {
        var data = "*$|1|" + username + "|" + pwd; // 2 for login authentation and check account is active or not

        verifyuser(data);
    }
}

function verifyuser(data) {
    var count = 0;
    httpgetpost(2, data);  // POST

    var interval = setInterval(function () {
        if (count == 1) {
            if (res == "P|DB|NACK") {
                alert("User does not exist or you have typed an incorrect Username or Password !!!");
                clearInterval(interval);
                httpgetpost(2, "*$|2|index.html");
                return;
            }
            else if (res == "0|ACK" || res == "2|ACK") {
                alert("You do not have License to use this Software. Purchase License !!!");
                httpgetpost(2, "*$|2|index.html");
                window.close();
            }
            else if (res == "P|DB|ACK") {
                window.localStorage.setItem("username", username);
                httpgetpost(2, "*$|2|index.html");
                window.location.href = "game.html";
            }

            clearInterval(interval);
        }
        else {
            count++;
        }
    }, 500);
}