import {GetServerSideProps, NextPage} from "next";
import axios from "axios";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "@/lib/session";
import {User} from "@/src/entity/User";
import {useForm} from "@/hooks/useForm";
import qs from 'querystring'
import Image from "next/image";

const SignIn: NextPage<{ user: User }> = (props) => {
  const {form} = useForm(
    {username: '', password: ''},
    [
      {label: '用户名', type: 'text', key: 'username'},
      {label: '密  码', type: 'password', key: 'password'}
    ],
    <button type='submit' className="actions">登 录</button>,
    {
      request: (formData) => axios.post(`/api/v1/sessions`, formData),
      success: () => {
        window.alert('登录成功')
        const query = qs.parse(window.location.search.slice(1))
        window.location.href = query.returnTo ? query.returnTo.toString() : '/posts'
      }
    }
  )

  return (
    <>
      { props.user && <div> 当前登录用户为 {props.user.username} </div> }
      <div className="signIn">
        <Image src="/background.jpg" alt="" layout="fill" priority={true}/>
        <div className="overlay"/> {/* 添加蒙版层 */}
        <div className="content">
          <div className="title">登录</div>
          <div className="formWrapper">
            {form}
          </div>
        </div>
        <style jsx global>{`
          .signIn {
            position: relative;
            width: 100%;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .signIn .overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(51, 51, 51, 0.6); /* 设置蒙版层颜色和透明度 */
          }
          .signIn .content {
            //height: 250px;
            width: 400px;
            z-index: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding: 40px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.8);
            border-radius: 16px;
          }
          .signIn .content .title{
            font-size: 30px;
            font-weight: bold;
            color: #f5f5f5;
            margin-bottom: 8px;
          }
          .signIn .content .formWrapper{
          width: 100%;
          }
          .signIn .actions{
            width: 100%;
            margin-top: 8px;
            height: 40px;
            background-color:#4682A9;
            border: none;
            border-radius: 4px;
            transition: background-color 0.3s ease;
            color: #f5f5f5;
          }
          .signIn .actions:hover{
            background-color: #749BC2;
            cursor:pointer;
          }
          .signIn .actions:focus{
            background-color: #749BC2;
            box-shadow: 0 0 5px #749BC2; 
          }
          .signIn .label-text{
            width: 4rem;
            text-align: center;
            color: #f5f5f5;
          }
          .signIn .errors{
            margin-top: 3px;
            color: #D21312;
            padding-left: 4rem;
          }
        `}</style>
      </div>
    </>
  )
};
export default SignIn

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(async (context) => {
  // @ts-ignore
  const user = context.req.session.currentUser || '' as User
  return {
    props: {
      user: JSON.parse(JSON.stringify(user))
    }
  };
}, sessionOptions);
