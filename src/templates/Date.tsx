import React, { useState, Fragment } from "react"
import DatePicker from "./DatePicker"
import { navigate } from "gatsby"

interface Props {
  className: string
  date: string
  oldestDate: string
  newestDate: string
}

const Date: React.FC<Props> = props => {
  const { className, date, ...others } = props
  const [open, setOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(date)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (dateToGo: string) => {
    navigate(`/column/${dateToGo}`)
    setOpen(false)
    setSelectedDate(dateToGo)
  }

  const dateFormat = `${date.substr(4, 2)}/${date.substr(6, 2)}`
  return (
    <Fragment>
      <div onClick={handleClickOpen} className={className}>
        {dateFormat}
      </div>
      <DatePicker
        selectedDate={selectedDate}
        open={open}
        onClose={handleClose}
        {...others}
      />
    </Fragment>
  )
}

export default Date
