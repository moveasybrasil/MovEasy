const serverURL = "https://moveasy-afe07a84638c.herokuapp.com/";

function request(type, url, callback, params) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 400) {
            console.log(this.responseText)
        }

        if (this.readyState == 4 && this.status == 200) {
           callback();
        }
    };
    xhttp.open(type, url);
    xhttp.send(params);
}