import Link from "next/link";
import _ from "lodash"

type Options = {
  page: number
  totalPage: number,
  urlMaker?:(n:number) => string
}
const defaultUrlMaker = (n: number) => `?page=${n}`

export const usePager = (options: Options) => {
  const {page, totalPage, urlMaker: _urlMaker} = options
  const urlMaker = _urlMaker || defaultUrlMaker
  const numbers = []
  numbers.push(1)
  for (let i = page - 3; i <= page + 3; i++) {
    numbers.push(i)
  }
  numbers.push(totalPage)
  const pageNumbers = _.uniq(numbers).sort().filter(n => n >= 1 && n <= totalPage)
    .reduce<number[]>((result: number[], n: number) => {
      return n - (result[result.length - 1] || 0) === 1 ? [...result, n] : [...result, -1, n]
    }, [])
  const pager = (
    <div>
      {page !== 1 && <Link href={urlMaker(page-1)}>上一页</Link>}
      {
        pageNumbers.map((n, i) => n === -1 ?
          <span className='pageBtn' key={i}>...</span>
          : <Link key={i} href={urlMaker(n)}><a className='pageBtn'>{n}</a></Link>
        )
      }
      {page < totalPage && <Link href={urlMaker(page+1)}>下一页</Link>}
      &nbsp;第 {page}/{totalPage} 页
      <style jsx>{`
        .pageBtn{
          margin: 0 8px;
        }
      `}
      </style>
    </div>
  )
  return {pager}
}
