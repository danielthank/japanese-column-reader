import React, { useEffect } from "react"
import { createPortal } from "react-dom"

interface Props {
  container?: Element
  onRendered?: () => void
}

const Portal: React.FC<Props> = props => {
  const { children, container, onRendered } = props

  useEffect(() => {
    if (onRendered) {
      onRendered()
    }
  }, [onRendered])

  return typeof window !== "undefined"
    ? createPortal(children, container ?? window.document.body)
    : null
}

export default Portal
