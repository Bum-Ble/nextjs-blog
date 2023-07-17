import {GetServerSideProps, NextPage} from "next";
import axios, {AxiosResponse} from "axios";
import {withSession} from "@/lib/withSession";
import {User} from "@/src/entity/User";
import {useForm} from "@/hooks/useForm";

const SignIn: NextPage<{ user: User }> = (props) => {
  const initFormData = {
    username: '',
    password: ''
  }
  const onSubmit = (formData) => {
    axios.post(`/api/v1/sessions`, formData).then(() => {
      window.alert('登录成功')
    }, (error) => {
      if (error.response) {
        const {response}: AxiosResponse = error
        if (response.status === 422) {
          setErrors(response.data)
        }
      }
    })
  }
  const {form, setErrors} = useForm(
    initFormData, onSubmit,
    [
      { label: '用户名', type: 'text', key: 'username' },
      { label: '密码', type: 'password', key: 'password' }
    ],
    <button type='submit'>登录</button>,
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
