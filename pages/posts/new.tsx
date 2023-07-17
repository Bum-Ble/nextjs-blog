import {NextPage} from "next";
import {Form} from "@/components/Form";
import {ChangeEvent, useCallback, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {useForm} from "@/hooks/useForm";

const PostsNew: NextPage = () => {
  const initFormData = {
    title: '',
    content: ''
  }
  const onSubmit = (formData) => {
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
  }

  const { form, setErrors } = useForm(
    initFormData, onSubmit,
    [
      { label: '标题', type: 'text', key: 'title' },
      { label: '内容', type: 'textarea', key: 'content' }
    ],
    <button type='submit'>提交</button>
  )

  return (
    <>
      <h1>PostsNew</h1>
      { form }
    </>

  )
}
export default PostsNew
