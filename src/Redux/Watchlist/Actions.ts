export const createWatchList= (watchlistName:String) => {
    return async(dispatch:any) => {
        dispatch({
          type: 'CREATE_WATCHLIST',
          payload: watchlistName
        }
    )
    }
}

export const addToWatchlist= (watchlistName:any,item:any) => {
    return async(dispatch:any) => {
        dispatch({
          type: 'ADD_TO_WATCHLIST',
          payload: {watchlistName,item}
        }
    )
    }
}

export const removeFromWatchlist= (removeWatchlistName:any,removeSymbol:any) => {
    return async(dispatch:any) => {
        dispatch({
          type: 'REMOVE_FROM_WATCHLIST',
          payload: {removeWatchlistName,removeSymbol}
        }
    )
    }
}
export const removeWatchlist= (watchlistName:any) => {
    return async(dispatch:any) => {
        dispatch({
          type: 'REMOVE_WATCHLIST',
          payload: watchlistName
        }
    )
    }
}