function sendEmails2() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var startRow = 2;  // First row of data to process
  var numRows = 3;   // Number of rows to process
  // Fetch the range of cells A2:B3
  var dataRange = sheet.getRange(startRow, 1, numRows, 5)
  // Fetch values for each row in the Range.
  var data = dataRange.getValues();
  for (var i = 0; i < data.length; ++i) {
    var row = data[i];
    var emailAddress = row[0];  // First column
    var message = row[3];       // Second column
    var emailSent = row[4];     // Third column
    if (emailSent != EMAIL_SENT) {  // Prevents sending duplicates
      var subject = row[2];//"Sending emails from a Spreadsheet";
      MailApp.sendEmail(emailAddress, subject, message, {
        name: 'S Aybar'
      });
      sheet.getRange(startRow + i, 5).setValue(EMAIL_SENT);
      var timestamp = new Date();
      sheet.getRange(startRow + i, 6).setValue(timestamp + ":" + message);
      // Make sure the cell is updated right away in case the script is interrupted
      SpreadsheetApp.flush();
    }
  }
}

function doGet(e) {
  var params = JSON.stringify(e)
  var sheet = SpreadsheetApp.getActiveSheet();
  params = JSON.parse(params);
  var lastRow = Math.max(sheet.getLastRow(),1);
  sheet.insertRowAfter(lastRow);
  var timestamp = new Date();
  sheet.getRange(lastRow + 1, 1).setValue(timestamp);
  sheet.getRange(lastRow + 1, 2).setValue("This was a get request made");
  SpreadsheetApp.flush();
  return HtmlService.createHtmlOutput("request received");
}

function doPost(e) {
  var params = JSON.stringify(e.postData.contents);
  params = JSON.parse(params);
  var myData = JSON.parse(e.postData.contents);
  //v
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