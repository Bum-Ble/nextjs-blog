import {NextPage} from "next";
import axios from "axios";
import {useForm} from "@/hooks/useForm";

const PostsNew: NextPage = () => {
  const { form } = useForm(
    { title: '', content: '' },
    [
      { label: '标题', type: 'text', key: 'title' },
      { label: '内容', type: 'textarea', key: 'content' }
    ],
    <button type='submit'>提交</button>,
    {
      request: (formData) => axios.post(`/api/v1/posts`, formData),
      success: () => {
        window.alert('创建成功')
        window.location.href = '/posts'
      }
    }
  )

  return (
    <>
      <h1>PostsNew</h1>
      { form }
    </>

  )
}
export default PostsNew
