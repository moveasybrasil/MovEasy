$(() => {
    $("#btn-logar").click(() => {
        const values = {
            email: $("#email-login")[0].value,
            senha: $("#senha-login")[0].value,
            manterConectado: $("#manterConectado")[0].checked
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

        console.log(values)
    });
})