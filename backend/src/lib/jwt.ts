import jwt from 'jsonwebtoken';

const secret = process.env.SECRET_KEY!

export const generateToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, secret, { expiresIn: '1d' });
};

export const verifyToken = (token: string) => {
  try {
    const res = jwt.verify(token, secret);
  } catch (error) {
    
  }
  return jwt.verify(token, secret);
};