import {GetServerSideProps, NextPage} from "next";
import {useForm} from "@/hooks/useForm";
import axios from "axios";
import {marked} from "marked";
import {handleGetRepository} from "@/lib/handleGetRepository";
import {Post} from "@/src/entity/Post";

type Props = {
  post?: PostType,
  id?: number
}

const PostEdit: NextPage = (props:Props) => {
  const {post, id} = props
  const {form, formData} = useForm(
    {title: post?.title, content: post?.content},
    [
      {label: '', type: 'text', key: 'title', placeholder:'请输入文章标题'},
      {label: '', type: 'textarea', key: 'content', placeholder:'请输入文章内容'}
    ],
    <>
      <button className="btn back" onClick={() => window.location.href = `/posts/${id}`} type='button'>返回文章</button>
      <button className="btn actions" type='submit'>提交</button>
    </>,
    {
      request: (formData) => axios.patch(`/api/v1/posts/${id}`, {...formData}),
      success: () => {
        window.alert('编辑成功')
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
          <div className="markdown-body" dangerouslySetInnerHTML={{__html: marked(formData.content as string)}}/>
        </div>
        <style jsx global>{`
          .postsNew{
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
          .postsNew .field-title input{
            border: 1px solid #c9cdd4;
          }
          
          .postsNew .btn{
            padding: 4px;
            width: 120px;
            height: 40px;
            margin: 0 10px;
            border: none;
            border-radius: 3px;
          }
          .postsNew .actions {
            background-color: #4682A9;
            color: #f5f5f5;
          }
          .postsNew .actions:hover{
            background-color: #749BC2;
            cursor:pointer;
          }
          .postsNew .back:hover{
            background-color: #dcdcdc;
            cursor:pointer;
          }
          .preview{
            height: 40em;
            width: 50%;
            box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
            margin-left: 10px;
            padding: 10px;
            overflow: auto;
          }
          .preview .preview-text{
            color: #8a919f;
            font-size: 13px;
          }
        `}
        </style>

      </div>
    </>
  )
}
export default PostEdit

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {params} = context;
  const PostRepository = await handleGetRepository(Post)
  const post = await PostRepository.findOneBy({id: params?.id})
  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
      id: parseInt(params?.id as string)
    }
  };
};
