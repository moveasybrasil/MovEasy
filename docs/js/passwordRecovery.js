const searchParams = new URLSearchParams(window.location.search)

if (searchParams.has("UUID")) {
    const UUID = searchParams.get("UUID")
    const isValid = false

    request("POST", `localhost:7014/user/recovery/${UUID}`, undefined,  () => {
        isValid = this.responseText 
    })

    if(isValid) {
        params = {
            UUID: UUID,
            Password: document.getElementById("password").value
        }

        request("PATCH", `localhost:7014/user/recovery`, JSON.stringify(params), () => {
            console.log(this.responseText)
        })
    }
}

function request(type, url, params, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           callback();
        }
    };
    xhttp.open(type, url);
    xhttp.send();
}