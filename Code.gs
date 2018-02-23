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
  var lastRow = sheet.getLastRow();
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
  var lastRow = sheet.getLastRow();
  sheet.insertRowAfter(lastRow);
  /*2018-02-23
  var startRow = 3;  // First row of data to process
  var numRows = 1;   // Number of rows to process
  var htmlRange = sheet.getRange(7,2,15,2);
  var htmlData = htmlRange.getValues();
  
  var htmlMyBucketUrl = "https://www.runscope.com/radar/" + myData.bucket_key;
  var htmlMyTestTime = myData.started_at;
  var testRunLocale = myData.region_name;
  var testId = myData.test_run_id;
  var responseTime = myData.requests[0].response_time_ms; 2018-02-23*/
  
  
//  var theHtml = htmlRange.getValue();
  var htmlBlock =[];

 /*
  var theHtml = "<b>Notice anything strange about this email?</b> \n<p>" + params;
  // Fetch the range of cells A2:B3
  var dataRange = sheet.getRange(startRow, 1, numRows, 5)
  // Fetch values for each row in the Range.
  var data = dataRange.getValues();
  for (var i = 0; i < data.length; ++i) {
    var row = data[i];
    var emailAddress = row[0];  // First column
//    var message = row[3];       // Second column
    var message = "You need to phone your mom!\nTest URL: " + testRunUrl + "\n" + params;//.postData;//"hello world";       // Second column
    var emailSent = row[4];     // Third column
//    if (emailSent != EMAIL_SENT) {  // Prevents sending duplicates
    if (true == true) {
//      var subject = row[2];//"Sending emails from a Spreadsheet";
      var subject =  "Runscope Test Result: " + testRunResult + " | " + testRunName + " - (" + testRunEnv + ")";
   
     
      MailApp.sendEmail(emailAddress, subject, message, {htmlBody: theHtml,
        name: 'Sam Aybar'
      });*/
      //sheet.getRange(startRow + i, 5).setValue(params);
      var timestamp = new Date();
      sheet.getRange(lastRow + 1, 1).setValue(timestamp);
      sheet.getRange(lastRow + 1, 2).setValue(params);
      sheet.getRange(lastRow + 1, 3).setValue(myData);
      //      sheet.getRange(startRow + i, 6).setValue(timestamp);
      // Make sure the cell is updated right away in case the script is interrupted
      SpreadsheetApp.flush();
    //}
  //}
//  return HtmlService.createHtmlOutput(params);
    return HtmlService.createHtmlOutput("request received");
}