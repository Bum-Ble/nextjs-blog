// import * as next from 'next'
// import {Session} from "next-iron-session";
//
// declare module 'next'{
//   interface NextApiRequest {
//     session: Session
//   }
// }

type PostType = {
  createdAt: Date;
  username?: string;
  authorId: number
  id: String
  title: String
  date: String
  content: String
  htmlContent: String
}
