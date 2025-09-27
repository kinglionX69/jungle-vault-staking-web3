
import { useState } from 'react';

export const useWallet = () => {
  const [isConnected, setIsConnected] = useState(true); // Default to connected
  const [address, setAddress] = useState('0x1234...abcd'); // Default mock address

  const connect = () => {
    setIsConnected(true);
    setAddress('0x1234...abcd');
  };

  const disconnect = () => {
    setIsConnected(false);
    setAddress('');
  };

  return {
    isConnected,
    address,
    connect,
    disconnect
  };
};
