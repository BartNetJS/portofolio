# Google Sheets Email Registration Setup

## 1. Create the Google Sheet

1. Create a new Google Sheet.
2. Name the sheet (tab) at the bottom `blogEmails`.
3. In the first row (A1, B1), add headers: `timestamp` and `email`.
   - If you forget this and the sheet is completely empty, the script will auto-create these headers on first request.

## 2. Add the Script

1. In the Sheet, go to `Extensions` > `Apps Script`.
2. Delete any existing code in `Code.gs`.
3. Copy the content of `Code.gs` from this folder (I've updated it with your Sheet ID!) and paste it there.
4. Save the project (Ctrl+S).
5. **Important**: Ensure your sheet name (at the bottom) is exactly `blogEmails`.

## 3. Deploy

1. Click **Deploy** > **New deployment**.
2. Select type: **Web app**.
3. Configuration:
   - **Description**: Email Registration
   - **Execute as**: Me (your email)
   - **Who has access**: **Anyone** (Important!)
4. Click **Deploy**.
5. **Authorization**:
   - You will be asked to authorize access.
   - Google will show a warning: **"This app hasn't been verified"**.
   - This is normal (because you just wrote it).
   - Click **Advanced** (small link).
   - Click **Go to ... (unsafe)** at the bottom.
   - Click **Allow**.
6. Copy the **Web App URL**.

## 5. Configure Website

1. Paste the Web App URL into the `scriptURL` variable in `Blogs/index.html`.
