var sheetName = "blogEmails";
var sheetId = "1nAY9rheJyAmVnkw38GKHrDtubg4Atcbz6vpbAAbQCQo";
var expectedHeaders = ["timestamp", "email"];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var doc = SpreadsheetApp.openById(sheetId);
    var sheet = doc.getSheetByName(sheetName);

    if (!sheet) {
      throw new Error('Sheet tab "' + sheetName + '" not found.');
    }

    var lastColumn = sheet.getLastColumn();
    if (lastColumn < 1) {
      sheet
        .getRange(1, 1, 1, expectedHeaders.length)
        .setValues([expectedHeaders]);
      lastColumn = expectedHeaders.length;
    }

    var headers = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
    var nextRow = sheet.getLastRow() + 1;

    var newRow = headers.map(function (header) {
      var name = (header || "").toString().trim();
      return name === "timestamp" ? new Date() : e.parameter[name];
    });

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    return ContentService.createTextOutput(
      JSON.stringify({ result: "success", row: nextRow })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (e) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: "error", error: e.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
