import React, { useState, useRef, useEffect, useCallback } from "react"
import clsx from "clsx"
import { throttle } from "lodash"

import Dialog from "../components/Dialog"
import * as style from "./DatePicker.module.css"

interface Props {
  initDate: string
  open: boolean
  onClose: (date: string) => void
  oldestDate: string
  newestDate: string
}

const japaneseDayInWeek = "日月火水木金土".split("")

const range = (start: number, end: number) => {
  return Array.from({ length: end - start }, (_v, k) => k + start)
}

const DatePicker: React.FC<Props> = props => {
  const { open, onClose, initDate, oldestDate, newestDate } = props

  const [selectedYear, setSelectedYear] = useState(initDate.substr(0, 4))
  const [yearPostion, setYearPosition] = useState<Array<number | undefined>>([])
  const [selectedMonth, setSelectedMonth] = useState(initDate.substr(4, 2))
  const [monthPosition, setMonthPosition] = useState<Array<number | undefined>>(
    []
  )
  const [selectedDay, setSelectedDay] = useState(initDate.substr(6, 2))
  const [dayPosition, setDayPosition] = useState<Array<number | undefined>>([])

  const yearDivRef = useRef<HTMLDivElement>(null)
  const selectedYearRef = useRef<HTMLButtonElement>(null)
  const selectedMonthRef = useRef<HTMLButtonElement>(null)
  const selectedDayRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    selectedYearRef.current?.scrollIntoView({ inline: "start" })
    selectedMonthRef.current?.scrollIntoView({ inline: "start" })
    selectedDayRef.current?.scrollIntoView({ inline: "start" })
  }, [])

  const yearOptions = range(Number(oldestDate.substr(0, 4)), Number(newestDate.substr(0, 4)) + 1)
    .map((v) => v.toString())
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
    (_v, k) => k + 1
  ).map(day => ({
    dayInWeek: new Date(
      Number(selectedYear),
      Number(selectedMonth) - 1, // this month
      day
    ).getDay(),
    day: day.toString().padStart(2, "0"),
  }))

  const handleClose = () => {
    onClose(initDate)
  }

  const formatDate = `${selectedYear}${selectedMonth}${selectedDay}`
  const isValid = formatDate >= oldestDate && formatDate <= newestDate

  const handleDateSubmit = useCallback(() => {
    if (isValid) onClose(formatDate)
  }, [selectedYear, selectedMonth, selectedDay])

  const getMinMax = () => {
    const rect = yearDivRef.current?.getBoundingClientRect()
    return {
      min: rect?.x as number,
      max: (rect?.x === undefined
        ? undefined
        : rect?.x + (rect?.width ?? 0) + 2) as number,
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
        disabled={!isValid}
      >
        <span>
          {isValid ? "この日のコラムを読む" : "別の日を選んでください"}
        </span>
      </button>
    </Dialog>
  )
}

export default DatePicker
