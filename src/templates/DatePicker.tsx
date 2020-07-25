import React, { useState, useRef, useEffect, useCallback } from "react"
import clsx from "clsx"
import { throttle } from "lodash"

import Dialog from "../components/Dialog"
import style from "./DatePicker.module.css"

interface Props {
  selectedDate: string
  open: boolean
  onClose: (date: string) => void
  oldestDate: string
  newestDate: string
}

const japaneseDayInWeek = "日月火水木金土".split("")

const DatePicker: React.FC<Props> = props => {
  const { open, onClose, selectedDate, oldestDate, newestDate } = props

  const [selectedYear, setSelectedYear] = useState(selectedDate.substr(0, 4))
  const [yearPostion, setYearPosition] = useState<Array<number | undefined>>([])
  const [selectedMonth, setSelectedMonth] = useState(selectedDate.substr(4, 2))
  const [monthPosition, setMonthPosition] = useState<Array<number | undefined>>(
    []
  )
  const [selectedDay, setSelectedDay] = useState(selectedDate.substr(6, 2))
  const [dayPosition, setDayPosition] = useState<Array<number | undefined>>([])
  const [valid, setValid] = useState(false)

  const yearDivRef = useRef<HTMLDivElement>(null)
  const selectedYearRef = useRef<HTMLButtonElement>(null)
  const selectedMonthRef = useRef<HTMLButtonElement>(null)
  const selectedDayRef = useRef<HTMLButtonElement>(null)

  const yearOptions = ["2019", "2020"]
  const monthOptions = Array.from({ length: 12 }, (v, k) => k + 1).map(month =>
    month.toString().padStart(2, "0")
  )
  const dayOptions = Array.from(
    {
      length: new Date(
        Number(selectedYear),
        Number(selectedMonth), // next month
        0
      ).getDate(),
    },
    (v, k) => k + 1
  ).map(day => ({
    dayInWeek: new Date(
      Number(selectedYear),
      Number(selectedMonth) - 1, // this month
      day
    ).getDay(),
    day: day.toString().padStart(2, "0"),
  }))

  const handleClose = () => {
    onClose(selectedDate)
  }

  useEffect(() => {
    const formatDate = `${selectedYear}${selectedMonth}${selectedDay}`
    setValid(formatDate >= oldestDate && formatDate <= newestDate)
  }, [selectedYear, selectedMonth, selectedDay, oldestDate, newestDate])

  const handleDateSubmit = useCallback(() => {
    const formatDate = `${selectedYear}${selectedMonth}${selectedDay}`
    if (valid) onClose(formatDate)
  }, [selectedYear, selectedMonth, selectedDay])

  const getMinMax = () => {
    const rect = yearDivRef.current?.getBoundingClientRect()
    return {
      min: rect?.x as number,
      max: (rect?.x === undefined
        ? undefined
        : rect?.x + rect?.width ?? 0) as number,
    }
  }

  const adjustPosition = (rect?: DOMRect) => {
    const { min, max } = getMinMax()
    let x: number | undefined
    if (rect?.x === undefined) x = undefined
    else if (rect.x + 5 <= min) x = min
    else if (rect.x + 5 >= max) x = max
    else x = rect.x + 5

    let y: number | undefined
    if (rect?.y === undefined) y = undefined
    else y = rect.y + 1
    return [x, y]
  }

  const handleYearPositionChange = throttle(() => {
    const rect = selectedYearRef.current?.getBoundingClientRect()
    setYearPosition(adjustPosition(rect))
  }, 100)

  const handleMonthPositionChange = throttle(() => {
    const rect = selectedMonthRef.current?.getBoundingClientRect()
    setMonthPosition(adjustPosition(rect))
  }, 100)

  const handleDayPositionChange = throttle(() => {
    const rect = selectedDayRef.current?.getBoundingClientRect()
    setDayPosition(adjustPosition(rect))
  }, 100)

  useEffect(() => {
    handleYearPositionChange()
    handleMonthPositionChange()
    handleDayPositionChange()
  }, [selectedYear])

  useEffect(() => {
    handleMonthPositionChange()
    handleDayPositionChange()
  }, [selectedMonth])

  useEffect(() => {
    handleDayPositionChange()
  }, [selectedDay])

  return (
    <Dialog onClose={handleClose} open={open}>
      <svg className={style.svg}>
        <line
          x1={yearPostion[0]}
          y1={monthPosition[1]}
          x2={monthPosition[0]}
          y2={monthPosition[1]}
          style={{ stroke: "tomato", strokeWidth: 2 }}
        />
        <line
          x1={monthPosition[0]}
          y1={dayPosition[1]}
          x2={dayPosition[0]}
          y2={dayPosition[1]}
          style={{ stroke: "tomato", strokeWidth: 2 }}
        />
      </svg>
      <div className={style.datePicker}>
        <div
          ref={yearDivRef}
          className={style.year}
          onScroll={handleYearPositionChange}
        >
          {yearOptions.map(year => (
            <button
              key={year}
              ref={year === selectedYear ? selectedYearRef : null}
              className={clsx({ [style.selected]: year === selectedYear })}
              onClick={() => setSelectedYear(year)}
            >
              {year}
            </button>
          ))}
        </div>
        <div className={style.month} onScroll={handleMonthPositionChange}>
          {monthOptions.map(month => (
            <button
              key={month}
              ref={month === selectedMonth ? selectedMonthRef : null}
              className={clsx({ [style.selected]: month === selectedMonth })}
              onClick={() => setSelectedMonth(month)}
            >
              {`${Number(month)}月`}
            </button>
          ))}
        </div>
        <div className={style.day} onScroll={handleDayPositionChange}>
          {dayOptions.map(({ dayInWeek, day }) => (
            <button
              key={day}
              ref={day === selectedDay ? selectedDayRef : null}
              className={clsx({ [style.selected]: day === selectedDay })}
              onClick={() => setSelectedDay(day)}
            >
              <div className={style.dayInWeek}>
                {japaneseDayInWeek[dayInWeek]}
              </div>
              <div>{day}</div>
            </button>
          ))}
        </div>
      </div>
      <button
        className={style.submit}
        onClick={handleDateSubmit}
        disabled={!valid}
      >
        <span>{valid ? "この日のコラムを読む" : "別の日を選んでください"}</span>
      </button>
    </Dialog>
  )
}

export default DatePicker
