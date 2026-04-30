#!/bin/bash
# ============================================================
# Pawmeals Backend — EC2 Deployment Script
# Deploys to port 3001, isolated from existing processes
# Usage: ./scripts/deploy-ec2.sh
# ============================================================

set -e

EC2_USER="ubuntu"
EC2_HOST="13.229.189.141"
PEM_KEY="$HOME/.ssh/agnosticdata.pem"
APP_DIR="/home/ubuntu/pawmeals-backend"
APP_NAME="pawmeals-backend"
PORT=3001

echo "🚀 Deploying Pawmeals Backend to EC2..."
echo "   Host: $EC2_HOST"
echo "   Port: $PORT"
echo "   App:  $APP_DIR"
echo ""

# Step 1: Package the backend
echo "📦 Packaging backend..."
cd "$(dirname "$0")/.."
tar -czf /tmp/pawmeals-backend.tar.gz \
  --exclude='backend/node_modules' \
  --exclude='backend/dist' \
  --exclude='backend/.env' \
  backend/

# Step 2: Upload to EC2
echo "📤 Uploading to EC2..."
scp -i "$PEM_KEY" -o StrictHostKeyChecking=no \
  /tmp/pawmeals-backend.tar.gz \
  "$EC2_USER@$EC2_HOST:/tmp/pawmeals-backend.tar.gz"

# Step 3: Deploy on EC2
echo "⚙️  Installing and starting on EC2..."
ssh -i "$PEM_KEY" -o StrictHostKeyChecking=no "$EC2_USER@$EC2_HOST" << 'REMOTE'
set -e

APP_DIR="/home/ubuntu/pawmeals-backend"
APP_NAME="pawmeals-backend"

# Extract
mkdir -p "$APP_DIR"
tar -xzf /tmp/pawmeals-backend.tar.gz -C "$APP_DIR" --strip-components=1
rm /tmp/pawmeals-backend.tar.gz

cd "$APP_DIR"

# Install dependencies
echo "📦 Installing Node.js dependencies..."
npm install --production

# Build TypeScript
echo "🔨 Building TypeScript..."
npm run build

# Run DB migration
if [ -f ".env" ]; then
  echo "🗄️  Running database migration..."
  npm run db:migrate || echo "⚠️  Migration skipped (check credentials)"
fi

# Start/restart with PM2
if pm2 describe "$APP_NAME" > /dev/null 2>&1; then
  echo "🔄 Restarting existing PM2 process..."
  pm2 restart "$APP_NAME"
else
  echo "▶️  Starting new PM2 process..."
  pm2 start dist/index.js \
    --name "$APP_NAME" \
    --max-memory-restart 512M \
    --restart-delay 3000 \
    --log /home/ubuntu/.pm2/logs/pawmeals-backend.log
fi

pm2 save
echo "✅ Pawmeals backend deployed on port 3001"
pm2 status "$APP_NAME"
REMOTE

echo ""
echo "✅ Deployment complete!"
echo "   Backend API: http://$EC2_HOST:3001"
echo "   Health check: http://$EC2_HOST:3001/api/health"
echo ""
echo "📋 Next steps:"
echo "   1. SSH into EC2 and create /home/ubuntu/pawmeals-backend/.env"
echo "      (see backend/.env.example for all required variables)"
echo "   2. Run: pm2 restart pawmeals-backend"
echo "   3. Configure nginx to proxy your domain to port 3001"
