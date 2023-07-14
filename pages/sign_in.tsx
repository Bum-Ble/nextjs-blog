import {GetServerSideProps, NextPage} from "next";
import {ChangeEvent, useCallback, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {withSession} from "@/lib/withSession";
import {User} from "@/src/entity/User";
import {Form} from "@/components/Form";

const SignIn: NextPage<{ user: User }> = (props) => {
  const [formData, setFormData] = useState({username: '', password: '',})
  const [errors, setErrors] = useState({username: [], password: [],})
  const onSubmit = useCallback((e) => {
    e.preventDefault()
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
  }, [formData])

  const onChange = useCallback((key, value) => {
    setFormData({...formData, [key]: value})
  },[formData])

  return (
    <>
      {
        props.user &&
        <div>
          {props.user.username}
        </div>
      }
      <h1>登录</h1>
      <Form onSubmit={onSubmit} fields={[
        {
          label: '用户名', type: 'text', value: formData.username,
          onChange:(e: ChangeEvent<HTMLInputElement>) => onChange('username', e.target.value),
          errors: errors.username
        },
        {
          label: '密码', type: 'password', value: formData.password,
          onChange:(e: ChangeEvent<HTMLInputElement>) => onChange('password', e.target.value),
          errors: errors.password
        }]}
        buttons={
          <><button type='submit'>登录</button></>
        }>
      </Form>
    </>
  )
};
export default SignIn

export const getServerSideProps: GetServerSideProps = withSession(async (context) => {
  // @ts-ignore
  const user = context.req.session.get('currentUser') || {} as User;
  return {
    props: {
      user: JSON.parse(JSON.stringify(user))
    }
  };
});
