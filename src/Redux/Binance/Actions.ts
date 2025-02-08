import axios from "axios";


const axiosInstance = axios.create({
  baseURL: 'https://api.binance.com/api/v3',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getCriptoData= () => {
      return async(dispatch:any) => {
        try {
          const response:any = await axiosInstance.get('/ticker/24hr')
          console.log("data fetched..",response.data);
          
          dispatch({
            type: 'GET_CRIPTO_DATA',
            payload: response.data
          }
          )
        } catch (error) {
            
        }
      }
  }

  export const searchCrypto=(query:string)=>{
  return async(dispatch:any)=>{
    dispatch({
      type: 'SEARCH_CRIPTO',
      payload:query
    })
  }
  }
  export const setRealTimePrice = (symbol: string, price: number) => {
    return async(dispatch:any) => {
      dispatch({
      type: 'SET_REAL_TIME_PRICE',
      payload: { symbol, price }
      })
    };
  };