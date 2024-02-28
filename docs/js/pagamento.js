// Adiciona a classe 'active' ao header para o item específico
document.querySelector(".header-moving").classList.add("active");

/*--- Função que tira o hidden e começa o countdown do pix ---*/


function GerarQRCode() {
  let finalURL = './assets/images/Qr-Before.png';
  if ($('#copia-cola').text().trim() !== '') {
    return;
  }
  $('#img-qr').attr('src', finalURL);
  $('#copia-cola').append("https://moveasybrasil.github.io/MovEasy");
  $('.qr-pix').removeClass('hidden');
  startTimer(600, document.querySelector('#timer'));
}

$(document).ready(function () {
  $('#gerarQR').click(function () {
    GerarQRCode();
  });
});


/*--- Timer de pagamento ---*/


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

/*--- Função para copiar o texto do textarea ---*/

$(document).ready(function () {
  $("#btn-copiar").click(function () {
    var conteudoTextarea = $("#copia-cola").val();
    navigator.clipboard.writeText(conteudoTextarea);
  });
});

/*--- Alternar entre Pix e Crédito ---*/

$(document).ready(function () {
  $('.toggle-checkbox').change(function () {
    if (this.checked) {

      $('.pix-copia-cola').addClass('hidden');
      $('#btn-continua').addClass('hidden')
      $('.checkout-credit').removeClass('hidden');
    } else {
      $('.pix-copia-cola').removeClass('hidden');
      $('#btn-continua').removeClass('hidden');
      $('.checkout-credit').addClass('hidden');
    }
  });
});

/*--- LÓGICA DO CARTÃO DE CRÉDITO ---*/

$('.input-cart-number').on('input', function () {
  $t = $(this);

  if ($t.val().length >= 4) {
    $t.next().focus();
  }

  var card_number = '';
  $('.input-cart-number').each(function () {
    card_number += $(this).val() + ' ';
  });

  $('.credit-card-box .number').html(card_number.trim());
});

$('#card-holder').on('input', function () {
  $t = $(this);
  $('.credit-card-box .card-holder div').html($t.val());

});

$('#card-holder').on('keyup change', function () {
  $t = $(this);
  $('.credit-card-box .card-holder div').html($t.val());
});

$('#card-expiration-month, #card-expiration-year').change(function () {
  m = $('#card-expiration-month option').index($('#card-expiration-month option:selected'));
  m = (m < 10) ? '0' + m : m;
  y = $('#card-expiration-year').val().substr(2, 2);
  $('.card-expiration-date div').html(m + '/' + y);
})

$('#card-ccv').on('focus', function () {
  $('.credit-card-box').addClass('hover');
}).on('blur', function () {
  $('.credit-card-box').removeClass('hover');
}).on('keyup change', function () {
  $('.ccv div').html($(this).val());
});


$('#limpa-campos').click((e) => {
  e.preventDefault();
  $('#card-number').val("");
  $('#card-number-1').val("");
  $('#card-number-2').val("");
  $('#card-number-3').val("");
  $('#card-holder').val("");
  $('#card-expiration-month').val("");
  $('#card-expiration-year').val("");
  $('#card-ccv').val("");
  $('.number').text("");
  $('.ccv div').text("");
  $('.card-expiration-date div').text("");
  $('.card-holder div').text("");
});


/*--------------------
CodePen Tile Preview
--------------------*/
setTimeout(function () {
  $('#card-ccv').focus().delay(1000).queue(function () {
    $(this).blur().dequeue();
  });
}, 500);


$('#btn-continua').click(() => {
  var modalContent = `
    <div id="meu-modal" class="modal">
        <div class="modal-content">
            <p><b>OBRIGADO!</b></p>
            <p>Entraremos em contato assim que um motorista escolher sua mudança!</p>

            <button class="btn" id="voltar-pix">Voltar ao Perfil</button>
        </div>
    </div> `;

  $('body').append(modalContent);

  $('#meu-modal').css('display', 'flex');

  $('#voltar-pix').click(() => {
    goTo("user/perfil")
  });
});



$('#btn-enviar').click(() => {
  var modalContent = `
        <div id="meu-modal" class="modal">
            <div class="modal-content">
                <p><b>OBRIGADO!</b></p>
                <p>Entraremos em contato assim que um motorista escolher sua mudança!</p>

                <button class="btn" id="voltar">Voltar ao Perfil</button>
            </div>
        </div> `;

  $('body').append(modalContent);

  $('#meu-modal').css('display', 'flex');


  // // Fechar o modal quando clicar fora dele
  // $(window).click((event) => {
  //     if (event.target == $('#meu-modal')[0]) {
  //         $('#meu-modal').css('display', 'none');
  //         // Remover o modal do DOM após fechar
  //         $('#meu-modal').remove();
  //     }
  // });
  $('#voltar').click(() => {
    goTo("user/perfil")
  })
});

