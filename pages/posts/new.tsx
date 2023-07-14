import {NextPage} from "next";
import {Form} from "@/components/Form";
import {ChangeEvent, useCallback, useState} from "react";
import axios, {AxiosResponse} from "axios";

const PostsNew: NextPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  })
  const [errors, setErrors] = useState({
    title: [],
    content: [],
  })

  const onSubmit = useCallback((e) => {
    e.preventDefault()
    axios.post(`/api/v1/posts`, formData).then(response => {
      if (response.status === 200) {
        window.alert('成功')
      }
    }, (error) => {
      const {response}: AxiosResponse = error
      if (response.status === 422) {
        setErrors(response.data)
      }
    })
  }, [formData])

  const onChange = useCallback((key, value) => {
    setFormData({...formData, [key]: value})
  }, [formData])

  return (
    <>
      <h1>PostsNew</h1>
      <Form onSubmit={onSubmit} fields={[
        {
          label: '标题', type: 'text', value: formData.title,
          onChange: (e: ChangeEvent<HTMLInputElement>) => onChange('title', e.target.value),
          errors: errors.title
        },
        {
          label: '内容', type: 'textarea', value: formData.content,
          onChange: (e: ChangeEvent<HTMLInputElement>) => onChange('content', e.target.value),
          errors: errors.content
        }]}
        buttons={
          <>
            <button type='submit'>提交</button>
          </>
        }>
      </Form>
    </>

  )
}
export default PostsNew
