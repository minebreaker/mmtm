import React, { useCallback, useEffect, useState } from "react"


type Tab = { name: string, component: React.ReactElement }

export function Tab(props: { children: Tab[] }): React.ReactElement {

  const [currentTabName, setCurrentTabName] = useState<string | undefined>(props.children.length > 0 ? props.children[0].name : undefined)

  useEffect(() => {
    const url = new URL(location.href)
    const requestedTab = url.searchParams.get("tab")
    if (requestedTab && currentTabName !== requestedTab && props.children.find(t => t.name === requestedTab)) {
      setCurrentTabName(requestedTab)
    }
  }, [currentTabName, props.children]);

  const handleChange = useCallback((tabName: string) => {
    // Save current tab name as a query parameter
    const newUrl = new URL(location.href)
    newUrl.searchParams.set("tab", tabName)
    history.pushState({}, "", newUrl)
    setCurrentTabName(tabName)
  }, [])

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
             onClick={_ => handleChange(tab.name)}>
            {tab.name}
          </p>
        )}
        <div style={{ borderBottom: "1px solid black", flexGrow: 1 }} />
      </div>
      {props.children.map(({ name, component }) => (
        <div style={{
          display: name === currentTabName ? "block" : "none",
          width: "100vw"
        }}>
          {component}
        </div>
      ))}
    </div>
  )
}
