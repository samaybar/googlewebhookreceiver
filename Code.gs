
//this is a function that fires when the webapp receives a GET request
function doGet(e) {
  return HtmlService.createHtmlOutput("request received");
}

//this is a function that fires when the webapp receives a POST request
function doPost(e) {
  var params = JSON.stringify(e.postData.contents);
  params = JSON.parse(params);
  var myData = JSON.parse(e.postData.contents);
  var testRunUrl = myData.test_run_url;
  var testRunName = myData.test_name;
  var testRunEnv = myData.environment_name;
  var testRunResult = myData.result;
  var sheet = SpreadsheetApp.getActiveSheet();
  var lastRow = Math.max(sheet.getLastRow(),1);
  sheet.insertRowAfter(lastRow);
  var timestamp = new Date();
  sheet.getRange(lastRow + 1, 1).setValue(timestamp);
  sheet.getRange(lastRow + 1, 2).setValue(testRunName);
  sheet.getRange(lastRow + 1, 3).setValue(testRunEnv);
  sheet.getRange(lastRow + 1, 4).setValue(testRunResult);
  sheet.getRange(lastRow + 1, 5).setValue(testRunUrl);
  sheet.getRange(lastRow + 1, 6).setValue(params);
  SpreadsheetApp.flush();
  return HtmlService.createHtmlOutput("post request received");
}