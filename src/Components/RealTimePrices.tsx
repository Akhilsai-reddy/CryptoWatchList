import { useState } from "react";
import useWebSocket from "../Utils/useWebSockets";

export const RealTimePrice = ({ symbol,lastPrice }: { symbol: string ,lastPrice:any}) => {
    const [price, setPrice] = useState<string>('');
  
    useWebSocket(symbol, (newPrice) => {
      setPrice(newPrice);
    });
  
    return (
        <p className="text-lg font-bold text-green-500">{price ? `$${price}` : parseFloat(lastPrice).toFixed(4)}</p>

    );
  };