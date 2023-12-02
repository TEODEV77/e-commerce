import userSchema from "../dao/models/user.model.js";

export const createUser = async (payload) => {
  const user = await userSchema.create(payload);
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
    email: user.email,
    age: user.age,
  };

  return payload;
};
