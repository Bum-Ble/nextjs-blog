import {withIronSession} from 'next-iron-session';

export function withSession(handler) {
  return withIronSession(handler, {
    // password: process.env.SECRET_COOKIE_PASSWORD,
    password: process.env.SECRET,
    cookieName: 'blog',
    cookieOptions: {secure: false}
  });
}
