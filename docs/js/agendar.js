// Adiciona a tag 'active' ao header para o item especifico
document.querySelectorAll(".header-home").forEach( (e) => {
    e.classList.add("active")
})

$(() => {

    $("#button-continuar").click(() => {
        const values = {
            inicio: $("#inicio")[0].value,
            destinoFinal: $("#destino-final")[0].value,
        }

        console.log(values)

        let camposInvalidos = false
        let msg = "Os campos em vermelho estão incorretos!"
        
        if (!values.inicio) {
            $('input[id="origem"]').css("border", "2px solid red");
            camposInvalidos = true
            $("#origem").addClass("invalid");
            msg = "Os campos em vermelho estão inválidos!"
        } else {
            $("#origem").removeClass("invalid");
            
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

    $("#button-voltar").click(() => {
        $("#box-continuar-cadastro").show();
        $("#box-finalizar-cadastro").hide();
    })
})

// slideToggle(slow) para header mobile