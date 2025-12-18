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

Tip to verify you're hitting the right deployment:
- Open the web app URL in a browser (GET). It should return JSON like `{"result":"ok","version":"2025-12-17.2"}`.

## 5. Configure Website

1. Paste the Web App URL into the `scriptURL` variable in `Blogs/index.html`.

## Spam protection (recommended)

With a static website, the endpoint URL is always visible in the browser (DevTools / Network tab). Protect the endpoint with server-side checks:

- Built-in (server-side):
  - **Honeypot**: requests with the hidden field `website` filled in are treated as "success" but ignored (common bot trap).
  - **Duplicate protection**: the same email is only stored once (optional `timesSubscribed` counter is incremented).
  - **Input validation**: email is normalized + validated before writing.
- Stronger: enable Cloudflare Turnstile (captcha) verification in Apps Script:
  1. Create a Turnstile widget (get a **Site Key** + **Secret Key**):
     1. Go to `https://dash.cloudflare.com/` and sign in (or create an account).
     2. Open **Turnstile** (use the top search bar if you don't see it in the sidebar).
     3. Click **Add widget** (Cloudflare's UI sometimes says "Add a site", but the button is "Add widget").
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
     2. Load `/Blogs/` and click/focus the email field to trigger loading the Turnstile script (it is lazy-loaded to keep page load fast + avoid console noise).
     3. Verify the Turnstile widget appears under the form.
     4. Submit the form; Apps Script will require `cf-turnstile-response` when `TURNSTILE_SECRET` is set.
  4. Keep secrets private:
     - Never put the **Secret key** in HTML/JS; only store it in Apps Script Script Properties.

### Extra hardening (recommended "dos")

Do these in addition to Turnstile for a simple but robust setup:

1. **Keep the honeypot field intact**
   1. In `Blogs/index.html`, keep the hidden input: `name="website"`.
   2. Keep it hidden and non-focusable (`tabindex="-1"`, `aria-hidden="true"` container).
   3. If you rename it in HTML, also update `honeypotFieldName` in `shared/email/Code.gs` to match.

2. **Add (or keep) a `timesSubscribed` column**
   1. In your Google Sheet, add a third header in row 1: `timesSubscribed` (case-insensitive).
   2. When an existing email tries to subscribe again, Apps Script increments this counter instead of adding duplicate rows.
   3. This gives you visibility into repeated attempts without growing the sheet.

3. **Use per-email throttling (rate limiting)**
   1. Open `shared/email/Code.gs` in Apps Script.
   2. Find `rateLimitSeconds` near the top.
   3. Increase it if you see abuse (e.g. 30-120 seconds). Keep it low if you want fewer false positives.
   4. Note: repeated submits for the same email within this window are treated as "success" but ignored (so bots get no signal and your sheet stays clean).
   5. Redeploy the web app after changes (**Deploy > Manage deployments > Edit > New version > Deploy**).
   6. Tip: throttling is most useful against "repeat same email" spam; Turnstile is what blocks automated/bulk spam.

4. **Verify protection end-to-end (quick checklist)**
   1. Open `/Blogs/` in an incognito/private window.
   2. Enter an email, complete the Turnstile challenge, click **Subscribe**.
   3. In DevTools > **Network**, click the POST request to your Apps Script URL and confirm the request body contains:
      - `email=...`
      - `cf-turnstile-response=...` (present when Turnstile is enabled)
   4. In Apps Script > **Executions**, verify the request completed successfully.
   5. In Google Sheets, verify the row was added (or `timesSubscribed` incremented).

5. **Common troubleshooting**
    - **Captcha never appears**: ad/tracker blockers sometimes block `challenges.cloudflare.com`. Disable blockers for your site, or test in a clean/incognito profile.
    - **"Captcha required." / "Captcha verification failed."**:
      1. Confirm `TURNSTILE_SECRET` is set in **Script Properties** (Apps Script project settings).
      2. Confirm your Turnstile widget hostnames include the domain you're testing on (`codeware.be`, `www.codeware.be`, and optionally `localhost`).
      3. Redeploy the web app after any Apps Script changes.
    - **No new rows show up**: confirm the sheet tab name is exactly `blogEmails` and row 1 contains the required headers (`timestamp`, `email`).
    - **Console warnings mentioning `normal?lang=auto` (CSP/script-src warning, preload warnings, etc.)**:
      1. In Chrome DevTools **Console**, click the `normal?lang=auto:1` link to see which resource logged it (typically `https://challenges.cloudflare.com/...`).
      2. In DevTools **Network**, filter for `normal?lang=auto`, click the request, then check **Response Headers** for `content-security-policy`.
      3. If the URL is `challenges.cloudflare.com`, it’s Cloudflare’s own CSP and you can't change it (safe to ignore if the captcha works).
      4. If you ever see the same warning for *your own* pages (your domain), it means your CSP defines `default-src` but not `script-src`; fix it where you set CSP (usually a Cloudflare response-header rule) by adding an explicit `script-src` allowlist.

Optional for local testing (bypass captcha):
1. In Apps Script, set Script Property `SUBSCRIBE_BYPASS_KEY` to a long random value.
2. Redeploy the web app (**Deploy > Manage deployments > Edit > New version > Deploy**).
3. Run a test request from the repo root:
   - `.\shared\email\Test-Subscription.ps1 -WebAppUrl "<your web app URL>" -Email "test@example.com" -BypassKey "<your bypass key>"`
4. Keep the bypass key private and rotate/remove it when you're done testing.

## Email notifications (optional)

If you want an email when a *new* subscriber is added:

Option A (no code changes): Google Sheets notifications
- In the sheet: **Tools** > **Notification settings** (or **Notification rules**).
- Choose "Any changes are made" and "Email - right away".
- Note: this can be noisy (it notifies on any sheet change, not just new subscribers).

Option B (recommended): send one email per new subscriber (Apps Script)
1. In Apps Script, set a Script Property:
   - Name: `NOTIFY_EMAIL`
   - Value: `you@domain.com` (or multiple, separated by commas)
2. Authorize the email scope:
   - In the function dropdown, run `authorizeEmailNotifications` once and click **Allow**.
3. Redeploy the web app (**Deploy > Manage deployments > Edit > New version > Deploy**).
