import passport from 'passport'
import passportLocal from 'passport-local'
import passportJwt from 'passport-jwt'
import User from 'models/user.model'
import { compareUserPassword } from 'models/user.model'
import 'dotenv/config'

const LocalStrategy = passportLocal.Strategy
const JwtStrategy = passportJwt.Strategy
const ExtractJwt = passportJwt.ExtractJwt

passport.serializeUser<any, any>((req, user, done) => {
  return done(undefined, user)
})

passport.deserializeUser((id, done) => {
  User.findOne({ where: { id: id } }).then((user: User | null) => {
    if (user != null) {
      return done(undefined, user)
    }
  })
  return done(undefined, false)
})

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    (email, password, done) => {
      User.findOne({ where: { email: email.toLowerCase() } })
        .then((user: any) => {
          if (user == null) {
            return done(null, false, {
              message: 'El correo electrónico no existe.',
            })
          } else {
            compareUserPassword(user, password).then(
              (match: boolean | null) => {
                if (match) {
                  return done(null, user)
                }
                return done(null, false, {
                  message: 'Email and/or password do not match',
                })
              }
            )
          }
        })
        .catch((err: any) => {
          return done(err, false)
        })
    }
  )
)

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: String(process.env.API_SECRET_KEY),
    },
    (jwt_payload, done) => {
      User.findOne({ where: { id: jwt_payload.id } })
        .then((user: any) => {
          if (user == null) {
            return done(null, false)
          } else {
            return done(null, user)
          }
        })
        .catch((err: any) => {
          return done(err, false)
        })
    }
  )
)
