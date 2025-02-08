export interface criptoState {
    criptos: any[],
    filteredCriptos: any[],
    loading:boolean
  }
  
  const initialState: criptoState = {
    criptos:[],
    filteredCriptos:[],
    loading: false
  }
  
  const binanceReducer = (state = initialState, action: any):criptoState => {
      switch (action.type) {
          case 'GET_CRIPTO_DATA':
              return {
                  ...state,
                  loading: true,
                  criptos: action.payload,
                  filteredCriptos: action.payload,
              }
              case "SEARCH_CRIPTO":
                  return {
                      ...state,
                      filteredCriptos: state.criptos.filter((cripto: any) => cripto.symbol.toLowerCase().includes(action.payload.toLowerCase()))
                  }
                  case 'SET_REAL_TIME_PRICE': {
                    const { symbol, price } = action.payload;
                    return {
                      ...state,
                      criptos: state.criptos.map((crypto) =>
                        crypto.symbol === symbol ? { ...crypto, lastPrice: price,  } : crypto
                      ),
                    };
                  }
          default:
              return state
      }
  }
  
  export default binanceReducer;