function checkInputLength() {
    let inputValue = document.getElementById("Placa").value;
    let maxCaracteres = 7;

    if (inputValue.length === maxCaracteres) {
      searchPlateInformation(inputValue);
    }
}

// trocar rota aqui para rota da api do server do projeto git
const baseURL = `Server=mysql-1e882686-moveasy.a.aivencloud.com;Port=11197`;

async function searchPlateInformation(placa) {

  request("GET", `${serverURL}/vehicle/${placa} `, (xhr) => {

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

  // let res = await fetch(baseURL + `/vehicle/info/${placa}`,{
  //   headers: {
  //     'Content-Type': 'application/json',
  //   }
  // });
  // let data = await res.json();

  // displayResult(data);

}

  // function displayResult(data) {

  //   console.log(data);


  //   let inputNome = document.getElementById('Nome');
  //   inputNome.value = data['name']

  //   let inputCor = document.getElementById('Cor');
  //   inputCor.value = data['colour']

  //   let inputAno = document.getElementById('Ano');
  //   inputAno.value = data['year']

  //   let inputCapacidade = document.getElementById('Capacidade');
  //   inputCapacidade.value = 5

  // }


async function register(){

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
  
  // sendData(valorNome, valorPlaca, valorCor, valorAno, valorCapacidade)

}


// async function sendData(nome, placa, cor, ano, capacidade){

//   let req = new Request(
//     baseURL + `/vehicle/register`,{
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         "licensePlate": placa,
//         "year": ano,
//         "capacity": capacidade,
//         "name": nome,
//         "colour": cor,
//       }),
//       mode: `cors`,      
//     }
//   )

//   let res = await fetch(req);

//   alert('OK!')
// }
