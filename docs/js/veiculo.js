function checkInputLength() {
    let input = document.getElementById('Placa');
    let inputValue = input.value;


    let caracteres = 7;

    if (input.length >= caracteres ) {
        searchPlateInformation(inputValue);
    }
    console.log(inputValue);
    console.log(caracteres)
}

function searchPlateInformation(placa) {

    let apiUrl = 'https://placafipe.com/placa/' + placa;

    fetch(apiUrl)

      .then(response => response.json())

      .then(data => {

        displayResult(data);
      })        
      
      .catch(error => console.error('Erro ao buscar informações da placa:', error));

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


