import Header from './Components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CryptoList from './Components/CriptoListPage';
import {ErrorBoundary} from './Components/ErrorBoundary';
import WatchlistManager from './Components/CreateWatchList';
import ManageWatchlist from './Components/Watchlists';
const App = () => {
  return (
      <div className="min-h-screen bg-gray-100">
    <ErrorBoundary>
        <main className="p-4">
    <Router>
        <Header/>
      <Routes>
         <Route path='/' Component={CryptoList}/>
         <Route path='/watchLists' Component={WatchlistManager}/>
         <Route path='/watchlist/:selectedWatchlist' Component={ManageWatchlist}/>
      </Routes>
      </Router>
        </main>
      </ErrorBoundary>
      </div>
  );
};

export default App;
