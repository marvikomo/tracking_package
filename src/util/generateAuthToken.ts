import * as jwt from "jsonwebtoken";

export const generateAuthToken = async function (data) {
  const token = jwt.sign(data, process.env.JWT_KEY);
  return token;
};
