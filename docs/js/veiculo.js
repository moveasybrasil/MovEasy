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

let res = await fetch(baseURL + `/vehicle/info/${placa}`, {
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
  
  // sendData(valorNome, valorPlaca, valorCor, valorAno, valorCapacidade)

}

async function sendData(nome, placa, cor, ano, capacidade) {

  let req = new Request(
    baseURL + `/vehicle/register`, {
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

$(() => {

  $("#button-continuar").click(() => {
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

  $("#button-voltar").click(() => {
    $("#box1").show();
    $("#box2").hide();
  });

  $("#button-cadastrar").click(() => {
    const values = {
      ano: $("#Ano")[0].value,
      capacidade: $("#Capacidade")[0].value
    }

    console.log(values)

    let camposInvalidos = false
    let msg = "Os campos em vermelho estão incorretos!"

    if (!values.ano) {
      $('input[id="Ano"]').css("border", "2px solid red");
      camposInvalidos = true
      $("#Ano").addClass("invalid");
      msg = "Os campos em vermelho estão inválidos!"
    } else {
      $("#Ano").removeClass("invalid");
      $('input[id="Ano"]').css("border", "1px solid #bbb");
    }

    if (!values.capacidade) {
      $('input[id="Capacidade"]').css("border", "2px solid red");
      camposInvalidos = true
      $("#Capacidade").addClass("invalid");
      msg = "Os campos em vermelho estão inválidos!"
    } else {
      $("#Capacidade").removeClass("invalid");
      $('input[id="Capacidade"]').css("border", "1px solid #bbb");
    }

    if (camposInvalidos) {
      alert(msg);
    } else {
      register
      $(location).attr('href', 'https://moveasybrasil.github.io/MovEasy/user/perfil');
    }

  });
})

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