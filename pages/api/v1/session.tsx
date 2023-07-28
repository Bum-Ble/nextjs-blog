import { NextApiHandler } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@/lib/session';

const getSession: NextApiHandler = (req, res) => {
  // @ts-ignore
  const session = req.session.currentUser
  res.json({ session });
};

export default withIronSessionApiRoute(getSession, sessionOptions);
