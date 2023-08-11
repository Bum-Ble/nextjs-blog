import {NextPage} from "next";
import axios from "axios";
import {useForm} from "@/hooks/useForm";
import Image from "next/image";

const SignUp: NextPage = () => {
  const {form} = useForm(
    { username: '', password: '', passwordConfirmation: '' },
    [
      { label: '用户名', type: 'text', key: 'username' },
      { label: '密码', type: 'password', key: 'password' },
      { label: '确认密码', type: 'password', key: 'passwordConfirmation' }
    ],
    <button type='submit' className="actions">注 册</button>,
    {
      request: (formData) => axios.post(`/api/v1/users`, formData),
      success: () => {
        window.alert('注册成功')
        window.location.href = '/sign_in'
      }
    }
  )

  return (
    <>
      <div className="signUp">
        <Image src="/background.jpg" alt="" layout="fill" priority={true}/>
        <div className="overlay"/> {/* 添加蒙版层 */}
        <div className="content">
          <div className="title">注册</div>
          <div className="formWrapper">
            {form}
          </div>
        </div>
        <style jsx global>{`
          .signUp {
            position: relative;
            width: 100%;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .signUp .overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(51, 51, 51, 0.6); /* 设置蒙版层颜色和透明度 */
          }
          .signUp .content {
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
          .signUp .content .title{
            font-size: 30px;
            font-weight: bold;
            color: #f5f5f5;
            margin-bottom: 8px;
          }
          .signUp .content .formWrapper{
          width: 100%;
          }
          .signUp .actions{
            width: 100%;
            margin-top: 8px;
            height: 40px;
            background-color:#4682A9;
            border: none;
            border-radius: 4px;
            transition: background-color 0.3s ease;
            color: #f5f5f5;
          }
          .signUp .actions:hover{
            background-color: #749BC2;
            cursor:pointer;
          }
          .signUp .actions:focus{
            background-color: #749BC2;
            box-shadow: 0 0 5px #749BC2; 
          }
          .signUp .label-text{
            width: 6rem;
            text-align: center;
            color: #f5f5f5;
          }
          .signUp .errors{
            margin-top: 3px;
            color: #D21312;
            padding-left: 6rem;
          }
        `}</style>
      </div>
    </>
  )
};
export default SignUp
