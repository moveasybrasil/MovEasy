const serverURL = "https://moveasy-afe07a84638c.herokuapp.com";
const frontURL = window.location.origin === "https://moveasybrasil.github.io" ? "https://moveasybrasil.github.io/MovEasy" : `${window.location.href.split("docs")[0]}docs`;
const r2URL = "https://pub-aa42159a06e741ff942b348ad2e0ab2c.r2.dev"

// Função para realizar requisições HTTP.
function request(type, url, callback, params, formData, isAuthorized) {

    // Se a origem for um arquivo local e o tipo de requisição for GET, modifica a URL para usar um proxy de CORS.
    if(location.origin == "file://" && type == "GET") {
        url = `https://corsproxy.io/?${encodeURIComponent(url)}`
    }

    // Cria um objeto XMLHttpRequest para fazer a requisição.
    let xhttp = new XMLHttpRequest();

    // Define o que fazer quando o estado da requisição mudar.
    xhttp.onreadystatechange = function() {
        // Quando a requisição estiver completa (readyState 4), chama a função callback.
        if (this.readyState == 4) {
            callback(this);
        }
    };

    // Configura a requisição com o tipo (GET, POST, etc.) e a URL.
    xhttp.open(type, url);

    // Define o cabeçalho para permitir origens cruzadas.
    xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');

    // Se a requisição requer autorização, adiciona o cabeçalho de Autorização com o token armazenado.
    if(isAuthorized) {
        xhttp.setRequestHeader('Authorization', `Bearer ${sessionStorage.getItem(`token`)}`);
    }

    // Se formData é fornecido, envia formData (para dados de formulário).
    if(formData) {
        // Comentado pois o cabeçalho 'Content-type' para multipart/form-data é configurado automaticamente.
        // xhttp.setRequestHeader('Content-type', 'multipart/form-data');
        xhttp.send(formData);
    } 
    // Se params é fornecido, configura o cabeçalho para JSON e envia os parâmetros como JSON.
    else if(params) {
        xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhttp.send(JSON.stringify(params));
    } 
    // Se nem formData nem params são fornecidos, apenas envia a requisição sem corpo.
    else {
        xhttp.send();
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

function isTokenValid() {
    if(!sessionStorage.getItem(`token`)) return false

    try {
        let expireDate = parseJwt(sessionStorage.getItem(`token`)).exp * 1000;
        let currentDate = Date.now();

        if(expireDate > currentDate) {
            return true
        } else {
            sessionStorage.clear();
            return false
        }
    } catch {
        return false;
    }

}

async function renewToken() {
    console.log("Verificação de token")
    if(!isTokenValid()) return

    let expireDate = parseJwt(sessionStorage.getItem(`token`)).exp * 1000;
    let currentDate = Date.now();

    if(expireDate - currentDate < 15 * 60 * 1000) { // Renovar quando faltar menos de 15 minutos para expirar
        await request("GET", `${serverURL}/user/renew-token`, (xhr)=>{
            if(xhr.status == 200) {
                let token = JSON.parse(xhr.responseText).token
                let user = JSON.parse(xhr.responseText).user
    
                if(sessionStorage.getItem(`token`) === localStorage.getItem(`token`)) {
                    localStorage.setItem(`token`, token)
                    localStorage.setItem(`user`, JSON.stringify(user))
                }
                
                sessionStorage.setItem(`token`, token)
                sessionStorage.setItem(`user`, JSON.stringify(user))
            }
        }, null, null, true)
    } 
}

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function SetUpSessionStorage() {
    if(localStorage.getItem(`token`)) {
        sessionStorage.setItem(`token`, localStorage.getItem(`token`))
        sessionStorage.setItem(`user`, localStorage.getItem(`user`))
    }
}

SetUpSessionStorage()

setInterval( renewToken, 2.5 * 60 * 1000) // Repetir a verificação a cada 2 minutos e meio