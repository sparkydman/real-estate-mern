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

const App = () => {
  const store = useStore();
  useEffect(() => {
    store.dispatch(getMe());
  }, [store]);
  const user = store.getState().me;
  const { me } = user;
  console.log(me);
  return (
    <BrowserRouter>
      <Navbar user={me} />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about-us" exact component={About} />
        <Route path="/contact-us" exact component={Contact} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/:houseId" exact component={HouseDetail} />
      </Switch>
      <BottomNav user={me} />
    </BrowserRouter>
  );
};

export default App;
