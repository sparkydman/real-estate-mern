const getErrMsg = (paths = [], msgs = [], pathname = '') => {
  const pathIndex = paths.indexOf(pathname);
  return msgs[pathIndex];
};

export default getErrMsg;
