export const jwtConfig = {
  access: {
    secret: process.env.JWT_SECRET,
    subject: 'access',
    expiresIn: '30m',
  },
  refresh: {
    secret: process.env.JWT_SECRET,
    subject: 'refresh',
    expiresIn: '30d',
  },
};
