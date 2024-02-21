// Adiciona a tag 'active' ao header para o item especifico
document.querySelectorAll(".header-login").forEach( (e) => {
    e.classList.add("active")
})

if(sessionStorage.getItem(`token`) && window.location.origin != "file://") { goTo(`user/perfiltest`)}

$(() => {
    $("#btn-logar").click(() => {
        const values = {
            email: $("#email-login")[0].value,
            senha: $("#senha-login")[0].value    
        }
        
        if (!values.email) {
            alert("Email não informado!");
            $("#email-login").addClass("invalid");
            return;
        }
        if(!~values.email.indexOf("@")){
            alert("Preencha um e-mail válido!")
            $("#email-login").addClass("invalid");
            return
        }

        if(!~values.email.split("@")[1].indexOf(".")){
            alert("Preencha um e-mail válido!")
            $("#email-login").addClass("invalid");
            return
        }

        if(!values.email.split("@")[1].split(".")[1]){
            alert("Preencha um e-mail válido!")
            $("#email-login").addClass("invalid");
            return
        }
        $("#email-login").removeClass("invalid");

        if (!values.senha) {
            alert("Senha não informada!");
            $("#senha-login").addClass("invalid");
            return;
        }
        $("#senha-login").removeClass("invalid");

        request("POST", `${serverURL}/user/login`, (xhr) => {

            switch(xhr.status) {
                case 200: {
                    let token = JSON.parse(xhr.responseText).token
                    let user = JSON.parse(xhr.responseText).user

                    localStorage.clear();
                    sessionStorage.clear();
        
                    if(values.manterConectado) {
                        localStorage.setItem(`token`, token)
                        localStorage.setItem(`user`, JSON.stringify(user))
                    }
        
                    sessionStorage.setItem(`token`, token)
                    sessionStorage.setItem(`user`, JSON.stringify(user))

                    goTo("user/perfiltest")
                } 
                case 401: {
                    console.log(xhr.responseText)
                }
            }
        },
        {
            email: values.email,
            password: values.senha
        })
    });
})