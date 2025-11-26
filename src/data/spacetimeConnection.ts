'use client';

/**
 * Shared SpacetimeDB Connection Manager
 * 
 * This module provides a single, shared connection to SpacetimeDB that can be used
 * by multiple hooks throughout the application. This prevents multiple connection
 * instances which can cause sync issues and prevent real-time updates.
 */

import * as moduleBindings from '../spacetime_module_bindings';
import { SPACETIME_CONFIG } from '@/constants';

type DbConnection = moduleBindings.DbConnection;

interface ConnectionState {
  connection: DbConnection | null;
  isConnecting: boolean;
  isConnected: boolean;
  error: string | null;
  listeners: Set<ConnectionListener>;
  reconnectAttempts: number;
  maxReconnectAttempts: number;
}

/**
 * Utility function for development-only console logs
 */
function devLog(message: string, ...args: unknown[]): void {
  if (process.env.NODE_ENV === 'development') {
    console.log(message, ...args);
  }
}

function devError(message: string, ...args: unknown[]): void {
  if (process.env.NODE_ENV === 'development') {
    console.error(message, ...args);
  }
}

interface ConnectionListener {
  onConnect?: (connection: DbConnection) => void;
  onDisconnect?: (reason?: Error | null) => void;
  onError?: (error: string) => void;
}

const state: ConnectionState = {
  connection: null,
  isConnecting: false,
  isConnected: false,
  error: null,
  listeners: new Set(),
  reconnectAttempts: 0,
  maxReconnectAttempts: SPACETIME_CONFIG.MAX_RECONNECT_ATTEMPTS,
};

/**
 * Get the current connection instance
 */
export function getConnection(): DbConnection | null {
  return state.connection;
}

/**
 * Check if currently connected
 */
export function isConnected(): boolean {
  return state.isConnected && state.connection !== null;
}

/**
 * Add a connection listener
 */
export function addConnectionListener(listener: ConnectionListener): () => void {
  state.listeners.add(listener);
  
  // If already connected, immediately notify
  if (state.isConnected && state.connection) {
    listener.onConnect?.(state.connection);
  }
  
  // If there's an error, notify
  if (state.error) {
    listener.onError?.(state.error);
  }
  
  // Return unsubscribe function
  return () => {
    state.listeners.delete(listener);
  };
}

/**
 * Initialize the shared connection (only called once)
 */
export function initializeConnection(): void {
  // Prevent multiple connection attempts
  if (state.isConnecting || state.isConnected) {
    return;
  }

  state.isConnecting = true;
  state.error = null;

  const dbHost = SPACETIME_CONFIG.DB_HOST;
  const dbName = process.env.NEXT_PUBLIC_SPACETIME_MODULE_NAME || 'practice_app';

  const onConnect = (connection: DbConnection, _id: unknown, _token: string) => {
    state.connection = connection;
    state.isConnected = true;
    state.isConnecting = false;
    state.error = null;
    state.reconnectAttempts = 0; // Reset counter on successful connection

    devLog('✅ SpacetimeDB connected successfully');

    // Notify all listeners
    state.listeners.forEach(listener => {
      listener.onConnect?.(connection);
    });
  };

  const onDisconnect = (_ctx: unknown, reason?: Error | null) => {
    state.connection = null;
    state.isConnected = false;
    state.isConnecting = false;

    // Notify all listeners
    state.listeners.forEach(listener => {
      listener.onDisconnect?.(reason);
    });

    // Auto-reconnect with retry limit
    if (state.reconnectAttempts < state.maxReconnectAttempts) {
      state.reconnectAttempts++;
      const delay = Math.min(
        SPACETIME_CONFIG.RECONNECT_BASE_DELAY * Math.pow(2, state.reconnectAttempts - 1),
        SPACETIME_CONFIG.MAX_RECONNECT_DELAY
      );
      
      devLog(`🔄 SpacetimeDB reconnect attempt ${state.reconnectAttempts}/${state.maxReconnectAttempts} in ${delay}ms`);
      
      setTimeout(() => {
        initializeConnection();
      }, delay);
    } else {
      const errorMsg = `Failed to connect after ${state.maxReconnectAttempts} attempts`;
      state.error = errorMsg;
      
      devError('❌ SpacetimeDB: Max reconnection attempts reached');
      
      state.listeners.forEach(listener => {
        listener.onError?.(errorMsg);
      });
    }
  };

  try {
    moduleBindings.DbConnection.builder()
      .withUri(dbHost)
      .withModuleName(dbName)
      .onConnect(onConnect)
      .onDisconnect(onDisconnect)
      .build();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    state.error = errorMessage;
    state.isConnecting = false;
    
    // Notify all listeners
    state.listeners.forEach(listener => {
      listener.onError?.(errorMessage);
    });
  }
}
