import React, { useState, Fragment } from "react"
import { graphql, navigate } from "gatsby"
import { useSwipeable } from "react-swipeable"

import { ColumnQuery, SitePageContext } from "../../types/graphql-types"
import * as style from "./column.module.css"
import SEO from "../components/SEO"
import Date from "../components/Date"

interface Props {
  data: ColumnQuery
  pageContext: SitePageContext
}

const Column: React.FC<Props> = ({ data, pageContext }) => {
  const { date, oldestDate, newestDate } = pageContext
  const columnLength = data.allColumn.edges.length

  let columnIdInHash = 0
  if (typeof window !== "undefined") {
    const tmp = Number(document.location.hash.substring(1))
    if (Number.isInteger(tmp) && data.allColumn.edges[tmp]) {
      columnIdInHash = tmp
    }
  }
  const [columnId, setColumnId] = useState(columnIdInHash)

  const swipeableHandler = useSwipeable({
    onSwipedRight: () => {
      const nextColumnId = (columnId + 1) % columnLength
      navigate(`#${nextColumnId}`)
      setColumnId(nextColumnId)
    },
    onSwipedLeft: () => {
      const nextColumnId = (columnId + columnLength - 1) % columnLength
      navigate(`#${nextColumnId}`)
      setColumnId(nextColumnId)
    },
  })

  const dateFormat = `${date.substring(4, 6)}/${date.substring(6, 8)}`
  const column = data.allColumn.edges[columnId]?.node
  if (!column) {
    return (
      <Fragment>
        <SEO title={dateFormat} />
        <div className={style.container}>
          <header>
            <div className={style.left} />
            <div className={style.middle}>{dateFormat}</div>
            <Date
              className={style.right}
              date={date}
              columnId={0}
              oldestDate={oldestDate}
              newestDate={newestDate}
            />
          </header>
          <div className={style.article}>
            <div className={style.text}>
              <p>この日のコラムはありません</p>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
  return (
    <Fragment>
      <SEO title={dateFormat} />
      <div className={style.container}>
        <header>
          <div className={style.left} />
          <div className={style.middle}>{column.source}</div>
          <Date
            className={style.right}
            date={date}
            columnId={columnId}
            oldestDate={oldestDate}
            newestDate={newestDate}
          />
        </header>
        <div className={style.article} {...swipeableHandler}>
          <div className={style.text}>
            <p className={style.editorial}>{column.editorial}</p>
            {column.text?.split(/[▼▲◆▽]/).map((par, i) => {
              if (!par.length) return null
              return <p key={i}>{par}</p>
            })}
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export const query = graphql`
  query column($date: Date!) {
    allColumn(filter: { publish_date: { eq: $date } }) {
      edges {
        node {
          id
          source
          editorial
          text
        }
      }
    }
  }
`
export default Column
