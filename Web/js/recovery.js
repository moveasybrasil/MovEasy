$(() => {
    $("#btn-recuperar").click(() => {
        
        const searchParams = new URLSearchParams(window.location.search)
        const UUID = searchParams.get("UUID")

        request(
            "PUT",
            `${serverURL}user/recovery`,
            (xhr) => { 

                console.log(xhr.responseText)

            },
            {
                UUID: UUID,
                Password: document.getElementById("senha-recuperacao").value
            }
        )

    });
})

function validateEmail(email) {

    if(!email) {
        return false
    }
    
    if (!~email.indexOf("@")) {
        return false
    }
    
    if (!~email.split("@")[1].indexOf(".")) {
        return false
    }
    
    if (!email.split("@")[1].split(".")[1]) {
        return false
    }
    
    return true;
}