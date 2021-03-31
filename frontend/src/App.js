import React, { useEffect } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from './screen/Home';
import Navbar from './component/Navbar/Navbar';
import About from './component/about/About';
import Contact from './screen/contact';
import HouseDetail from './screen/HouseDetail';
import BottomNav from './component/Navbar/BottomNav';
import { useStore } from 'react-redux';
import getMe from './actions/getMe';

const App = () => {
  const store = useStore();
  const user = store.getState().me;
  const { loading, me } = user;
  useEffect(() => {
    if (!loading && !me?.success) {
      store.dispatch(getMe());
    }
  }, [loading, me, store]);
  return (
    <BrowserRouter>
      <Navbar user={me} />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about-us" exact component={About} />
        <Route path="/contact-us" exact component={Contact} />
        <Route path="/:id" exact component={HouseDetail} />
      </Switch>
      <BottomNav user={me} />
    </BrowserRouter>
  );
};

export default App;
