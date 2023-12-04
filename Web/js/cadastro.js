$(() => {
 
    $("#button-continuar").click(() => {
        $("#box-continuar-cadastro").hide();
        $("#box-finalizar-cadastro").show();
    });
 
    $("#button-voltar").click(() => {
        $("#box-continuar-cadastro").show();
        $("#box-finalizar-cadastro").hide();
    })

})

// function continuar_cadastro(cc) {
//     var display = document.getElementById(cc).style.display;
//     if(display == "none")
//         document.getElementById(cc).style.display = 'block';
//     else
//         document.getElementById(cc).style.display = 'none';
// }

// function voltar_cadastro(vc) {
//     var display = document.getElementById(vc).style.display;
//     if(display == "block")
//         document.getElementById(vc).style.display = 'none';
//     else
//         document.getElementById(vc).style.display = 'block';
// }