import {NextPage} from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <div className="cover">
        <div className="overlay"/>
        {/* 添加蒙版层 */}
        <div className="content">
          <img src="/logo.png" className="logo" alt=""/>
          <h1>Bumble的个人博客</h1>
          <p>{`if ( coffee.empty() ) { code.develop() }`}</p>
          <Link href="/posts">
            <div className="button">
              <span className="button-text">前往文章列表</span>
            </div>
          </Link>
        </div>

        <style jsx lang='scss'>{`
          .cover {
            position: relative;
            width: 100%;
            height: 100vh;
            background-image: url("/background.jpg");
            background-size: cover;
            background-position: center;
          }

          .overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(51, 51, 51, 0.6); /* 设置蒙版层颜色和透明度 */
          }

          .content {
            color: #f5f5f5;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            height: 100%;
            z-index: 1;
          }

          .logo {
            width: 200px;
            height: 200px;
          }

          .button-text {
            color: #f5f5f5;
          }

          .button {
            margin: 16px 0;
            line-height: 50px;
            height: 50px;
            text-align: center;
            width: 250px;
            cursor: pointer;
            color: #FFF;
            transition: all 0.5s;
            position: relative;
          }

          .button::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            background-color: rgba(255, 255, 255, 0.1);
            transition: all 0.3s;
          }

          .button:hover::before {
            opacity: 0;
            transform: scale(0.5, 0.5);
          }

          .button::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            opacity: 0;
            transition: all 0.3s;
            border: 1px solid rgba(255, 255, 255, 0.5);
            transform: scale(1.2, 1.2);
          }

          .button:hover::after {
            opacity: 1;
            transform: scale(1, 1);
          }
        `}</style>
      </div>
    </>
  )
}
export default Home


