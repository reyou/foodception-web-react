# GitHub Pages Deployment

## Overview

This project is deployed to GitHub Pages using the `gh-pages` package. The deployment process is automated through GitHub Actions.

## Deployment Configuration

### package.json Configuration

```json
{
  "homepage": "https://web.foodception.com",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

### Environment Variables

Different environments use different configuration files:
- `.env.development` - Development environment
- `.env.production` - Production environment

## Deployment Process

1. **Manual Deployment**:
   ```bash
   npm run deploy
   ```
   This will:
   - Run the build process (`npm run build`)
   - Deploy to GitHub Pages (`gh-pages -d build`)

2. **Automated Deployment**:
   - Triggered by pushes to main branch
   - Managed by GitHub Actions
   - Status available at: https://github.com/reyou/foodception-web-react/actions

## Domain Configuration

1. **Custom Domain**:
   - Primary: https://web.foodception.com
   - GitHub Pages: https://reyou.github.io/foodception-web-react

2. **DNS Configuration**:
   - CNAME record pointing to GitHub Pages
   - SSL certificate managed by GitHub

## Monitoring Deployments

1. **GitHub Actions**:
   - View deployment status
   - Check build logs
   - Monitor deployment history

2. **Rollback Process**:
   - Use GitHub releases
   - Revert to previous commits if needed

## Troubleshooting

Common issues and solutions:

1. **404 Errors**:
   - Check custom domain configuration
   - Verify CNAME file exists
   - Check GitHub Pages settings

2. **Build Failures**:
   - Review GitHub Actions logs
   - Check environment variables
   - Verify dependencies

3. **Cache Issues**:
   - Clear browser cache
   - Check CDN caching
   - Verify cache headers
