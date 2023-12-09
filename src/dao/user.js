import userSchema from "../dao/models/user.model.js";

export const createUser = async (payload, cid) => {
  const findEmail = await checkEmail(payload.email);

  if (findEmail) {
    return new Error("There is already a user with that email");
  }

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
  const user = await userSchema.findOne({ email });
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

export const checkEmail = async (email) => {
  return await userSchema.findOne({ email: email });
};

export const findUserById = async (id) => {
  return await userSchema.findOne({ _id: id });
};
