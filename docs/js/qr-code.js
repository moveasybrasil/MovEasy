    
    /*------------------------------------------------
    Função que tira o blur e começa o countdown do pix
    -------------------------------------------------*/

function GerarQRCode() {
    let finalURL = './assets/images/Qr-Before.png';
    if ($('#copia-cola').text().trim() !== '') {
        return;
    }
    $('.blur').toggleClass('blur');
    $('#img-qr').attr('src', finalURL);
    $('#copia-cola').append("https://moveasybrasil.github.io/MovEasy")
    $('.hidden').toggleClass('hidden')
    startTimer(600, document.querySelector('#timer'));
}

$(document).ready(function () {
    $('#gerarQR').click(function () {
        GerarQRCode();
    });
});

    /*-----------------
    Timer de pagamento
    -----------------*/

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

/*------------------------------------
Função para copiar o texto do textarea
-------------------------------------*/

$(document).ready(function () {
    $("#btn-copiar").click(function () {
        var conteudoTextarea = $("#copia-cola").val();
        navigator.clipboard.writeText(conteudoTextarea);
    });
});

/*-------------------------
Alternar entre Pix e Crédito
-------------------------*/
$(document).ready(function () {
$('.toggle-checkbox').change(function () {
    if (this.checked) {
      $('.qr-pix').addClass('hidden');
      $('.pix-copia-cola').addClass('hidden')
    } else {
      $('.qr-pix').removeClass('hidden');
      $('.pix-copia-cola').removeClass('hidden');
    }
  });
});