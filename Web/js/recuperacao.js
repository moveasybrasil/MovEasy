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
        $("#email-recuperacao").removeClass("invalid");

        console.log(values)
    });
})