import React, { useEffect } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from './screen/Home';
import Navbar from './component/Navbar/Navbar';
import About from './component/about/About';
import Contact from './screen/contact';
import Profile from './screen/profile';
import Cart from './screen/cart';
import HouseDetail from './screen/HouseDetail';
import BottomNav from './component/Navbar/BottomNav';
import { useStore } from 'react-redux';
import getMe from './actions/getMe';
import ProtectedRoute from './component/util/protectedRoute';
import setAuthToken from './component/util/setAuthToken';

const App = () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const store = useStore();
  useEffect(() => {
    store.dispatch(getMe());
  }, [store]);

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about-us" exact component={About} />
        <Route path="/contact-us" exact component={Contact} />
        <ProtectedRoute path="/cart" exact component={Cart} />
        <ProtectedRoute path="/profile" exact component={Profile} />
        <Route path="/:houseId" exact component={HouseDetail} />
      </Switch>
      <BottomNav />
    </BrowserRouter>
  );
};

export default App;
