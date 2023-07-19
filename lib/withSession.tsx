import {withIronSession} from 'next-iron-session';

export function withSession(handler: (...args: any[]) => any) {
  return withIronSession(handler, {
    // password: process.env.SECRET_COOKIE_PASSWORD,
    password: process.env.SECRET?.toString() ?? '',
    cookieName: 'blog',
    cookieOptions: {secure: false}
  });
}
