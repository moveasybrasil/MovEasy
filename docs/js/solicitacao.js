$(() => {
 
    $("#button-continuar").click(() => {
        $("#form-continuar-solicitacao").hide();
        $("#form-finalizar-solicitacao2").show();
    });
 
    $("#button-voltar").click(() => {
        $("#form-continuar-solicitacao").show();
        $("#form-finalizar-solicitacao2").hide();
    })
});