
function alterarVeiculo() {
    var veiculo = document.getElementById("Veiculo").value;
    var placa = document.getElementById("Placa").value;
    var nome = document.getElementById("Nome").value;
    var ano = document.getElementById("Ano").value;
    var cor = document.getElementById("Cor").value;
    var capacidade = document.getElementById("Capacidade").value;

    // Aqui você pode enviar esses valores para o backend ou fazer alguma outra ação com eles
    console.log("Veiculo: " + veiculo);
    console.log("Placa: " + placa);
    console.log("Nome: " + nome);
    console.log("Ano: " + ano);
    console.log("Cor: " + cor);
    console.log("Capacidade: " + capacidade);

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

  function alterarVeiculo() {
    var veiculo = document.getElementById("Veiculo").value;
    var placa = document.getElementById("Placa").value;
    var nome = document.getElementById("Nome").value;
    var ano = document.getElementById("Ano").value;
    var cor = document.getElementById("Cor").value;
    var capacidade = document.getElementById("Capacidade").value;

    var data = {
      veiculo: veiculo,
      placa: placa,
      nome: nome,
      ano: ano,
      cor: cor,
      capacidade: capacidade
    };

    fetch('/url-do-backend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao enviar requisição para o servidor.');
      }
      return response.json();
    })
    .then(responseData => {
      // Aqui você pode lidar com a resposta do servidor, se necessário
      console.log(responseData);
    })
    .catch(error => {
      console.error('Erro:', error);
    });
  }}