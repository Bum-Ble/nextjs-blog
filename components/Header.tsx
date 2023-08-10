import React, {useEffect, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import {User} from "@/src/entity/User";

const Header = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    fetch("/api/v1/session")
      .then((response) => response.json())
      .then((data) => {setCurrentUser(data.session)});
  }, []);

  const onLogout =async () => {
    try {
      await fetch("/api/v1/logout", {
        method: "POST",
      });
      window.alert('退出登录成功')
      window.location.href = '/'
    } catch (error) {
      console.error("退出登录时出错");
    }
  }

  return (
    <header className="headerWrapper">
      {
        currentUser && (currentUser as User).username ?
          <div>
            当前登录用户为 {(currentUser as User).username}
            <button onClick={onLogout} className="logoutBtn">退出登录</button>
          </div>
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
        .logoutBtn{
          border: none;
          background-color: transparent;
          padding: 0;
          color: #999;
          margin-left: 10px;
        }
        .logoutBtn:hover{
          color: #f5f5f5;
          cursor:pointer;
        }

        a {
          color: #999;
          margin-right: 10px;
          text-decoration: none;
        }

        a:hover {
          color: #f5f5f5;
        }
      `}</style>
    </header>
  );
};

export default Header

