/**
 * AWS SES Email Integration
 * 
 * Sends transactional emails for purchase confirmations with download links.
 * Brutalist aesthetic matching KILN site design.
 */

import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const sesClient = new SESClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

interface PurchaseEmailParams {
  to: string;
  customerName?: string;
  productName: string;
  productCode: string;
  downloadUrl: string;
  orderId: string;
  amount: number;
  currency: string;
}

// Format price for display
function formatPrice(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

// Plain text email template
function createPlainTextEmail(params: PurchaseEmailParams): string {
  return `KILN — PURCHASE CONFIRMED

Order: ${params.orderId}
Product: ${params.productName} (${params.productCode})
Amount: ${formatPrice(params.amount, params.currency)}
Status: PAYMENT CONFIRMED

DOWNLOAD
Your purchase is ready: ${params.downloadUrl}

This link expires in 7 days. Re-downloads are available anytime by contacting support.

WHAT'S INCLUDED
${params.productName} ships with documentation on how it was made and why. If something is unclear, reply to this email.

SUPPORT
Questions: hello@kiln.studio
Receipt: Available in your Stripe confirmation email

—
KILN
https://kiln.studio

This email was sent because you completed a purchase at kiln.studio.
`;
}

// HTML email template (brutalist aesthetic)
function createHtmlEmail(params: PurchaseEmailParams): string {
  const formattedPrice = formatPrice(params.amount, params.currency);
  
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Purchase Confirmed — KILN</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #13161F;
      color: #FAF6F0;
      font-family: 'SF Mono', Monaco, Inconsolata, 'Fira Code', monospace;
      font-size: 14px;
      line-height: 1.6;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 48px 24px;
    }
    .header {
      border-bottom: 1px solid rgba(250, 246, 240, 0.15);
      padding-bottom: 24px;
      margin-bottom: 32px;
    }
    .logo {
      font-family: 'Averia Serif Libre', Georgia, serif;
      font-size: 32px;
      color: #FAF6F0;
      margin: 0 0 8px 0;
      letter-spacing: -0.02em;
    }
    .status {
      font-size: 12px;
      color: #0036D8;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
    .section {
      margin-bottom: 32px;
    }
    .label {
      font-size: 11px;
      color: #8A8580;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 8px;
    }
    .value {
      color: #E8E4DE;
      margin: 0;
    }
    .product-name {
      font-family: 'Averia Serif Libre', Georgia, serif;
      font-size: 24px;
      color: #FAF6F0;
      margin: 0 0 8px 0;
    }
    .download-button {
      display: inline-block;
      background-color: #0036D8;
      color: #FFFFFF;
      text-decoration: none;
      padding: 16px 24px;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin: 16px 0;
      border: none;
    }
    .download-url {
      word-break: break-all;
      color: #8A8580;
      font-size: 12px;
      margin-top: 16px;
    }
    .divider {
      height: 1px;
      background-color: rgba(250, 246, 240, 0.08);
      margin: 32px 0;
    }
    .footer {
      font-size: 12px;
      color: #8A8580;
    }
    .footer a {
      color: #0036D8;
      text-decoration: none;
    }
    @media (max-width: 480px) {
      .container {
        padding: 24px 16px;
      }
      .logo {
        font-size: 28px;
      }
      .product-name {
        font-size: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="logo">KILN</h1>
      <span class="status">// PURCHASE CONFIRMED</span>
    </div>

    <div class="section">
      <p class="label">ORDER</p>
      <p class="value">${params.orderId}</p>
    </div>

    <div class="section">
      <p class="label">PRODUCT</p>
      <h2 class="product-name">${params.productName}</h2>
      <p class="value">${params.productCode}</p>
    </div>

    <div class="section">
      <p class="label">AMOUNT</p>
      <p class="value">${formattedPrice}</p>
    </div>

    <div class="divider"></div>

    <div class="section">
      <p class="label">DOWNLOAD</p>
      <p class="value">Your purchase is ready. This link expires in 7 days.</p>
      <br>
      <a href="${params.downloadUrl}" class="download-button">DOWNLOAD FILES →</a>
      <p class="download-url">${params.downloadUrl}</p>
    </div>

    <div class="divider"></div>

    <div class="section">
      <p class="label">WHAT'S INCLUDED</p>
      <p class="value">${params.productName} ships with documentation on how it was made and why. If something is unclear, reply to this email.</p>
    </div>

    <div class="divider"></div>

    <div class="section footer">
      <p class="label">SUPPORT</p>
      <p class="value">Questions: <a href="mailto:hello@kiln.studio">hello@kiln.studio</a></p>
      <p class="value">Receipt: Available in your Stripe confirmation email</p>
      <br>
      <p><a href="https://kiln.studio">kiln.studio</a></p>
      <br>
      <p style="color: #5A554F;">This email was sent because you completed a purchase at kiln.studio.</p>
    </div>
  </div>
</body>
</html>`;
}

// Send purchase confirmation email
export async function sendPurchaseConfirmationEmail(
  params: PurchaseEmailParams
): Promise<void> {
  const fromEmail = process.env.FROM_EMAIL || 'hello@kiln.studio';
  const fromName = process.env.FROM_NAME || 'KILN';

  const command = new SendEmailCommand({
    Source: `${fromName} <${fromEmail}>`,
    Destination: {
      ToAddresses: [params.to],
    },
    Message: {
      Subject: {
        Data: `Purchase Confirmed — ${params.productName}`,
        Charset: 'UTF-8',
      },
      Body: {
        Text: {
          Data: createPlainTextEmail(params),
          Charset: 'UTF-8',
        },
        Html: {
          Data: createHtmlEmail(params),
          Charset: 'UTF-8',
        },
      },
    },
  });

  try {
    await sesClient.send(command);
    console.log(`Purchase confirmation email sent to ${params.to} for order ${params.orderId}`);
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}

// Send test email (for verification)
export async function sendTestEmail(to: string): Promise<void> {
  const command = new SendEmailCommand({
    Source: `KILN <${process.env.FROM_EMAIL || 'hello@kiln.studio'}>`,
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Subject: {
        Data: 'KILN — Email System Test',
        Charset: 'UTF-8',
      },
      Body: {
        Text: {
          Data: 'This is a test email from the KILN store system.\n\nIf you received this, AWS SES is configured correctly.',
          Charset: 'UTF-8',
        },
      },
    },
  });

  await sesClient.send(command);
}
