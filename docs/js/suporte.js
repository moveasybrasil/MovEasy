// Adiciona a tag 'active' ao header para o item especifico
document.querySelectorAll(".header-support").forEach( (e) => {
    e.classList.add("active")
})

$(() => {
 
    $("#button-continuar").click(() => {

        const values = {
            nome : document.getElementById("nome").value,
            email: document.getElementById("email").value
        }

        let camposInvalidos = false
        let msg = "Os campos em vermelho estão incorretos!"

        if (!values.nome) {
            $('input[id="nome"]').css("border", "2px solid red");
            camposInvalidos = true
            $("#nome").addClass("invalid");
            msg = "Preencha o nome."
        }  else {
            $("#nome").removeClass("invalid");
            $('input[id="nome"]').css("border", "1px solid #bbb");
        }

        if (!values.email) {
            $('input[id="email"]').css("border", "2px solid red");
            camposInvalidos = true
            $("#email").addClass("invalid");
            msg = "Os campos em vermelho estão inválidos!"
        } else if (!~values.email.indexOf("@")) {
            $('input[id="email"]').css("border", "2px solid red");
            camposInvalidos = true
            $("#email").addClass("invalid");
            msg = "Há informações faltando no e-mail informado!"
        } else if (!~values.email.split("@")[1].indexOf(".")) {
            $('input[id="email"]').css("border", "2px solid red");
            camposInvalidos = true
            $("#email").addClass("invalid");
            msg = "Há informações faltando no e-mail informado!"
        } else if (!values.email.split("@")[1].split(".")[1]) {
            $('input[id="email"]').css("border", "2px solid red");
            camposInvalidos = true
            $("#email").addClass("invalid");
            msg = "Há informações faltando no e-mail informado!"
        } else {
            $("#email").removeClass("invalid");
            $('input[id="email"]').css("border", "1px solid #bbb");
        }

        if (camposInvalidos) {
            alert(msg);
        } else {
            $("#box-continuar-suporte").hide();
            $("#box-finalizar-suporte").show();
        }
        
    });
 
    $("#button-voltar").click(() => {
        $("#box-continuar-suporte").show();
        $("#box-finalizar-suporte").hide();
    })
 
    $("#Enviar").click( ()=> {
        
        const values = {
            Name: $("#nome")[0].value,
            Email: $("#email")[0].value,
            Subject: $("#Assunto")[0].value,
            Body: $("#Descricao")[0].value
        }

        let camposInvalidos = false
        let msg = "Os campos em vermelho estão incorretos!"

        if (!values.Subject) {
            camposInvalidos = true
            $("#Assunto").addClass("invalid");
            $('input[id="Assunto"]').css("border", "2px solid red");
            msg = "Preencha o assunto!"
        }  else {
            $("#Assunto").removeClass("invalid");
            $('input[id="Assunto"]').css("border", "1px solid #bbb");
        }

        if (!values.Body) {
            camposInvalidos = true
            $("#Descricao").addClass("invalid");
            $('input[id="Descricao"]').css("border", "2px solid red");
            msg = "Preencha a descrição!"
        }  else {
            $("#Descricao").removeClass("invalid");
            $('input[id="Descricao"]').css("border", "1px solid #bbb");
        }

        console.log(values);

        request("POST", `${serverURL}/support`, (xhr)=>{
            console.log(xhr.responseText)
        }, values, null, false)

    })
 
})