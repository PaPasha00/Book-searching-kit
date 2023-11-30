import './App.css';
import Screen from './components/Screen/Screen';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux/es/exports';
import store from './redux/redux-store';
import OneBook from './components/OneBookPage/OneBookPage';
import Office from './components/Office/Office';
import Auth from './components/Autorize/Autorize';
import HeaderMain from './components/HeaderMain/HeaderMain';
import Registration from './components/Registrate/Registration';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store} >
        <div className="App">
          <HeaderMain />
            <Routes>
              <Route path='/' element={<Screen />} />
              <Route path='/OneBook/*' element={<OneBook />} />
              <Route path='/Office/*' element={<Office />} />
              <Route path='/Auth' element={<Auth />} />
              <Route path='/Registration' element={<Registration />} />
            </Routes>
        </div>
      </Provider>
    </BrowserRouter>

  );
}

export default App;
