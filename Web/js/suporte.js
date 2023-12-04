$(() => {

function continuar_suporte(cs) {
    var display = document.getElementById(cs).style.display;
    if(display == "none")
        document.getElementById(cs).style.display = 'block';
    else
        document.getElementById(cs).style.display = 'none';
}

function voltar_suporte(vs) {
    var display = document.getElementById(vs).style.display;
    if(display == "block")
        document.getElementById(vs).style.display = 'block';
    else
        document.getElementById(vs).style.display = 'none';
}



})