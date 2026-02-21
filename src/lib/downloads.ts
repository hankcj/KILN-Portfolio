/**
 * S3 Download Links
 * 
 * Generates time-limited signed URLs for product downloads.
 * Maps Stripe products to S3 file paths.
 */

import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.PRODUCTS_BUCKET_NAME || 'kiln-products';

// Map product codes to S3 file paths
// This can also be stored in Stripe metadata as 's3_path'
const PRODUCT_FILE_MAP: Record<string, string> = {
  // Example mappings - update with your actual products
  'PROD.001': 'prod-001/design-system-starter.zip',
  'PROD.002': 'prod-002/motion-toolkit.zip',
  'PROD.003': 'prod-003/publishing-pipeline.zip',
};

interface DownloadLinkParams {
  productCode: string;
  fileName?: string; // Optional: custom filename for download
}

interface DownloadLinkResult {
  url: string;
  expiresAt: Date;
  fileName: string;
}

// Generate signed download URL
export async function generateDownloadLink(
  params: DownloadLinkParams
): Promise<DownloadLinkResult | null> {
  const { productCode, fileName } = params;

  // Get S3 path for product
  const s3Path = PRODUCT_FILE_MAP[productCode];
  
  if (!s3Path) {
    console.error(`No S3 path configured for product: ${productCode}`);
    return null;
  }

  // Default expiration: 7 days (in seconds)
  const expiresIn = 7 * 24 * 60 * 60;

  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: s3Path,
      // Optional: set content disposition for download
      ResponseContentDisposition: fileName 
        ? `attachment; filename="${fileName}"`
        : undefined,
    });

    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn,
    });

    const expiresAt = new Date(Date.now() + expiresIn * 1000);

    return {
      url: signedUrl,
      expiresAt,
      fileName: fileName || s3Path.split('/').pop() || 'download.zip',
    };
  } catch (error) {
    console.error('Failed to generate download link:', error);
    return null;
  }
}

// Alternative: Get S3 path from Stripe metadata
// This is more flexible than hardcoded map
export async function generateDownloadLinkFromMetadata(
  s3Path: string,
  fileName?: string
): Promise<DownloadLinkResult | null> {
  if (!s3Path) {
    console.error('No S3 path provided');
    return null;
  }

  const expiresIn = 7 * 24 * 60 * 60;

  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: s3Path,
      ResponseContentDisposition: fileName
        ? `attachment; filename="${fileName}"`
        : undefined,
    });

    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn,
    });

    const expiresAt = new Date(Date.now() + expiresIn * 1000);

    return {
      url: signedUrl,
      expiresAt,
      fileName: fileName || s3Path.split('/').pop() || 'download.zip',
    };
  } catch (error) {
    console.error('Failed to generate download link:', error);
    return null;
  }
}

// Verify file exists in S3
export async function verifyProductFile(productCode: string): Promise<boolean> {
  const s3Path = PRODUCT_FILE_MAP[productCode];
  
  if (!s3Path) {
    return false;
  }

  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: s3Path,
    });

    // Try to get object metadata (doesn't download file)
    await s3Client.send(command);
    return true;
  } catch (error) {
    console.error(`Product file not found: ${s3Path}`, error);
    return false;
  }
}

// Get file size for display
export async function getFileSize(productCode: string): Promise<string | null> {
  const s3Path = PRODUCT_FILE_MAP[productCode];
  
  if (!s3Path) {
    return null;
  }

  try {
    const { HeadObjectCommand } = await import('@aws-sdk/client-s3');
    const command = new HeadObjectCommand({
      Bucket: BUCKET_NAME,
      Key: s3Path,
    });

    const response = await s3Client.send(command);
    const bytes = response.ContentLength;

    if (!bytes) return null;

    // Format bytes to human readable
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  } catch (error) {
    console.error(`Failed to get file size: ${s3Path}`, error);
    return null;
  }
}
