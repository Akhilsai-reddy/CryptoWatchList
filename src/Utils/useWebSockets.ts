import { useEffect } from 'react';

const useWebSocket = (symbol: string, callback: (price: string) => void) => {
  useEffect(() => {
    const wsSymbol = symbol.toLowerCase() + '@trade'; // e.g., 'zecusdt@trade'
    const socket = new WebSocket(`wss://stream.binance.com:9443/ws/${wsSymbol}`);

    // Handle successful connection
    socket.onopen = () => {
      console.log(`WebSocket connected for ${symbol}`);
    };

    // Handle incoming messages
    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.p) {
            console.log(message,"message for");
            
          callback(message.p); 
        } else {
          console.error('Message format error:', message);
        }
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };

    // Handle WebSocket errors
    socket.onerror = (error) => {
      console.error(`WebSocket error for ${symbol}:`, error);
    };

    // Handle connection closure
    socket.onclose = (event) => {
      if (event.wasClean) {
        console.log(`WebSocket closed cleanly for ${symbol}`);
      } else {
        console.error(`WebSocket error during closing for ${symbol}:`, event);
      }
    };

    // Clean up on component unmount
    return () => {
      socket.close();
    };
  }, [symbol, callback]);

  return null;
};

export default useWebSocket;
