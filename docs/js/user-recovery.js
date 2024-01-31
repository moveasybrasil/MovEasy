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
        $('input[id="recovery"]').css("border", "2px solid red");
        return false
    }

    if(!~email.indexOf("@")){
        //alert("Preencha um e-mail válido!")
        addClass();
        $('input[id="recovery"]').css("border", "2px solid red");
        return false
    }

    if(!~email.split("@")[1].indexOf(".")){
        //alert("Preencha um e-mail válido!")
        addClass();
        $('input[id="recovery"]').css("border", "2px solid red");
        return false
    }

    if(!email.split("@")[1].split(".")[1]){
        //alert("Preencha um e-mail válido!")
        addClass();
        $('input[id="recovery"]').css("border", "2px solid red");
        return false
    }

    removeClass();
    return true;
}

function ValidatePassword() {
    addClass = () => { 
        document.querySelector('#senha-recuperacao').classList.add("invalid")
        document.querySelector('#senha-recuperacao-confirmacao').classList.add("invalid")
    }
    removeClass = () => { 
        document.querySelector('#senha-recuperacao').classList.remove("invalid")
        document.querySelector('#senha-recuperacao-confirmacao').classList.remove("invalid")
    }

    const password = document.getElementById("senha-recuperacao").value
    const password2 = document.getElementById("senha-recuperacao-confirmacao").value

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

    if(password != password2) {
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
        (xhr) => { 
            if(xhr.status == 200) {
                console.log(xhr.responseText)
                $('input[id="recovery"]').css("border", "2px solid green");
                document.getElementById("resposta-email").innerHTML = xhr.responseText                
                document.getElementById("resposta-email").style.display = "flex"
                document.getElementById("reenviar-email").style.display = "flex"
            } else {
                console.log(xhr.responseText)
                $('input[id="recovery"]').css("border", "1px solid #bbb");
                document.getElementById("resposta-email").innerHTML = xhr.responseText                
                document.getElementById("resposta-email").style.display = "flex"
            }
        }
    )

}

function SendPassword() {
    
    const searchParams = new URLSearchParams(window.location.search)
    const UUID = searchParams.get("UUID")

    if(!UUID) {
        alert("O UUID não está presente!")
        return
    }

    try {

        request(
            "PUT",
            `${serverURL}/user/recovery`,
            (xhr) => { 
                if(xhr.status == 200) {
                    console.log(xhr.responseText)
                    $('input[id="senha-recuperacao"]').css("border", "2px solid green");
                    $('input[id="senha-recuperacao-confirmacao"]').css("border", "2px solid green");
                    document.getElementById("resposta-senha").innerHTML = xhr.responseText                
                    document.getElementById("resposta-senha").style.display = "flex"
                } else {
                    console.log(xhr.responseText)
                    $('input[id="senha-recuperacao"]').css("border", "1px solid #bbb");
                    $('input[id="senha-recuperacao-confirmacao"]').css("border", "1px solid #bbb");
                    document.getElementById("resposta-senha").innerHTML = xhr.responseText                
                    document.getElementById("resposta-senha").style.display = "flex"
                }
            },
            {
                UUID: UUID,
                Password: document.getElementById("senha-recuperacao").value
            }
            )
    } catch {
        alert("Erro")
    }

}