import userSchema from "../dao/models/user.model.js";

export const createUser = async (payload, cid) => {
  const userPayload = {
    ...payload,
    cid,
  };
  const user = await userSchema.create(userPayload);
  if (user) {
    return user;
  }
};

export const findEmail = async (email) => {
  const user = await userSchema.findOne({ email: email });
  if (user) {
    return user;
  }
};

export const checkPassword = async (password) => {
  const user = await userSchema.findOne({ password: password });
  if (user) {
    return user;
  }
};

export const createPayload = (user) => {
  const payload = {
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    email: user.email,
    age: user.age,
    cid: user.cid,
  };

  return payload;
};
