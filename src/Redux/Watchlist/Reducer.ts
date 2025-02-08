export interface watchListState {
    watchLists: { [key: string]: string[] },
    selectedWatchList: string,
  }
  
  const initialState: watchListState = {
    watchLists:JSON.parse(localStorage.getItem('watchlists') || '{}'),
    selectedWatchList: '',
  }

  const saveToLocalStorage = (watchlists: { [key: string]: string[] }) => {
    localStorage.setItem('watchlists', JSON.stringify(watchlists));
  };

  const watchListReducer = (state = initialState, action: any):watchListState => {
      let newState = state;
      switch (action.type) {

        case "CREATE_WATCHLIST":
            const newWatchlistName = action.payload;

            if (!state.watchLists[newWatchlistName]) {
              newState= {
                ...state,
                watchLists: {
                  ...state.watchLists,
                  [newWatchlistName]: [],
                },
            };
            saveToLocalStorage(newState.watchLists)
        }
            return newState;
          case "ADD_TO_WATCHLIST":
            const { watchlistName, item } = action.payload;

            if (!state.watchLists[watchlistName]) {
              return state; 
            }
      
            if (!state.watchLists[watchlistName].includes(item)) {
              newState = {
                ...state,
                watchLists: {
                  ...state.watchLists,
                  [watchlistName]: [...state.watchLists[watchlistName], item],
                },
              };

            saveToLocalStorage(newState.watchLists)
            }
      
            return newState;
          case "REMOVE_FROM_WATCHLIST":
            const { removeWatchlistName,  removeSymbol } = action.payload;

            if (state.watchLists[removeWatchlistName]) {
              newState= {
                ...state,
                watchLists: {
                  ...state.watchLists,
                  [removeWatchlistName]: state.watchLists[removeWatchlistName].filter(
                    (s) => s !== removeSymbol
                  ),
                },
              };

            saveToLocalStorage(newState.watchLists)
            }
           
            return newState;
            case "REMOVE_WATCHLIST":
              const updated = { ...state.watchLists };
              delete updated[action.payload]
        
              newState = {
                ...state,
                watchLists: updated,
              };
        
              saveToLocalStorage(newState.watchLists);
              return newState;
          default:
            return state;
      }
  }
  
  export default watchListReducer;