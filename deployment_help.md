# GitHub Deployment Troubleshooting

If you see `remote: Repository not found`, it usually means your terminal doesn't have permission to see the **private** repository we just created.

## Option 1: Authenticate with GitHub CLI (Easiest)

If you have `gh` installed:

```bash
gh auth login
```

Follow the steps to login via browser.

## Option 2: Use a Personal Access Token (PAT)

1. Go to [GitHub Settings > Developer Settings > Personal Access Tokens](https://github.com/settings/tokens).
2. Generate a new token (Classic) with `repo` scope.
3. Copy the token.
4. Update your remote URL to include the token:

```bash
git remote set-url origin https://<YOUR_TOKEN>@github.com/AnonymousJST/unipilot.git
```

## Option 3: Check Current User

Check who you are logged in as:

```bash
git config user.name
git config user.email
```

Ensure this matches the account `AnonymousJST`.
