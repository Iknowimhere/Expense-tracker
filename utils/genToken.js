import jwt from 'jsonwebtoken';


export const genToken = (id) => {
  return jwt.sign({ id }, "Topsecret", {
    expiresIn: '30d',
  });
};