import React, { useState } from "react"


type Tab = { name: string, component: React.ReactElement }

export function Tab(props: { children: Tab[] }): React.ReactElement {

  const [currentTabName, setCurrentTabName] = useState<string | undefined>(props.children.length > 0 ? props.children[0].name : undefined)
  const currentTab = props.children.find(t => t.name === currentTabName)

  return (
    <div style={{ paddingTop: "1rem" }}>
      <div style={{ display: "flex" }}>
        <div style={{ width: "1em", borderBottom: "1px solid black" }} />
        {props.children.map(tab =>
          <p style={
            {
              padding: "1em",
              borderStyle: "solid",
              borderWidth: "1px",
              ...(tab.name === currentTabName && { borderColor: "black black transparent black" }),
              ...(tab.name !== currentTabName && { borderColor: "transparent transparent black transparent" }),
              cursor: "pointer"
            }
          }
             onClick={_ => setCurrentTabName(tab.name)}>
            {tab.name}
          </p>
        )}
        <div style={{ borderBottom: "1px solid black", flexGrow: 1 }} />
      </div>
      {/* TODO: Just change the visibility and do not rerender */}
      {currentTab && (
        <div style={{ width: "100vw" }}>
          {currentTab.component}
        </div>
      )}
    </div>
  )
}
