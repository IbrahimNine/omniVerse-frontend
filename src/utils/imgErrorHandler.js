const errorHandler = (e) => {
  const delay = setTimeout(() => {
    e.target.src = e.target.src + "?timestamp=" + new Date().getTime();
  }, 50000);
  return () => clearTimeout(delay);
};
export default errorHandler;
