$(() => {
 
    $("#button-continuar").click(() => {
        $("#box-continuar-suporte").hide();
        $("#box-finalizar-suporte").show();
    });
 
    $("#button-voltar").click(() => {
        $("#box-continuar-suporte").show();
        $("#box-finalizar-suporte").hide();
    })
 
 
})