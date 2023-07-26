import {NextPage} from "next";
import axios from "axios";
import {useForm} from "@/hooks/useForm";
import {marked} from "marked";

const PostsNew: NextPage = () => {
  const {form, formData} = useForm(
    {title: '', content: ''},
    [
      {label: '', type: 'text', key: 'title', placeholder: '请输入文章标题'},
      {label: '', type: 'textarea', key: 'content', placeholder: '请输入文章内容'}
    ],
    <>
      <button className="btn back" onClick={() => window.location.href = '/posts'} type='button'>返回列表</button>
      <button className="btn actions" type='submit'>提交</button>
    </>,
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
      <div className="postsNew">
        <div className="wrapper"> {form} </div>
        <div className="preview">
          <span className="preview-text">预览区</span>
          <h1>{formData.title}</h1>
          <div className="markdown-body" dangerouslySetInnerHTML={{__html: marked(formData.content)}}/>
        </div>
        <style jsx global>{`
          .postsNew {
            display: flex;
            padding: 16px;
          }

          .postsNew .wrapper {
            width: 50%;
            margin-right: 10px;
          }

          .postsNew .field-content textarea {
            height: 42em;
            resize: none;
            border: 1px solid #c9cdd4;
          }

          .postsNew .field-title input {
            border: 1px solid #c9cdd4;
          }

          .postsNew .btn {
            padding: 4px;
            width: 120px;
            height: 40px;
            margin: 0 10px;
            border: none;
            border-radius: 3px;
          }

          .postsNew .actions {
            background-color: #749BC2;
            color: #f5f5f5;
          }

          .postsNew .actions:hover {
            background-color: #56789A;
            cursor: pointer;
          }

          .postsNew .back:hover {
            background-color: #dcdcdc;
            cursor: pointer;
          }

          .preview {
            height: 40em;
            width: 50%;
            box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
            margin-left: 10px;
            padding: 10px;
            overflow: auto;
          }

          .preview .preview-text {
            color: #8a919f;
            font-size: 13px;
          }
        `}
        </style>

      </div>
    </>

  )
}
export default PostsNew
