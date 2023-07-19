import {GetServerSideProps, NextPage} from "next";
import axios from "axios";
import {withSession} from "@/lib/withSession";
import {User} from "@/src/entity/User";
import {useForm} from "@/hooks/useForm";
import qs from 'querystring'

const SignIn: NextPage<{ user: User }> = (props) => {
  const {form} = useForm(
    { username: '', password: '' },
    [
      { label: '用户名', type: 'text', key: 'username' },
      { label: '密码', type: 'password', key: 'password' }
    ],
    <button type='submit'>登录</button>,
    {
      request : (formData) => axios.post(`/api/v1/sessions`, formData),
      success: () => {
        window.alert('登录成功')
        const query = qs.parse(window.location.search.slice(1))
        window.location.href = query.returnTo ? query.returnTo.toString() : '/posts'
      }
    }
  )

  return (
    <>
      {
        props.user && <div> 当前登录用户为 {props.user.username} </div>
      }
      <h1>登录</h1>
      {form}
    </>
  )
};
export default SignIn

export const getServerSideProps: GetServerSideProps = withSession(async (context) => {
  // @ts-ignore
  const user = context.req.session.get('currentUser') || '' as User;
  return {
    props: {
      user: JSON.parse(JSON.stringify(user))
    }
  };
});
