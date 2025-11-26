import { setOnchainKitConfig } from '@coinbase/onchainkit';
import { getTokens } from '@coinbase/onchainkit/api';
import type { Address } from 'viem';
import { createPublicClient, http, formatUnits } from 'viem';
import { base } from 'viem/chains';
import { BASE_RPC_URLS } from '@/constants';

// VibeOfficial Token Contract Address on Base
export const VIBE_TOKEN_ADDRESS = '0xa57b7d6fe91c26c5dcc3c7f7f26ba897c4fe6a3e' as Address;

// Minimum VIBE tokens required to pull cards (1,000 VIBE)
export const MIN_VIBE_FOR_CARD_PULL = 1000;

// Minimum USD value required for raffle entry ($100)
export const MIN_USD_FOR_RAFFLE = 100;

// Get API key from environment variable
const ONCHAINKIT_API_KEY = process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || '';

export interface TokenBalance {
  address: string;
  balance: string;
  hasBalance: boolean;
  formattedBalance: number;
}

// RPC rotation state
let currentRpcIndex = 0;

function getNextRpc(): string {
  const rpc = BASE_RPC_URLS[currentRpcIndex];
  currentRpcIndex = (currentRpcIndex + 1) % BASE_RPC_URLS.length;
  return rpc;
}

// Retry helper with exponential backoff
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delayMs: number = 1000
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      
      const waitTime = delayMs * Math.pow(2, i); // Exponential backoff
      if (process.env.NODE_ENV === 'development') {
        console.log(`⚠️ Retry ${i + 1}/${maxRetries} after ${waitTime}ms...`);
      }
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }
  throw new Error('Max retries exceeded');
}

// Initialize OnchainKit config with API key from environment
if (ONCHAINKIT_API_KEY) {
  setOnchainKitConfig({
    apiKey: ONCHAINKIT_API_KEY,
  });
} else if (process.env.NODE_ENV === 'development') {
  console.warn('⚠️ NEXT_PUBLIC_ONCHAINKIT_API_KEY not set in environment variables');
}

// Check if wallet holds minimum VIBE tokens for card pulls
export async function checkVibeTokenBalance(walletAddress: Address): Promise<TokenBalance> {
  if (process.env.NODE_ENV === 'development') {
    console.log('🔍 Checking VIBE balance for:', walletAddress);
  }
  
  return retryWithBackoff(async () => {
    const rpcUrl = getNextRpc();
    
    try {
      // Create Base chain client with explicit RPC and timeout
      const client = createPublicClient({
        chain: base,
        transport: http(rpcUrl, {
          timeout: 10_000, // 10 second timeout
          retryCount: 2,
          retryDelay: 1000,
        }),
      });

      // ERC20 ABI for balance and decimals
      const erc20ABI = [
        {
          inputs: [{ name: 'account', type: 'address' }],
          name: 'balanceOf',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'decimals',
          outputs: [{ name: '', type: 'uint8' }],
          stateMutability: 'view',
          type: 'function',
        },
      ] as const;

      // Get token decimals first
      const decimals = await client.readContract({
        address: VIBE_TOKEN_ADDRESS,
        abi: erc20ABI,
        functionName: 'decimals',
      });

      // Get token balance
      const balance = await client.readContract({
        address: VIBE_TOKEN_ADDRESS,
        abi: erc20ABI,
        functionName: 'balanceOf',
        args: [walletAddress],
      });

      // Convert balance using actual token decimals
      const balanceFormatted = formatUnits(balance, decimals);
      const balanceNumber = parseFloat(balanceFormatted);

      if (process.env.NODE_ENV === 'development') {
        console.log('✅ Balance check success:', {
          balance: balanceNumber,
          hasMinimum: balanceNumber >= MIN_VIBE_FOR_CARD_PULL,
        });
      }

      const result: TokenBalance = {
        address: walletAddress,
        balance: balanceFormatted,
        hasBalance: balanceNumber >= MIN_VIBE_FOR_CARD_PULL,
        formattedBalance: balanceNumber,
      };
      
      return result;
    } catch (error: unknown) {
      if (process.env.NODE_ENV === 'development') {
        console.error('❌ Balance check failed:', error instanceof Error ? error.message : 'Unknown error');
      }
      throw error; // Throw to trigger retry
    }
  }, 3, 1000); // 3 retries with 1s initial delay
}

export async function getVibeTokenInfo() {
  try {
    const response = await getTokens({
      search: 'VIBE',
      limit: '1',
    });

    if ('error' in response) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error fetching VIBE token:', response.message);
      }
      return null;
    }

    return response[0] || null;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error getting VIBE token info:', error);
    }
    return null;
  }
}

// Check if wallet holds at least $100 USD worth of VibeOfficial tokens
export async function checkVibeTokenUSDValue(walletAddress: Address): Promise<{ hasEnough: boolean; usdValue: number; balance: string }> {
  return retryWithBackoff(async () => {
    try {
      // Create Base chain client with explicit RPC and timeout
      const client = createPublicClient({
        chain: base,
        transport: http(getNextRpc(), {
          timeout: 10_000,
          retryCount: 2,
          retryDelay: 1000,
        }),
      });

      // ERC20 ABI for balance and decimals
      const erc20ABI = [
        {
          inputs: [{ name: 'account', type: 'address' }],
          name: 'balanceOf',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'decimals',
          outputs: [{ name: '', type: 'uint8' }],
          stateMutability: 'view',
          type: 'function',
        },
      ] as const;

      // Get token decimals first
      const decimals = await client.readContract({
        address: VIBE_TOKEN_ADDRESS,
        abi: erc20ABI,
        functionName: 'decimals',
      });

      // Get token balance
      const balance = await client.readContract({
        address: VIBE_TOKEN_ADDRESS,
        abi: erc20ABI,
        functionName: 'balanceOf',
        args: [walletAddress],
      });

      // Convert balance using actual token decimals
      const balanceFormatted = formatUnits(balance, decimals);
      const balanceNumber = parseFloat(balanceFormatted);

      // Get current VIBE token price from a DEX aggregator or price API
      const vibePrice = await getVibeTokenPrice();
      
      // Calculate USD value
      const usdValue = balanceNumber * vibePrice;
      const hasEnough = usdValue >= MIN_USD_FOR_RAFFLE;

      if (process.env.NODE_ENV === 'development') {
        console.log('💵 USD Value Check:', {
          balance: balanceNumber,
          price: vibePrice,
          usdValue: usdValue.toFixed(2),
          hasEnough,
        });
      }

      return {
        hasEnough,
        usdValue,
        balance: balanceFormatted,
      };
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error checking token USD value:', error);
      }
      throw error; // Throw to trigger retry
    }
  }, 3, 1000);
}

// Get current VibeOfficial token price in USD using DexScreener API
async function getVibeTokenPrice(): Promise<number> {
  try {
    // Use DexScreener API v2 to get real-time price on Base
    const url = `https://api.dexscreener.com/latest/dex/tokens/${VIBE_TOKEN_ADDRESS.toLowerCase()}`;
    
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch token price');
    }

    const data = await response.json();
    
    // DexScreener v2 returns pairs array
    if (data.pairs && data.pairs.length > 0) {
      // Filter for Base chain only and pairs with USD prices
      const basePairs = data.pairs.filter((pair: { chainId: string; priceUsd: string }) => 
        pair.chainId === 'base' && 
        pair.priceUsd && 
        parseFloat(pair.priceUsd) > 0
      );
      
      if (basePairs.length === 0) {
        throw new Error('No Base chain pairs found with USD prices');
      }
      
      // Sort by liquidity USD (highest first) for most reliable price
      const sortedPairs = [...basePairs].sort((a: { liquidity?: { usd?: string } }, b: { liquidity?: { usd?: string } }) => {
        const liquidityA = parseFloat(a.liquidity?.usd || '0');
        const liquidityB = parseFloat(b.liquidity?.usd || '0');
        return liquidityB - liquidityA;
      });

      const topPair = sortedPairs[0];
      const vibeAddressLower = VIBE_TOKEN_ADDRESS.toLowerCase();
      const isVibeBaseToken = topPair.baseToken?.address?.toLowerCase() === vibeAddressLower;
      const isVibeQuoteToken = topPair.quoteToken?.address?.toLowerCase() === vibeAddressLower;

      let vibePrice = parseFloat(topPair.priceUsd);

      // If VIBE is the quote token (e.g., WETH/VIBE pair), we need to invert the price
      if (isVibeQuoteToken && !isVibeBaseToken) {
        vibePrice = 1 / vibePrice;
      }

      if (!isNaN(vibePrice) && vibePrice > 0) {
        if (process.env.NODE_ENV === 'development') {
          console.log('💰 VIBE Price:', `$${vibePrice.toFixed(6)}`);
        }
        return vibePrice;
      }
    }

    // If no valid price found, throw error to use fallback
    throw new Error('No valid price data found');
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('⚠️ Using fallback price due to error:', error);
    }
    return 0.0001; // Conservative fallback price
  }
}
