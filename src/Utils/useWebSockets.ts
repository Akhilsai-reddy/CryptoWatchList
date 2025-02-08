import { useEffect } from 'react';

const useWebSocket = (symbol: string, callback: (price: string) => void) => {
  useEffect(() => {
    const wsSymbol = symbol?.toLowerCase() + '@trade'; 
    const socket = new WebSocket(`wss://stream.binance.com:9443/ws/${wsSymbol}`);

    socket.onopen = () => {
      console.log(`WebSocket connected for ${symbol}`);
    };


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


    socket.onerror = (error) => {
      console.error(`WebSocket error for ${symbol}:`, error);
    };

    socket.onclose = (event) => {
      if (event.wasClean) {
        console.log(`WebSocket closed cleanly for ${symbol}`);
      } else {
        console.error(`WebSocket error during closing for ${symbol}:`, event);
      }
    };

    return () => {
      socket.close();
    };
  }, [symbol, callback]);

  return null;
};

export default useWebSocket;
