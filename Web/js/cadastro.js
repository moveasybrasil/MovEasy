$(() => {

    $("#button-continuar2").click(() => {
        const values = {
            email: $("#email")[0].value,
            senha: $("#password")[0].value,
            confirmar_senha: $("#confirmed-password")[0].value
        }

        console.log(values)

        let camposInvalidos = false
        let msg = "Os campos em vermelho estão incorretos!"
        
        if (values.senha.length < 8) {
            $('input[id="password"]').css("border", "2px solid red");
            camposInvalidos = true
            $("#senha").addClass("invalid");
            $('input[id="confirmed-password"]').css("border", "2px solid red");
            $("#confirmed-senha").addClass("invalid");
            msg = "A senha deve ter mais de 8 caracteres!"
        } else if (!(values.senha == values.confirmar_senha)) {
            $('input[id="password"]').css("border", "2px solid red");
            camposInvalidos = true
            $("#senha").addClass("invalid");
            $('input[id="confirmed-password"]').css("border", "2px solid red");
            $("#confirmed-senha").addClass("invalid");
            msg = "As senhas não são iguais!"
        } else {
            $("#senha").removeClass("invalid");
            $('input[id="password"]').css("border", "1px solid #bbb");
            $('input[id="confirmed-password"]').css("border", "1px solid #bbb");
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
            $("#box2").hide();
            $("#box3").show();
        }
    });


    // kdlfkldfklkdfl


    $("#button-cadastrar").click(() => {
        const values = {
            nome: $("#nome")[0].value,
            cpf_or_cnpj: $("#cpf-cnpj")[0].value,
            telefone: $("#telefone")[0].value
        }

        console.log(values)

        let camposInvalidosFinal = false
        let msg = "Os campos em vermelho estão incorretos!"

        if (!values.telefone) {
            $('input[id="telefone"]').css("border", "2px solid red");
            camposInvalidosFinal = true
            $("#telefone").addClass("invalid");
            msg = "O seu número de telefone não pode ter mais ou menos de 11 números! Coloque o seu DDD e o número, exemplo: 47987654321."
        } else if (!values.telefone.length == 11) {
            $('input[id="telefone"]').css("border", "2px solid red");
            camposInvalidosFinal = true
            $("#telefone").addClass("invalid");
        } else {
            $("#senha").removeClass("invalid");
            $('input[id="cpf-cnpj"]').css("border", "1px solid #bbb");
        }
        
        if (!values.cpf_or_cnpj) {
            $('input[id="cpf-cnpj"]').css("border", "2px solid red");
            camposInvalidosFinal = true
            $("#cpf-cnpj").addClass("invalid");
            msg = "Os campos em vermelho estão incorretos!"
        } else if (values.cpf_or_cnpj.length < 8) {
            $('input[id="cpf-cnpj"]').css("border", "2px solid red");
            camposInvalidosFinal = true
            $("#cpf-cnpj").addClass("invalid");
            msg = "O seu CPF ou CNPJ deve ter mais de 11 números!"
        } else if (values.cpf_or_cnpj.length > 14) {
            $('input[id="cpf-cnpj"]').css("border", "2px solid red");
            camposInvalidosFinal = true
            $("#cpf-cnpj").addClass("invalid");
            msg = "O seu CNPJ não deve ter mais de 14 números!"
        } else {
            $("#senha").removeClass("invalid");
            $('input[id="cpf-cnpj"]').css("border", "1px solid #bbb");
        }
        
        if (!values.nome) {
            $('input[id="nome"]').css("border", "2px solid red");
            camposInvalidosFinal = true
            $("#nome").addClass("invalid");
            msg = "Os campos em vermelho estão incorretos!"
        } else {
            $("#nome").removeClass("invalid");
            $('input[id="nome"]').css("border", "1px solid #bbb");
        }

        if (camposInvalidosFinal) {
            alert(msg);
        } else {
            $("#button-cadastrar").click(function () {
                msg = "Cadastro realizado com sucesso!";
            });
        }
    });

    $("#button-voltar2").click(() => {
        $("#box2").show();
        $("#box3").hide();
    })
})

// slideToggle(slow) para header mobile