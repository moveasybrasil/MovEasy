$(() => {
    $("#btn-recuperar").click(() => {
        const values = {
            email: $("#email-recuperacao")[0].value
        }

        if (!values.email) {
            alert("Email não informado!");
            $("#email-recuperacao").addClass("invalid");
            return;
        }

        if(!~values.email.indexOf("@")){
            alert("Preencha um e-mail válido!")
            $("#email-recuperacao").addClass("invalid");
            return
        }

        if(!~values.email.split("@")[1].indexOf(".")){
            alert("Preencha um e-mail válido!")
            $("#email-recuperacao").addClass("invalid");
            return
        }

        if(!values.email.split("@")[1].split(".")[1]){
            alert("Preencha um e-mail válido!")
            $("#email-recuperacao").addClass("invalid");
            return
        }

        $("#email-recuperacao").removeClass("invalid");

        console.log(values)

        if (validateEmail(values.email)) {

            request(
                "POST",
                `${serverURL}user/recovery?email=${values.email}`,
                (xhr) => { console.log(xhr.responseText)}
            )
    
        }
    });
})

function validateEmail(email) {

    if(!email) {
        return false
    }
    
    if (!~email.indexOf("@")) {
        return false
    }
    
    if (!~email.split("@")[1].indexOf(".")) {
        return false
    }
    
    if (!email.split("@")[1].split(".")[1]) {
        return false
    }
    
    return true;
}