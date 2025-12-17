# Google Sheets Email Registration Setup

## 1. Create the Google Sheet

1. Create a new Google Sheet.
2. Name the sheet (tab) at the bottom `blogEmails`.
3. In the first row, add headers: `timestamp` and `email`.
   - Optional: add `timesSubscibed` (or `timesSubscribed`) to count repeated attempts for the same email.
   - If you forget this and the sheet is completely empty, the script will auto-create these headers on first request.

## 2. Add the Script

1. In the Sheet, go to `Extensions` > `Apps Script`.
2. Delete any existing code in `Code.gs`.
3. Copy the content of `Code.gs` from this folder (I've updated it with your Sheet ID!) and paste it there.
4. Save the project (Ctrl+S).
5. **Important**: Ensure your sheet name (at the bottom) is exactly `blogEmails`.
6. After changing code, redeploy the web app (Apps Script web apps run a specific deployed version, not always your latest edits).

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

Tip to verify you’re hitting the right deployment:
- Open the web app URL in a browser (GET). It should return JSON like `{"result":"ok","version":"2025-12-17"}`.

## 5. Configure Website

1. Paste the Web App URL into the `scriptURL` variable in `Blogs/index.html`.

## Spam protection (recommended)

With a static website, the endpoint URL is always visible in the browser (DevTools / Network tab). Protect the endpoint with server-side checks:

- Built-in: duplicates are ignored, a hidden honeypot field is rejected, and basic per-email throttling is enabled.
- Stronger: enable Cloudflare Turnstile (captcha) verification in Apps Script:
  1. Create a Turnstile widget (get a **Site Key** + **Secret Key**):
     1. Go to `https://dash.cloudflare.com/` and sign in (or create an account).
     2. Open **Turnstile** (use the top search bar if you don't see it in the sidebar).
     3. Click **Add widget** (Cloudflare’s UI sometimes says “Add a site”, but the button is “Add widget”).
     4. **Site name**: e.g. `Codeware Blog Subscribe`.
     5. **Hostnames**: add the domains where the form will run, e.g.:
        - `codeware.be`
        - `www.codeware.be`
        - optional for local testing: `localhost`
     6. **Widget mode**: choose **Managed** (recommended).
     7. Click **Create**.
     8. Copy the **Site key** and **Secret key**.
  2. Configure Apps Script (server-side verification):
     1. Open the Apps Script project.
     2. Click **Project Settings** (gear icon).
     3. Under **Script Properties**, click **Add script property**:
        - Name: `TURNSTILE_SECRET`
        - Value: `<your Turnstile Secret key>`
     4. Save.
     5. Authorize external requests (required for Turnstile verification):
        1. In the Apps Script editor, use the function dropdown (next to **Debug**) and select `authorizeExternalRequests` (not `doPost`).
        2. Click **Run**.
        3. If you see **Authorization required**, click **Review permissions** and **Allow**.
        4. If Google shows **"Google hasn't verified this app"**, click **Advanced** > **Go to <your project> (unsafe)** > **Allow** (normal for your own Apps Script projects).
        5. If you don't see a prompt, you may already be authorized; continue with redeploy.
     6. Redeploy the web app (**Deploy > Manage deployments > Edit > New version > Deploy**).
  3. Configure the website (client-side widget):
     1. In `Blogs/index.html`, set `turnstileSiteKey` to your **Site key**.
     2. Load the Blogs page and verify the Turnstile widget appears.
     3. Submit the form; Apps Script will require `cf-turnstile-response` when `TURNSTILE_SECRET` is set.
  4. Keep secrets private:
     - Never put the **Secret key** in HTML/JS; only store it in Apps Script Script Properties.

Optional for local testing (bypass captcha):
- Set Script Property `SUBSCRIBE_BYPASS_KEY` to a long random value.
- Send `bypass_key=<that value>` from `Test-Subscription.ps1`.
