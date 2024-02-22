// Adiciona a tag 'active' ao header para o item especifico
document.querySelectorAll(".header-moving").forEach( (e) => {
    e.classList.add("active")
})

$(() => {
 
    $("#button-continuar").click(() => {
        $("#form-continuar-solicitacao").hide();
        $("#form-continuar2-solicitacao").show();
        $("#form-finalizar-solicitacao").hide();
    });
 
    $("#button-voltar").click(() => {
        $("#form-continuar-solicitacao").show();
        $("#form-continuar2-solicitacao").hide();
        $("#form-finalizar-solicitacao").hide();
    })

    $("#button-continuar2").click(() => {
        $("#form-continuar-solicitacao").hide();
        $("#form-continuar2-solicitacao").hide();
        $("#form-finalizar-solicitacao").show();
    });
 
    $("#button-voltar2").click(() => {
        $("#form-continuar-solicitacao").hide();
        $("#form-continuar2-solicitacao").show();
        $("#form-finalizar-solicitacao").hide();
    })

});