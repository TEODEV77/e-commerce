import passport from "passport";
import bcrypt from "bcrypt";

import { Strategy as LocalStrategy } from "passport-local";
import { createUser, findUserById } from "../dao/user.js";
import { createCartAdapter } from "../dao/cartAdapter.js";

import { checkUserField } from "../utils.js";

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
  //passport.use("login", new LocalStrategy());

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await findUserById(id);
    done(null, user);
  });
};
