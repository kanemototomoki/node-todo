module.exports = {
  csrfProtection: (req, res, next) => {
    const csrfToken = req.csrfToken();
    req.session.csrfToken = csrfToken;
    console.log('csrfToken:', csrfToken);
    next();
  },
}
