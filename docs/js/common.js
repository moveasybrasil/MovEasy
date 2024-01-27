const serverURL = "https://moveasy-afe07a84638c.herokuapp.com";
const frontURL = window.location.origin === "https://moveasybrasil.github.io" ? "https://moveasybrasil.github.io/MovEasy" : `${window.location.href.split("docs")[0]}docs/`;
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
        xhttp.setRequestHeader('Authorization', `Bearer ${sessionStorage.getItem(`token`)}`);
    }

    if(formData) {
        // xhttp.setRequestHeader('Content-type', 'multipart/form-data');
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

function SetUpSessionStorage() {
    if(localStorage.getItem(`token`)) {
        sessionStorage.setItem(`token`, localStorage.getItem(`token`))
    }
}

SetUpSessionStorage()