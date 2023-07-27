const { Student, Profile, Academic, Info } = require("../db");
const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const { JWT_KEY } = require("../../config");

//--------------------Auth SingUp PASSPORT--------------------//
// passport.use(
//   "singup",
//   new LocalStrategy({ passReqToCallback: true }, async (req, done) => {
//     const { email, password } = req.body;
//   })
// );

//---------------------Auth JWT PASSPORT---------------------//
const cookieExtractor = (req) => {
  if (req && req.cookies) {
    return req.cookies.token;
  }
  return null;
};

const options = {};
options.jwtFromRequest = cookieExtractor;
options.secretOrKey = JWT_KEY;

passport.use(
  new JWTStrategy(options, async function (payload, done) {
    try {
      const foundedUser = await Student.findOne({
        where: {
          id: payload.id,
        },
        attributes: ["id"],
        include: [
          {
            model: Profile.scope("withoutId", "withoutPassword"),
            // attributes: { exclude: ["password"] },
          },
          { model: Academic.scope("withoutId") },
          { model: Info.scope("withoutId") },
        ],
      });
      if (foundedUser) return done(null, foundedUser);
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);
//-----------------------------------------------------------//

module.exports = passport;
