const router = require("express").Router();
const passport = require("passport");

const CLIENT_URL = 'http://localhost:3000';

/*
    Login
        - Success
        - Failure

    Logout
*/

router.get("/login/success", (req, res) => {
    if (req.user){
        res.status(200).json({
            success: true,
            message: "Successful",
            user: req.user
        });
    }
});

router.get("/login/failure", (req, res) => {
    res.status(401).json({
            success: false,
            message: "Failed"
    });
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect('http://localhost:3000');
});

router.get("/google", 
    passport.authenticate('google', {
        scope: [ 'profile' ]
}));

router.get("/google/callback", 
    passport.authenticate('google', {
        successRedirect: CLIENT_URL,
        failureRedirect: '/login/failure'
}));




router.get('/facebook', passport.authenticate('facebook', { scope: 'email' }));

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/auth/facebook/error',
  }),
  function (req, res) {
    // Successful authentication, redirect to success screen.
    res.redirect('/auth/facebook/success');
  }
);

router.get('/facebook/success', async (req, res) => {
  const userInfo = {
    id: req.session.passport.user.id,
    displayName: req.session.passport.user.displayName,
    provider: req.session.passport.user.provider,
  };
  res.render('fb-github-success', { user: userInfo });
});

router.get('/facebook/error', (req, res) => res.send('Error logging in via Facebook..'));

router.get('/facebook/signout', (req, res) => {
  try {
    req.session.destroy(function (err) {
      console.log('session destroyed.');
    });
    res.render('auth');
  } catch (err) {
    res.status(400).send({ message: 'Failed to sign out fb user' });
  }
});

module.exports = router
