#!/bin/bash

echo "==================================="
echo "Quick Deploy to GitHub & Vercel"
echo "==================================="
echo ""
echo "This will push your code to GitHub."
echo ""

# Check if remote already exists
if git remote | grep -q "origin"; then
    echo "Remote 'origin' already exists. Updating URL..."
    git remote set-url origin https://github.com/JayG2024/ai-chatbot-saas.git
else
    echo "Adding GitHub remote..."
    git remote add origin https://github.com/JayG2024/ai-chatbot-saas.git
fi

echo ""
echo "Before pushing, you need to create the repository on GitHub:"
echo ""
echo "1. Open this link in your browser:"
echo "   👉 https://github.com/new"
echo ""
echo "2. Create a new repository with these settings:"
echo "   - Repository name: ai-chatbot-saas"
echo "   - Description: AI Chatbot SaaS platform with Next.js, Supabase, Stripe, and Vercel AI SDK"
echo "   - Public (not Private)"
echo "   - DON'T initialize with README"
echo ""
echo "3. Click 'Create repository'"
echo ""
read -p "Press Enter after you've created the repository on GitHub..."

echo ""
echo "Pushing your code to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Success! Your code is now on GitHub!"
    echo ""
    echo "📦 Repository: https://github.com/JayG2024/ai-chatbot-saas"
    echo ""
    echo "🚀 Next step: Deploy to Vercel"
    echo ""
    echo "1. Go to: https://vercel.com/new"
    echo "2. Click 'Import Git Repository'"
    echo "3. Select 'ai-chatbot-saas'"
    echo "4. Click 'Deploy'"
    echo ""
    echo "🎉 Your app will be live at:"
    echo "   - Main: https://ai-chatbot-saas.vercel.app"
    echo "   - Dashboard: https://ai-chatbot-saas.vercel.app/dashboard-demo"
    echo "   - Chat: https://ai-chatbot-saas.vercel.app/demo"
else
    echo ""
    echo "❌ Push failed. Make sure you:"
    echo "1. Created the repository on GitHub"
    echo "2. Have the correct permissions"
    echo ""
    echo "If you need to authenticate, run:"
    echo "git push -u origin main"
    echo "(It will prompt for your GitHub username and password/token)"
fi