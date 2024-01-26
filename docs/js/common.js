const serverURL = "https://moveasy-afe07a84638c.herokuapp.com";
const frontURL = window.location.origin === "https://moveasybrasil.github.io" ? "https://moveasybrasil.github.io/MovEasy" : `file:///C:/Users/${window.location.pathname.split('Users/')[1].split('/MovEasy')[0]}/MovEasy/docs`;
const r2URL = "https://pub-aa42159a06e741ff942b348ad2e0ab2c.r2.dev"

function request(type, url, callback, params, formData, isAuthorized) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            callback(this);
        }
    };
    xhttp.open(type, url);
    xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');

    if(isAuthorized) {
        xhttp.setRequestHeader('Authorization', `Bearer ${localStorage.getItem(`token`)}`);
    }

    if(formData) {
        xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhttp.send(formData);
    } else if(params) {
        xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhttp.send(JSON.stringify(params));
    } else {
        xhttp.send()
    }

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