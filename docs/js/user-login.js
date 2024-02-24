// Adiciona a tag 'active' ao header para o item especifico
document.querySelectorAll(".header-login").forEach((e) => {
    e.classList.add("active")
})

if (sessionStorage.getItem(`token`) && window.location.origin != "file://") { goTo(`user/perfil`) }

$(() => {
    $("#btn-logar").click(() => {
        const values = {
            email: $("#email-login")[0].value,
            senha: $("#senha-login")[0].value
        }

        if (!values.email && !values.senha) {
            alert("Os campos em vermelho não foram informados!");
            $("#email-login").addClass("invalid");
            $('input[id="email-login"]').css("border", "2px solid red");
            $("#senha-login").addClass("invalid");
            $('input[id="senha-login"]').css("border", "2px solid red");
            return;
        } else {
            $("#email-login").removeClass("invalid");
            $('input[id="email-login"]').css("border", "1px solid #bbb");
            $("#senha-login").removeClass("invalid");
            $('input[id="email-login"]').css("border", "1px solid #bbb");
        }

        if (!values.senha) {
            alert("Senha não informada!");
            $("#senha-login").addClass("invalid");
            $('input[id="senha-login"]').css("border", "2px solid red");
            return;
        } else {
            $("#senha-login").removeClass("invalid");
            $('input[id="senha-login"]').css("border", "1px solid #bbb");
        }

        if (!values.email) {
            alert("Email não informado!");
            $("#email-login").addClass("invalid");
            $('input[id="email-login"]').css("border", "2px solid red");
            return;
        } else if (!~values.email.indexOf("@")) {
            alert("Preencha um e-mail válido!")
            $("#email-login").addClass("invalid");
            $('input[id="email-login"]').css("border", "2px solid red");
            return
        } else if (!~values.email.split("@")[1].indexOf(".")) {
            alert("Preencha um e-mail válido!")
            $("#email-login").addClass("invalid");
            $('input[id="email-login"]').css("border", "2px solid red");
            return
        } else if (!values.email.split("@")[1].split(".")[1]) {
            alert("Preencha um e-mail válido!")
            $("#email-login").addClass("invalid");
            $('input[id="email-login"]').css("border", "2px solid red");
            return
        } else {
            $("#email-login").removeClass("invalid");
            $('input[id="email-login"]').css("border", "1px solid #bbb");
        }

        request("POST", `${serverURL}/user/login`, (xhr) => {

            switch (xhr.status) {
                case 401: {
                    console.log(xhr.responseText)
                    alert("Email não existente ou senha incorreta!");
                    $("#email-login").addClass("invalid");
                    $('input[id="email-login"]').css("border", "2px solid red");
                    $("#senha-login").addClass("invalid");
                    $('input[id="senha-login"]').css("border", "2px solid red");
                }
                case 200: {
                    let token = JSON.parse(xhr.responseText).token
                    let user = JSON.parse(xhr.responseText).user

                    localStorage.clear();
                    sessionStorage.clear();

                    if (values.manterConectado) {
                        localStorage.setItem(`token`, token)
                        localStorage.setItem(`user`, JSON.stringify(user));
                        $("#email-login").removeClass("invalid");
                        $('input[id="email-login"]').css("border", "1px solid #bbb");
                        $("#senha-login").removeClass("invalid");
                        $('input[id="email-login"]').css("border", "1px solid #bbb");
                    }

                    sessionStorage.setItem(`token`, token)
                    sessionStorage.setItem(`user`, JSON.stringify(user))

                    goTo("user/perfil")
                }
            }
        },
            {
                email: values.email,
                password: values.senha
            })
    });
})