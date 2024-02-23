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
        option.innerHTML = element.name
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