import React from "react"

import style from "./Paper.module.css"

interface Props {
  role?: string
}

const Paper: React.FC<Props> = props => {
  const { role, ...other } = props
  return <div role={role} className={style.paper} {...other} />
}

export default Paper
