import {NextPage} from "next";
import axios, {AxiosResponse} from "axios";
import {useForm} from "@/hooks/useForm";

const SignUp: NextPage = () => {
  const initFormData = {
    username: '',
    password: '',
    passwordConfirmation: ''
  }
  const onSubmit = (formData) => {
    axios.post(`/api/v1/users`, formData).then(response => {
      if (response.status === 200) {
        window.alert('注册成功')
        window.location.href = '/sign_in'
      }
    }, (error) => {
      const {response}: AxiosResponse = error
      if (response.status === 422) {
        setErrors(response.data)
      }
    })
  }
  const {form, setErrors} = useForm(
    initFormData, onSubmit,
    [
      { label: '用户名', type: 'text', key: 'username' },
      { label: '密码', type: 'password', key: 'password' },
      { label: '确认密码', type: 'password', key: 'passwordConfirmation' }
    ],
    <button type='submit'>注册</button>
  )

  return (
    <>
      <h1>注册</h1>
      { form }
    </>
  )
};
export default SignUp
