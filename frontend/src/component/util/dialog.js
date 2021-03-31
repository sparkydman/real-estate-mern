import Cart from '../dialog/Cart';
import Login from '../dialog/Login';
import Menu from '../dialog/Menu';
import Notification from '../dialog/Notification';
import Register from '../dialog/Register';

const getDialog = (state) => {
  switch (state) {
    case 'notification':
      return <Notification />;
    case 'cart':
      return <Cart />;
    case 'login':
      return <Login />;
    case 'register':
      return <Register />;
    case 'menu':
      return <Menu />;
    default:
      return;
  }
};

export default getDialog;
