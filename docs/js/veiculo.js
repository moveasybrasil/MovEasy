function checkInputLength() {
    let inputValue = document.getElementById("Placa").value;
    
    console.log(inputValue.length);    
    
    let maxCaracteres = 7;

    if (inputValue.length === maxCaracteres) {
      searchPlateInformation(inputValue);
    }
    // console.log(inputValue);
    // console.log(maxCaracteres);
}

async function searchPlateInformation(placa) {

  let apiUrl = 'https://placafipe.com/placa/' + placa;

  let headers = new Headers();

  headers.append("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36");
  headers.append("Content-Type", "text/html; charset=UTF-8");
  headers.append("Access-Control-Allow-Origin", "*");
  headers.append("Access-Control-Allow-Methods", 'POST,PATCH,OPTIONS');


  let request = new Request(apiUrl, {
    headers,
    
  })

  let res = await fetch(request);
  let data = await res.text();

  console.log(data);


  // fetch(apiUrl)

  //     .then(response => response.json())

  //     .then(data => {

  //       displayResult(data);
  //     })        
      
  //     .catch(error => console.error('Erro ao buscar informações da placa:', error));

  }

  function displayResult(data) {

    console.log(data);

    // resultDiv.innerHTML = '<h2>Informações da Placa:</h2>' +

    //                       '<p>Modelo: ' + data.modelo + '</p>' +

    //                       '<p>Cor: ' + data.cor + '</p>' +

    //                       '<p>Ano: ' + data.ano + '</p>';

  }



// $(() => {    
//     function PegarPlaca() {
//         let placa = $('#Placa').val();
//     }

//     let url = `https://placafipe.com/placa/{placa}`;

//     fetch(url)
//     .then(response => {
//         console.log(Resposta, response)
//         return response.json();
//     })
// });  


