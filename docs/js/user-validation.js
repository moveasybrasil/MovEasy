// Adiciona a tag 'active' ao header para o item especifico
document.querySelectorAll(".header-login").forEach( (e) => {
    e.classList.add("active")
})

function SendUUID() {
    
    const searchParams = new URLSearchParams(window.location.search)
    const UUID = searchParams.get("UUID")

    if(!UUID) {
        alert("O UUID não está presente!")
        return
    }

    request(
        "PUT",
        `${serverURL}/user/validation/${UUID}`,
        (xhr) => { 
            console.log(xhr.responseText)
        }
    )

}

SendUUID();