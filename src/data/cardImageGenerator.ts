import type { CardRarity } from '@/data/cards';

export interface CardImageOptions {
  card: {
    id: number;
    affirmation: string;
    mission: string;
    inspiration: string;
    rarity: CardRarity;
  };
  username: string;
  streakDay: number;
  platform: 'farcaster' | 'instagram' | 'whatsapp' | 'download';
}

// Rarity colors matching the card design
const rarityColors: Record<CardRarity, string> = {
  common: '#9CA3AF',
  uncommon: '#10B981',
  rare: '#3B82F6',
  epic: '#A855F7',
  legendary: '#F59E0B',
};

export async function generateCardImage(options: CardImageOptions): Promise<Blob> {
  const { card, username, streakDay, platform } = options;
  
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas not supported');

  // Platform-specific dimensions - aspect ratio 2:3 like the actual card
  const dimensions: Record<string, { width: number; height: number }> = {
    instagram: { width: 1080, height: 1080 }, // Square
    farcaster: { width: 1200, height: 630 }, // Open Graph
    whatsapp: { width: 1080, height: 1080 }, // Square
    download: { width: 1080, height: 1620 }, // 2:3 Portrait like actual card
  };

  const { width, height } = dimensions[platform];
  canvas.width = width;
  canvas.height = height;

  // Load the actual PRACTICE card image
  const cardImage = new Image();
  cardImage.crossOrigin = 'anonymous';
  
  const cardImageUrl = 'https://usdozf7pplhxfvrl.public.blob.vercel-storage.com/3c7aff8f-230d-47f2-bcf1-e867252a5833-XsinrK6LfchksIA9GYIBPFTSm2RHNO';
  
  await new Promise<void>((resolve, reject) => {
    cardImage.onload = () => resolve();
    cardImage.onerror = () => reject(new Error('Failed to load card image'));
    cardImage.src = cardImageUrl;
  });

  // Load the VibeOfficial logo
  const vibeLogoImage = new Image();
  vibeLogoImage.crossOrigin = 'anonymous';
  const vibeLogoUrl = 'https://usdozf7pplhxfvrl.public.blob.vercel-storage.com/7c5f1896-f11b-4229-b9b9-2e9aea5bb543-USUKADwyIN8ZDriizlUoypra0FvUWW';
  
  await new Promise<void>((resolve, reject) => {
    vibeLogoImage.onload = () => resolve();
    vibeLogoImage.onerror = () => reject(new Error('Failed to load VibeOfficial logo'));
    vibeLogoImage.src = vibeLogoUrl;
  });

  // For square formats, add padding with background
  if (width === height) {
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#1e1b4b'); // indigo-950
    gradient.addColorStop(1, '#581c87'); // purple-900
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Draw card centered
    const cardHeight = height * 0.85;
    const cardWidth = cardHeight * (2 / 3); // 2:3 aspect ratio
    const cardX = (width - cardWidth) / 2;
    const cardY = (height - cardHeight) / 2;
    
    // Add glow around card based on rarity
    ctx.shadowColor = rarityColors[card.rarity];
    ctx.shadowBlur = 40;
    ctx.fillStyle = 'rgba(0,0,0,0.8)';
    ctx.fillRect(cardX - 5, cardY - 5, cardWidth + 10, cardHeight + 10);
    ctx.shadowBlur = 0;
    
    // Draw the card image
    ctx.drawImage(cardImage, cardX, cardY, cardWidth, cardHeight);
    
    // Draw text overlays on the card
    drawCardText(ctx, card, cardX, cardY, cardWidth, cardHeight);
    
    // Draw VibeOfficial logo at top-left of card
    const logoSize = 60;
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 10;
    ctx.drawImage(vibeLogoImage, cardX + 20, cardY + 20, logoSize, logoSize);
    ctx.shadowBlur = 0;
    
    // Draw rarity badge
    drawRarityBadge(ctx, card.rarity, cardX + cardWidth - 80, cardY + 20, 60);
    
    // Draw streak badge at bottom
    if (streakDay > 0) {
      drawStreakBadge(ctx, streakDay, width / 2, height - 80, 1);
    }
    
    // Username at bottom
    ctx.font = 'bold 28px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(0,0,0,0.8)';
    ctx.shadowBlur = 10;
    ctx.fillText(`@${username} • PRACTICE ✨`, width / 2, height - 30);
    ctx.shadowBlur = 0;
  } else {
    // For portrait/landscape, fill entire canvas with card
    ctx.drawImage(cardImage, 0, 0, width, height);
    
    // Draw text overlays
    drawCardText(ctx, card, 0, 0, width, height);
    
    // Draw VibeOfficial logo at top-left
    const logoSize = 70;
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 10;
    ctx.drawImage(vibeLogoImage, 30, 30, logoSize, logoSize);
    ctx.shadowBlur = 0;
    
    // Draw rarity badge at top right
    drawRarityBadge(ctx, card.rarity, width - 90, 30, 70);
    
    // Draw streak badge if applicable
    if (streakDay > 0) {
      const badgeY = platform === 'farcaster' ? height / 2 : height - 150;
      drawStreakBadge(ctx, streakDay, width / 2, badgeY, platform === 'farcaster' ? 0.8 : 1);
    }
    
    // Username at bottom
    ctx.font = 'bold 32px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(0,0,0,0.8)';
    ctx.shadowBlur = 15;
    ctx.fillText(`@${username} • PRACTICE ✨`, width / 2, height - 30);
    ctx.shadowBlur = 0;
  }

  // Convert to blob with better error handling and timeout
  return new Promise((resolve, reject) => {
    // Set timeout for blob generation
    const timeout = setTimeout(() => {
      reject(new Error('Image generation timeout - please try again'));
    }, 10000);

    try {
      canvas.toBlob((blob) => {
        clearTimeout(timeout);
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to generate image blob - please try again'));
        }
      }, 'image/png', 1.0);
    } catch (error) {
      clearTimeout(timeout);
      reject(new Error(`Image generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`));
    }
  });
}

// Helper function to draw card text overlay
function drawCardText(
  ctx: CanvasRenderingContext2D,
  card: { affirmation: string; mission: string; inspiration: string },
  x: number,
  y: number,
  width: number,
  height: number
): void {
  const centerX = x + width / 2;
  const startY = y + height * 0.35; // Start text at 35% down the card
  const textWidth = width * 0.88; // Use 88% of card width for text
  
  // Enable shadows for better readability
  ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
  ctx.shadowBlur = 20;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 2;
  
  // Affirmation label
  ctx.font = 'bold 18px sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.textAlign = 'center';
  ctx.fillText('AFFIRMATION', centerX, startY);
  
  // Affirmation text
  ctx.font = 'bold 28px sans-serif';
  ctx.fillStyle = '#ffffff';
  const affirmationHeight = wrapText(ctx, card.affirmation, centerX, startY + 35, textWidth, 36);
  
  // Mission label
  const missionY = startY + 35 + (affirmationHeight * 36) + 30;
  ctx.font = 'bold 18px sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.fillText('TODAY\'S MISSION', centerX, missionY);
  
  // Mission text
  ctx.font = 'bold 22px sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
  const missionHeight = wrapText(ctx, card.mission, centerX, missionY + 35, textWidth, 30);
  
  // Inspiration label
  const inspirationY = missionY + 35 + (missionHeight * 30) + 30;
  ctx.font = 'bold 18px sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.fillText('INSPIRATION', centerX, inspirationY);
  
  // Inspiration text
  ctx.font = 'italic 20px sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  wrapText(ctx, `"${card.inspiration}"`, centerX, inspirationY + 35, textWidth, 28);
  
  // Reset shadow
  ctx.shadowBlur = 0;
}

// Helper function to draw rarity badge
function drawRarityBadge(
  ctx: CanvasRenderingContext2D,
  rarity: CardRarity,
  x: number,
  y: number,
  size: number
): void {
  const color = rarityColors[rarity];
  const label = rarity.charAt(0).toUpperCase() + rarity.slice(1);
  
  // Badge background with glow
  ctx.shadowColor = color;
  ctx.shadowBlur = 20;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.roundRect(x, y, size, size * 0.5, 12);
  ctx.fill();
  ctx.shadowBlur = 0;
  
  // Badge text
  ctx.font = `bold ${size * 0.25}px sans-serif`;
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.fillText(label, x + size / 2, y + size * 0.35);
}

// Helper function to draw streak badge
function drawStreakBadge(
  ctx: CanvasRenderingContext2D,
  streak: number,
  x: number,
  y: number,
  scale: number = 1
): void {
  const badgeWidth = 200 * scale;
  const badgeHeight = 50 * scale;
  const badgeX = x - badgeWidth / 2;
  const badgeY = y - badgeHeight / 2;
  
  // Gradient background
  const gradient = ctx.createLinearGradient(badgeX, badgeY, badgeX + badgeWidth, badgeY + badgeHeight);
  gradient.addColorStop(0, '#f59e0b'); // amber-500
  gradient.addColorStop(1, '#ef4444'); // red-500
  
  ctx.shadowColor = '#f59e0b';
  ctx.shadowBlur = 20;
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.roundRect(badgeX, badgeY, badgeWidth, badgeHeight, 25 * scale);
  ctx.fill();
  ctx.shadowBlur = 0;
  
  // Text
  ctx.font = `bold ${28 * scale}px sans-serif`;
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.fillText(`🔥 ${streak} Day Streak!`, x, y + (9 * scale));
}

// Helper function to wrap text
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): number {
  const words = text.split(' ');
  let line = '';
  let lineCount = 0;

  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && i > 0) {
      ctx.fillText(line, x, y);
      line = words[i] + ' ';
      y += lineHeight;
      lineCount++;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
  lineCount++;
  return lineCount;
}
