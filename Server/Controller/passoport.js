const passport = require("passport")
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
 
passport.use(new GoogleStrategy({
    clientID:     "1097803044825-hfhuvdsijdnlbpf3sbsn0uhpo32unqou.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:5500/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    done(null, profile);
   
  }
));

passport.serializeUser((user,done)=>{
    done(null,user);
});

passport.deserializeUser((user,done)=>{
    done(null,user);
});




