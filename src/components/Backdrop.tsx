import React from "react"
import style from "./Backdrop.module.css"

interface Props {
  open: boolean
}

const Backdrop: React.FC<Props> = props => {
  const { open, children, ...others } = props
  return open ? (
    <div className={style.backdrop} {...others}>
      {children}
    </div>
  ) : null
}

export default Backdrop
