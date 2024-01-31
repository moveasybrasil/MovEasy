$(() => {
 
    $("#button-continuar").click(() => {
        $("#form-continuar-solicitacao").hide();
        $("#form-finalizar-solicitacao").show();
    });
 
    $("#button-voltar").click(() => {
        $("#form-continuar-solicitacao").show();
        $("#form-finalizar-solicitacao").hide();
    })
});