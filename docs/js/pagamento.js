

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

$('.input-cart-number').on('keyup change', function(){
    $t = $(this);
    
    if ($t.val().length > 3) {
      $t.next().focus();
    }
    
    var card_number = '';
    $('.input-cart-number').each(function(){
      card_number += $(this).val() + ' ';
      if ($(this).val().length == 4) {
        $(this).next().focus();
      }
    })
    
    $('.credit-card-box .number').html(card_number);
  });
  
  $('#card-holder').on('keyup change', function(){
    $t = $(this);
    $('.credit-card-box .card-holder div').html($t.val());
  });
  
  $('#card-holder').on('keyup change', function(){
    $t = $(this);
    $('.credit-card-box .card-holder div').html($t.val());
  });
  
  $('#card-expiration-month, #card-expiration-year').change(function(){
    m = $('#card-expiration-month option').index($('#card-expiration-month option:selected'));
    m = (m < 10) ? '0' + m : m;
    y = $('#card-expiration-year').val().substr(2,2);
    $('.card-expiration-date div').html(m + '/' + y);
  })
  
  $('#card-ccv').on('focus', function(){
    $('.credit-card-box').addClass('hover');
  }).on('blur', function(){
    $('.credit-card-box').removeClass('hover');
  }).on('keyup change', function(){
    $('.ccv div').html($(this).val());
  });
  
  
  /*--------------------
  CodePen Tile Preview
  --------------------*/
  setTimeout(function(){
    $('#card-ccv').focus().delay(1000).queue(function(){
      $(this).blur().dequeue();
    });
  }, 500);
  
  /*function getCreditCardType(accountNumber) {
    if (/^5[1-5]/.test(accountNumber)) {
      result = 'mastercard';
    } else if (/^4/.test(accountNumber)) {
      result = 'visa';
    } else if ( /^(5018|5020|5038|6304|6759|676[1-3])/.test(accountNumber)) {
      result = 'maestro';
    } else {
      result = 'unknown'
    }
    return result;
  }
  
  $('#card-number').change(function(){
    console.log(getCreditCardType($(this).val()));
  })*/