#!/usr/bin/env bash
# Listmonk on EC2: one-shot setup for https://listmonk.studiokiln.io
# Run on Ubuntu 22.04 EC2 with: sudo bash deploy/listmonk/deploy-on-ec2.sh
# Optional: CERTBOT_EMAIL=you@example.com to skip certbot prompts.
# Optional first run: LISTMONK_ADMIN_USER=admin LISTMONK_ADMIN_PASSWORD=changeme
# Prereqs: DNS A record listmonk.studiokiln.io -> this instance; ports 22,80,443 open.

set -e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "[1/6] Installing Docker and Docker Compose plugin (if missing)..."
command -v docker >/dev/null 2>&1 || {
  apt-get update -qq
  apt-get install -y -qq ca-certificates curl gnupg > /dev/null
  install -m 0755 -d /etc/apt/keyrings
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
  chmod a+r /etc/apt/keyrings/docker.gpg
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
  apt-get update -qq
  apt-get install -y -qq docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin > /dev/null
}

echo "[2/6] Starting Listmonk in Docker..."
mkdir -p /opt/listmonk
cp "$SCRIPT_DIR/docker-compose.yml" /opt/listmonk/docker-compose.yml
cd /opt/listmonk
docker compose up -d

echo "[3/6] Installing Nginx (if missing)..."
command -v nginx >/dev/null 2>&1 || apt-get install -y -qq nginx > /dev/null

echo "[4/6] Adding Nginx server block for listmonk.studiokiln.io..."
cp "$SCRIPT_DIR/nginx-listmonk.studiokiln.io.conf" /etc/nginx/sites-available/listmonk.studiokiln.io
ln -sf /etc/nginx/sites-available/listmonk.studiokiln.io /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx

echo "[5/6] Installing Certbot and obtaining SSL certificate (if missing)..."
command -v certbot >/dev/null 2>&1 || apt-get install -y -qq certbot python3-certbot-nginx > /dev/null
if [ -n "$CERTBOT_EMAIL" ]; then
  certbot --nginx -d listmonk.studiokiln.io --non-interactive --agree-tos --email "$CERTBOT_EMAIL" 2>/dev/null || true
else
  certbot --nginx -d listmonk.studiokiln.io 2>/dev/null || true
fi

echo "[6/6] Restarting Listmonk..."
cd /opt/listmonk && docker compose restart

echo ""
echo "Listmonk is live."
echo "  App:   https://listmonk.studiokiln.io"
echo "  Login: https://listmonk.studiokiln.io/login (create admin on first visit if LISTMONK_ADMIN_* not set)"
echo ""
echo "Next: create a list (e.g. Signal), configure SMTP in Settings, create API user for listmonk-rss."
echo "Add to site env: NEXT_PUBLIC_LISTMONK_SUBSCRIBE_URL=https://listmonk.studiokiln.io/subscription/form"
echo "Or use Listmonk's public subscribe form URL for the subscribe link on the site."
