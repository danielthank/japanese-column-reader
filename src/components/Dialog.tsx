import React, { useRef } from "react"

import Modal from "./Modal"
import * as style from "./Dialog.module.css"
import Paper from "./Paper"

interface Props {
  open: boolean
  onClose: () => void
}

const Dialog: React.FC<Props> = props => {
  const { open, onClose, children, ...others } = props

  const mouseDownTarget = useRef<EventTarget>()
  const handleMouseDown: React.MouseEventHandler<HTMLDivElement> = event => {
    mouseDownTarget.current = event.target
  }
  const handleBackdropClick: React.MouseEventHandler<HTMLDivElement> = event => {
    // Ignore the events not coming from the "backdrop"
    // We don't want to close the dialog when clicking the dialog content.
    if (event.target !== event.currentTarget) {
      return
    }

    // Make sure the event starts and ends on the same DOM element.
    if (event.target !== mouseDownTarget.current) {
      return
    }

    mouseDownTarget.current = undefined

    if (onClose) {
      onClose()
    }
  }

  return (
    <Modal open={open} {...others}>
      <div
        className={style.container}
        onMouseDown={handleMouseDown}
        onMouseUp={handleBackdropClick}
      >
        <Paper role="dialog">{children}</Paper>
      </div>
    </Modal>
  )
}

export default Dialog
