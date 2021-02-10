import { OPEN_BND_LGOIN, OPEN_BND_REGISTER } from '../constants/ui';

export const openAuth = (
  state = { openLogin: false, openRegister: false },
  action
) => {
  const { type } = action;
  switch (type) {
    case OPEN_BND_LGOIN:
      return {
        openLogin: true,
        openRegister: false,
      };
    case OPEN_BND_REGISTER:
      return {
        openLogin: false,
        openRegister: true,
      };

    default:
      return state;
  }
};
