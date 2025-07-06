#!/bin/bash

echo "GitHub Repository Creator for ai-chatbot-saas"
echo "============================================"
echo ""
echo "This script will help you create a GitHub repository and push your code."
echo ""
echo "First, you need a GitHub Personal Access Token:"
echo "1. Go to: https://github.com/settings/tokens/new"
echo "2. Give it a name (e.g., 'ai-chatbot-saas-deploy')"
echo "3. Select scopes: 'repo' (all checkboxes under repo)"
echo "4. Click 'Generate token'"
echo "5. Copy the token (it starts with 'ghp_')"
echo ""
read -p "Paste your GitHub Personal Access Token: " GITHUB_TOKEN
echo ""

# Create repository using GitHub API
echo "Creating repository..."
curl -H "Authorization: token $GITHUB_TOKEN" \
     -H "Accept: application/vnd.github.v3+json" \
     https://api.github.com/user/repos \
     -d '{
       "name": "ai-chatbot-saas",
       "description": "AI Chatbot SaaS platform with Next.js, Supabase, Stripe, and Vercel AI SDK",
       "homepage": "https://ai-chatbot-saas.vercel.app",
       "private": false,
       "has_issues": true,
       "has_projects": true,
       "has_wiki": false
     }'

echo ""
echo "Repository created! Now pushing your code..."
echo ""

# Add remote and push
git remote add origin https://github.com/JayG2024/ai-chatbot-saas.git 2>/dev/null || git remote set-url origin https://github.com/JayG2024/ai-chatbot-saas.git
git branch -M main
git push -u origin main

echo ""
echo "✅ Success! Your repository is now available at:"
echo "   https://github.com/JayG2024/ai-chatbot-saas"
echo ""
echo "Next steps:"
echo "1. Go to https://vercel.com/new"
echo "2. Import your repository: JayG2024/ai-chatbot-saas"
echo "3. Deploy!"
echo ""
echo "Your demo will be available at:"
echo "- Homepage: https://ai-chatbot-saas.vercel.app"
echo "- Dashboard Demo: https://ai-chatbot-saas.vercel.app/dashboard-demo"
echo "- Chat Demo: https://ai-chatbot-saas.vercel.app/demo"