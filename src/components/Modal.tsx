import React from "react"
import Portal from "./Portal"
import Backdrop from "./Backdrop"

interface Props {
  container?: Element
  open: boolean
}

const Modal: React.FC<Props> = props => {
  const { container, children, open } = props

  return (
    <Portal container={container}>
      <div
        role="presentation"
        style={{
          position: "fixed",
          zIndex: 1300,
          right: 0,
          bottom: 0,
          top: 0,
          left: 0,
          ...(open ? {} : { visibility: "hidden" }),
        }}
      >
        <Backdrop open={open} />
        {children}
      </div>
    </Portal>
  )
}

export default Modal
