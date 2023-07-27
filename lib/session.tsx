export const sessionOptions = {
  cookieName: "blog",
  password: process.env.SECRET?.toString() ?? '',
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: false,
  },
};
