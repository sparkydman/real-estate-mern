import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from './screen/Home';
import Navbar from './component/Navbar/Navbar';
import HouseState from './context/houses/HouseState';
import HouseDetail from './screen/HouseDetail';

const App = () => {
  return (
    <HouseState>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/:id' exact component={HouseDetail} />
        </Switch>
      </BrowserRouter>
    </HouseState>
  );
};

export default App;
