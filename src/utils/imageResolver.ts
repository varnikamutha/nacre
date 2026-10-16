/// <reference types="vite/client" />
import type React from 'react';

/**
 * Centralized Image Resolver for Nacre Demi-Fine
 *
 * Imports and resolves all local images through Vite's asset pipeline.
 * This guarantees that in production (Vercel, Netlify, Cloud Run, etc.),
 * Vite processes, fingerprints, and bundles every single image file into dist/,
 * resolving to the exact CDN URL instead of relying on fragile unhashed path strings.
 */

// Import all local images as bundled asset URLs via Vite
const localImages: Record<string, string> = import.meta.glob(
  '../assets/images/*.{jpg,jpeg,png,webp,svg}',
  { eager: true, import: 'default' }
);

// Map of basename -> bundled Vite asset URL
const imageMap: Record<string, string> = {};

for (const [filepath, assetUrl] of Object.entries(localImages)) {
  const filename = filepath.split('/').pop();
  if (filename && typeof assetUrl === 'string') {
    imageMap[filename] = assetUrl;
  }
}

/**
 * High quality demi-fine jewelry fallback images from Unsplash (curated for category aesthetic)
 */
export const FALLBACK_JEWELRY_IMAGES: Record<string, string> = {
  ring: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
  bracelet: 'https://images.unsplash.com/photo-1611591475837-123403a453f2?auto=format&fit=crop&w=800&q=80',
  necklace: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
  earrings: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80',
  anklet: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
  default: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80'
};

/**
 * Resolves any image path to a guaranteed, working URL:
 * 1. If it's already an http/https URL, returns it directly.
 * 2. If it's a local path (e.g. /assets/images/xyz.jpg or /src/assets/images/xyz.jpg),
 *    extracts the filename and returns the Vite-bundled asset URL.
 * 3. Falls back to the root-relative /assets/images/ path.
 */
export function resolveImageUrl(pathOrUrl: string | undefined): string {
  if (!pathOrUrl) return FALLBACK_JEWELRY_IMAGES.default;

  // If external URL (Unsplash, etc.), return directly
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://') || pathOrUrl.startsWith('data:')) {
    return pathOrUrl;
  }

  // Extract the filename
  const cleanPath = pathOrUrl.split('?')[0].split('#')[0];
  const filename = cleanPath.split('/').pop();

  if (filename && imageMap[filename]) {
    return imageMap[filename];
  }

  // If not found in bundled map, return normalized public path
  if (pathOrUrl.startsWith('/src/assets/images/')) {
    return pathOrUrl.replace('/src/assets/images/', '/assets/images/');
  }
  if (!pathOrUrl.startsWith('/')) {
    return `/${pathOrUrl}`;
  }

  return pathOrUrl;
}

/**
 * Fallback handler for <img> onError events
 */
export function handleImageError(
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  category?: string
): void {
  const target = e.currentTarget;
  const currentSrc = target.src;

  if (!target.dataset.retryAttempt) {
    target.dataset.retryAttempt = '1';
    const filename = currentSrc.split('/').pop()?.split('?')[0];
    if (filename && imageMap[filename] && target.src !== imageMap[filename]) {
      target.src = imageMap[filename];
      return;
    }
    if (currentSrc.includes('/assets/images/')) {
      target.src = currentSrc.replace('/assets/images/', '/images/');
      return;
    }
    if (currentSrc.includes('/src/assets/images/')) {
      target.src = currentSrc.replace('/src/assets/images/', '/assets/images/');
      return;
    }
  }

  if (!target.dataset.fallbackApplied) {
    target.dataset.fallbackApplied = 'true';
    const cat = (category || 'default').toLowerCase();
    target.src =
      FALLBACK_JEWELRY_IMAGES[cat] ||
      FALLBACK_JEWELRY_IMAGES.default;
  }
}
