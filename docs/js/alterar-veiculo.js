// Adiciona a tag 'active' ao header para o item especifico
document.querySelectorAll(".header-login").forEach((e) => {
  e.classList.add("active")
})

function validateForm() {
  var veiculo = document.getElementById("Veiculo").value;
  var placa = document.getElementById("Placa").value;
  var nome = document.getElementById("Nome").value;
  var ano = document.getElementById("Ano").value;
  var cor = document.getElementById("Cor").value;
  var capacidade = document.getElementById("Capacidade").value;

  if (veiculo === "" || placa === "" || nome === "" || ano === "" || cor === "" || capacidade === "") {
    alert("Por favor, preencha todos os campos.");
    return false;
  }
  return true;
}

// function alterarVeiculo() {
//     var veiculo = document.getElementById("Veiculo").value;
//     var placa = document.getElementById("Placa").value;
//     var nome = document.getElementById("Nome").value;
//     var ano = document.getElementById("Ano").value;
//     var cor = document.getElementById("Cor").value;
//     var capacidade = document.getElementById("Capacidade").value;

//     // Aqui você pode enviar esses valores para o backend ou fazer alguma outra ação com eles
//     console.log("Veiculo: " + veiculo);
//     console.log("Placa: " + placa);
//     console.log("Nome: " + nome);
//     console.log("Ano: " + ano);
//     console.log("Cor: " + cor);
//     console.log("Capacidade: " + capacidade);

// }

function alterarVeiculo() {
  var veiculo = document.getElementById("Veiculo").value - 0;
  var placa = document.getElementById("Placa").value;
  var nome = document.getElementById("Nome").value;
  var ano = document.getElementById("Ano").value;
  var cor = document.getElementById("Cor").value;
  var capacidade = document.getElementById("Capacidade").value;

  request("PUT", `${serverURL}/vehicle`, (xhr) => {
    console.log(xhr.responseText)
    if(xhr.status != 200) {
      alert(xhr.responseText)
    }
  }, {
    id: veiculo,
    licensePlate: placa,
    year: ano,
    capacity: capacidade,
    name: nome,
    colour: cor
  }, null, true)

  // fetch('/url-do-backend', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(data)
  // })
  // .then(response => {
  //   if (!response.ok) {
  //     throw new Error('Erro ao enviar requisição para o servidor.');
  //   }
  //   return response.json();
  // })
  // .then(responseData => {
  //   // Aqui você pode lidar com a resposta do servidor, se necessário
  //   console.log(responseData);
  // })
  // .catch(error => {
  //   console.error('Erro:', error);
  // });
}

var info = []
request("GET", `${serverURL}/vehicle/id`, (xhr) => {
  console.log(JSON.parse(xhr.responseText))
  if(xhr.status == 200) {
    let response = JSON.parse(xhr.responseText)
    if(response.length > 0) {
      info = response
      const datalist = document.getElementById("Veiculos")

      response.forEach(element => {
        let option = document.createElement("option")
        option.value = element.id
        option.innerHTML = element.licensePlate + " - " + element.name
        datalist.appendChild(option)
      });
    }
  }
}, null, null, true)

document.getElementById('Veiculo').addEventListener('input', function (event) {
  console.log(event)
  const selection = document.getElementById("Veiculo").value

  console.log(selection)
  info.forEach(element => {
    if(element.id == selection) {
      var placa = document.getElementById("Placa");
      var nome = document.getElementById("Nome");
      var ano = document.getElementById("Ano");
      var cor = document.getElementById("Cor");
      var capacidade = document.getElementById("Capacidade");

      placa.value = element.licensePlate
      nome.value = element.name
      ano.value = element.year
      cor.value = element.colour
      capacidade.value = element.capacity
    }
  })

});

//Validação

$(() => {

  $("#button-continuar").click(() => {
    const values = {
      placa: $("#Placa")[0].value,
      modelo: $("#Nome")[0].value,
      veiculo: $("#Veiculo")[0].value
    }

    console.log(values)

    let camposInvalidos = false
    let msg = "Os campos em vermelho estão incorretos!"

    if (!values.veiculo) {
      $('input[id="Veiculo"]').css("border", "2px solid red");
      camposInvalidos = true
      $("#Veiculo").addClass("invalid");
      msg = "Os campos em vermelho estão inválidos!"
    } else {
      $("#Veiculo").removeClass("invalid");
      $('input[id="Veiculo"]').css("border", "1px solid #bbb");
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

  $("#button-voltar").click(() => {
    $("#box1").show();
    $("#box2").hide();
  });

  $("#botao-cadastrar").click(() => {
    const values = {
      ano: $("#Ano")[0].value,
      capacidade: $("#Capacidade")[0].value,
      cor: $("#Cor")[0].value
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

    if (!values.cor) {
      $('input[id="Cor"]').css("border", "2px solid red");
      camposInvalidos = true
      $("#Cor").addClass("invalid");
      msg = "Os campos em vermelho estão inválidos!"
    } else {
      $("#Cor").removeClass("invalid");
      $('input[id="Cor"]').css("border", "1px solid #bbb");
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