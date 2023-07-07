import Link from "next/link";

export default function Posts() {
  return (
    <div>
      这里是首页
      <div>
        <Link href='/posts'>进入到我的博客</Link>
      </div>
    </div>
  );
}
