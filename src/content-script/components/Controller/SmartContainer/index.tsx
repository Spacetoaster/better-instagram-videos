import cn from "classnames"
import "./style.css"
import debounce from "lodash.debounce"
import { useCallback, useEffect, useRef, useState } from "react"

type Props = {
  children: React.ReactNode
  dragging?: boolean
}

export default function SmartContainer({ children, dragging }: Props) {
  const [active, setActive] = useState(false)
  const debounceRef = useRef<ReturnType<typeof debounce> | null>(null)

  const handleMouseEnter = () => {
    if (debounceRef.current) {
      debounceRef.current.cancel()
    }
    setActive(true)
  }

  const debouncedHandleMouseLeave = useCallback(
    debounce(() => {
      setActive(false)
    }, 1300),
    []
  )

  useEffect(() => {
    debounceRef.current = debouncedHandleMouseLeave
    return () => {
      if (debounceRef.current) {
        debounceRef.current.cancel()
      }
    }
  }, [debouncedHandleMouseLeave])

  return (
    <div
      className={cn("bgv-smart-container", {
        active: dragging || active
      })}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={debouncedHandleMouseLeave}
    >
      <div className="content">{children}</div>
    </div>
  )
}
