import path from "path";
import url from "url";

const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export const checkUserField = (
  firstName,
  lastName,
  role,
  email,
  password,
  age
) => {
  if (!firstName || !lastName || !role || !email || !password || !age) {
    return true;
  } else {
    return false;
  }
};

export const githubOptions = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: 'http://localhost:7070/api/sessions/github/callback',
};

