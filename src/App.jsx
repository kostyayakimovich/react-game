import React from 'react';
import { Provider } from 'react-redux';

import store from './store';
import MemoryGameContainer from './containers/MemoryGameContainer';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Provider store={store}>
      <>
      <div className="App">
        <MemoryGameContainer />
             <Footer/>   
      </div>
      
      </>
    </Provider>
  );
}

export default App;