const serverURL = "https://moveasy-afe07a84638c.herokuapp.com";
const frontURL = window.location.origin === "https://moveasybrasil.github.io" ? "https://moveasybrasil.github.io/MovEasy" : `file:///C:/Users/${window.location.pathname.split('Users/')[1].split('/MovEasy')[0]}/MovEasy/docs`;

function request(type, url, callback, params) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            callback(this);
        }
    };
    xhttp.open(type, url);
    xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhttp.send(JSON.stringify(params));
}

function goTo(path) {
    if(window.location.origin == "https://moveasybrasil.github.io") {
        window.location.assign(`${frontURL}/${path}`)
    } else {
        window.location.assign(`${frontURL}/${path}.html`)
    }
}

function getUrl(path) {
    return `${frontURL}/${path}`
}