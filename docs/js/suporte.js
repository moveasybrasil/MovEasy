$(() => {
 
    $("#button-continuar").click(() => {
        $("#box-continuar-suporte").hide();
        $("#box-finalizar-suporte").show();
    });
 
    $("#button-voltar").click(() => {
        $("#box-continuar-suporte").show();
        $("#box-finalizar-suporte").hide();
    })
 
    $("#Enviar").click( ()=> {
        
        const values = {
            Nome: $("#Nome")[0].value,
            Email: $("#Email")[0].value,
            Assunto: $("#Assunto")[0].value,
            Descricao: $("#Descricao")[0].value
        }

        for(key in values) {
            if (!values [key]){
                alert("Preencha todos os campos!")
                return
            }
        }

        if(!~values.Email.indexOf("@")){
            alert("Preencha um e-mail válido!")
            return
        }

        if(!~values.Email.split("@")[1].indexOf(".")){
            alert("Preencha um e-mail válido!")
            return
        }

        if(!values.Email.split("@")[1].split(".")[1]){
            alert("Preencha um e-mail válido!")
            return
        }

        console.log(values);

    })
 
})