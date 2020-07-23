import React, { useState, Fragment } from "react"
import { graphql } from "gatsby"
import { useSwipeable } from "react-swipeable"
import "typeface-noto-serif-jp"

import { ColumnQuery } from "../../types/graphql-types"
import style from "./column.module.css"
import SEO from "../components/seo"

interface Props {
  data: ColumnQuery
  pageContext: {
    date: string
  }
}

const Column: React.FC<Props> = ({ data, pageContext }) => {
  const { date } = pageContext
  const columnLength = data.allColumn.edges.length
  const [columnId, setColumnId] = useState(0)

  const swipeableHandler = useSwipeable({
    onSwipedLeft: () => {
      setColumnId((columnId + 1) % columnLength)
    },
    onSwipedRight: () => {
      setColumnId((columnId + columnLength - 1) % columnLength)
    },
  })

  const dateFormat = `${date.substr(4, 2)}/${date.substr(6, 2)}`
  const column = data.allColumn.edges[columnId].node
  return (
    <Fragment>
      <SEO title={dateFormat} />
      <div className={style.container}>
        <header className={style.title}>
          <div className={style.left} />
          <div className={style.middle}>
            {`${column.source} ${column.editorial}`}
          </div>
          <div className={style.right}>{dateFormat}</div>
        </header>
        <div className={style.article} {...swipeableHandler}>
          <div className={style.text}>
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
          title
          text
        }
      }
    }
  }
`
export default Column
