# KILN Shop Setup Guide

Complete setup instructions for the Stripe-powered shop with AWS SES email delivery and S3 downloads.

---

## What Was Implemented

### Automatic (Code)
- ✅ Stripe SDK integration
- ✅ Product fetching from Stripe API
- ✅ Checkout session creation
- ✅ AWS SES email templates (brutalist design)
- ✅ S3 signed URL generation (7-day expiry)
- ✅ Webhook handler for post-purchase emails
- ✅ Shop UI (grid, product detail, success/cancel pages)

### Manual (You)
- ⬜ AWS SES verification
- ⬜ S3 bucket setup
- ⬜ Stripe webhook endpoint
- ⬜ Environment variables
- ⬜ Product file uploads
- ⬜ Stripe product configuration

---

## Step 1: AWS SES Setup

### 1.1 Verify Sender Email

1. Go to AWS Console → SES → Configuration → Verified identities
2. Click "Create identity"
3. Choose "Email address"
4. Enter: `hello@kiln.studio`
5. Check email and click verification link
6. Wait for status: "Verified"

### 1.2 Request Production Access (if not already)

If your SES account is in "Sandbox" mode:

1. AWS Console → SES → Configuration → Sending limits
2. Click "Request production access"
3. Fill out form:
   - **Use case**: "Transactional emails for digital product purchases"
   - **Website**: `https://kiln.studio`
   - **Opt-in**: Customers purchase products and receive download links
4. Wait 24-48 hours for approval

**Sandbox limitation**: Can only send to verified emails until approved.

---

## Step 2: S3 Bucket Setup

### 2.1 Create Bucket

1. AWS Console → S3 → Create bucket
2. **Bucket name**: `kiln-products` (or your preferred name)
3. **Region**: Same as your other AWS services (us-east-1 recommended)
4. **Block Public Access**: KEEP BLOCKED (we use signed URLs)
5. Enable versioning (optional but recommended)
6. Create bucket

### 2.2 Bucket Policy

Go to Permissions → Bucket Policy. Replace with:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowGetObject",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::YOUR_ACCOUNT_ID:user/YOUR_IAM_USER"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::kiln-products/*"
    }
  ]
}
```

### 2.3 CORS Configuration (for direct downloads)

Go to Permissions → CORS:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET"],
    "AllowedOrigins": ["https://kiln.studio"],
    "ExposeHeaders": ["Content-Disposition"],
    "MaxAgeSeconds": 3000
  }
]
```

---

## Step 3: IAM Permissions

Your AWS credentials need these permissions:

### SES
```json
{
  "Effect": "Allow",
  "Action": [
    "ses:SendEmail",
    "ses:SendRawEmail"
  ],
  "Resource": "*"
}
```

### S3
```json
{
  "Effect": "Allow",
  "Action": [
    "s3:GetObject",
    "s3:HeadObject"
  ],
  "Resource": "arn:aws:s3:::kiln-products/*"
}
```

---

## Step 4: Stripe Webhook Setup

### 4.1 Get Webhook Secret

1. Stripe Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. **Endpoint URL**: `https://kiln.studio/api/webhooks/stripe`
4. **Events to listen to**:
   - `checkout.session.completed` (required)
   - `checkout.session.expired` (optional)
   - `invoice.payment_succeeded` (optional, for subscriptions)
5. Click "Add endpoint"
6. Click endpoint name → Reveal "Signing secret"
7. Copy `whsec_...` value

### 4.2 Test Webhook Locally (optional)

Use Stripe CLI for local testing:

```bash
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

---

## Step 5: Environment Variables

Add to `.env.local`:

```bash
# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# AWS (same credentials you use for SES/S3)
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=us-east-1

# S3
PRODUCTS_BUCKET_NAME=kiln-products

# Email
FROM_EMAIL=hello@kiln.studio
FROM_NAME=KILN

# Site
NEXT_PUBLIC_SITE_URL=https://kiln.studio
```

**Security note**: Never commit `.env.local` to git.

---

## Step 6: Upload Product Files

### 6.1 File Structure

Upload to S3 with this structure:

```
s3://kiln-products/
├── prod-001/
│   └── design-system-starter.zip
├── prod-002/
│   └── motion-toolkit.zip
├── prod-003/
│   └── publishing-pipeline.zip
└── ...
```

### 6.2 Update Product Map

Edit `src/lib/downloads.ts`:

```typescript
const PRODUCT_FILE_MAP: Record<string, string> = {
  'PROD.001': 'prod-001/design-system-starter.zip',
  'PROD.002': 'prod-002/motion-toolkit.zip',
  // Add your products here
};
```

**Alternative**: Use Stripe metadata (see Step 7).

---

## Step 7: Stripe Product Configuration

### 7.1 Create Product

1. Stripe Dashboard → Products → Add product
2. **Name**: Design System Starter
3. **Description**: A complete component architecture...
4. **Image**: Upload preview image (shown on shop)

### 7.2 Add Metadata

In product metadata (key-value pairs):

| Key | Value | Used For |
|-----|-------|----------|
| `code` | `PROD.001` | Display, file mapping |
| `category` | `template` | Display |
| `includes` | `Figma library, React components, Docs` | Product page |
| `file_size` | `24MB` | Display |
| `file_format` | `ZIP` | Display |
| `version` | `1.0.0` | Display |
| `status` | `available` | availability/coming_soon/archived |
| `s3_path` | `prod-001/design-system-starter.zip` | Download link (optional) |

### 7.3 Create Price

1. Click "Add pricing"
2. **Pricing model**: Standard pricing
3. **Price**: $79.00 → Enter as `7900` (cents)
4. **Currency**: USD
5. Save

The **Price ID** (looks like `price_1ABC...`) is what the shop uses.

---

## Step 8: Testing

### 8.1 Test Email

Create a test API route temporarily:

```typescript
// src/app/api/test-email/route.ts
import { sendTestEmail } from '@/lib/email';

export async function POST() {
  await sendTestEmail('your-email@example.com');
  return Response.json({ sent: true });
}
```

Call it and verify you receive the email.

### 8.2 Test Purchase Flow

1. Create a test product in Stripe (use Test Mode)
2. Set price to $0.50 (minimum)
3. Use Stripe test card: `4242 4242 4242 4242`
4. Any future date, any CVC, any ZIP
5. Complete purchase
6. Check webhook logs in Stripe Dashboard
7. Check email for download link
8. Click download link, verify file downloads

---

## Troubleshooting

### Email not sending

**Check**: SES identity verified?
```bash
aws ses get-identity-verification-attributes \
  --identities hello@kiln.studio
```

**Check**: IAM permissions?
```bash
aws sts get-caller-identity  # Verify credentials work
```

### Download link not working

**Check**: S3 file exists?
```bash
aws s3 ls s3://kiln-products/prod-001/
```

**Check**: IAM can access S3?
```bash
aws s3api head-object \
  --bucket kiln-products \
  --key prod-001/design-system-starter.zip
```

### Webhook not firing

**Check**: Webhook endpoint shows green check in Stripe?

**Check**: Logs in Vercel?
```
Vercel Dashboard → Project → Functions → api/webhooks/stripe
```

**Check**: Webhook secret correct? (Must match exactly)

---

## Architecture Summary

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Customer  │────▶│  /shop page  │────▶│   Stripe    │
│             │     │  (Products)  │     │   Checkout  │
└─────────────┘     └──────────────┘     └──────┬──────┘
                                                │
                         ┌──────────────────────┘
                         │ Webhook
                         ▼
              ┌─────────────────────┐
              │  /api/webhooks/     │
              │  stripe             │
              └──────────┬──────────┘
                         │
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
    ┌──────────┐   ┌──────────┐   ┌──────────┐
    │ AWS SES  │   │   S3     │   │  Stripe  │
    │  Email   │   │ Download │   │ Receipt  │
    └──────────┘   └──────────┘   └──────────┘
```

---

## Post-Launch Checklist

- [ ] Verify SES production access approved
- [ ] Test purchase with real card ($1 test product)
- [ ] Verify email delivers to inbox (not spam)
- [ ] Test download link on mobile
- [ ] Check link expiration after 7 days
- [ ] Document refund process
- [ ] Set up monitoring (failed webhooks, bounced emails)

---

## Questions?

**AWS SES**: Check SES Dashboard → Sending statistics
**Stripe**: Check Dashboard → Developers → Webhooks → Logs
**S3**: Check S3 Console → Monitor → Metrics

For issues, check Vercel function logs first:
```
Vercel Dashboard → Project → Functions → api/webhooks/stripe
```
