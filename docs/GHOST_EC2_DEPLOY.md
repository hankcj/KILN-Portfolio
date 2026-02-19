# Ghost on EC2 with Nginx and SSL

Runbook to get Ghost reachable at **https://ghost.studiokiln.io** on an Ubuntu EC2 instance.

## Prerequisites

- EC2 instance (Ubuntu 22.04 LTS) with SSH access
- DNS A record for **ghost.studiokiln.io** pointing to the instance public IP
- Security group: ports 22, 80, 443 open

---

## Quick deploy (one script)

From your machine, copy the repo to the EC2 instance (or clone it there), then on the EC2:

```bash
cd /path/to/kiln-portfolio
sudo bash deploy/ghost/deploy-on-ec2.sh
```

Optionally set `CERTBOT_EMAIL` to skip Certbot prompts:

```bash
sudo CERTBOT_EMAIL=you@example.com bash deploy/ghost/deploy-on-ec2.sh
```

When the script finishes, Ghost is live at https://ghost.studiokiln.io. Open https://ghost.studiokiln.io/ghost to create your account and get the Content API Key for Vercel.

---

## Manual steps (if you prefer)

### 1. Install Ghost (Docker)

On the EC2 instance:

```bash
# Install Docker
sudo apt update && sudo apt install -y ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update && sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Create app dir and copy docker-compose
sudo mkdir -p /opt/ghost && cd /opt/ghost
# Copy deploy/ghost/docker-compose.yml from this repo to /opt/ghost/docker-compose.yml

# Start Ghost (bound to 127.0.0.1:2368 only)
sudo docker compose up -d
```

Use the [deploy/ghost/docker-compose.yml](../deploy/ghost/docker-compose.yml) from this repo (url: `https://ghost.studiokiln.io`, port `127.0.0.1:2368:2368`, volume for content).

---

## 2. Nginx reverse proxy

```bash
sudo apt install -y nginx
# Copy deploy/ghost/nginx-ghost.studiokiln.io.conf to the server, then:
sudo cp /path/to/nginx-ghost.studiokiln.io.conf /etc/nginx/sites-available/ghost.studiokiln.io
sudo ln -sf /etc/nginx/sites-available/ghost.studiokiln.io /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

Config: server_name `ghost.studiokiln.io`, listen 80, proxy_pass to `http://127.0.0.1:2368` with Host and X-Forwarded-* headers. See [deploy/ghost/nginx-ghost.studiokiln.io.conf](../deploy/ghost/nginx-ghost.studiokiln.io.conf).

---

## 3. Let's Encrypt certificate

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d ghost.studiokiln.io
# Agree to terms, set email for renewal. Certbot updates Nginx for 443 and HTTP→HTTPS redirect.

sudo certbot renew --dry-run   # verify renewal
```

---

## 4. Ghost site URL

The Docker Compose file already sets `url: https://ghost.studiokiln.io`. If you need to change it later, edit `/opt/ghost/docker-compose.yml` (environment.url), then restart:

```bash
cd /opt/ghost && sudo docker compose restart
```

---

## 5. Restart and verify

```bash
cd /opt/ghost && sudo docker compose restart
```

- https://ghost.studiokiln.io — Ghost site
- https://ghost.studiokiln.io/ghost — Admin (create owner account on first visit)

---

## 6. KILN portfolio

In the KILN portfolio app (e.g. `.env.local`):

- `GHOST_URL=https://ghost.studiokiln.io` (no trailing slash)
- `GHOST_CONTENT_API_KEY` — from Ghost Admin → Settings → Integrations → Custom integration (Content API Key)

See [GHOST_SETUP.md](./GHOST_SETUP.md) for integration details.
