var sheetName = "blogEmails";
var sheetId = "1nAY9rheJyAmVnkw38GKHrDtubg4Atcbz6vpbAAbQCQo";
var apiVersion = "2025-12-17.2";
var expectedHeaders = ["timestamp", "email"];
var emailFieldName = "email";
var timesSubscribedHeaderCandidates = ["timessubscribed", "timessubscibed"];
var honeypotFieldName = "website";
var turnstileResponseFieldName = "cf-turnstile-response";
var turnstileSecretPropertyName = "TURNSTILE_SECRET";
var bypassKeyFieldName = "bypass_key";
var bypassKeyPropertyName = "SUBSCRIBE_BYPASS_KEY";
var rateLimitSeconds = 15;
var notifyEmailPropertyName = "NOTIFY_EMAIL";

function doGet() {
  return jsonOutput({ result: "ok" });
}

function authorizeExternalRequests() {
  var response = UrlFetchApp.fetch("https://example.com", {
    muteHttpExceptions: true,
  });
  Logger.log("authorizeExternalRequests status: " + response.getResponseCode());
  return response.getResponseCode();
}

function authorizeEmailNotifications() {
  var recipients = getNotificationRecipients();
  if (!recipients) {
    throw new Error(
      "Set Script Property " + notifyEmailPropertyName + " first."
    );
  }

  MailApp.sendEmail(
    recipients,
    "[BlogEmails] Notifications enabled",
    "Test email: subscription notifications are enabled for this Apps Script project.\n\nVersion: " +
      apiVersion
  );
  return true;
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  var gotLock = false;

  try {
    var params = (e && e.parameter) ? e.parameter : {};
    if (isHoneypotTripped(params)) {
      return jsonOutput({ result: "success" });
    }

    var email = normalizeEmail(params[emailFieldName]);
    if (!email) {
      throw new Error('Missing "' + emailFieldName + '".');
    }

    if (!isValidEmail(email)) {
      throw new Error("Invalid email address.");
    }

    if (isRateLimited(email)) {
      return jsonOutput({ result: "success" });
    }

    enforceTurnstileIfConfigured(params);

    gotLock = lock.tryLock(10000);
    if (!gotLock) {
      throw new Error("Service is busy. Please try again.");
    }

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
    var normalizedHeaders = headers.map(normalizeKey);

    expectedHeaders.forEach(function (requiredHeader) {
      if (normalizedHeaders.indexOf(requiredHeader) === -1) {
        throw new Error(
          'Missing required header "' + requiredHeader + '" in row 1.'
        );
      }
    });

    var emailColumnIndex = normalizedHeaders.indexOf(emailFieldName) + 1;
    var lastRow = sheet.getLastRow();
    var timesSubscribedColumnIndex = getOptionalColumnIndex(
      normalizedHeaders,
      timesSubscribedHeaderCandidates
    );
    if (emailColumnIndex > 0 && lastRow >= 2) {
      var emails = sheet
        .getRange(2, emailColumnIndex, lastRow - 1, 1)
        .getDisplayValues();

      for (var i = 0; i < emails.length; i++) {
        if (normalizeEmail(emails[i][0]) === email) {
          incrementTimesSubscribed(
            sheet,
            2 + i,
            timesSubscribedColumnIndex
          );
          markRateLimit(email);
          return jsonOutput({ result: "success" });
        }
      }
    }

    var nextRow = lastRow + 1;
    var normalizedParams = normalizeParameterKeys(params);

    var newRow = headers.map(function (header) {
      var name = normalizeKey(header);
      if (name === "timestamp") return new Date();
      if (name === emailFieldName) return email;
      if (isTimesSubscribedHeader(name)) return 1;
      return normalizedParams[name] || "";
    });

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    notifyNewSubscriptionIfConfigured(email, nextRow, doc);

    markRateLimit(email);
    return jsonOutput({ result: "success", row: nextRow });
  } catch (e) {
    return jsonOutput({ result: "error", error: e.toString() });
  } finally {
    if (gotLock) {
      lock.releaseLock();
    }
  }
}

function jsonOutput(payload) {
  if (!payload) payload = {};
  payload.version = apiVersion;
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function normalizeKey(value) {
  return (value || "").toString().trim().toLowerCase();
}

function normalizeEmail(value) {
  return (value || "").toString().trim().toLowerCase();
}

function isTimesSubscribedHeader(name) {
  return timesSubscribedHeaderCandidates.indexOf(name) !== -1;
}

function getOptionalColumnIndex(normalizedHeaders, candidates) {
  for (var i = 0; i < candidates.length; i++) {
    var idx = normalizedHeaders.indexOf(candidates[i]);
    if (idx !== -1) return idx + 1;
  }
  return -1;
}

function incrementTimesSubscribed(sheet, rowNumber, columnIndex) {
  if (columnIndex < 1) return;

  var cell = sheet.getRange(rowNumber, columnIndex);
  var currentValue = cell.getValue();
  var current = parseInt(currentValue, 10);
  if (!current || current < 1) current = 1;
  cell.setValue(current + 1);
}

function getNotificationRecipients() {
  var value = PropertiesService.getScriptProperties().getProperty(
    notifyEmailPropertyName
  );
  return (value || "")
    .split(/[;,]+/)
    .map(function (part) {
      return part.toString().trim();
    })
    .filter(function (part) {
      return part.length > 0;
    })
    .join(",");
}

function notifyNewSubscriptionIfConfigured(email, rowNumber, spreadsheet) {
  var recipients = getNotificationRecipients();
  if (!recipients) return;

  var sheetUrl = spreadsheet ? spreadsheet.getUrl() : "";
  var subject = "[BlogEmails] New subscriber: " + email;
  var body =
    "A new email subscribed to blog updates.\n\n" +
    "Email: " +
    email +
    "\nRow: " +
    rowNumber +
    "\nSheet: " +
    sheetUrl +
    "\nVersion: " +
    apiVersion;

  try {
    MailApp.sendEmail(recipients, subject, body);
  } catch (e) {
    Logger.log("Notification email failed: " + e);
  }
}

function normalizeParameterKeys(params) {
  var normalized = {};
  Object.keys(params || {}).forEach(function (key) {
    normalized[normalizeKey(key)] = params[key];
  });
  return normalized;
}

function isValidEmail(email) {
  if (!email) return false;
  if (email.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email);
}

function isHoneypotTripped(params) {
  var value = (params && params[honeypotFieldName]) ? params[honeypotFieldName] : "";
  return value && value.toString().trim().length > 0;
}

function isRateLimited(email) {
  var cache = CacheService.getScriptCache();
  var key = "subscribe:" + hashForCacheKey(email);
  return !!cache.get(key);
}

function markRateLimit(email) {
  var cache = CacheService.getScriptCache();
  var key = "subscribe:" + hashForCacheKey(email);
  cache.put(key, "1", rateLimitSeconds);
}

function hashForCacheKey(value) {
  var digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, value);
  return Utilities.base64EncodeWebSafe(digest).replace(/=+$/, "");
}

function enforceTurnstileIfConfigured(params) {
  var secret = PropertiesService.getScriptProperties().getProperty(
    turnstileSecretPropertyName
  );
  if (!secret) return;

  var bypassKey = PropertiesService.getScriptProperties().getProperty(
    bypassKeyPropertyName
  );
  var providedBypassKey = (params && params[bypassKeyFieldName]) ? params[bypassKeyFieldName].toString() : "";
  if (bypassKey && providedBypassKey === bypassKey) return;

  var token = (params && params[turnstileResponseFieldName]) ? params[turnstileResponseFieldName].toString().trim() : "";
  if (!token) {
    throw new Error("Captcha required.");
  }

  if (!verifyTurnstile(token, secret)) {
    throw new Error("Captcha verification failed.");
  }
}

function verifyTurnstile(token, secret) {
  var response = UrlFetchApp.fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "post",
      payload: { secret: secret, response: token },
      muteHttpExceptions: true,
    }
  );

  var text = response.getContentText() || "{}";
  var data = JSON.parse(text);
  return data && data.success === true;
}
