exports.authenticator = (req, res, next) => {
  console.log('Autheticating...');
  next();
};
