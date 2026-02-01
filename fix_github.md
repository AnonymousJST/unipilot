# How to Fix "Permission Denied" on GitHub

The error `Permission to AnonymousJST/unipilot.git denied to jasonstyt-beep` means:

1.  **Repo Owner:** `AnonymousJST` (The account where we created the repo).
2.  **Your Terminal User:** `jasonstyt-beep` (The account your computer is logged into).

Even if the repo is **Public**, `jasonstyt-beep` cannot **push** code (edit it) unless you explicitly invite them.

## The Fix (Project Settings)

1.  **Go to your Repository Settings:**
    [https://github.com/AnonymousJST/unipilot/settings/access](https://github.com/AnonymousJST/unipilot/settings/access)

2.  **Click "Add people"** (Green button).

3.  **Search for:** `jasonstyt-beep`
    (This is the username from your error message).

4.  **Select them and click "Add jasonstyt-beep to this repository".**

5.  **🚨 CRITICAL STEP 🚨**
    - `jasonstyt-beep` will receive an email (or a notification on GitHub if they log in).
    - You MUST **accept the invitation** logged in as `jasonstyt-beep`.
    - _Tip:_ If you can't find the email, create a new browser window (Incognito), log in as `jasonstyt-beep`, and go to the repo page. You should see a banner to accept the invite.

6.  **Try Pushing Again:**
    Once the invite is accepted, run this in your terminal:
    ```bash
    git push -u origin master
    ```
