import React, { useState, Fragment } from "react"
import DatePicker from "./DatePicker"
import { navigate } from "gatsby"

interface Props {
  className: string
  date: string
  columnId: number
  oldestDate: string
  newestDate: string
}

const Date: React.FC<Props> = props => {
  const { className, date, columnId, ...others } = props
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (dateToGo: string) => {
    navigate(`/column/${dateToGo}#${columnId}`)
    setOpen(false)
  }

  const dateFormat = `${date.substring(4, 6)}/${date.substring(6, 8)}`
  return (
    <Fragment>
      <div role="button" onClick={handleClickOpen} className={className}>
        <span>{dateFormat}</span>
      </div>
      <DatePicker
        initDate={date}
        open={open}
        onClose={handleClose}
        {...others}
      />
    </Fragment>
  )
}

export default Date
