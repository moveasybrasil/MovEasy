function checkInputLength() {
    let inputValue = document.getElementById("Placa").value;
    let maxCaracteres = 7;

    if (inputValue.length === maxCaracteres) {
      searchPlateInformation(inputValue);
    }
}

// trocar rota aqui para rota da api do server do projeto git
const baseURL = `https://localhost:7014`;

async function searchPlateInformation(placa) {

  let res = await fetch(baseURL + `/vehicle/info/${placa}`,{
    headers: {
      'Content-Type': 'application/json',
    }
  });
  let data = await res.json();

  displayResult(data);

}

  function displayResult(data) {

    console.log(data);


    let inputNome = document.getElementById('Nome');
    inputNome.value = data['name']

    let inputCor = document.getElementById('Cor');
    inputCor.value = data['colour']

    let inputAno = document.getElementById('Ano');
    inputAno.value = data['year']

    let inputCapacidade = document.getElementById('Capacidade');
    inputCapacidade.value = 5

  }


async function register(){

  let valorNome = document.getElementById('Nome').value;
  let valorCor = document.getElementById('Cor').value;
  let valorAno = document.getElementById('Ano').value;
  let valorPlaca = document.getElementById('Placa').value;
  let valorCapacidade = document.getElementById('Capacidade').value;

  sendData(valorNome, valorPlaca, valorCor, valorAno, valorCapacidade)


}


async function sendData(nome, placa, cor, ano, capacidade){

  let req = new Request(
    baseURL + `/vehicle/register`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "licensePlate": placa,
        "year": ano,
        "capacity": capacidade,
        "name": nome,
        "colour": cor,
      }),
      mode: `cors`,      
    }
  )

  let res = await fetch(req);

  alert('OK!')
}