import React, { PropsWithChildren } from "react"

import * as style from "./Paper.module.css"

interface Props {
  role?: string
}

const Paper: React.FC<PropsWithChildren<Props>> = props => {
  const { role, children, ...other } = props
  return (
    <div role={role} className={style.paper} {...other}>
      {children}
    </div>
  )
}

export default Paper
