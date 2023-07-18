import {NextPage} from "next";
import axios from "axios";
import {useForm} from "@/hooks/useForm";

const SignUp: NextPage = () => {
  const {form} = useForm(
    { username: '', password: '', passwordConfirmation: '' },
    [
      { label: '用户名', type: 'text', key: 'username' },
      { label: '密码', type: 'password', key: 'password' },
      { label: '确认密码', type: 'password', key: 'passwordConfirmation' }
    ],
    <button type='submit'>注册</button>,
    {
      request: (formData) => axios.post(`/api/v1/users`, formData),
      success: () => window.alert('注册成功')
    }
  )

  return (
    <>
      <h1>注册</h1>
      { form }
    </>
  )
};
export default SignUp
