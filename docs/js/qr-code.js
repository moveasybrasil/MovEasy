function GerarQRCode() {
    let finalURL = './assets/images/Qr-Before.png';
    if ($('#copia-cola').text().trim() !== '') {
        return;
    }
    $('.blur').toggleClass('blur');
    $('#img-qr').attr('src', finalURL);
    $('#copia-cola').append("https://moveasybrasil.github.io/MovEasy")

}

$(document).ready(function () {
    $('#gerarQR').click(function () {
        GerarQRCode();
    });
});

$(document).ready(function() {
    $("#btn-copiar").click(function() {
      var conteudoTextarea = $("#copia-cola").val();
      navigator.clipboard.writeText(conteudoTextarea);
    });
  });