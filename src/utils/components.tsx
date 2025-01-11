import React from "react"

export function Centering({ children, style }: React.PropsWithChildren & { style?: React.CSSProperties }): React.ReactElement {
  return (
    <div style={{ display: "flex", justifyContent: "center", ...style }}>
      <div>
        {children}
      </div>
    </div>
  )
}
