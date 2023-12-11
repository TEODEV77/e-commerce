import passport from "passport";
import bcrypt from "bcrypt";

import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GitHubStrategy } from "passport-github2";
import { checkEmail, createUser, findUserById } from "../dao/user.js";
import { createCartAdapter } from "../dao/cartAdapter.js";

import { checkUserField, githubOptions } from "../utils.js";

export const init = () => {
  passport.use(
    "register",
    new LocalStrategy(
      {
        usernameField: "email",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        const {
          body: { firstName, lastName, role, age },
        } = req;

        if (checkUserField(firstName, lastName, role, email, password, age)) {
          done(new Error("Missing fields"));
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        password = hash;

        const cart = await createCartAdapter();
        const cid = cart._id;

        const newUser = {
          firstName,
          lastName,
          role,
          email,
          password,
          age,
        };

        const user = await createUser(newUser, cid);
        done(null, user);
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {

        const user = await checkEmail(email);
        if (!user) {
          return done(new Error("Email or Password Incorrect"));
        }

        const passwordHash = user.password;
        const login = bcrypt.compareSync(password, passwordHash);

        if(login){
          return done(null, user);
        }
      }
    )
  );
  passport.use(
    "github",
    new GitHubStrategy(
      githubOptions,
      async (accessToken, refreshToken, profile, done) => {

      
        const { username, provider, displayName } = profile;

        let email = profile._json.email || `${username}@gamil.com`;

        const user = await checkEmail(email);

        if (user) {
          return done(null, user);
        }

        const newUser = {
          firstName: displayName,
          lastName: "",
          role: "user",
          email,
          username,
          provider,
          password: "",
          age: 17,
        };

        const cart = await createCartAdapter();
        const cid = cart._id;

        const nUser = await createUser(newUser, cid);
        return done(null, nUser);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await findUserById(id);
    done(null, user);
  });
};
