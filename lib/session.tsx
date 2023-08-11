export const sessionOptions = {
  cookieName: "blog",
  password: process.env.NODE_ENV === 'development' ? process.env.SECRET!.toString() : process.env.NEXT_PUBLIC_SECRET!.toString(),
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: false,
  },
};
