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
  const sortNumbers = _.uniq(numbers).sort(function(a, b) { return a - b; });
  const pageNumbers = sortNumbers.filter(n => n >= 1 && n <= totalPage)
    .reduce<number[]>((result: number[], n: number) => {
      return n - (result[result.length - 1] || 0) === 1 ? [...result, n] : [...result, -1, n]
    }, [])
  const pager = (
    <div>
      {page !== 1 && <Link href={urlMaker(page-1)}><span className="pageBtn textColor">上一页</span></Link>}
      {
        pageNumbers.map((n, i) => n === -1 ?
          <span className='textColor' key={i}>...</span>
          : <Link key={i} href={urlMaker(n)}>
              <span className={`pageBtn textColor ${n === page ? 'textActive' : ''}`}>{n}</span>
            </Link>
        )
      }
      {page < totalPage && <Link href={urlMaker(page+1)}><span className="pageBtn textColor">下一页 </span></Link>}
      <span className="textColor">第 {page}/{totalPage} 页</span>
      <style jsx>{`
        .pageBtn{
          margin: 0 8px;
          cursor: pointer;
        }
        .textColor{
          //color: #f5f5f5;
        }
        .textActive{
          font-weight: bold;
          font-size: 18px;
        }
      `}
      </style>
    </div>
  )
  return {pager}
}
