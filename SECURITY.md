# Security Guidelines for Bob Lab

## 🔒 Overview

This document outlines security best practices for the Bob Lab project, with a focus on protecting sensitive information such as API keys, credentials, and secrets.

## ⚠️ Critical: Files That Should NEVER Be Committed

The following files and patterns contain sensitive information and must **NEVER** be committed to version control:

### Environment Files
- `.env` - Contains actual API keys and secrets
- `.env.local` - Local environment overrides
- `.env.*.local` - Environment-specific local files
- Any file matching `*apikey*`, `*api-key*`, `*api_key*`

### Credentials and Keys
- `*.key` - Private keys
- `*.pem` - Certificate files
- `*.p12`, `*.pfx` - Certificate bundles
- `*.cer`, `*.crt` - Certificate files
- `credentials/` - Credentials directory
- `secrets/` - Secrets directory
- `ibmcloud-apikey.json` - IBM Cloud API key file

### IBM Cloud Specific
- `.bluemix/` - IBM Cloud CLI configuration
- `.ibmcloud/` - IBM Cloud configuration
- `watsonx-credentials.json` - Watsonx credentials
- `watsonx-apikey.json` - Watsonx API keys

## ✅ What IS Safe to Commit

- `.env.example` - Template files with placeholder values
- `SECURITY.md` - This security documentation
- `.gitignore` - Git ignore rules
- Documentation and code (without embedded secrets)

## 🛡️ Setting Up Environment Variables

### 1. Initial Setup

```bash
# Copy the example file to create your local .env
cp .env.example .env

# For React app
cd react-app
cp .env.example .env.local
```

### 2. Fill in Your Actual Values

Edit `.env` and replace placeholder values with your actual credentials:

```bash
# ❌ WRONG - Never use placeholder values
WATSONX_API_KEY=your_watsonx_api_key_here

# ✅ CORRECT - Use your actual API key
WATSONX_API_KEY=H7xuUIPl9fAg3OOsF1sWeppdGLBJrBRaSB3aQOGWCme1
```

### 3. Verify .env is Ignored

```bash
# Check if .env is tracked by git (should return nothing)
git ls-files .env

# If .env is tracked, remove it from git
git rm --cached .env
git commit -m "Remove .env from version control"
```

## 🔑 API Key Management Best Practices

### 1. Obtain API Keys Securely

- **IBM Cloud API Keys**: https://cloud.ibm.com/iam/apikeys
- **Watsonx**: Use IBM Cloud API key with Watsonx service
- **Brave Search**: https://brave.com/search/api/

### 2. Store Keys Securely

- ✅ Use `.env` files (gitignored)
- ✅ Use environment variables in deployment platforms
- ✅ Use secret management services (IBM Secrets Manager, HashiCorp Vault)
- ❌ Never hardcode in source code
- ❌ Never commit to version control
- ❌ Never share in chat, email, or screenshots

### 3. Rotate Keys Regularly

- Rotate API keys every 90 days
- Immediately rotate if compromised
- Use different keys for different environments

### 4. Use Different Keys for Different Environments

```bash
# Development
WATSONX_API_KEY=dev_key_here

# Staging
WATSONX_API_KEY=staging_key_here

# Production
WATSONX_API_KEY=prod_key_here
```

## 🚨 If You Accidentally Commit Secrets

### Immediate Actions

1. **Rotate the compromised credentials immediately**
   - Generate new API keys
   - Revoke old keys
   - Update all systems using the old keys

2. **Remove from Git History**

```bash
# For recent commits (not yet pushed)
git reset --soft HEAD~1
git restore --staged .env
git commit -m "Remove sensitive data"

# For commits already pushed (use with caution)
# This rewrites history and requires force push
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (coordinate with team first!)
git push origin --force --all
```

3. **Use BFG Repo-Cleaner for Complex Cases**

```bash
# Install BFG
brew install bfg  # macOS
# or download from https://rtyley.github.io/bfg-repo-cleaner/

# Remove .env from entire history
bfg --delete-files .env

# Clean up
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Force push
git push origin --force --all
```

## 🔍 Verifying Security

### Check for Exposed Secrets

```bash
# Check if .env is tracked
git ls-files | grep -E "\.env$|apikey|secret|credential"

# Search for potential secrets in code
grep -r "api.key\|apikey\|secret" --include="*.ts" --include="*.tsx" --include="*.js"

# Check git history for secrets (use git-secrets tool)
git secrets --scan-history
```

### Audit .gitignore

```bash
# Verify .env is in .gitignore
grep "^\.env$" .gitignore

# Test if .env would be ignored
git check-ignore -v .env
```

## 📋 Security Checklist

Before committing code, verify:

- [ ] No `.env` files are staged
- [ ] No API keys in source code
- [ ] No credentials in comments
- [ ] No secrets in configuration files
- [ ] `.env.example` uses only placeholder values
- [ ] All sensitive files are in `.gitignore`
- [ ] No hardcoded URLs with credentials
- [ ] No debug output containing secrets

## 🔐 Deployment Security

### IBM Code Engine

Use secrets and configmaps instead of environment variables:

```bash
# Create secret for API key
ibmcloud ce secret create --name watsonx-secret \
  --from-literal WATSONX_API_KEY=your_actual_key

# Reference in application
ibmcloud ce app create --name bob-lab-app \
  --env-from-secret watsonx-secret
```

### Environment Variables in CI/CD

- Use GitHub Secrets, GitLab CI/CD variables, or similar
- Never log environment variables in CI/CD output
- Use masked variables when possible

## 📚 Additional Resources

- [IBM Cloud Security Best Practices](https://cloud.ibm.com/docs/security)
- [OWASP API Security Top 10](https://owasp.org/www-project-api-security/)
- [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning)
- [Git-secrets Tool](https://github.com/awslabs/git-secrets)

## 🆘 Reporting Security Issues

If you discover a security vulnerability:

1. **DO NOT** create a public GitHub issue
2. Email the maintainers directly
3. Include detailed information about the vulnerability
4. Allow time for the issue to be addressed before public disclosure

## 📝 Updates to This Document

This security guide should be reviewed and updated:
- When new sensitive data types are introduced
- When deployment practices change
- At least quarterly
- After any security incident

---

**Last Updated**: 2026-03-28  
**Version**: 1.0.0