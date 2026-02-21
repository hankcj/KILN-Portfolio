#!/usr/bin/env bash
# Ghost webhook bridge on EC2 (run on the same instance as Ghost)
# Run from repo root: sudo bash deploy/ghost-webhook-bridge/deploy-on-ec2.sh
# Prereqs: Ghost already deployed at ghost.studiokiln.io; Nginx and SSL in place.
# Before or after: create /opt/ghost-webhook-bridge/.env from .env.example with real secrets.

set -e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

echo "[1/5] Installing Node.js (if missing)..."
command -v node >/dev/null 2>&1 || {
  apt-get update -qq
  apt-get install -y -qq nodejs npm >/dev/null || true
}
command -v node >/dev/null 2>&1 || {
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y -qq nodejs >/dev/null
}

echo "[2/5] Installing bridge at /opt/ghost-webhook-bridge..."
mkdir -p /opt/ghost-webhook-bridge
cp "$SCRIPT_DIR/server.js" "$SCRIPT_DIR/package.json" /opt/ghost-webhook-bridge/
if [ ! -f /opt/ghost-webhook-bridge/.env ]; then
  cp "$SCRIPT_DIR/.env.example" /opt/ghost-webhook-bridge/.env
  echo "  Created /opt/ghost-webhook-bridge/.env from .env.example — edit with your secrets."
fi
chown -R www-data:www-data /opt/ghost-webhook-bridge
cd /opt/ghost-webhook-bridge
sudo -u www-data npm install --production

echo "[3/5] Adding Nginx webhook location..."
mkdir -p /etc/nginx/snippets
cp "$SCRIPT_DIR/nginx-snippet-location-only.conf" /etc/nginx/snippets/ghost-webhook-bridge.conf
GHOST_CONF="/etc/nginx/sites-available/ghost.studiokiln.io"
if [ -f "$GHOST_CONF" ] && ! grep -q "ghost-webhook-bridge" "$GHOST_CONF"; then
  sed -i '/server_name ghost.studiokiln.io;/a\    include /etc/nginx/snippets/ghost-webhook-bridge.conf;' "$GHOST_CONF"
  echo "  Added include to $GHOST_CONF"
elif [ ! -f "$GHOST_CONF" ]; then
  echo "  Warning: $GHOST_CONF not found. Add the location /webhook/ block from nginx-snippet.conf to your Ghost server block."
fi

echo "[4/5] Installing systemd service..."
cp "$SCRIPT_DIR/ghost-webhook-bridge.service" /etc/systemd/system/
systemctl daemon-reload
systemctl enable ghost-webhook-bridge
systemctl start ghost-webhook-bridge

echo "[5/5] Reloading Nginx..."
nginx -t && systemctl reload nginx

echo ""
echo "Ghost webhook bridge is running."
echo "  Health: curl http://127.0.0.1:3001/health"
echo "  Ensure .env has GHOST_WEBHOOK_SECRET, LISTMONK_URL, LISTMONK_API_USER, LISTMONK_API_TOKEN, LISTMONK_LIST_ID, SIGNAL_BASE_URL."
echo "  Ghost webhook URL: https://ghost.studiokiln.io/webhook/post-published"
