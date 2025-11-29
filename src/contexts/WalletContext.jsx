import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { PeraWalletConnect } from '@perawallet/connect';
import { DeflyWalletConnect } from '@blockshake/defly-connect';
import { ethers } from 'ethers';
import { supabase } from '@/api/supabaseClient';

const WalletContext = createContext({});

export const useWallet = () => useContext(WalletContext);

// Initialize wallet connectors
const peraWallet = new PeraWalletConnect({
  chainId: 4160,
  shouldShowSignTxnToast: true,
});

const deflyWallet = new DeflyWalletConnect({
  shouldShowSignTxnToast: true,
});

// $VibeOfficial token contract on Base
// TODO: Set this in your .env file as VITE_VIBE_TOKEN_ADDRESS
const VIBE_TOKEN_ADDRESS = import.meta.env.VITE_VIBE_TOKEN_ADDRESS || '';

// Base mainnet RPC URL
const BASE_RPC_URL = 'https://mainnet.base.org';

// ERC20 ABI for balanceOf
const ERC20_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
];

export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [walletType, setWalletType] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);
  const [isVibeHolder, setIsVibeHolder] = useState(false);
  const [vibeBalance, setVibeBalance] = useState(0);
  const [isCheckingBalance, setIsCheckingBalance] = useState(false);

  // Disconnect handler
  const handleDisconnect = useCallback(() => {
    setWalletAddress(null);
    setWalletType(null);
    setIsVibeHolder(false);
    setVibeBalance(0);
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('walletType');
  }, []);

  // Save wallet address to Supabase user profile
  const saveWalletToProfile = useCallback(async (address, type) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Try to update user_wallets table or user_profile
      const walletData = {
        user_id: user.id,
        user_email: user.email,
        wallet_address: address,
        wallet_type: type,
        chain: type === 'base' ? 'base' : 'algorand',
        connected_at: new Date().toISOString(),
      };

      // Try upsert first (requires composite unique constraint on user_email,wallet_type)
      let { error: upsertError } = await supabase
        .from('user_wallets')
        .upsert(walletData, { 
          onConflict: 'user_email,wallet_type',
          ignoreDuplicates: false 
        });

      // If upsert fails due to missing constraint, try simple insert
      if (upsertError) {
        // Check if error is due to missing table or constraint
        if (upsertError.code === '42P10' || upsertError.message?.includes('constraint')) {
          // Constraint doesn't exist, try simple insert (may create duplicates)
          const { error: insertError } = await supabase
            .from('user_wallets')
            .insert(walletData);
          
          if (insertError && insertError.code !== '23505') { // Ignore duplicate key errors
            console.warn('Could not save wallet to user_wallets:', insertError.message);
          }
        } else {
          // Table might not exist or other error
          console.warn('Could not save wallet to user_wallets:', upsertError.message);
          // TODO: DB migration needed - create user_wallets table with columns:
          // id (uuid, primary key), user_id (uuid), user_email (text), wallet_address (text),
          // wallet_type (text), chain (text), connected_at (timestamptz)
          // Add unique constraint: UNIQUE(user_email, wallet_type)
        }
      }
    } catch (err) {
      console.error('Error saving wallet to profile:', err);
    }
  }, []);

  // Check $VibeOfficial holdings on Base using ethers.js
  const checkVibeHoldings = useCallback(async (address) => {
    if (!address || !VIBE_TOKEN_ADDRESS || VIBE_TOKEN_ADDRESS === '') {
      // No token address configured, skip balance check
      console.log('Vibe token address not configured. Set VITE_VIBE_TOKEN_ADDRESS in .env');
      setVibeBalance(0);
      setIsVibeHolder(false);
      return;
    }

    setIsCheckingBalance(true);
    try {
      // Create provider for Base network
      const provider = new ethers.JsonRpcProvider(BASE_RPC_URL);
      
      // Create contract instance
      const tokenContract = new ethers.Contract(VIBE_TOKEN_ADDRESS, ERC20_ABI, provider);
      
      // Get balance and decimals with individual error handling
      let balanceRaw, decimals;
      try {
        [balanceRaw, decimals] = await Promise.all([
          tokenContract.balanceOf(address),
          tokenContract.decimals(),
        ]);
      } catch (contractError) {
        // Contract might not exist or doesn't implement ERC20 standard
        console.warn('Token contract call failed. Verify VITE_VIBE_TOKEN_ADDRESS is correct:', contractError.message);
        setVibeBalance(0);
        setIsVibeHolder(false);
        setIsCheckingBalance(false);
        return;
      }

      // Convert to human-readable format
      const balance = parseFloat(ethers.formatUnits(balanceRaw, decimals));
      
      setVibeBalance(balance);
      setIsVibeHolder(balance > 0);
      
      console.log(`$VibeOfficial balance for ${address}: ${balance}`);
    } catch (err) {
      console.error('Failed to check Vibe holdings:', err);
      // Don't set error state to avoid blocking UX, just log it
      setVibeBalance(0);
      setIsVibeHolder(false);
    } finally {
      setIsCheckingBalance(false);
    }
  }, []);

  // Setup disconnect listeners
  useEffect(() => {
    peraWallet.connector?.on('disconnect', handleDisconnect);
    deflyWallet.connector?.on('disconnect', handleDisconnect);

    return () => {
      peraWallet.connector?.off('disconnect', handleDisconnect);
      deflyWallet.connector?.off('disconnect', handleDisconnect);
    };
  }, [handleDisconnect]);

  // Reconnect on page load
  useEffect(() => {
    const savedAddress = localStorage.getItem('walletAddress');
    const savedType = localStorage.getItem('walletType');

    if (savedAddress && savedType) {
      setWalletAddress(savedAddress);
      setWalletType(savedType);

      // Try to reconnect the session
      if (savedType === 'pera') {
        peraWallet.reconnectSession().catch(console.error);
      } else if (savedType === 'defly') {
        deflyWallet.reconnectSession().catch(console.error);
      } else if (savedType === 'base') {
        // Check Vibe holdings for Base wallet
        checkVibeHoldings(savedAddress);
      }
    }
  }, [checkVibeHoldings]);

  // Connect to Pera Wallet
  const connectPera = async () => {
    setIsConnecting(true);
    setError(null);
    try {
      const accounts = await peraWallet.connect();
      if (accounts.length > 0) {
        const address = accounts[0];
        setWalletAddress(address);
        setWalletType('pera');
        localStorage.setItem('walletAddress', address);
        localStorage.setItem('walletType', 'pera');
        
        // Save to Supabase
        await saveWalletToProfile(address, 'pera');
        
        return address;
      }
    } catch (err) {
      console.error('Pera wallet connection error:', err);
      if (err?.data?.type !== 'CONNECT_MODAL_CLOSED') {
        setError(err.message || 'Failed to connect Pera Wallet');
      }
    } finally {
      setIsConnecting(false);
    }
    return null;
  };

  // Connect to Defly Wallet
  const connectDefly = async () => {
    setIsConnecting(true);
    setError(null);
    try {
      const accounts = await deflyWallet.connect();
      if (accounts.length > 0) {
        const address = accounts[0];
        setWalletAddress(address);
        setWalletType('defly');
        localStorage.setItem('walletAddress', address);
        localStorage.setItem('walletType', 'defly');
        
        // Save to Supabase
        await saveWalletToProfile(address, 'defly');
        
        return address;
      }
    } catch (err) {
      console.error('Defly wallet connection error:', err);
      if (err?.data?.type !== 'CONNECT_MODAL_CLOSED') {
        setError(err.message || 'Failed to connect Defly Wallet');
      }
    } finally {
      setIsConnecting(false);
    }
    return null;
  };

  // Connect to Base wallet (MetaMask or similar)
  const connectBase = async () => {
    setIsConnecting(true);
    setError(null);
    try {
      // Check if ethereum provider is available (MetaMask, etc.)
      if (typeof window.ethereum === 'undefined') {
        throw new Error('Please install MetaMask or another Web3 wallet to connect to Base');
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length > 0) {
        const address = accounts[0];
        
        // Switch to Base network (chainId: 8453)
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x2105' }], // 8453 in hex
          });
        } catch (switchError) {
          // If the network doesn't exist, add it
          if (switchError.code === 4902) {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: '0x2105',
                chainName: 'Base',
                nativeCurrency: {
                  name: 'Ethereum',
                  symbol: 'ETH',
                  decimals: 18,
                },
                rpcUrls: ['https://mainnet.base.org'],
                blockExplorerUrls: ['https://basescan.org'],
              }],
            });
          }
        }

        setWalletAddress(address);
        setWalletType('base');
        localStorage.setItem('walletAddress', address);
        localStorage.setItem('walletType', 'base');
        
        // Save to Supabase
        await saveWalletToProfile(address, 'base');
        
        // Check for $VibeOfficial holdings
        await checkVibeHoldings(address);
        
        return address;
      }
    } catch (err) {
      console.error('Base wallet connection error:', err);
      setError(err.message || 'Failed to connect Base Wallet');
    } finally {
      setIsConnecting(false);
    }
    return null;
  };

  // Disconnect wallet
  const disconnectWallet = async () => {
    try {
      if (walletType === 'pera') {
        await peraWallet.disconnect();
      } else if (walletType === 'defly') {
        await deflyWallet.disconnect();
      }
      // Base wallets don't have a disconnect method, just clear state
    } catch (err) {
      console.error('Wallet disconnect error:', err);
    }
    handleDisconnect();
  };

  // Refresh token balance
  const refreshBalance = async () => {
    if (walletAddress && walletType === 'base') {
      await checkVibeHoldings(walletAddress);
    }
  };

  // Get short address for display
  const getShortAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const value = {
    walletAddress,
    walletType,
    isConnecting,
    isCheckingBalance,
    error,
    isConnected: !!walletAddress,
    isVibeHolder,
    vibeBalance,
    connectPera,
    connectDefly,
    connectBase,
    disconnectWallet,
    getShortAddress,
    checkVibeHoldings,
    refreshBalance,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};
