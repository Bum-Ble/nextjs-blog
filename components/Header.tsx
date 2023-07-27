import React, {useEffect, useState} from "react";
import Link from "next/link";

const Header = (req, res) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetch("/api/session")
      .then((response) => response.json())
      .then((data) => {setCurrentUser(data.session)});
  }, []);

  return (
    <header className="headerWrapper">
      {
        currentUser && currentUser.username ? <div> 当前登录用户为 {currentUser.username} </div>
          :
          <div>
            <Link href="/sign_up"><a>注册</a></Link>
            <Link href="/sign_in"><a>登录</a></Link>
          </div>
      }
      <nav>
        <Link href="/"><a>首页</a></Link>
        <Link href="/posts"><a>文章列表</a></Link>
        <Link href="/posts/new"><a>创建文章</a></Link>
      </nav>
      <style jsx>{`
        .headerWrapper {
          position: relative;
          z-index: 2;
          background-color: #333;
          color: #999;
          padding: 10px;
          display: flex;
          justify-content: space-between;
        }

        a {
          color: #999;
          margin-right: 10px;
          text-decoration: none;
        }

        a:hover {
          color: white;
        }
      `}</style>
    </header>
  );
};

export default Header

