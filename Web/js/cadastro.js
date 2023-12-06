$(() => {
    $(document).ready(function () {

        $("#button-continuar").click(() => {
            const values = {
                email: $("#email")[0].value,
                senha: $("#password")[0].value,
                confirmar_senha: $("#confirmed-password")[0].value
            }

            console.log(values)

            let camposInvalidos = false

            if (!values.email) {
                $('input[id="email"]').css("border", "2px solid red");
                camposInvalidos = true
                $("#email").addClass("invalid");
            } else {
                $("#email").removeClass("invalid");
                $('input[id="email"]').css("border", "1px solid #bbb");
            }

            if (!values.senha) {
                $('input[id="password"]').css("border", "2px solid red");
                camposInvalidos = true
                $("#senha").addClass("invalid");
            } else {
                $("#senha").removeClass("invalid");
                $('input[id="email"]').css("border", "1px solid #bbb");
            }

            if (!values.confirmar_senha) {
                $('input[id="confirmed-password"]').css("border", "2px solid red");
                camposInvalidos = true
                $("#confirmed-senha").addClass("invalid");
            } else {
                $("#confirmed-senha").removeClass("invalid");
                $('input[id="confirmed-senha"]').css("border", "1px solid #bbb");
            }

            if(camposInvalidos) {
                alert("Os campos em vermelho não foram informados!");
            } else {
                $("#box-continuar-cadastro").hide();
                $("#box-finalizar-cadastro").show();
            }
        });

        // $("#button-continuar").click(() => {
        //     $("#box-continuar-cadastro").hide();
        //     $("#box-finalizar-cadastro").show();
        // });

        $("#button-voltar").click(() => {
            $("#box-continuar-cadastro").show();
            $("#box-finalizar-cadastro").hide();
        })

        $("#button-cadastrar").click(function () {
            alert("Cadastro realizado com sucesso!");
        });

    })
})
// slideToggle(slow) para header mobile