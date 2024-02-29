// Adiciona a tag 'active' ao header para o item especifico
document.querySelectorAll(".header-login").forEach((e) => {
  e.classList.add("active")
})

// Adiciona a tag 'active' ao header para o item especifico
document.querySelectorAll(".header-login").forEach((e) => {
  e.classList.add("active")
})

function checkInputLength() {
  let inputValue = document.getElementById("Placa").value;
  let maxCaracteres = 7;

  if (inputValue.length === maxCaracteres) {
    searchPlateInformation(inputValue);
  }
}

async function searchPlateInformation(placa) {

  request("GET", `${serverURL}/vehicle/${placa}`, (xhr) => {

    console.log(xhr.responseText)
      if (xhr.status == 200) {
        let data = JSON.parse(xhr.responseText)

        let inputNome = document.getElementById('Nome');
        inputNome.value = data['name']
    
        let inputCor = document.getElementById('Cor');
        inputCor.value = data['colour']
    
        let inputAno = document.getElementById('Ano');
        inputAno.value = data['year']
    
        let inputCapacidade = document.getElementById('Capacidade');
        inputCapacidade.value = 5
      }
  
  }, null, null, true)

}

async function register() {

  let valorNome = document.getElementById('Nome').value;
  let valorCor = document.getElementById('Cor').value;
  let valorAno = document.getElementById('Ano').value;
  let valorPlaca = document.getElementById('Placa').value;
  let valorCapacidade = document.getElementById('Capacidade').value;

  request("POST", `${serverURL}/vehicle`, (xhr) => {
    console.log(xhr.responseText)
  }, {
    LicensePlate: valorPlaca,
    Year: valorAno,
    Capacity: valorCapacidade,
    Name: valorNome,
    Colour: valorCor
  }, null, true)

  $("#box2").hide();
  $("#box3").show();

  setTimeout( ()=>{goTo("user/perfil")}, 5 * 1000)
}

$(() => {

  $("#botao-continuar").click(() => {
    const values = {
      placa: $("#Placa")[0].value,
      modelo: $("#Nome")[0].value,
      cor: $("#Cor")[0].value
    }

    console.log(values)

    let camposInvalidos = false
    let msg = "Os campos em vermelho estão incorretos!"

    if (!values.cor) {
      $('input[id="Cor"]').css("border", "2px solid red");
      camposInvalidos = true
      $("#Cor").addClass("invalid");
      msg = "Os campos em vermelho estão inválidos!"
    } else {
      $("#Cor").removeClass("invalid");
      $('input[id="Cor"]').css("border", "1px solid #bbb");
    }

    if (!values.modelo) {
      $('input[id="Nome"]').css("border", "2px solid red");
      camposInvalidos = true
      $("#Nome").addClass("invalid");
      msg = "Os campos em vermelho estão inválidos!"
    } else {
      $("#Nome").removeClass("invalid");
      $('input[id="Nome"]').css("border", "1px solid #bbb");
    }

    if (!values.placa) {
      $('input[id="Placa"]').css("border", "2px solid red");
      camposInvalidos = true
      $("#Placa").addClass("invalid");
      msg = "Os campos em vermelho estão inválidos!"
    } else {
      $("#Placa").removeClass("invalid");
      $('input[id="Placa"]').css("border", "1px solid #bbb");
    }

    if (camposInvalidos) {
      alert(msg);
    } else {
      $("#box1").hide();
      $("#box2").show();
    }
  });

  $("#botao-voltar").click(() => {
    $("#box1").show();
    $("#box2").hide();
  });

  $("#botao-cadastrar").click(() => {
    const values = {
      ano: $("#Ano")[0].value,
      capacidade: $("#Capacidade")[0].value,
    }

    console.log(values)

    let camposInvalidos = false
    let msg = "Os campos em vermelho estão incorretos!"

    
    if (!values.capacidade) {
      $('input[id="Capacidade"]').css("border", "2px solid red");
      camposInvalidos = true
      $("#Capacidade").addClass("invalid");
      msg = "Os campos em vermelho estão inválidos!"
    } else {
      $("#Capacidade").removeClass("invalid");
      $('input[id="Capacidade"]').css("border", "1px solid #bbb");
    }

    if (!values.ano) {
      $('input[id="Ano"]').css("border", "2px solid red");
      camposInvalidos = true
      $("#Ano").addClass("invalid");
      msg = "Os campos em vermelho estão inválidos!"
    } else {
      $("#Ano").removeClass("invalid");
      $('input[id="Ano"]').css("border", "1px solid #bbb");
    }

    if (camposInvalidos) {
      alert(msg);
    } else {
      register
      $(location).attr('href', 'https://moveasybrasil.github.io/MovEasy/user/perfil');
    }

  });
})