function continuar_suporte(cs) {
    var display = document.getElementById(cs).style.display;
    if(display == "block")
        document.getElementById(cs).style.display = 'none';
    else
        document.getElementById(cs).style.display = 'block';
}

function voltar_suporte(vs) {
    var display = document.getElementById(vs).style.display;
    if(display == "none")
        document.getElementById(vs).style.display = 'block';
    else
        document.getElementById(vs).style.display = 'none';
}