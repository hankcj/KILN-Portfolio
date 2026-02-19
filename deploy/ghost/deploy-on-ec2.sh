#!/usr/bin/env bash
# Ghost on EC2: one-shot setup for https://ghost.studiokiln.io
# Run on Ubuntu 22.04 EC2 with: sudo bash deploy/ghost/deploy-on-ec2.sh
# Optional: CERTBOT_EMAIL=you@example.com to skip certbot prompts.
# Prereqs: DNS A record ghost.studiokiln.io -> this instance; ports 22,80,443 open.

set -e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

echo "[1/6] Installing Docker and Docker Compose plugin..."
apt-get update -qq
apt-get install -y -qq ca-certificates curl gnupg > /dev/null
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt-get update -qq
apt-get install -y -qq docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin > /dev/null

echo "[2/6] Starting Ghost in Docker..."
mkdir -p /opt/ghost
cp "$SCRIPT_DIR/docker-compose.yml" /opt/ghost/docker-compose.yml
cd /opt/ghost
docker compose up -d

echo "[3/6] Installing Nginx..."
apt-get install -y -qq nginx > /dev/null

echo "[4/6] Adding Nginx server block for ghost.studiokiln.io..."
cp "$SCRIPT_DIR/nginx-ghost.studiokiln.io.conf" /etc/nginx/sites-available/ghost.studiokiln.io
rm -f /etc/nginx/sites-enabled/default
ln -sf /etc/nginx/sites-available/ghost.studiokiln.io /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx

echo "[5/6] Installing Certbot and obtaining SSL certificate..."
apt-get install -y -qq certbot python3-certbot-nginx > /dev/null
if [ -n "$CERTBOT_EMAIL" ]; then
  certbot --nginx -d ghost.studiokiln.io --non-interactive --agree-tos --email "$CERTBOT_EMAIL"
else
  certbot --nginx -d ghost.studiokiln.io
fi

echo "[6/6] Restarting Ghost..."
cd /opt/ghost && docker compose restart

echo ""
echo "Ghost is live."
echo "  Site:  https://ghost.studiokiln.io"
echo "  Admin: https://ghost.studiokiln.io/ghost"
echo ""
echo "Next: open the Admin URL, create your owner account (if first time), then"
echo "Settings -> Integrations -> Add custom integration -> copy the Content API Key."
echo "Add to Vercel (or .env.local): GHOST_URL=https://ghost.studiokiln.io and GHOST_CONTENT_API_KEY=<key>"
