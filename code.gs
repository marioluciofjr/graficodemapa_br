// Função para criar o menu personalizado
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Mapa Interativo')
      .addItem('Mostrar Mapa', 'showMap')
      .addToUi();
}

// Função para exibir o HTML com o mapa
function showMap() {
  var htmlOutput = HtmlService.createHtmlOutputFromFile('index')
      .setWidth(800)
      .setHeight(600);
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Mapa do Brasil');
}

// Função para obter os dados da planilha
function getSheetData() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var dataRange = sheet.getDataRange();
  var values = dataRange.getValues();
  
  var data = {};
  
  for (var i = 1; i < values.length; i++) {
    var state = values[i][0];
    var population2022 = values[i][1];
    var population2010 = values[i][2];
    
    if (state && population2022 && population2010) {
      var increase = population2022 - population2010;
      var percentIncrease = ((increase / population2010) * 100).toFixed(2);
      data[state] = {
        increase: increase,
        percentIncrease: percentIncrease,
        population2022: population2022,
        population2010: population2010
      };
    }
  }
  
  return JSON.stringify(data);
}
