// Adiciona a tag 'active' ao header para o item especifico
document.querySelectorAll(".header-login").forEach( (e) => {
    e.classList.add("active")
})

function ValidateEmail() {
    addClass = () => { document.querySelector('#recovery').classList.add("invalid")}
    removeClass = () => { document.querySelector('#recovery').classList.remove("invalid")}

    const email = document.getElementById("recovery").value

    if (!email) {
        //alert("Email não informado!");
        addClass();
        return false
    }

    if(!~email.indexOf("@")){
        //alert("Preencha um e-mail válido!")
        addClass();
        return false
    }

    if(!~email.split("@")[1].indexOf(".")){
        //alert("Preencha um e-mail válido!")
        addClass();
        return false
    }

    if(!email.split("@")[1].split(".")[1]){
        //alert("Preencha um e-mail válido!")
        addClass();
        return false
    }

    removeClass();
    return true;
}

function ValidatePassword() {
    addClass = () => { document.querySelector('#recovery').classList.add("invalid")}
    removeClass = () => { document.querySelector('#recovery').classList.remove("invalid")}

    const password = document.getElementById("recovery").value

    if (!password) {
        //alert("password não informado!");
        addClass();
        return false
    }

    if(password.length < 8){
        //alert("Password deve ter mais de 8 caracteres!")
        addClass();
        return false
    }

    removeClass();
    return true;
}

function SendEmail(){ 

    if(!ValidateEmail()) {
        alert("Preencha um email válido!")
        return
    }

    request(
        "POST",
        `${serverURL}/user/recovery?email=${document.getElementById("recovery").value}`,
        (xhr) => { console.log(xhr.responseText)}
    )

}

function SendPassword() {
    
    const searchParams = new URLSearchParams(window.location.search)
    const UUID = searchParams.get("UUID")

    if(!UUID) {
        alert("O UUID não está presente!")
        return
    }

    request(
        "PUT",
        `${serverURL}/user/recovery`,
        (xhr) => { 
            console.log(xhr.responseText)
        },
        {
            UUID: UUID,
            Password: document.getElementById("senha-recuperacao").value
        }
    )

}